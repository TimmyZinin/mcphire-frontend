# MCPHire — план Moltbook 1:1 (Спринты 12 / 13 / 14)

> Цель: довести MCPHire auth/onboarding до 1:1 Moltbook (passwordless magic-link + agent-via-MCP), с одним отличием — вместо Twitter verification используем `proof_url` (HTTPS GET + substring).
>
> **База:** 0 реальных юзеров на проде (27 в таблице — все test/qa/pentest/admin + 6 случайных не-возвращавшихся). Никакой миграции нет. Сносим всё legacy чисто.
>
> Codex adversarial рассматривал план под предположением что юзеры есть — это предположение неверно, поэтому HIGH-1/HIGH-2/HIGH-3/HIGH-4 round 2 (про email collisions, Telegram bot `/email`, legacy `/auth/verify`, owner_user_id миграцию) **не применимы** — нечего мигрировать. CRITICAL-1 (token split proof vs owner) — остаётся релевантным, адресован.
>
> Status: DRAFT v3.

---

## Спринт 12 — снос legacy + magic-link + overflow

### Что увидит юзер на проде
- `/jobs` больше не уезжает горизонтальный скролл.
- `/auth/login` — только email + кнопка «Прислать ссылку для входа».
- Клик → письмо → клик в письмо → залогинен.
- 6 запросов с одного email за час → 429.

### Что меняется в коде

**БД:**
- `TRUNCATE users CASCADE;` на проде — все 27 test/seed.
- Миграция дропает колонки: `users.password_hash`, `users.telegram_id`, `users.email_verified`, `users.email_verification_token`, `users.email_verification_sent_at`, любые related google_id/oauth fields если есть.
- Дропается таблица `email_verification_tokens` (если существует) — больше не нужна.
- Создаётся таблица `magic_link_tokens`: `token_hash` (SHA256, unique), `email`, `purpose` ('login' | 'claim_owner'), `agent_profile_id` NULL для login, `expires_at` (created_at + 15 мин), `consumed_at`, `requested_ip_hash`, `user_agent`.

**Backend:**
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
- Rate-limit (slowapi уже в проекте): 5/час/email + 20/час/IP + 60с cooldown per email на `/magic-link`; 20/мин/IP на `/verify-magic-link`. Generic success response (анти-enumeration).
- **Удаляются полностью:**
  - `POST /v1/auth/register`
  - `POST /v1/auth/login` (password)
  - `POST /v1/auth/telegram`
  - `POST /v1/auth/google`
  - `POST /v1/auth/verify-email`
  - `POST /v1/auth/resend-verification`
  - Email-verification email шаблон
  - `auth_service.authenticate(email, password)`, `register_user(...)`, `telegram_login(...)`, `google_login(...)`
  - JWT issuance после магик-линка остаётся (тот же `jwt_service.issue_pair(user_id)`).

**Frontend:**
- `AuthPage.tsx`: всё содержимое заменяется на одну форму — email + checkbox terms + кнопка «Прислать ссылку для входа». Никаких табов, кнопок Telegram/Google, password-полей.
- Удаляются файлы: `TelegramLoginButton.tsx`, `GoogleLoginButton.tsx`, `EmailVerificationBanner.tsx`, `VerifyEmailPage.tsx` (старый), любая страница `RegisterPage.tsx` если есть.
- `App.tsx`: убираются routes `/auth/register`, `/auth/verify`. Добавляется `/auth/verify-magic-link?token=...`.
- Новая страница `VerifyMagicLinkPage.tsx`.
- `AuthContext.tsx`: убираются `login(email, password)`, `register(...)`, `telegramLogin(...)`, `googleLogin(...)`, `verifyEmail(...)`, `resendVerification(...)`. Остаются: `requestMagicLink(email)`, `verifyMagicLink(token)`, `logout()`, `me()`.

**`/jobs` overflow fix:**
- Открыть `/jobs` через playwright, найти элемент с `scrollWidth > 1280`, root cause (карточка/сетка/sticky-overflow по [[learning-css-sticky-overflow-ancestor]]), точечный фикс.

### Что НЕ меняется
- MCP-side регистрация employer/candidate через `mcp_register_service.py` — продолжает работать как есть. Возвращает `proof_token` + claim instructions. Claim flow расширяется в Спринте 14.
- `claim_verifier.py` worker — продолжает работать (доработка SSRF в Спринте 13).
- `users.id`, `users.email` (unique), `users.created_at` — остаются. Email становится единственным identity-полем.

### Тесты
- Unit `test_magic_link_atomic_consume_concurrent` — 50 параллельных через `asyncio.gather` → 1 успех, 49 → 410.
- Unit: TTL, one-time, email normalization, generic success, rate-limit (6-й/21-й → 429), 60-сек cooldown.
- E2E `test_magic_link_full_flow` — POST → достать token → POST verify → /me 200.
- Smoke: localhost + prod canary с реальным email Тима.
- **Не должно остаться** — никаких импортов `password_hash`, `telegram_id`, `verify_email` в коде. Проверка `rg -l "password_hash|telegram_id|verify_email" backend/app/` → пусто (кроме миграции).

### Готовность
- Codex review APPROVED.
- `git push` → CI deploy → миграция применена → `users` таблица пустая.
- Тим зашёл magic-link'ом со своего email на проде.

---

## Спринт 13 — proof_url SSRF hardening

### Что увидит юзер
Ничего видимого. Под капотом — `claim_verifier.py` становится безопасным перед расширением в Спринте 14.

### Что меняется в коде
`backend/app/workers/claim_verifier.py` — добавить fetch-policy перед `httpx.get`:

1. **Scheme allowlist:** только `https://`. Остальное (http, file, gopher, ftp, data) → reject.
2. **DNS resolve до fetch:** `socket.getaddrinfo(host, None)`. Хоть один резолв в private/link-local/loopback/CGNAT/IPv6-ULA → reject. Включая 169.254.169.254 (AWS metadata).
3. **Redirect handling:** `httpx.AsyncClient(follow_redirects=False)`. На редирект — рекурсивная проверка через ту же policy (max 3 hops). Private IP в цепочке → reject.
4. **Timeouts:** connect=5s, read=10s, total=15s.
5. **Response size cap:** stream через `aiter_bytes`, hard stop на 1 MB.
6. **Content-type allowlist:** только `text/*` и `application/json`.
7. **Worker retry budget:** 3 попытки, экспоненциальный backoff. Без бесконечных циклов.

### Тесты
`backend/tests/unit/test_proof_url_ssrf.py` — 10 кейсов: http scheme, localhost, AWS metadata, RFC1918, redirect-to-private, redirect chain, timeout, oversized, binary content-type, accept public https markdown.

### Готовность
- 10 тестов проходят.
- Codex security review APPROVED.

---

## Спринт 14 — Moltbook UX 1:1 (главная + claim page + skill.md + token split)

### Что увидит юзер на проде
- Главная `mcphire.com` — Moltbook-style: огромный «MCP-first IT job marketplace», под ним 2 кнопки «👤 Я ищу работу» / «🤖 Я агент». Клик — инструкция: «Скажи своему ИИ-агенту: `Read https://mcphire.com/skill.md and register me`». Никакой формы регистрации.
- `mcphire.com/skill.md` отдаёт plain markdown для агента.
- Агент через MCP регистрируется → получает `proof_token` (public marker для proof_url) + `owner_claim_url` (private, secret) → отдаёт человеку только `owner_claim_url`.
- Человек открывает `mcphire.com/claim/<owner_token>` → форма «Твой агент <name> хочет привязаться к тебе. Введи email» → magic-link → клик → агент привязан (`agent_profiles.user_id` заполнен).
- Параллельно `claim_verifier` worker делает SSRF-safe проверку `proof_url` на наличие `proof_token`.

### 🔴 Token split (Codex round 2 CRITICAL-1)

Проблема: текущий `claim_token` (4 байта, public) попадает в gist на GitHub. Если он же = bearer для `/claim/` — любой кто видел gist может перехватить владение.

**Решение:** два отдельных токена.

| Токен | Назначение | Видимость | Энтропия | Хранение |
|---|---|---|---|---|
| `proof_token` (rename текущего `claim_token`) | Marker в proof_url. Worker ищет substring в body. | Публичный | 32 бита OK | plain в `agent_profiles.proof_token` |
| `owner_claim_token` (новый) | Bearer для `/claim/<token>`. Связывает агент с человеком. | Приватный (только в API response) | 256 бит (`secrets.token_urlsafe(32)`) | SHA256 в `agent_profiles.owner_claim_token_hash` |

Atomic claim:
```sql
UPDATE agent_profiles
SET user_id = $user_id, owner_claim_token_hash = NULL
WHERE owner_claim_token_hash = $hash AND user_id IS NULL
RETURNING id
```
0 строк → 410 (already claimed или wrong token).

**Используем existing колонку `agent_profiles.user_id`** как owner link (HIGH-2 round 2 ушёл сам — мы не вводим `owner_user_id`).

### Что меняется в коде

**Backend:**
- `mcp_register_service.py`: добавить генерацию `owner_claim_token` (256 бит), хранить hash, возвращать raw в response → `owner_claim_url`.
- Новые роуты:
  - `GET /v1/agents/by-claim-token/<owner_token>` — возвращает `{agent_name, agent_description, status}`. **Не возвращает api_key, не возвращает proof_token.**
  - `GET /skill.md` — plain markdown, файл в `backend/static/skill.md`.
- `consume_magic_link(purpose='claim_owner')`: атомарный UPDATE по `owner_claim_token_hash`.

**Frontend:**
- `Hero.tsx`: переписать под 2-CTA Moltbook layout.
- `App.tsx`: добавить `/claim/:token`.
- Новая `ClaimPage.tsx`.

### Тесты
- `test_public_proof_token_cannot_claim_ownership` — попытка `/claim/<proof_token>` → 404. Только `owner_claim_token` работает.
- `test_owner_claim_token_one_time` — второй claim с тем же токеном → 410.
- E2E `test_moltbook_parity_full` — `POST /candidate/register` → `owner_claim_url` → playwright open → email → magic-link → dashboard показывает агента.
- Manual: Тим в Claude Desktop говорит «Read mcphire.com/skill.md and register me» → claim → success.

### Готовность
- Codex review APPROVED.
- Тим прошёл flow в Claude Desktop без вмешательства.

---

## Спринт 15 — не нужен

Cleanup в Спринте 15 не требуется — всё legacy уже снесено в Спринте 12. Если в Спринтах 12-14 что-то останется временно (например feature flag) — оно дропается в финале того же спринта.

---

## Rollback план

### Если magic-link не работает на проде после Спринта 12
- `git revert <merge_commit>` → push → CI deploy prev-версии (~1 минута).
- Реальных юзеров нет → терять нечего → можно делать жёсткие rollback'и без церемоний.

### Если magic-link DDoS-ят
- Cloudflare Bot Challenge на `/v1/auth/magic-link`.
- Уменьшить лимит до 1/час/email.

---

## Codex adversarial findings — addressed (после переоценки на 0 реальных юзеров)

### Round 1 (security)
| # | Finding | Решение |
|---|---|---|
| HIGH-1 | Lock-out Telegram-only юзеров | **Не применимо**: 0 Telegram юзеров на проде. Snosим Telegram OAuth полностью. |
| HIGH-2 | Magic-link consume не атомарный | Atomic SQL UPDATE + concurrent test. |
| HIGH-3 | proof_url SSRF | Отдельный Спринт 13 с 10 unit-тестами. |

### Round 2 (migration safety — переоценка)
| # | Finding | Решение |
|---|---|---|
| CRITICAL-1 | Public proof token = owner bearer | Token split в Спринте 14: `proof_token` (public, 32-bit) + `owner_claim_token` (private, 256-bit, hashed, one-time). |
| HIGH-2 | `owner_user_id` нет в схеме | **Не применимо**: переиспользуем existing `agent_profiles.user_id`. Новой колонки нет. |
| HIGH-3 | Telegram email collision | **Не применимо**: 0 Telegram юзеров. Email-collision сценарий не существует. |
| HIGH-4 | `/auth/verify` route collision | **Не применимо**: legacy email-verification полностью удаляется в Спринте 12. Magic-link использует новый path `/auth/verify-magic-link` без коллизий. |

---

## Файлы передачи данных

| Файл | Назначение |
|---|---|
| `SPRINT_12_MOLTBOOK_PARITY_PLAN.md` (этот) | Master plan v3 |
| `AUTH_FACTSHEET_2026-05-23.md` | Codex proof-check basis |
| `~/.claude/projects/-Users-timofeyzinin/memory/logs/mcphire.md` | Hourly log |
| `~/.claude/projects/-Users-timofeyzinin/memory/session_handoff.md` | Snapshot |
| `~/task_data.js` | Карточки 32-35 + новые под Спринты 13/14 |
