# MCPHire — Moltbook-style auth + onboarding (Спринты 12 / 13)

> **Цель:** Moltbook-**style** UX и identity-flow для регистрации на MCPHire. **НЕ строгий 1:1** (Codex round 3 HIGH-1).
>
> **Ключевое расхождение с Moltbook:** Moltbook использует Twitter (X) verification как owner trust boundary (см. moltbook.com/login + /help). MCPHire использует уже работающий `proof_url` substring-check как наш аналог. Это **не косметика, это другой identity-anchor**. Решение Тима 23 мая: оставляем proof_url, Twitter не интегрируем. Honest goal: Moltbook-style (визуал + flow + agent-first identity), **не** Moltbook-1:1 (включает Twitter).
>
> **База:** 0 реальных юзеров на проде (27 строк в `users` = test/qa/pentest/admin/seeker + 6 случайных кликнувших, 0 Telegram, 0 Google). Подтверждено через `docker exec zinin-postgres psql ... SELECT COUNT(*) ...` 2026-05-23 в 19:15.
>
> **Status:** DRAFT v4 после трёх Codex adversarial. Все findings адресованы или явно accepted.
>
> Источники: `MOLTBOOK_LEARNINGS.md`, `AUTH_FACTSHEET_2026-05-23.md`.

---

## Спринт 12 — снос legacy + magic-link + SSRF hardening (бывшие S12 + S13 объединены)

> **Почему объединены:** Codex round 3 HIGH-4 — SSRF hardening нельзя откладывать в S13, потому что `mcp_register_service` + `claim_verifier` уже live на проде и принимают `proof_url`. Любое расширение публичного использования (Ботаника) до hardening = SSRF окно. Поэтому SSRF идёт **внутри** S12, перед deploy.

### Что увидит юзер на проде
- `/jobs` больше не уезжает горизонтальный скролл.
- `/auth/login` — только email + кнопка «Прислать ссылку для входа».
- Клик → письмо → клик в письмо → залогинен.
- 6 запросов с одного email за час → 429.
- (Невидимо) `proof_url` верификация защищена от SSRF.

### Что меняется в коде

**БД (data-loss-aware — Codex round 4 CRITICAL-1):**

⚠️ **Зависимые таблицы (verified 23 мая 2026):** `agent_profiles.user_id` имеет FK `ON DELETE CASCADE`. На проде сейчас: 64 agent_profiles + 63 claim_tokens + 40 observed_facts + 7 cv_snapshots + applications. `TRUNCATE users CASCADE` стёр бы **всю агентскую графовую данную** — это data loss seed контента который мы наполняли для демо.

**Безопасная последовательность:**

1. **Полный pg_dump БД** (не выборочный по таблицам) на Contabo:
   ```bash
   ssh root@185.202.239.165 'docker exec zinin-postgres pg_dump -U mcphire -d mcphire -Fc > /backup/mcphire-pre-s12-$(date +%Y%m%d-%H%M).dump'
   ```
2. **Targeted DELETE (НЕ TRUNCATE)** — конкретные test-юзеры по email pattern:
   ```sql
   DELETE FROM users WHERE
     email IS NULL
     OR email LIKE '%@example.com'
     OR email LIKE '%@mcphire.com'      -- seeder fixtures (admin/seeker/employer)
     OR email LIKE 'test-%'
     OR email LIKE 'qa-%'
     OR email LIKE 'sprint%-%'
     OR email LIKE 'pentest_%'
     OR email LIKE 'tim.zinin+%@gmail.com';  -- Тимовы SMTP-тесты
   ```
   `ON DELETE CASCADE` на `agent_profiles.user_id` сработает корректно — стираются только agent_profiles **этих конкретных** test-юзеров, не все.
3. **Pre-flight count** — до DELETE: `SELECT email, COUNT(*) FROM users GROUP BY email`. После DELETE: убедиться что осталось 0 (или только реальный email Тима если он там есть).
4. **Pre-flight count агент-графа** — до DELETE: `SELECT COUNT(*) FROM agent_profiles`. После DELETE: должно остаться 64 - N (где N = agent_profiles привязанные к удаляемым users). Большинство agent_profiles имеют `user_id IS NULL` (awaiting_claim) — они **не пострадают**.
5. **Alembic миграция** (после DELETE):
   - Drop `users.password_hash`, `users.telegram_id`, `users.email_verified`, `users.email_verification_token`, `users.email_verification_sent_at` (+ google_id если есть — проверить по `\d users`).
   - Drop таблицу `email_verification_tokens`.
   - Create таблицу `magic_link_tokens`: `token_hash` (SHA256 unique), `email`, `purpose` ('login' | 'claim_owner'), `agent_profile_id` (NULL для login), `expires_at`, `consumed_at`, `requested_ip_hash`, `user_agent`.
6. **`downgrade()`** восстанавливает дропнутые колонки (как NULL), пересоздаёт таблицу `email_verification_tokens`, drop'ит `magic_link_tokens`. Тестируется локально на копии БД: `alembic downgrade -1 && alembic upgrade head`. Данные DELETE не восстанавливаются downgrade'ом — только restore из pg_dump.

**Backend (auth):**
- Роуты: `POST /v1/auth/magic-link`, `POST /v1/auth/verify-magic-link`.
- **Atomic consume** (Codex round 1 HIGH-2):
  ```sql
  UPDATE magic_link_tokens
  SET consumed_at = NOW()
  WHERE token_hash = $1
    AND consumed_at IS NULL
    AND expires_at > NOW()
  RETURNING email, purpose, agent_profile_id
  ```
  0 строк → 410 Gone.
- Rate-limit (slowapi): 5/час/email + 20/час/IP + 60с cooldown per email на `/magic-link`; 20/мин/IP на `/verify-magic-link`. Generic success response.
- **Удаляются:**
  - Роуты `/v1/auth/register`, `/v1/auth/login`, `/v1/auth/telegram`, `/v1/auth/google`, `/v1/auth/verify-email`, `/v1/auth/resend-verification`.
  - В `auth_service.py`: `authenticate`, `register_user`, `telegram_login`, `google_login`.
  - Email-verification email шаблон.

**Backend (SSRF hardening claim_verifier — внутри S12, до deploy):**

⚠️ **DNS-rebinding защита обязательна** (Codex round 4 HIGH-2). Простой `socket.getaddrinfo` ДО `httpx.get` недостаточен — между preflight resolve и реальным connect атакующий DNS-сервер может вернуть private IP. Защита через **IP-pinning**.

`backend/app/workers/claim_verifier.py` — fetch-policy:

1. **Scheme allowlist:** только `https://`. Остальное (http, file, gopher, ftp, data) → reject.
2. **Pre-flight DNS resolve + IP-pin:** `socket.getaddrinfo(host, 443, AF_UNSPEC)`. Все возвращённые IP проверяются на private/link-local/loopback/CGNAT/IPv6-ULA (включая 169.254.169.254 AWS metadata). Хоть один в denylist → reject.
3. **Pin connected IP:** httpx настраивается с кастомным `httpx.AsyncHTTPTransport(local_address=...)` + кастомный resolver через `httpx._transports.default.AsyncHTTPTransport` с явной передачей **vetted IP** вместо hostname. Альтернативно — `aiohttp.AsyncResolver` с заменой на `MockResolver` который возвращает только vetted IP. SNI остаётся = original hostname (для TLS).
4. **Validate peer per hop:** после connect — `socket.getpeername()`, если peer IP не в vetted list (могло быть из-за race) → abort connection.
5. **`follow_redirects=False`** + manual redirect handling max 3 hops, **каждый редирект** проходит шаги 1-4 заново.
6. **`trust_env=False`** — отключаем env-proxies (HTTP_PROXY/HTTPS_PROXY), чтобы атакующий не мог через переменные окружения перенаправить трафик.
7. **Timeouts:** connect=5s, read=10s, total=15s.
8. **Stream чтение** через `aiter_bytes`, hard stop на 1 MB.
9. **Content-type allowlist:** `text/*`, `application/json`.
10. **Retry budget:** 3 попытки, экспоненциальный backoff.

**Реализация:** обёртка `SafeFetcher.get(url) → text` в новом модуле `backend/app/utils/safe_fetcher.py`. Использует `httpx.AsyncClient(verify=True, trust_env=False)` + custom transport. Documented + unit-tested. `claim_verifier.py:47-53` заменяет `httpx.get` на `SafeFetcher.get`.

**Frontend:**
- `AuthPage.tsx` → одна форма email + checkbox terms + кнопка «Прислать ссылку для входа».
- Новая `VerifyMagicLinkPage.tsx` на `/auth/verify-magic-link`.
- Удаляются файлы: `TelegramLoginButton`, `GoogleLoginButton`, `EmailVerificationBanner`, `VerifyEmailPage`, `RegisterPage` (если есть).
- `App.tsx`: убрать `/auth/register`, `/auth/verify`. Добавить `/auth/verify-magic-link`.
- `AuthContext.tsx`: убрать `login`/`register`/`telegramLogin`/`googleLogin`/`verifyEmail`/`resendVerification`. Оставить `requestMagicLink`, `verifyMagicLink`, `logout`, `me`.

**`/jobs` overflow fix:**
- Playwright open `/jobs`, найти element с `scrollWidth > 1280`, root cause (карточка/grid/sticky-overflow), точечный фикс.

### Что НЕ меняется
- MCP-side регистрация employer/candidate через `mcp_register_service.py` продолжает работать. Расширение claim-flow и token split — в S13.
- `users.id`, `users.email` (unique), `users.created_at` остаются.

### Тесты
- Unit `test_magic_link_atomic_consume_concurrent` — 50 параллельных через `asyncio.gather` → 1 успех, 49 → 410.
- Unit: TTL, one-time, email normalization, generic success response, rate-limit (6-й/21-й → 429), cooldown 60с.
- Unit SSRF (12 кейсов): http scheme, localhost, AWS metadata 169.254.169.254, RFC1918, redirect-to-private, redirect chain, timeout 15s, oversized 5MB, binary content-type, accept public https markdown, **DNS-rebinding attack** (preflight resolve = public, connect-time resolve = private — должен reject через IP-pin), **env-proxy bypass** (export HTTP_PROXY=evil → должно игнориться).
- E2E `test_magic_link_full_flow` — POST magic-link → DB token → POST verify → /me 200.
- Alembic downgrade test: `alembic downgrade -1 && alembic upgrade head` на пустой БД проходит.
- **Не должно остаться** — `rg -l "password_hash|telegram_id|verify_email" backend/app/ ` пусто (кроме миграций).

### Готовность Спринта 12
- Codex review APPROVED.
- Все unit + E2E + alembic downgrade тесты зелёные.
- pg_dump backup сохранён в `/backup/mcphire-pre-s12-*.sql` на Contabo.
- `git push` → CI deploy → миграция применена → `users` пустая.
- Тим зашёл magic-link'ом со своего реального email на проде.
- `claim_verifier` SSRF-safe (не open для proof_url атак).

### Rollback (DB-aware — Codex round 3 HIGH-3)

| Сценарий | Действие |
|---|---|
| Magic-link не работает (smoke fail в течение часа после deploy) | 1) `alembic downgrade -1` на проде. 2) `git revert <merge>` → CI deploy предыдущей версии. 3) Restore users из `pg_dump` если нужно (но у нас 0 реальных юзеров — restore чисто косметика). |
| SSRF hardening что-то сломало в `claim_verifier` (existing proof_urls перестали верифицироваться) | 1) `git revert` только commit claim_verifier. 2) Если проблема в фетч-policy — quick-fix добавить exception list. 3) DB не трогаем. |
| Email-провайдер лёг | Cloudflare Bot Challenge или временно `1/час/email`. DB rollback не нужен. |

---

## Спринт 13 — Moltbook-style UX (главная + claim page + skill.md + token split + heartbeat/home)

> **Что добавлено по Codex round 3 MEDIUM-1:** `/heartbeat.md` + `/api/v1/home` state-diff endpoint. Это паттерны Moltbook из `MOLTBOOK_LEARNINGS.md` (state-diff на главной, heartbeat для агента, next_suggested_action).

### Что увидит юзер на проде

**Для человека (web):**
- Главная `mcphire.com` — Moltbook-style: огромный «MCP-first IT job marketplace», 2 CTA «👤 Я ищу работу» / «🤖 Я агент». Клик — инструкция «Скажи своему ИИ-агенту: `Read https://mcphire.com/skill.md and register me`». Никакой формы регистрации.
- `mcphire.com/auth/register` → 301 на `/`.
- `mcphire.com/skill.md` отдаёт plain markdown для агента.
- `mcphire.com/heartbeat.md` отдаёт инструкции для recurring агент-loop.

**Для агента (MCP):**
- Регистрируется через MCP → получает `proof_token` (public, для proof_url) + `owner_claim_url` (private, разово, для человека).
- Отдаёт `owner_claim_url` человеку → человек открывает → email → magic-link → claim.
- `GET /api/v1/home` — единая ручка для агента: state-diff с прошлого heartbeat + `next_suggested_action` (новая вакансия / unread reply / proof_url failed → fix).

### 🔴 Token split — DB contract (Codex round 2 CRITICAL-1 + round 4 HIGH-3)

**Существующая схема на проде:** `agent_profiles` имеет `session_token UUID UNIQUE NOT NULL` (это и есть текущий «api_key» для агента — Bearer для всех его запросов). Отдельная таблица `claim_tokens` (63 рядов) хранит публичный `claim_token` который агент кладёт в `proof_url`.

**Целевая схема:**

| Поле / таблица | Назначение | Видимость | Энтропия | Хранение |
|---|---|---|---|---|
| `agent_profiles.session_token` (existing, **остаётся**) | Bearer для всех агент-ручек (`/home`, `/heartbeat`, и т.д.) | приватный (Bearer) | UUID v4 (122 бит) — OK | plain UUID |
| `agent_profiles.proof_token` (новая колонка, mirror existing `claim_tokens.claim_token`) | Marker в proof_url, worker substring | публичный | 32 бит OK | plain TEXT |
| `agent_profiles.owner_claim_token_hash` (новая колонка) | Bearer для `/claim/<token>` (one-time) | приватный | 256 бит raw, hashed в БД | `CHAR(64)` (SHA256 hex), `UNIQUE NULL` |

**Унификация терминологии в плане:** везде где было «api_key» — читать как `session_token` (existing field, не переименовываем).

**Alembic миграция S13:**
```python
def upgrade():
    op.add_column('agent_profiles',
        sa.Column('proof_token', sa.Text(), nullable=True))
    op.add_column('agent_profiles',
        sa.Column('owner_claim_token_hash', sa.CHAR(64), nullable=True))
    op.create_index('ix_agent_profiles_owner_claim_token_hash',
        'agent_profiles', ['owner_claim_token_hash'], unique=True)
    # Backfill: копируем claim_tokens.claim_token → agent_profiles.proof_token
    op.execute("""
        UPDATE agent_profiles ap
        SET proof_token = ct.claim_token
        FROM claim_tokens ct
        WHERE ct.agent_profile_id = ap.id
    """)
    # owner_claim_token_hash остаётся NULL для existing profiles
    # (старые агенты не имеют claim-flow — их proof_url уже верифицирован)

def downgrade():
    op.drop_index('ix_agent_profiles_owner_claim_token_hash', 'agent_profiles')
    op.drop_column('agent_profiles', 'owner_claim_token_hash')
    op.drop_column('agent_profiles', 'proof_token')
```

**Решение по `claim_tokens` таблице:** оставляем как есть для backward-compat существующего `claim_verifier` worker'а. После S13 deploy + smoke OK — в Sprint 14 (опц.) дропаем `claim_tokens` table если она больше не используется. До тех пор — двойное хранение `proof_token` (в agent_profiles + в claim_tokens) допустимо.

**Atomic owner claim:**
```sql
UPDATE agent_profiles
SET user_id = $user_id, owner_claim_token_hash = NULL
WHERE owner_claim_token_hash = $hash AND user_id IS NULL
RETURNING id
```
0 строк → 410.

Owner link — переиспользуем existing `agent_profiles.user_id` (никаких новых FK-колонок).

### Что меняется в коде

**Backend:**
- `mcp_register_service.py`: + генерация `owner_claim_token` (256 бит, `secrets.token_urlsafe(32)`), hash в БД, raw в response → `owner_claim_url`. Старое поле `claim_token` rename → `proof_token` (в ответе можно оставить алиас 1 спринт для backward-compat MCP-клиентов).
- `GET /v1/agents/by-claim-token/<owner_token>` — `{agent_name, agent_description, status}`. **Не возвращает api_key / proof_token.**
- `GET /skill.md` — plain markdown, файл `backend/static/skill.md`.
- `GET /heartbeat.md` — plain markdown, инструкция агенту: «Каждые 30 мин делай `GET /api/v1/home`, обрабатывай `next_suggested_action`, **ack курсор через** `POST /api/v1/heartbeat {cursor_as_of}`».
- `GET /api/v1/home` — для агента (Bearer `session_token` — existing field): state-diff с момента `last_home_checked_at`. **Cursor-based** (Codex round 4 MEDIUM-1 fix):
  - Возвращает `{cursor_as_of: <ISO8601>, new_jobs: [...], unread_replies: [...], proof_url_status, next_suggested_action: "..."}`.
  - `cursor_as_of = NOW()` фиксируется **в начале** транзакции, query фильтрует `created_at <= cursor_as_of AND created_at > last_home_checked_at`. Это garantee что между read и ack ничего не потеряется.
  - `last_home_checked_at` НЕ обновляется в `/home` — только в `/heartbeat` после явного ack от агента.
- `POST /api/v1/heartbeat {cursor_as_of}` — атомарный UPDATE:
  ```sql
  UPDATE agent_profiles
  SET last_seen_at = NOW(),
      last_home_checked_at = $cursor_as_of
  WHERE id = $agent_id
    AND ($cursor_as_of >= last_home_checked_at OR last_home_checked_at IS NULL)
  RETURNING id
  ```
  0 строк → 409 (агент шлёт stale cursor — игнорируем, но возвращаем ошибку чтобы он перечитал /home).
- Новая колонка миграция: `ALTER TABLE agent_profiles ADD COLUMN last_home_checked_at TIMESTAMPTZ NULL`.
- `consume_magic_link(purpose='claim_owner')` — atomic UPDATE по `owner_claim_token_hash`, параллельно триггерит `claim_verifier` для `proof_token`.

**Frontend:**
- `Hero.tsx` rewrite под 2-CTA Moltbook layout.
- `App.tsx`: убрать `/auth/register`, добавить `/claim/:token`.
- Новая `ClaimPage.tsx`.

**nginx:** 301 `/auth/register` → `/`.

### Тесты
- `test_public_proof_token_cannot_claim_ownership` — попытка `/claim/<proof_token>` → 404.
- `test_owner_claim_token_one_time` — второй claim → 410.
- `test_heartbeat_updates_last_seen` — POST с валидным cursor → `last_seen_at` + `last_home_checked_at` обновлены.
- `test_heartbeat_stale_cursor_rejected` — POST с cursor старше existing `last_home_checked_at` → 409.
- `test_home_state_diff` — два запроса с интервалом, между ними новая вакансия → второй запрос отдаёт её в `new_jobs`.
- `test_home_no_event_loss_under_race` — между `/home` query и heartbeat ack создаётся новая вакансия → она появляется в **следующем** `/home` (не теряется). Симулируется через async race в pytest.
- E2E `test_moltbook_style_parity_full` — `POST /candidate/register` → `owner_claim_url` → playwright open → email → magic-link → dashboard показывает агента → `GET /home` отдаёт state-diff.
- Manual: Тим в Claude Desktop — «Read mcphire.com/skill.md and register me» → claim → heartbeat → home → success.

### Готовность Спринта 13
- Codex review APPROVED.
- Тим прошёл flow в Claude Desktop без вмешательства.
- 2 знакомых из Ботаники прошли flow без вмешательства Тима.

---

## Что НЕ делаем (явные decisions — Codex round 3 HIGH-1 accepted)

| Moltbook-фича | MCPHire | Обоснование |
|---|---|---|
| Twitter (X) verification как owner trust boundary | **НЕТ.** Используем `proof_url` (HTTPS GET + substring). | Тим решил 23 мая 2026: Twitter не интегрируем. Это компромисс — Moltbook-style, не Moltbook-1:1. |
| Math-challenge anti-bot на POST | **НЕТ.** Только slowapi rate-limit. | Достаточно для текущего масштаба (≤ Ботаника). Если SMM-scale потребует — пост-launch. |
| Spam ratio + engagement velocity scoring | **НЕТ.** | Метрики не работают пока нет реальных агентов на проде. Пост-launch. |

---

## Codex adversarial findings — addressed

### Round 1 (security, 2026-05-23)
| # | Решение |
|---|---|
| HIGH-1 lock-out Telegram users | Не применимо: 0 Telegram юзеров на проде. |
| HIGH-2 non-atomic consume | Atomic SQL + concurrent test в S12. |
| HIGH-3 proof_url SSRF | SSRF hardening в S12 (объединён, не S13). |

### Round 2 (migration safety, 2026-05-23)
| # | Решение |
|---|---|
| CRITICAL-1 public proof token = owner bearer | Token split в S13: `proof_token` (public 32-bit) + `owner_claim_token` (private 256-bit hashed one-time). |
| HIGH-2 owner_user_id schema | Не применимо: используем existing `agent_profiles.user_id`. |
| HIGH-3 Telegram email collision | Не применимо: 0 Telegram юзеров. |
| HIGH-4 `/auth/verify` route collision | Не применимо: legacy email-verification сносится целиком. Новый path `/auth/verify-magic-link`. |

### Round 4 (data-loss + DNS-rebinding + schema contract, 2026-05-23)
| # | Решение |
|---|---|
| CRITICAL-1 TRUNCATE users CASCADE стёр бы agent_profiles+claim_tokens+observed_facts+cv_snapshots | Заменено на **targeted DELETE** по email pattern (только test fixtures). Полный pg_dump БД (не выборочный) перед DELETE. Pre-flight counts. `ON DELETE CASCADE` сработает только на test-agent_profiles, не на seeded awaiting_claim профили. |
| HIGH-2 DNS-rebinding в SSRF | IP-pinning: после `getaddrinfo` подменяем resolver на vetted-IP-only. `socket.getpeername()` после connect для проверки. `trust_env=False`. 2 новых теста: DNS-rebinding + env-proxy bypass. |
| HIGH-3 Token split без alembic + api_key vs session_token | Унифицировано: используем **existing `agent_profiles.session_token`** (не вводим api_key). Явная alembic upgrade/downgrade в S13 для `proof_token` + `owner_claim_token_hash` колонок + backfill из `claim_tokens`. Старая `claim_tokens` таблица остаётся 1 спринт для backward-compat. |
| MEDIUM-1 home/heartbeat race | Cursor-based ack: `/home` возвращает `cursor_as_of` (NOW() в начале txn), `/heartbeat {cursor_as_of}` атомарно обновляет `last_home_checked_at`. Stale cursor → 409. Тест `test_home_no_event_loss_under_race`. |

### Round 3 (overall package, 2026-05-23)
| # | Решение |
|---|---|
| HIGH-1 не 1:1 Moltbook (нет Twitter) | Goal переименован: «Moltbook-style», не «Moltbook 1:1». Явный disclaimer вверху + блок «Что НЕ делаем». |
| HIGH-2 conflicting Sprint 12 spec | `SPRINT_12_SPEC.md` удалён из репо (`git rm`). Этот файл — single source of truth. |
| HIGH-3 rollback не покрывает DB | Добавлен pg_dump backup перед TRUNCATE + alembic `downgrade()` тестируется до push + явный rollback matrix. |
| HIGH-4 SSRF после proof_url остаётся live | SSRF hardening перенесён из S13 в S12 (внутри одного спринта, до deploy). |
| MEDIUM-1 нет heartbeat/home | Добавлены `/heartbeat.md` + `GET /api/v1/home` + `POST /api/v1/heartbeat` в S13. |

---

## Файлы передачи данных

| Файл | Назначение |
|---|---|
| `SPRINT_12_MOLTBOOK_PARITY_PLAN.md` (этот) | Single source of truth, v4 |
| `AUTH_FACTSHEET_2026-05-23.md` | Codex proof-check basis |
| `~/mcphire-mcp/docs/MOLTBOOK_LEARNINGS.md` | Living docs про Moltbook паттерны |
| `~/.claude/projects/-Users-timofeyzinin/memory/logs/mcphire.md` | Hourly log |
| `~/.claude/projects/-Users-timofeyzinin/memory/session_handoff.md` | Snapshot |
| `~/task_data.js` | Карточки 32-37 |
