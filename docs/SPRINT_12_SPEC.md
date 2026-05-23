# Sprint 12 — Закрытая бета для Ботаники

> **Стартует:** 2026-05-23 (draft, нужен approve Тима)
> **Цель:** довести MCPHire до состояния, в котором можно открыть закрытую бету на ~10–20 человек из Ботаники без позорных багов.
> **Не-цель:** публичный SMM-launch. Это Sprint 13/14.

---

## Контекст

После аудита 23 мая 2026:
- `/jobs` SPA ломает scroll (`scrollWidth = 244 111 px` при viewport 1280) — **единственный реальный блокер для Ботаники** (см. NEW-OVERFLOW-001 в `BUG_AUDIT_2026-05-21.md`).
- Текущая `/auth/login` грузит 3 пути регистрации: Telegram-кнопка, Google OAuth, email/password. Тим хочет упростить до **только email** (плюс MCP-only для employers, как уже сделано).
- Регистрация через Moltbook-style flow — без socials, агентам и людям один путь.

Sprint 12 закрывает оба пункта в одном проходе, потому что они трогают одни и те же слои:
- `/jobs` overflow → tailwind classes на V3 JobCard / filter panel.
- Auth refactor → `/auth/login`, `/auth/register`, `AuthContext`, backend `/v1/auth/*`.

---

## Scope

### 1) [P0] `/jobs` scrollWidth fix · ~1 ч

**ID:** NEW-OVERFLOW-001 (escalated from F-016).

**Симптом:** на любом viewport `document.documentElement.scrollWidth ≈ 244k px`. iPhone = бесконечный side-scroll.

**Гипотеза:** один из bento JobCard либо filter-panel не имеет `min-w-0` на flex item → дочерний `<pre>` / `<code>` / длинная строка company name тянет родителя.

**Acceptance:**
- `scrollWidth === clientWidth ± 5` на `/jobs` при viewport 1280×720
- На iPhone 13 (375 viewport) overflow нет
- Скриншоты до/после в PR

**Изменения:**
- `src/components/v3/JobCard.tsx` (предположительно)
- `src/pages/JobsPage.tsx` (filter panel grid)
- + любые контейнеры с `flex` без `min-w-0`

---

### 2) [P1] Auth refactor — magic-link, без password и socials · ~8 ч

**ID:** AUTH-SIMPLIFY-002 (заменяет AUTH-SIMPLIFY-001 после Codex proof-check 2026-05-23).

**Контекст и proof-check.** 23 мая 2026 проверены 7 утверждений о текущем auth-коде через Codex (read-only). Verdict: 4 VERIFIED, 3 PARTIAL, 0 FALSE. Полный лог в `AUTH_FACTSHEET_2026-05-23.md`. Ключевые уточнения:
1. `/api/v1/candidate/register` REST уже принимает `proof_url` (`rest_api_v1.py:153-164` → `svc_register_profile`). Backend почти готов под Moltbook-style.
2. Google **не хранит** `google_id`, только email + `email_verified=True` (`auth_service.py:158-200`). Google-users автоматически подхватятся через magic-link на тот же email.
3. Telegram **хранит** `telegram_id` на User-модели (`user.py:21`). Этим пользователям нужна миграция: ассоциировать email с их `telegram_id`-аккаунтом.

**Текущее состояние** (`src/pages/auth/AuthPage.tsx`):
- `<TelegramLoginButton botName="mcphire_bot">` блок сверху
- `<GoogleLoginButton clientId={…}>` блок сверху
- Разделитель «или email»
- Tabs Login/Register с email+password+confirm

**Целевое состояние** (Moltbook-style без Twitter):
- `/auth/login` → один input `email` + checkbox terms + кнопка **«Войти по ссылке»**
- `/auth/register` → `name` + `email` + checkbox terms + кнопка **«Создать аккаунт»** (тоже magic-link, без password)
- `/auth/verify?token=…` → новая страница, consume one-time token → выдаёт JWT → redirect на `/`
- Удалены: TelegramLoginButton + GoogleLoginButton + password fields + confirm field
- Banner «Работодателям: регистрация через Claude Desktop» **сохраняется**

**Backend изменения:**
- Новая таблица `magic_link_tokens` (отдельная, **не reuse** `claim_tokens` — Codex challenge A):
  ```
  CREATE TABLE magic_link_tokens (
    id UUID PRIMARY KEY,
    token_hash VARCHAR(64) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    purpose VARCHAR(20) NOT NULL,  -- 'login' | 'register' | 'email_change'
    user_id UUID NULL REFERENCES users(id),  -- NULL для register flow
    requested_ip_hash VARCHAR(64),
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,  -- created_at + 15min
    consumed_at TIMESTAMPTZ NULL
  );
  CREATE INDEX ON magic_link_tokens(email, created_at DESC);
  ```
- `POST /v1/auth/magic-link` — генерирует token (random 256-bit), сохраняет хэш, шлёт письмо с `https://mcphire.com/auth/verify?token=<raw>`. **Generic success response** (не leak'ает existence email).
- `POST /v1/auth/verify-magic-link` — обменивает token на JWT pair (access + refresh), помечает `consumed_at`.
- `POST /login` (existing email+password) — **оставляем** для migration period. Frontend UI его не вызывает, но backend route жив 2-3 недели.
- `POST /telegram` и `POST /google` — оставляем работать для **existing tokens**, UI удаляется. Cleanup отдельной задачей в Sprint 14.

**Migration plan:**
- Existing email+password users (если есть) — login auto-працует: вводят email → magic-link приходит на тот же email → войти. Никакой потери данных.
- Existing Google users — то же, потому что `users.email` совпадает.
- Existing Telegram users — баннер в боте: «Привяжи email, чтобы заходить на сайт без TG. Команда `/email user@example.com`». Эта команда вызывает `POST /v1/auth/me/setup-owner-email` (по аналогии с Moltbook). **Отдельная подзадача** Sprint 12.

**Rate limits** (Codex challenge C, intersect с §3 Sprint 12):
- `POST /v1/auth/magic-link` — `5/час/email` + `20/час/IP` + 60-сек cooldown per email.
- `POST /v1/auth/verify-magic-link` — `20/мин/IP` (consume race-condition защита).
- Generic success response: `{success: true, message: "Если такой email зарегистрирован, ссылка отправлена."}` — независимо от того существует ли user.

**Что НЕ делаем в Sprint 12:**
- Twitter/X verification (как в Moltbook) — у нас лучший аналог: уже работающий `proof_url` для MCP-flow, не надо OAuth-зависимости
- GitHub OAuth — Тим вспоминал ошибочно (см. factsheet 2026-05-23), у нас никогда не было GitHub OAuth, был только URL-proof. Не добавляем сейчас.
- Math-challenge anti-bot — отложено до публичного launch, slowapi rate-limit достаточен для closed beta
- Удаление backend OAuth routes (`/telegram`, `/google`) — отдельной cleanup-задачей через 2-3 недели в Sprint 14
- Удаление `users.password_hash` column — оставляем soft-deprecated, не дропаем
- Telegram-email-binding бот команда — отдельной подзадачей в этом спринте если время есть, иначе → Sprint 13

**Acceptance criteria:**
- На `/auth/login` отображается только email input + button «Войти по ссылке»
- На `/auth/register` отображается name + email + checkbox + button «Создать аккаунт»
- `POST /v1/auth/magic-link {email}` создаёт запись в `magic_link_tokens` и шлёт письмо
- `POST /v1/auth/verify-magic-link {token}` возвращает JWT pair, помечает `consumed_at`, и **второй вызов с тем же token** → 410 Gone
- Token expires через 15 минут (test: backdate `created_at`, expect 410)
- Rate-limit: 6-я попытка `magic-link` для одного email в час → 429
- Email enumeration: ответ `/magic-link` одинаков для существующего и несуществующего email
- Existing password user может войти через magic-link (без миграции, тот же email)
- E2E test `test_magic_link_full_flow.py` проходит: register → email → verify → /me → 200 with user data

**Файлы изменений:**

Backend:
- `backend/app/models/magic_link_token.py` (новый) — SQLAlchemy model
- `backend/alembic/versions/<new>_magic_link_tokens.py` (новый) — миграция
- `backend/app/routers/auth.py` — `+2 routes` (`/magic-link`, `/verify-magic-link`)
- `backend/app/services/auth_service.py` — `+2 methods`: `request_magic_link()`, `consume_magic_link()`
- `backend/app/services/email_service.py` (или существующий sender) — `+template` `magic_link_email.html`
- `backend/app/schemas/auth.py` — `+ MagicLinkRequest, MagicLinkVerifyRequest`
- `backend/tests/e2e/test_magic_link_full_flow.py` (новый)

Frontend:
- `src/pages/auth/AuthPage.tsx` — переработать: убрать password + socials, ввести magic-link UX
- `src/pages/auth/VerifyMagicLinkPage.tsx` (новый) — consume `?token=…` → `loginWithToken(jwt)` → redirect
- `src/App.tsx` — добавить route `/auth/verify`
- `src/contexts/AuthContext.tsx` — `+ method` `requestMagicLink(email)`, `verifyMagicLink(token)`
- `src/lib/api.ts` — `+2 wrappers`
- `src/components/auth/TelegramLoginButton.tsx` — пометить `@deprecated` JSDoc, файл оставить
- `src/components/auth/GoogleLoginButton.tsx` — пометить `@deprecated` JSDoc, файл оставить

**Estimate breakdown:**

| подшаг | est |
|---|---|
| Backend: модель + миграция `magic_link_tokens` | 1 ч |
| Backend: `auth_service.request_magic_link()` + `consume_magic_link()` | 1.5 ч |
| Backend: 2 роута + schemas + slowapi limits | 1 ч |
| Backend: email-template | 0.5 ч |
| Backend: E2E test full flow | 1 ч |
| Frontend: переработать AuthPage.tsx | 1.5 ч |
| Frontend: VerifyMagicLinkPage + AuthContext + api | 1 ч |
| Migration баннер для existing users | 0.5 ч |
| **итого** | **~8 ч** |

---

### 3) [P1] Rate-limit на `/api/v1/candidate/register` · ~2 ч

**ID:** NEW-RATE-001.

Хотя для Ботаники не блокер, попадает в этот спринт как **cheap win**: добавляем `slowapi` middleware на register, чтобы не ловить хвосты при первом же шеринге ссылки в чате Ботаники (10 разработчиков случайно нажмут «зарегистрировать» в Claude Desktop = 10 запросов одновременно).

**Acceptance:**
- 10 POST register за 4 сек → ≥1 → `429`
- Per IP: 10/min, sliding window
- Слой: FastAPI middleware (slowapi)

**Изменения:**
- `backend/app/main.py` — Limiter setup
- `backend/app/routers/rest_api_v1.py` — `@limiter.limit("10/minute")` на register
- + analogous на `register_employer_profile` MCP endpoint

---

### 4) [P3 · стрейч] Telegram link preview для `/jobs/:id` og:image · ~1 ч

**ID:** F-006 + BUG-D-003.

Когда участник Ботаники шерит конкретную вакансию в Telegram чат — сейчас приходит карточка без картинки. Стрейч-задача: добавить og:image к SSG job-detail template.

Берётся либо унифицированный fallback (`/og-image.png`, который только что задеплоен), либо генерируется per-job через бэкенд (отложено в Sprint 13/14 dynamic OG).

**Минимум для Sprint 12:** fallback на главный og-image. Job-specific OG — отдельной задачей.

---

## Total estimate

| # | задача | severity | est |
|---|---|---|---|
| 1 | `/jobs` overflow | P0 | 1 ч |
| 2 | Auth magic-link refactor (AUTH-SIMPLIFY-002) | P1 | 8 ч |
| 3 | Rate-limit на register | P1 | 2 ч (~1ч пересечение с §2 rate-limits) |
| 4 | og:image fallback для job-detail | P3 | 1 ч |
| | **итого** | | **~11 ч** |

---

## DoD (Definition of Done)

- [ ] `scrollWidth /jobs` = clientWidth на 1280 и 375 viewport
- [ ] `/auth/login` и `/auth/register` без социальных кнопок
- [ ] 10 быстрых POST register → ≥1 ответов 429
- [ ] `/jobs/:id` html содержит `<meta property="og:image">` (хотя бы fallback)
- [ ] Codex review APPROVED
- [ ] Deploy в прод (`git push main` → GitHub Actions)
- [ ] Smoke verify на проде (тот же smoke что в `BUG_AUDIT_2026-05-21.md`)
- [ ] Скриншот OG-карточки `/jobs/<id>` в Telegram (`@WebpageBot` reset)
- [ ] Запись в `~/.claude/projects/-Users-timofeyzinin/memory/logs/mcphire.md`

---

## Что после Sprint 12

После Sprint 12 — **запускаем закрытую бету на Ботанику** (Тим вручную шерит ссылку в чат, ~10-20 знакомых регистрируются).

Sprint 13 (после feedback от Ботаники):
- NEW-CAT-001 — категоризация вакансий (P1, ~6ч)
- NEW-LIMIT-001 — respect `limit` param (P1, 30мин)
- F-005 per-page OG для остальных публичных страниц (P1, 1ч)
- Backend OAuth routes cleanup (опц)
- Magic-link passwordless регистрация (опц)

Sprint 14 (когда есть >5 ботаников успешно зарегистрировались):
- Dynamic OG для `/jobs/:id`, `/companies/:slug`, `/knowledge/:slug`
- F-008 match-engine scoring fix
- Outreach на 5 реальных employers

---

## Owner / next steps

- **Owner:** Tim → Claude
- **Status:** DRAFT — нужен approve Тима перед стартом
- **PR target:** `main` branch на обоих репо (mcphire-frontend, mcphire-mcp)
- **Review:** Codex (mandatory), self-adversarial fallback если Codex не доступен

---

## Файлы передачи данных (где лежит контекст этого спринта)

| Где | Что |
|---|---|
| `docs/SPRINT_12_SPEC.md` (этот файл) | Полная спецификация |
| `docs/LAUNCH_BACKLOG.md` | Status counter update после закрытия |
| `docs/BUG_AUDIT_2026-05-21.md` | Verification что NEW-OVERFLOW-001 / NEW-RATE-001 закрыты |
| `~/.claude/projects/-Users-timofeyzinin/memory/logs/mcphire.md` | Hourly log в процессе |
| `~/.claude/projects/-Users-timofeyzinin/memory/session_handoff.md` | Snapshot перед каждым context switch |
| `~/task_data.js` | Задачи Sprint 12 как cards |
