# MCPHire Auth — factsheet 2026-05-23

> Цель: документировать **что реально есть** в коде auth/registration, чтобы предложить
> рефакторинг под Moltbook-style. Один проход pruf-check'а перед коммитом.

## Что есть сейчас (verified в коде)

### Backend `backend/app/routers/auth.py`
```
POST /register           # email + password (RegisterRequest)
POST /login              # email + password (LoginRequest)
POST /telegram           # Telegram OAuth (TelegramAuthRequest) — web seekers
POST /google             # Google OAuth — web seekers
POST /refresh            # JWT refresh
POST /verify-email       # email verification
POST /resend-verification
GET  /me                 # current user
```

**GitHub OAuth — отсутствует.** Ни endpoint, ни client_id, ни кнопки во frontend.

### Backend `backend/app/services/mcp_register_service.py` — MCP-агентская реги
- Создаёт `agent_profile` + `claim_token` (TTL 48h) после M2M survey approval
- **`proof_url`** = `request.answers["q_artifacts_proof_url_primary"]` — обязательное поле
- Генерация claim_token, инструкция агенту:
  ```
  «Вставь строку '{token_str}' в публичный раздел {proof_url} (bio GitHub, …)»
  ```
- Verification: backend делает HTTP GET → ищет токен в теле страницы → если найден → `verified=True`

### Frontend `src/pages/auth/AuthPage.tsx`
- Шапка: `<TelegramLoginButton>` + `<GoogleLoginButton>`
- Разделитель «или email»
- Tabs Login / Register с email + password + confirm
- Banner для employer: «регистрация через Claude Desktop» → ссылка `/employers`

### Frontend `src/contexts/AuthContext.tsx`
- Exposes: `login`, `register`, `loginWithTelegram`, `loginWithGoogle`
- Backend OAuth для тelegram + google уже подключены

### `proof_url` поддерживает любой публичный URL
- Реально используется: `raw.githubusercontent.com/<user>/<repo>/main/README.md`
- В принципе работает с: GitHub bio, gist, LinkedIn (если pub), personal site, любой публичный HTML

---

## Что я ошибочно сказал в первом отчёте

| Утверждал | Реальность |
|---|---|
| «GitHub auth нет нигде» | ✓ верно для **OAuth**, но **есть proof_url в MCP flow** — упустил |
| «Twitter verification = Moltbook ownership» | Moltbook действительно требует tweet. Но MCPHire **уже** имеет аналог через URL-proof, и он лучше — не привязан к одной соцсети |

## Что Тим ошибочно вспомнил

| Сказал | Реальность |
|---|---|
| «У нас через GitHub было подтверждение» | Не GitHub OAuth. Был `proof_url` claim_token flow — GitHub README/bio **один из возможных** URL-носителей, но не единственный |

---

## Предложение по рефакторингу — «Moltbook-style без Twitter»

### Цель
- Убрать Telegram + Google web-кнопки
- Убрать password (passwordless)
- Использовать **уже работающий** `proof_url` механизм как ownership-verification вместо Twitter
- Web-вход (login) — magic-link на email
- Web-регистрация (registration) — два пути:
  - **MCP-агент** (preferred) — как уже есть, через `mcp_register_service`
  - **Web fallback для людей** — email magic-link + опц. proof_url

### Frontend изменения
- `AuthPage.tsx` — удалить `TelegramLoginButton`, `GoogleLoginButton`, password fields, confirm field
- `/auth/login` → email + «Send Login Link» (как Moltbook /login)
- `/auth/register` → email + (опц) name + (опц) proof_url + «Send Setup Link»
- `/auth/verify?token=...` → consume magic-link, redirect на dashboard
- Banner «Ищешь сотрудника? Регистрация через Claude Desktop» — сохраняется

### Backend изменения
- `POST /v1/auth/magic-link` — генерирует one-time token, шлёт email с `/auth/verify?token=…`
- `POST /v1/auth/verify-magic-link` — обменивает token на JWT
- `POST /register` (email+password) — остаётся для **migration period** (2-3 недели), потом удаляется
- `POST /telegram` и `POST /google` — остаются работать для **existing tokens** (не разлогинить юзеров), но **не показываем UI**
- Существующая `proof_url` логика в `mcp_register_service.py` — без изменений, опционально доступна и для web-flow

### Что **не** делаем (отложено)
- Twitter/X verification — нет, у нас есть proof_url
- GitHub OAuth — добавление новой OAuth-зависимости не оправдано, proof_url достаточно
- Math-challenge anti-bot — отложено, используем slowapi rate-limit
- Удаление backend OAuth endpoints — отдельной cleanup-задачей через 2-3 недели

---

## Estimate (вместо текущего Sprint 12 §2)

| Изменение | Est |
|---|---|
| Backend: `POST /v1/auth/magic-link` + `POST /v1/auth/verify-magic-link` + email-template | 2.5ч |
| Backend: token TTL (15 мин) + one-time consume + IP-rate-limit (slowapi: совмещается с §3 Sprint 12) | 1ч |
| Frontend: переработать `AuthPage.tsx` (убрать password + socials, magic-link UX) | 2ч |
| Frontend: новая страница `/auth/verify?token=…` (consume + redirect) | 1ч |
| Migration: баннер для existing password-users «теперь magic-link, ваш email тот же» | 0.5ч |
| E2E test: register → email → verify → me | 1ч |
| **Итого AUTH-SIMPLIFY-002 (replaces 001)** | **~8 ч** |

**Sprint 12 total** становится: overflow 1ч + auth magic-link 8ч + rate-limit (overlap with auth IP-limit) 1ч + og fallback 1ч = **~11 ч.**

---

## Открытые вопросы — нужен pruf-check

1. **Existing seekers с email/password** — есть ли они? Запрос: `SELECT COUNT(*) FROM users WHERE password_hash IS NOT NULL AND telegram_id IS NULL AND google_id IS NULL;`
2. **Telegram/Google пользователи** — счётчик. Migration baner для них тоже нужен?
3. **proof_url для web-flow** — сделать опциональным полем (как в Moltbook claim) или обязательным?
4. **Email delivery** — у нас уже работает (verify-email есть). Какой провайдер? SMTP / SendGrid / другое?
5. **Magic-link rate-limit** — 5 запросов в час с одного email (anti-spam)?

---

## Pruf-check checklist для Codex

- [ ] Verify: GitHub OAuth ОТСУТСТВУЕТ в `backend/app/routers/auth.py`
- [ ] Verify: `proof_url` реально verify-ится в `mcp_register_service.py::verify_proof_url`
- [ ] Verify: текущий `/v1/auth/register` принимает только email + password (нет proof_url)
- [ ] Verify: existing users с password_hash могут продолжать логиниться (миграция non-breaking)
- [ ] Verify: предложение `POST /v1/auth/magic-link` совместимо с существующей JWT-схемой
- [ ] Challenge: можно ли вообще удалять password column, или нужен soft-migrate?
- [ ] Challenge: что если у Тима в Ботанике пользователи без email вообще (только Telegram)?
- [ ] Challenge: rate-limit на /magic-link — 5/час слишком жёстко или слишком слабо?
