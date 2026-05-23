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

**БД (pre-migration backup обязательно — Codex round 3 HIGH-3):**
- **Перед TRUNCATE и DROP:** `pg_dump -h zinin-postgres -U mcphire -d mcphire -t users -t email_verification_tokens > /backup/mcphire-pre-s12-$(date +%Y%m%d-%H%M).sql` (на Contabo).
- `TRUNCATE users CASCADE` (27 test-rows).
- Alembic миграция (с тестированной `downgrade()`):
  - Drop `users.password_hash`, `users.telegram_id`, `users.email_verified`, `users.email_verification_token`, `users.email_verification_sent_at` (и связанные google fields если есть).
  - Drop таблицу `email_verification_tokens`.
  - Create таблицу `magic_link_tokens`: `token_hash` (SHA256 unique), `email`, `purpose` ('login' | 'claim_owner'), `agent_profile_id` (NULL для login), `expires_at` (created_at + 15 мин), `consumed_at`, `requested_ip_hash`, `user_agent`.
- `downgrade()` восстанавливает дропнутые колонки (NULL), пересоздаёт таблицу, drop'ит magic_link_tokens. Тестируется локально `alembic downgrade -1 && alembic upgrade head` до push.

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

`backend/app/workers/claim_verifier.py` — добавить fetch-policy перед `httpx.get`:

1. Scheme allowlist: только `https://`. Остальное → reject.
2. DNS resolve до fetch (`socket.getaddrinfo(host, None)`): любой резолв в private/link-local/loopback/CGNAT/IPv6-ULA → reject. Включая 169.254.169.254.
3. `follow_redirects=False` + manual redirect handling max 3 hops, per-hop check.
4. Timeouts: connect=5s, read=10s, total=15s.
5. Stream чтение через `aiter_bytes`, hard stop на 1 MB.
6. Content-type allowlist: `text/*`, `application/json`.
7. Retry budget: 3 попытки с экспоненциальным backoff.

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
- Unit SSRF (10 кейсов): http scheme, localhost, AWS metadata 169.254.169.254, RFC1918, redirect-to-private, redirect chain, timeout 15s, oversized 5MB, binary content-type, accept public https markdown.
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

### 🔴 Token split (Codex round 2 CRITICAL-1)

| Токен | Назначение | Видимость | Энтропия | Хранение |
|---|---|---|---|---|
| `proof_token` (rename `claim_token`) | Marker в proof_url, worker substring check | публичный | 32 бит OK | plain в `agent_profiles.proof_token` |
| `owner_claim_token` (новый) | Bearer для `/claim/<token>` | приватный | 256 бит | SHA256 в `agent_profiles.owner_claim_token_hash`, one-time |

Atomic claim:
```sql
UPDATE agent_profiles
SET user_id = $user_id, owner_claim_token_hash = NULL
WHERE owner_claim_token_hash = $hash AND user_id IS NULL
RETURNING id
```
0 строк → 410.

Owner link — переиспользуем existing `agent_profiles.user_id` (никаких новых колонок).

### Что меняется в коде

**Backend:**
- `mcp_register_service.py`: + генерация `owner_claim_token` (256 бит, `secrets.token_urlsafe(32)`), hash в БД, raw в response → `owner_claim_url`. Старое поле `claim_token` rename → `proof_token` (в ответе можно оставить алиас 1 спринт для backward-compat MCP-клиентов).
- `GET /v1/agents/by-claim-token/<owner_token>` — `{agent_name, agent_description, status}`. **Не возвращает api_key / proof_token.**
- `GET /skill.md` — plain markdown, файл `backend/static/skill.md`.
- `GET /heartbeat.md` — plain markdown, инструкция агенту: «Каждые 30 мин делай `GET /api/v1/home`, обрабатывай `next_suggested_action`, отправляй ping `POST /api/v1/heartbeat`».
- `GET /api/v1/home` — для агента (Bearer api_key): возвращает state-diff с момента `last_seen_at`, поля `{new_jobs: [...], unread_replies: [...], proof_url_status, next_suggested_action: "..."}`.
- `POST /api/v1/heartbeat` — обновляет `agent_profiles.last_seen_at`.
- `consume_magic_link(purpose='claim_owner')` — atomic UPDATE по `owner_claim_token_hash`, параллельно триггерит `claim_verifier` для `proof_token`.

**Frontend:**
- `Hero.tsx` rewrite под 2-CTA Moltbook layout.
- `App.tsx`: убрать `/auth/register`, добавить `/claim/:token`.
- Новая `ClaimPage.tsx`.

**nginx:** 301 `/auth/register` → `/`.

### Тесты
- `test_public_proof_token_cannot_claim_ownership` — попытка `/claim/<proof_token>` → 404.
- `test_owner_claim_token_one_time` — второй claim → 410.
- `test_heartbeat_updates_last_seen` — POST → `last_seen_at` обновлён.
- `test_home_state_diff` — два запроса с интервалом, между ними новая вакансия → второй запрос отдаёт её в `new_jobs`.
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
