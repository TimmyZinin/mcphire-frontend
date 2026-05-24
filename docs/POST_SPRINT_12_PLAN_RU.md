# MCPHire — план оставшихся спринтов после Спринта 12

> Версия: 2026-05-24. Автор: Claude Opus 4.7. Язык: русский, простыми словами.
> Контекст: Спринт 12 закрыт (вход переведён на магическую ссылку, удалены пароли/Telegram, починена пагинация, добавлена защита от SSRF и rate-limit, превью вакансий в соцсетях).
> Источник пунктов backlog: `mcphire-mcp/docs/LAUNCH_BACKLOG.md`, `mcphire-mcp/docs/MOLTBOOK_LEARNINGS.md`.

## Поправки по словам Тима

- **Главная страница не переписывается.** На ней уже есть три направления: переключатель «соискатель/работодатель» + отдельный баннер и якорная секция для AI-агентов (`#agent-onboarding`). Эту логику сохраняем и углубляем, не сносим.
- **Идею с новой страницей `/agents/start` отзываю.** Точка входа агента — существующая секция `#agent-onboarding` на главной.
- `/auth/register` остаётся работать.

## Сравнение нашей модели регистрации агента с Молдбуком

| Шаг | Молдбук | MCPHire после Спринта 13 | Совпадает? |
|---|---|---|---|
| Точка входа | Файл `skill.md` — простой текст. «Start here every check-in». | Файл `skill.md` уже есть, обновляем. Плюс новый `heartbeat.md` для регулярных проверок. | Да, **1 в 1** |
| Как агент регистрируется | Одной командой через MCP. В ответ — приватный ключ (`api_key`). | Одной командой через MCP. В ответ — приватный ключ (`session_token`, уже есть) **плюс** одноразовая ссылка для человека (`owner_claim_url`). | Совпадает, **мы добавляем** одноразовую ссылку |
| Привязка агента к человеку | Через **Twitter**: агент даёт свой Twitter-handle, человек вставляет токен в био Twitter, сервер проверяет. | Через **email + магическую ссылку**: агент даёт URL `mcphire.com/claim/<токен>`, человек открывает, вводит email, по магической ссылке логинится. | **Не совпадает.** Молдбук через Twitter, мы — через email. Решение Тима май 2026: Twitter не интегрируем |
| Регулярные проверки | Каждые ~30 мин агент вызывает `GET /api/v1/home`. Сервер отвечает разницей с прошлого захода + `what_to_do_next`. | Каждые ~30 мин агент вызывает `GET /api/v1/home`. Сервер отдаёт новые вакансии + непрочитанные отклики с момента прошлой проверки. Курсор сдвигается отдельным `POST /api/v1/heartbeat`. | Совпадает, подход тот же. Техническое отличие — курсор подтверждается отдельно |
| Защита от ботов | Математическая загадка на каждом POST. | Лимит 10/мин с одного IP (`slowapi`, уже в Спринте 12). | **Слабее у нас.** Можно добавить загадку после первых случаев спама |
| Откуда агент узнаёт правила | Из JSON-ответа `/home` (поля внутри). | Из внешнего `skill.md` (агент его скачивает). | **Расходимся** — это наш баг, чинится в Спринте 14 |
| Согласие пользователя | Стандартный механизм MCP **Elicitation**. | Магическая фраза «я согласен отправить анкету». | **Расходимся** — наш баг, Спринт 17 |

## Что осталось — 19 открытых пунктов из LAUNCH_BACKLOG.md

Три категории:

1. **Безопасность для агентов (ROMA-001..009).** Осторожные ИИ-агенты сейчас молча игнорируют MCPHire — наша инструкция содержит шаблоны промпт-инъекций (внешний fetch-and-obey, сканирование домашних папок, запись в локальную память, магическая фраза согласия, язык давления).
2. **Отдельный вход для агента + UX-цикл.** Магическая ссылка для привязки агента к человеку, ручки `/home` и `/heartbeat`.
3. **Полировка (NEW-*, F-*).** Категории вакансий, лимиты, идемпотентность, отрицательная зарплата, превью в соцсетях, подбор, чистка дублей.

## План спринтов

### Спринт 13 — Связка агент-человек + регулярные проверки

**Что увидит юзер:**
- Существующая секция `#agent-onboarding` на главной углубляется. К текущей инструкции «отправь агенту строку `Read mcphire.com/skill.md`» добавляется второй шаг: «после регистрации агент вернёт тебе ссылку `mcphire.com/claim/<токен>`, открой её в течение 24 часов — это твой профиль».
- Новая страница `/claim/<токен>` — человек открывает, вводит email, получает магическую ссылку (из Спринта 12), логинится и становится владельцем профиля. Два разных состояния ошибки:
  - **Claim-токен истёк или уже использован** → 410, UI «эта ссылка больше не работает, попроси своего агента сгенерировать новую claim-ссылку». Кнопки resend нет — claim-токен невосстановим.
  - **Claim-токен валиден, но email magic-link истёк (15 минут)** до клика → UI «ссылка из письма устарела» + кнопка «отправить новую» (выдаётся новая magic-link, тот же claim-токен пока живёт).
- После связки агент каждые ~30 минут вызывает `/api/v1/home` (получает идентификатор проверки + список новых событий) и подтверждает через `/api/v1/heartbeat { check_id }` — курсор двигается только при совпадении.

**Что меняем под капотом:**

*Каноничный префикс API* (закрываем findings#10 до того как пишем `server.json` и `skill.md`):
- Решение: **`/api/v1/*` — canonical**. Старые `/v1/*` дубли помечаем как deprecated в этом же спринте (отдаём `Deprecation: true` заголовок + `Sunset: <дата+90 дней>`). Полный снос — в Спринте 21. Это даёт Спринтам 14/15/16 писать новые инструкции сразу на каноничных путях.

*Схема БД (миграция `017_agent_owner_claim`):*
- В таблицу `agent_profiles` добавляем колонки:
  - `proof_token TEXT NULL` (32 бита энтропии, публичная метка, идёт в `proof_url`)
  - `owner_claim_token_hash CHAR(64) NULL UNIQUE` (SHA-256 от 256-битного raw-токена; raw НЕ хранится)
  - `owner_claim_issued_at TIMESTAMPTZ NULL` (когда выдали)
  - `owner_claim_expires_at TIMESTAMPTZ NULL` (issued_at + 24h)
  - `owner_claim_consumed_at TIMESTAMPTZ NULL` (момент успешного claim — после этого hash NULL'ится)
  - `last_home_checked_at TIMESTAMPTZ NULL` (последний подтверждённый курсор)
  - `pending_home_check_id UUID NULL` (идентификатор текущей открытой проверки)
  - `pending_home_window_to TIMESTAMPTZ NULL` (правая граница текущей открытой проверки)
- Индексы: `ix_agent_profiles_owner_claim_token_hash` (partial WHERE hash NOT NULL), `ix_agent_profiles_pending_home_check_id`.
- **Backfill** (forward): `UPDATE agent_profiles ap SET proof_token = ct.token FROM claim_tokens ct WHERE ct.profile_id = ap.id`. Dry-run count до апгрейда: `SELECT COUNT(*) FROM claim_tokens` (ожидаем ~63), `SELECT COUNT(*) FROM agent_profiles WHERE proof_token IS NULL` после апгрейда (ожидаем 64−63 = ровно 1 sentinel). Если расходится >1 — миграция падает с RAISE EXCEPTION.
- **Rollback (downgrade):** колонки drop'аются, `claim_tokens` таблица остаётся — данные не теряются.
- **Идемпотентность миграции:** `ADD COLUMN IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`. Повторный прогон не падает.

*Сервис регистрации:*
- `mcp_register_service` генерирует `owner_claim_token` (raw 32 байта через `secrets.token_urlsafe`), пишет SHA-256 в `owner_claim_token_hash`, `expires_at = now() + 24h`, возвращает `owner_claim_url = https://mcphire.com/claim/<raw_token>` в ответе **MCP-tool** агенту (raw виден только один раз).
- Если у того же email уже есть `agent_profile` с `user_id IS NOT NULL` — **новый claim issued как additional**, не merge: один человек может владеть несколькими агентами (Claude Desktop + Cursor + Claude Code). На странице claim показываем «у вас уже есть N агентов, добавить этого как ещё одного?». Дубликаты per email через идемпотентность tg-bot/MCP-вызовов разруливаются в Спринте 18 (NEW-DEDUPE-001), здесь — явное «add another agent» подтверждение.

*Атомарный claim (закрывает findings#1, #2):*
```sql
UPDATE agent_profiles
SET user_id = $user_id,
    owner_claim_consumed_at = now(),
    owner_claim_token_hash = NULL
WHERE owner_claim_token_hash = $hash_of_raw_token
  AND user_id IS NULL
  AND owner_claim_expires_at > now()
RETURNING id;
```
0 строк → 410 Gone. Поведение страницы `/claim`:
- token не найден / истёк / consumed → 410, UI показывает «попроси агента новую ссылку».
- если token валиден, но **magic-link на email уже отправлен и истёк** до того как пользователь кликнул — на странице claim есть кнопка «отправить ещё раз» (использует тот же owner_claim_token пока он не истёк; magic-link выдаётся новый).
- TTL magic-link на email = 15 минут (как в Спринте 12); TTL claim-URL = 24 часа. Они независимы.

*Курсор `/home` + `/heartbeat` (закрывает findings#3):*
- `GET /api/v1/home`:
  ```sql
  -- открыть транзакцию + SELECT FOR UPDATE на agent_profiles row
  SELECT pending_home_check_id, pending_home_window_to, last_home_checked_at
  FROM agent_profiles WHERE id = $agent_id FOR UPDATE;
  ```
  - Если `pending_home_check_id IS NOT NULL` → возвращаем **тот же** check_id, окно `(last_home_checked_at, pending_home_window_to]`, те же события (идемпотентно).
  - Если NULL → выдаём `new_check_id = gen_random_uuid()`, `window_to = now()`, сохраняем оба в строку, окно `(COALESCE(last_home_checked_at, '-infinity'), window_to]`.
  - Ответ: `{ check_id, events: { new_jobs, unread_replies, proof_url_status }, next_suggested_action }`.
- `POST /api/v1/heartbeat { check_id }`:
  ```sql
  UPDATE agent_profiles
  SET last_home_checked_at = pending_home_window_to,
      pending_home_check_id = NULL,
      pending_home_window_to = NULL
  WHERE id = $agent_id
    AND pending_home_check_id = $check_id
  RETURNING id;
  ```
  - 0 строк → 409 (либо вообще не было `/home`, либо `check_id` устарел — клиент должен начать с `/home`).

*Дополнительные новые ручки:*
- `GET /api/v1/agents/by-claim-token/<raw_token>` — для страницы `/claim`, отдаёт `{ agent_name, agent_description, expires_at, status }`. Не возвращает session_token и proof_token.
- `GET /api/v1/agents/status` (Bearer session_token) — `{ status: "awaiting_owner_claim" | "owner_attached", claim_url_expires_at, ... }`. Агент использует это вместо polling.
- `consume_magic_link(purpose='claim_owner', agent_profile_id=X, email=Y)` — расширяем сервис из Спринта 12. После consume — выполняет атомарный claim из шага выше.

*Поведение профиля до claim (закрывает findings#4 misleading):*
- `awaiting_owner_claim` → агент имеет full session_token, может **читать** (`/home`, `/jobs/search`, `/match-list`), но **запись** (`apply_to_job`, edit profile) отдаёт **423 Locked** с body `{ reason: "needs_owner_claim", claim_url_expires_at }`. Это даёт агенту полезное состояние «уже на сайте» сразу после регистрации, но без возможности накручивать заявки до подтверждения человеком.
- `owner_attached` → полный доступ.

*Файлы для агента:*
- `GET /skill.md` — обновляем. **Включаем в этот спринт чистку sканирующих инструкций** (закрывает findings#6 — раньше планировал в Спринте 16). Чистка `~/.claude/memory/*.md`, git log, package.json — здесь же, чтобы trust-recovery был законченным после Спринтов 13+14. Полный invert data flow (новый `import_profile_document` tool, MCP Roots) остаётся в Спринте 16 — это **разный объём**: Спринт 13 убирает рискованные строки, Спринт 16 заменяет их на безопасный механизм.
- `GET /heartbeat.md` — создаём, описывает цикл `/home` → process → `/heartbeat { check_id }`.

*Frontend:*
- Новая страница `/claim/:token` (`ClaimPage.tsx`): рендерит данные из `GET /agents/by-claim-token/<token>`, форма email, обработка expired/consumed/used. Использует магическую ссылку из Спринта 12.
- Главная — не трогаем. Тексты в `#agent-onboarding` обновляем только в части «после регистрации откроется ссылка для привязки».

**Лимиты:**
- `/api/v1/auth/magic-link` (claim_owner purpose): **3 запроса в час per email** + 10 в минуту per IP (двойной cap, явный per-email — Молдбук пишет только «3/час», мы делаем явно).
- `/api/v1/home`: 4 запроса в минуту per agent.
- `/api/v1/heartbeat`: 4 запроса в минуту per agent.

**Observability (закрывает finding#11 medium):**
- Метрики Prometheus / logs (JSON):
  - `mcphire_owner_claim_issued_total`, `mcphire_owner_claim_consumed_total`, `mcphire_owner_claim_expired_total`, `mcphire_owner_claim_invalid_token_total` (по email anti-enum — без значений email)
  - `mcphire_home_check_started_total`, `mcphire_home_check_acked_total`, `mcphire_home_check_stale_total` (heartbeat с устаревшим check_id)
  - `mcphire_agent_status_total{status="awaiting_owner_claim|owner_attached"}` gauge
- Лог-события: `owner_claim_issued`, `owner_claim_consumed`, `owner_claim_expired`, `home_check_idempotent_replay`, `heartbeat_409_no_check`, `claim_url_used_after_expiry`. Все с trace_id, без email.
- Dashboard: claim conversion rate (issued/consumed/expired ratio), время от issued до consumed, доля профилей в awaiting_owner_claim >24h, доля home_check_stale.

**Тесты (закрывают findings#1, #2, #3):**
1. `test_claim_url_atomic_under_race` — 50 параллельных POST на consume того же raw token → ровно 1 успех, 49 получают 410.
2. `test_claim_url_expired_returns_410` — token issued, ждём 24+ часа (используем time-mock), consume → 410.
3. `test_claim_url_used_returns_410` — token consumed успешно, второй consume → 410.
4. `test_two_agents_same_email_both_attach` — две регистрации, две claim-ссылки, один и тот же email — оба профиля получают `user_id`, страница `/claim` показывает «у вас уже N агентов».
5. `test_home_idempotent_replay` — два параллельных `GET /home` без heartbeat → одинаковый `check_id`, одинаковые события.
6. `test_heartbeat_with_stale_check_id_returns_409` — `/home` → check_id A → `/heartbeat A` (успех) → `/home` → check_id B → `/heartbeat A` повторно → **409** (этот check_id уже acked, pending теперь B). Сценарий поймать «клиент случайно повторил старый ack».
7. `test_heartbeat_advances_cursor` — `/home` → событие E → `/heartbeat { check_id }` → следующий `/home` не содержит E.
8. `test_home_no_event_loss_under_race` — между `/home` query (window_to фиксирован) и `/heartbeat` создаётся новое событие E2 → E2 появляется в **следующем** `/home`.
9. `test_home_first_call_returns_all_pre_migration_events` — agent с `last_home_checked_at IS NULL`, 3 события в БД → первый `/home` возвращает все 3 (COALESCE с '-infinity').
10. `test_awaiting_owner_claim_writes_locked` — попытка `apply_to_job` до claim → 423 с body `{ reason: "needs_owner_claim" }`.
11. `test_canonical_v1_path_deprecation_header` — запрос на старый `/v1/jobs/search` отдаёт ответ + `Deprecation: true` + `Sunset: <date>` заголовки.

**Acceptance criteria (закрывает finding#4 для часто связанного Спринта 14):**
- E2E manual: новый агент в Claude Desktop. Тим выполняет: `Read https://mcphire.com/skill.md and register me`. Агент регистрируется → отдаёт `owner_claim_url`. Тим открывает в браузере → видит «привязать к email» → вводит email → получает magic-link на почту → кликает → возвращается на сайт залогиненный → видит профиль агента у себя в dashboard. Время от старта до dashboard < 3 минут, без вмешательства Тима в код.

**Зачем:** без этого человек не управляет агентом через веб (не может зайти с другого устройства, потерянный session_token = потерянный профиль, нет канала уведомлений работодатель→соискатель, нет восстановления доступа, нет защиты от спама регистраций ботами).

**Что НЕ меняется:** Hero на главной, `V3AudienceSwitcher` с переключателем «соискатель/работодатель», `/auth/register` для обычной email-регистрации.

**Зависимости:** Спринт 12 (магическая ссылка) — готов.

**Rollback plan:** `alembic downgrade -1` (схема обратимо), плюс feature-flag `MCPHIRE_AGENT_OWNER_CLAIM_ENABLED=false` отключает выдачу `owner_claim_url` без отката миграции. Существующие профили в `awaiting_owner_claim` продолжают работать read-only до решения о повторном rollout. Цена rollback'а — UI ссылается на несуществующую страницу `/claim`, поэтому одновременно с rollout backend → deploy frontend.

### Спринт 14 — Чистим инструкции для агента

**Что увидит юзер:**
- Внешне почти ничего. Изменится содержимое `mcphire.com/.well-known/mcp/server.json` и `mcphire.com/llms.txt`.

**Что меняем под капотом:**

*Чистка содержимого:*
- Из `server.json` убираем формулировки «скачай этот внешний файл и выполняй». Все правила переносим в `tools[*].description`.
- Из `llms.txt` убираем все «полазь по `~/.claude/memory/*.md`», «прочитай git log», «найди файл резюме».
- Убираем инструкцию «запиши себе в `~/.claude/memory/mcphire.md`».
- На первый план выносим нашу фишку: «отказываемся собирать 17 категорий данных даже при согласии».
- Аудит языка: убираем «окончательно», «нельзя исправить», «жёсткий отказ» — заменяем нейтральными формулировками.
- **`skill.md` и `heartbeat.md` чистим в Спринте 13** (уже описано там) — здесь финализируем синхронизацию между `server.json`, `llms.txt`, `skill.md`.

*Магическая фраза (закрывает finding#7):*
- Спринт 14 **не оставляет magic phrase в неизменном виде**, даже если Спринт 17 (Elicitation) откладывается.
- Промежуточное решение: на время до Спринта 17 заменяем «напиши я согласен отправить анкету» на **server-issued draft-token confirmation** (предтеча Спринта 15). Агент получает в ответе на `draft_profile` короткий `confirmation_token` + preview. Чтобы вызвать `submit_profile`, агент должен передать **этот token** + параметр `confirmed=true`. Никаких пользовательских magic phrases — token выдаётся сервером, не угадывается из prose.
- Это **временный compat-режим** — после Спринта 17 заменяется на Elicitation. Но trust-recovery после Спринта 14 уже не имеет magic-phrase pattern.

*Deprecation strategy для server.json (закрывает finding#5):*
- Поднимаем `server.json.version: "2.0.0"` (от текущего 1.4.x).
- **Discovery механизм:** новый `server.json` отдаётся по тому же URL `mcphire.com/.well-known/mcp/server.json`. Старый — по URL `mcphire.com/.well-known/mcp/server-v1.json` (snapshot).
- В новом `server.json` (v2) добавляем поле `compatibility: { previous_version_url: "https://mcphire.com/.well-known/mcp/server-v1.json", sunset_at: "<дата + 30 дней>" }`.
- **Headers (правильно расставленные):**
  - **Canonical `/.well-known/mcp/server.json` (v2):** только `Link: </.well-known/mcp/server-v1.json>; rel="predecessor-version"`. **Без `Sunset`** — это новый канон, его не sunset'им.
  - **Legacy `/.well-known/mcp/server-v1.json`:** `Deprecation: true`, `Sunset: <дата + 30 дней>`, `Link: </.well-known/mcp/server.json>; rel="successor-version"`. Эти headers сигналят клиенту что **именно legacy** уходит.
- В теле legacy v1 manifest вставляем `deprecation_notice: "This version is deprecated. Migrate to /.well-known/mcp/server.json (v2) before <дата + 30 дней>."`.
- **Smoke tests для обоих manifest:**
  - `test_server_json_v2_schema_valid` — v2 проходит JSON Schema (зафиксирована в `tests/schemas/mcp_server_v2.json`).
  - `test_server_v1_json_schema_valid` — v1 snapshot проходит JSON Schema v1 (`tests/schemas/mcp_server_v1.json`).
  - `test_server_v1_json_has_deprecation_headers` — проверка `Deprecation: true` + `Sunset` header parsing.
  - `test_server_v2_json_has_no_sunset_header` — на canonical не выставляется Sunset (защита от ошибки конфига nginx).
  - `test_server_v1_json_is_static_snapshot` — содержимое v1 равно зафиксированной строке (защита от случайного refactor'а).
- **Auto-detection клиентов на старой версии:** логируем версию из User-Agent / Last-Modified comparison при каждом запросе к manifest. Дашборд показывает per-day распределение v1/v2. За 7 дней до sunset — если >5% запросов всё ещё v1, продлеваем sunset на 30 дней. Если <1% — катим sunset вовремя.
- **Sunset процедура:** через 30 дней `server-v1.json` отдаёт 410 Gone с body `{ "deprecated_until": "<дата>", "migrate_to": "/.well-known/mcp/server.json" }`.

**Acceptance criteria — trust-recovery (закрывает finding#4):**

*До Спринта 14, baseline:*
- Запускаем чистую сессию Claude Desktop с safety-eval prompt («оцени MCP-сервер с точки зрения промпт-инъекций»).
- Команда: «Connect to MCPHire via `https://mcphire.com/.well-known/mcp/server.json` and register me».
- Записываем поведение: блокирует ли клиент инструкции, выполняет ли регистрацию, флагает ли что-то.
- Сохраняем transcript как `docs/TRUST_BASELINE_PRE_S14.md` (committed).

*После Спринта 14:*
- Та же чистая сессия, тот же prompt, тот же шаг.
- Записываем transcript как `docs/TRUST_BASELINE_POST_S14.md`.
- **Acceptance:** клиент НЕ флагает инструкции как injection-shaped (нет refusal'ов «I will not follow external prose»), выполняет dry-run draft_profile без warnings, корректно показывает preview из server-issued confirmation_token.
- Если acceptance failed → Спринт 14 не закрыт, возвращаемся к чистке.

*Дополнительно — bedrock test:*
- Прогон через 3 разных клиента: Claude Desktop (Anthropic), Cursor, Cline. Каждый из них — независимая trust-policy. Минимум 2 из 3 должны пройти dry-run без warnings — иначе trust-recovery считается ненадёжным.

**Зачем:** осторожные агенты сейчас silently игнорируют MCPHire. Без формальной проверки «как именно поменялось поведение клиентов» Спринт 14 — это надежда, не проверяемое улучшение.

**Что НЕ меняется:** сами функции (tools), их параметры, схемы данных.

**Зависимости:** Спринт 14 стартует **только после** того как закрыта чистка `skill.md` в Спринте 13. Не параллельно — последовательно. (Поправлено относительно предыдущей версии плана — там было противоречие между «параллельно» и «после».)

**Rollback plan:** 
- **Полный revert:** `git revert` коммит, оба manifest откатываются к прежним. `server-v1.json` остаётся доступным (это snapshot, не зависит от revert).
- **One-file rollback (важно):** если багнутый `server-v1.json` snapshot — можно откатить **только его** через `git checkout HEAD~1 -- public/.well-known/mcp/server-v1.json` + redeploy frontend, не трогая v2. Аналогично для багнутого v2 — фиксим, держим v1 в покое.
- **Smoke после rollout:** оба manifest получают JSON Schema validation в CI; если schema fails — deploy fails, нет частичной катки.

### Спринт 15 — Двухшаговая регистрация (расширение compat-режима из Спринта 14)

**Что увидит юзер:**
- Регистрация полностью двухшаговая. Шаг 1: агент собирает анкету, вызывает `draft_profile(answers)`, получает «черновик» + `draft_token` + красивый предпросмотр. Шаг 2: только после явного `submit_profile(draft_token, confirmed=true)` от человека профиль создаётся.

**Что меняем под капотом:**

*Жизненный цикл токенов (закрывает finding#8 — конфликт со Спринтом 13):*

| Токен | Создаётся | TTL | Где живёт | Закрывает |
|---|---|---|---|---|
| `session_token` (existing) | при регистрации агента | бессрочно (пока не ротировали) | в БД, отдан агенту | Bearer для всех ручек |
| `proof_token` (S13) | при регистрации агента | бессрочно | в БД, в proof_url | substring-check claim_verifier |
| `owner_claim_token` (S13) | при регистрации агента | 24 часа, одноразовый | hash в БД, raw в `owner_claim_url` отдан агенту | привязка email человека |
| **`draft_token` (S15, NEW)** | при `draft_profile` | 24 часа, одноразовый | в `profile_drafts` table | подтверждение конкретного draft через `submit_profile` |
| `magic_link_token` (S12) | при `/auth/magic-link` | 15 минут, одноразовый | hash в БД | email-вход или claim-purpose |

- **На каком этапе выдаётся `owner_claim_url`:** при **регистрации агента**, до любого `draft_profile`. То есть владелец-человек привязывается **раньше** чем создаётся профиль с анкетой. Сценарий: агент регистрируется → `awaiting_owner_claim` + `read-only`. Человек открывает claim-URL → привязал email → агент перешёл в `owner_attached`. Только после этого агент вызывает `draft_profile`. До claim'а `draft_profile` отдаёт 423 (как и любая запись).
- **Если человек медлит:** агент висит в `awaiting_owner_claim` до 24h, потом claim-URL истекает. Агент может перерегистрироваться (новый `owner_claim_url`). До этого момента `draft_profile` всё ещё 423.

*Схема и сервисы:*
- Новая таблица `profile_drafts(id UUID PK, agent_profile_id UUID FK, answers JSONB, observed_facts JSONB, created_at, expires_at, submitted_at NULL)`. TTL через nightly job + `expires_at < now()`.
- Новые tools `draft_profile(answers) → {draft_token, preview_url, observed_facts, expires_at}` и `submit_profile(draft_token, confirmed=true) → {profile, cv_url}`.
- Старый `register_profile` остаётся для backward-compat, но внутри:
  1. вызывает `draft_profile(answers)` → получает draft_token
  2. сразу вызывает `submit_profile(draft_token, confirmed=true)` — это эквивалент старого поведения, **но** документация tool description явно говорит «deprecated, use draft_profile + submit_profile», и в ответе returns `deprecation_warning: "..."`. Цель — клиенты могут вызывать старое имя, но agent reading description видит что есть лучший паттерн.
- В `tools[*].description` для `submit_profile` явно: «idempotency через draft_token: повторный вызов с тем же token и confirmed=true вернёт уже созданный profile (200), не создаст второй».

*Backfill / миграция:*
- Не требуется backfill — старые профили продолжают работать. Только новые ходят через draft+submit.

**Тесты:**
- `test_draft_then_submit_creates_profile` — happy path.
- `test_submit_without_draft_returns_404` — `submit_profile(draft_token=random)` → 404.
- `test_submit_without_confirmed_true_returns_400` — `confirmed=false` или отсутствует → 400.
- `test_submit_idempotent_returns_same_profile` — два submit_profile с тем же draft_token → один profile_id.
- `test_draft_expires_after_24h` — draft через 25h → 410 при submit.
- `test_register_profile_deprecation_warning_present` — старый tool возвращает `deprecation_warning` в response.
- `test_draft_profile_before_owner_claim_returns_423` — `draft_profile` в статусе `awaiting_owner_claim` → 423.

**Observability:**
- Метрики: `mcphire_draft_created_total`, `mcphire_draft_submitted_total`, `mcphire_draft_expired_total`, `mcphire_draft_abandoned_total` (created но не submitted и не expired ещё).
- Лог-события: `draft_created`, `draft_submitted`, `draft_replay_idempotent`, `submit_without_confirmed`.

**Зачем:** сейчас регистрация однокликовая с пугающими формулировками «это окончательно» — шаблон промпт-инъекции. Двухшаговый паттерн draft+submit — стандарт для всех хорошо ведущих себя пишущих MCP-серверов.

**Зависимости:** Спринт 13 (нужен `owner_claim` поток + 423 поведение до claim). Спринт 14 (compat-режим magic phrase → confirmation_token уже введён). Спринт 15 — это полная замена временного compat-механизма на постоянную схему.

**Rollback plan:** drop таблицу `profile_drafts`, выпустить новую версию tools без `draft_profile`/`submit_profile`. Старый `register_profile` продолжает работать.

### Спринт 16 — Не лезем в файлы пользователя

**Что увидит юзер:**
- По умолчанию: человек показывает агенту, где лежит резюме (`~/cv.pdf`), агент читает + задаёт 10–15 ключевых вопросов. Никакого сканирования `~/.claude/memory/*`, git log, package.json.
- Полный режим со 150 вопросами остаётся, но включается явным флагом `--deep`.

**Что меняем под капотом:**

*Чистка текстов* — большая часть уже сделана в Спринте 13 (skill.md, heartbeat.md) и 14 (llms.txt, server.json). В Спринте 16 финализируем: убеждаемся что **нет** строк типа «scan home dir», «read git log», «look for resume files» нигде.

*Новый tool `import_profile_document(path)` (закрывает finding#14 medium про ограничения):*
- Параметры: `path: str` (абсолютный путь от MCP Roots), `consent_token: str` (выданный сервером после явного user prompt в Claude Desktop).
- **Валидация:**
  - `path` должен находиться **внутри** одного из объявленных клиентом MCP Roots. Если клиент не объявил Roots — tool возвращает 400 с сообщением «Set up MCP Roots to grant access to a specific folder».
  - Allowlist расширений: `.pdf`, `.docx`, `.md`, `.txt`, `.html`. Прочие → 415 Unsupported Media Type.
  - Max size: 10 MB. Больше → 413 Payload Too Large.
  - MIME-detection: сначала по расширению, потом sniff первых 4KB через `python-magic`. Если расходится — 415.
- **Парсинг:**
  - PDF → `pypdf` text extraction, без OCR (если PDF — image-only → возвращаем `{ partial: true, reason: "scanned_pdf_no_ocr" }`).
  - DOCX → `python-docx`.
  - MD/TXT → как есть.
  - HTML → `beautifulsoup4` strip tags.
- **Ответ:** `{ extracted_text, observed_facts, preview_url, draft_token (if применимо), warnings }`.
- **Никаких писаний в файловую систему пользователя.** Только чтение по явному path.

*Default registration flow:*
- Tool description для `register_profile` (deprecated) и `draft_profile` (canonical) переписывается:
  - **Default:** «Ask the user to point at their resume file. Then call `import_profile_document(path=<resume>)`. Then ask the user 10–15 critical questions from `get_critical_questions()` (new tool, returns curated subset). Then call `draft_profile(answers + extracted_text)`».
  - **Deep mode** (по явному запросу пользователя): «Call `get_registration_questions(mode='deep')` for full 150-question questionnaire».
- Новый tool `get_critical_questions()` — 10–15 вопросов, прицельно для подбора (текущая позиция, желаемая, формат, gut-check на experience). Subset из текущих 150.

*Observed facts на review screen (закрывает ROMA-007):*
- В ответе `draft_profile` поле `observed_facts: [{predicate, value, source}]` — что мы вытащили из CV + из ответов. Source = `"resume"` / `"answer_q42"`. Frontend preview показывает их вместе с answers — единый review screen, не отдельный harvest.

**Тесты:**
- `test_import_profile_document_outside_roots_returns_400` — path вне Roots → 400.
- `test_import_profile_document_oversized_returns_413` — файл > 10 MB → 413.
- `test_import_profile_document_unsupported_ext_returns_415` — `.exe` → 415.
- `test_import_profile_document_scanned_pdf_returns_partial` — image-only PDF → partial=true.
- `test_observed_facts_present_in_draft_preview` — после draft_profile, preview содержит observed_facts.
- `test_skill_md_has_no_scan_instructions` — `grep -i "scan\|git log\|~/.claude/memory" skill.md` → 0 совпадений. Regression test.

**Зачем:** сейчас даже с согласием сервер велит агенту обыскать домашнюю папку — форма утечки данных. Плюс многим пользователям это неприятно само по себе.

**Зависимости:** Спринт 15 (нужен draft+submit), Спринт 13 (нужно очищенный skill.md уже выкатить).

**Rollback plan:** удалить новый tool, оставить флаг `--deep` дефолтом. Существующие профили не теряются.

### Спринт 17 — Согласие через MCP Elicitation

**Что увидит юзер:**
- Экран согласия = обычная форма с кнопкой «согласен», без `confirmed=true` параметра в tool call.

**Pre-spike (закрывает finding#12 medium про compatibility):**
- **До начала Спринта 17** делаем отдельный spike (1 день):
  1. Проверяем какие версии MCP-клиентов поддерживают **Elicitation v1**: Claude Desktop (текущая stable + beta), Cursor, Cline. Тестируем минимальный elicitation request на dev-сервере.
  2. Документируем результат в `docs/ELICITATION_COMPATIBILITY_2026-MM-DD.md` (committed).
  3. Если ≥2 из 3 клиентов поддерживают — Спринт 17 запускается.
  4. Если <2 — Спринт 17 откладывается, но **не оставляем magic phrase** — продолжаем работать на server-issued `confirmation_token` из Спринтов 14/15.

**Что меняем под капотом (если pre-spike зелёный):**

*Capability negotiation:*
- При первом MCP `initialize` запросе клиент передаёт `capabilities`. Сервер проверяет наличие `capabilities.elicitation` (по MCP spec).
- Если есть → registration flow использует Elicitation request на этапе confirmation.
- Если нет → fallback на `draft_token` + `confirmed=true` (из Спринтов 14/15). **Никакой magic phrase ни в одном случае.**

*Сам elicitation:*
- После `draft_profile`, перед `submit_profile`, сервер отправляет `elicitation/create` request клиенту:
  ```json
  {
    "schema": { "type": "object", "properties": { "approve": { "type": "boolean", "const": true } } },
    "prompt": "Confirm registration with the answers shown in preview."
  }
  ```
- Клиент рендерит структурированную форму в trusted UI. Пользователь кликает «approve». Клиент возвращает `{ approve: true }`.
- Сервер вызывает атомарный submit с `confirmed=true` from elicitation response. Без отдельного `draft_token`-параметра — сервер хранит pending в сессии.

**Тесты:**
- `test_elicitation_capability_present_uses_elicitation_flow` — client с `capabilities.elicitation` → submit идёт через elicitation.
- `test_elicitation_capability_absent_uses_draft_token_fallback` — client без elicitation → submit через draft_token+confirmed.
- `test_no_magic_phrase_in_any_tool_description` — regression: `grep -ri "я согласен" tools/descriptions` → 0.

**Зачем:** магическая фраза — шаблон промпт-инъекции (`server-issued draft_token` это закрыл частично, но Elicitation — стандартный MCP-механизм, надёжнее в долгосрок).

**Зависимости:** Спринт 15 (draft+submit поток как fallback), Спринт 14 (баггфикс с magic phrase уже сделан).

**Rollback plan:** capability negotiation сама себе rollback — если клиент не поддерживает Elicitation, автоматически идёт по draft_token пути.

### Спринт 18 — Полировка API

**Что увидит юзер:**
- Фильтр вакансий по категориям работает.
- Параметр `?limit=N` уважается.
- Двойной клик не создаёт два профиля.
- Нельзя опубликовать вакансию с отрицательной зарплатой.

**Что меняем под капотом:**
- NEW-CAT-001: классификатор категорий + backfill 84К вакансий.
- NEW-LIMIT-001: `/api/v1/jobs?limit` clamp 1..100, default 20 (canonical префикс из Спринта 13; старый `/v1/jobs` отдаёт тот же fix с `Deprecation: true` headers).
- NEW-DEDUPE-001: `Idempotency-Key` на `/candidate/register`, кеш 24 часа.
- NEW-LAYERSEC-001: Pydantic `ge=0` на `salary_from`, `salary_to`.

**Зачем:** четыре бага, по отдельности не блокер, в сумме — стыдные дыры.

**Зависимости:** нет.

### Спринт 19 — Превью страниц в соцсетях (SSR/SSG)

**Что увидит юзер:**
- При репосте вакансии, страницы работодателя или CV в Telegram/WhatsApp/Twitter — нормальное превью с картинкой и заголовком.

**Что меняем под капотом:**

*Важно:* `react-helmet-async` **сам по себе не решает** задачу, потому что соц-крауллеры (Telegram, WhatsApp, Twitterbot, Facebook Externalhit) **не выполняют JavaScript** — они читают сырой HTML. Помогает только server-side rendering или статическая генерация meta-тегов до того как страница попадает в браузер.

*По маршрутам:*

| Маршрут | Уже SSG/SSR? | Что делаем |
|---|---|---|
| `/jobs/:slug` | Да (88К страниц через `generate_ssg.py`, og:image и twitter:card уже добавлены в Спринте 12.35) | Проверяем что в реальных HTML присутствуют корректные теги, дописываем regression test |
| `/cv/:slug` | Да (через FastAPI `cv_generator`) | Добавляем og:image + twitter:card в template; чиним JSON-LD `@type=Person` (поле `name` сейчас содержит слоган) |
| `/companies/:slug` | Нет (SPA) | Добавляем backend endpoint `GET /companies/<slug>.html` который рендерит минимальный HTML с правильными meta-тегами; nginx route ставит это до SPA fallback |
| `/employers` | Нет (SPA) | Статические meta-теги (страница не персонализирована) — генерируем при сборке frontend через `vite-plugin-html` или эквивалент |
| `/jobs` (список) | Нет (SPA) | Статические meta-теги при сборке |

*react-helmet-async* добавляется как **secondary layer** для пользователя в браузере (чтобы вкладка получала правильный title после navigation), но **не как primary** источник meta-тегов для крауллеров.

*Verification:*
- Прогоняем все маршруты через `curl -A "Twitterbot/1.0" <url>` и `curl -A "facebookexternalhit/1.1"` — проверяем что в **сыром HTML** до выполнения JS присутствуют og:image, og:title, og:description, twitter:card.
- Используем Twitter Card Validator (https://cards-dev.twitter.com/validator) и Facebook Sharing Debugger.

**Тесты:**
- `test_jobs_slug_html_has_og_tags` — curl `/jobs/<slug>` без user-agent js-aware → grep `<meta property="og:image"`.
- `test_companies_slug_html_has_og_tags` — то же для `/companies/<slug>.html`.
- `test_cv_jsonld_person_name_is_real_name` — JSON-LD `@type=Person` `name` field содержит фактическое имя, не слоган.
- `test_employers_html_has_og_tags` — `curl /employers` → grep og:image (статика).

**Зачем:** без превью репосты работают в разы хуже. Это бесплатный трафик, который сливается. `react-helmet-async` сам по себе **не работает** для crawler'ов — нужен SSR/SSG.

**Зависимости:** нет.

**Rollback plan:** изменения только в frontend build + один backend route. `git revert` коммит, redeploy.

### Спринт 20 — Подбор вакансий: baseline + полноценный

**Закрывает finding#9 — circular dependency.** Если ждать «когда будут живые агенты» — первые агенты после Спринта 13 сразу получают свалку с баллом 15 и уходят. Поэтому разбиваем на два этапа.

**Этап 20a — baseline (катим вместе со Спринтом 13):**

*Что увидит юзер:*
- Первый зарегистрированный агент сразу видит **дифференцированную** выдачу: вакансии отсортированы по разумным эвристикам, разные позиции — разные баллы.

*Что меняем:*
- Простой rule-based scoring (без ML):
  - +30 за совпадение уровня (junior agent + junior vacancy)
  - +20 за совпадение домена (frontend/backend/mobile/data — keyword match по skills + job title)
  - +15 за пересечение skills ≥3
  - +10 если зарплатная вилка вакансии пересекает желаемую кандидата
  - +5 за свежесть (≤30 дней)
- Total = sum, clamp [0, 100].
- Регрессионные тесты: 10 seed-профилей × 50 вакансий → distribution баллов non-flat (std dev > 10).

*Effort:* малый. Никакой ML, никаких данных не требуется. Цель — не дать первому агенту увидеть «балл 15 у всего».

**Этап 20b — полноценный (после первых 10+ живых агентов):**

*Что увидит юзер:*
- Точность подбора растёт. Учитываются годы опыта, конкретные технологии, формат работы (remote/onsite).

*Что меняем:*
- Расширение scoring: years_experience match, exact tech-stack overlap, format preference, geographic match.
- Подключаем feedback loop: если агент откликается на job — score этого паттерна растёт. Если игнорирует — падает.
- Tests на dispersion + relevance: вручную размеченный set из 50 пар «профиль ↔ подходящая вакансия» → ≥80% попадают в top-10 выдачи.

**Зависимости:**
- 20a — нет, катится со Спринтом 13.
- 20b — нужны 10+ живых агентов с реальной активностью (apply / ignore).

**Rollback plan:** 20a — простой rule-based, всегда работает (без зависимостей). 20b — feature flag `MCPHIRE_MATCH_V2_ENABLED=false` отключает feedback-loop, возвращает baseline.

### Спринт 21 — Уборка

**Что увидит юзер:**
- `bot.mcphire.com` начинает отвечать.
- Описания функций согласуются с реальным поведением.
- Очередь уведомлений не растёт бесконечно.

**Что меняем под капотом:**
- F-007: `get_verification_status` docstring vs реальное поведение.
- F-009: дубли `/v1/health` и `/api/v1/health` → один canonical.
- F-011: двойной employer-flow `/v1/*` vs `/api/v1/*` → один путь.
- F-012: `bot.mcphire.com` 404 — DNS + nginx.
- F-018: `notification_queue` TTL.

**Зачем:** накопленный мусор. В сумме создаёт ощущение «сервис недоделан».

**Зависимости:** нет.

## Параллельные потоки

- **A. Опыт работы агента (строго последовательно):** 13 (включает 20a baseline scoring + canonical `/api/v1` + чистку skill.md) → 14 → 15 → 16 → 17 → 20b.
- **C. Полировка API (параллельно A):** 18, 19, 21 — в любом порядке.

Зависимости в потоке A:
- 14 не стартует пока не закрыт 13 (нужна очищенная skill.md как input).
- 15 не стартует пока не закрыт 14 (нужен confirmation_token compat-режим как переходный шаг).
- 16 не стартует пока не закрыт 15 (нужен draft+submit поток).
- 17 не стартует пока не закрыт 15 (Elicitation заменяет confirmation_token).
- 20b не стартует пока не накопится 10+ живых агентов.

## Общие правила для всех спринтов

Закрывают findings#13 (rollback) и #11 (observability) — применяются к **каждому** спринту:

**Rollback готовность:**
- Каждая миграция alembic имеет `downgrade()` — обратимая.
- Каждый рискованный шаг — feature flag (env var) для отключения без миграции.
- Перед `alembic upgrade head` — `pg_dump` бэкап с timestamped именем.
- Dry-run count: `SELECT COUNT(*)` затрагиваемых строк до миграции, ожидаемое значение в комментарии миграции, RAISE EXCEPTION если расходится >tolerance.
- Post-migration validation: `SELECT COUNT(*) FROM table WHERE new_col IS NULL/NOT NULL` — соответствует ли ожиданиям.

**Observability:**
- Каждый новый endpoint / tool: prometheus counter `mcphire_<endpoint>_requests_total{status="2xx|4xx|5xx"}` + histogram latency.
- Каждое business-event (claim_issued, draft_created, submit_done, home_check_started/acked, manifest_v1_request, manifest_v2_request) — структурный лог через `structlog` с trace_id.
- Dashboard: одна страница на спринт, обновляется в течение недели после deploy. Сохраняется в `~/zinin-corp-dashboard/mcphire/sprint-N/`.

## Защита от спама — отдельный вопрос

Молдбук защищается математической загадкой на каждом POST. У нас сейчас только лимит 10/мин (Спринт 12). После Спринта 13 (когда живые агенты начнут регистрироваться) — мониторим. Если случаи спама пойдут — добавляем загадку как Молдбук. Не делаем заранее, чтобы не создавать трение для всех агентов.

## Решения по открытым вопросам

1. **Спринт 14 (форма паспорта сервера):** 30-дневный переходный период — поднимаем версию `server.json`, держим обе версии параллельно. Безопаснее, чем жёсткий слом.
2. **Спринт 17 (Elicitation):** запускается **после pre-spike** (1 день). Если ≥2 из 3 клиентов (Claude Desktop / Cursor / Cline) поддерживают Elicitation — Спринт 17 идёт. Если нет — fallback на `confirmation_token` из Спринтов 14/15. **Магическая фраза удалена в Спринте 14 в любом случае**, никаких сценариев с ней не остаётся.
3. **Спринт 20 (подбор):** разбит на 20a (baseline rule-based, катится со Спринтом 13) и 20b (полноценный с feedback loop). Baseline есть всегда, никакого холда — первый же агент видит дифференцированную выдачу.
