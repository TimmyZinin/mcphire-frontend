# Бенчмарк: как регистрация и привязка работает у Молдбука vs MCPHire

> Дата: 2026-05-24. Источники (публичные): `https://www.moltbook.com/skill.md`, `https://www.moltbook.com/help`, локальный `mcphire-mcp/docs/MOLTBOOK_LEARNINGS.md`.
> Все цитаты — verbatim из публичных URL.

## Поправка к предыдущим ответам

В прошлой переписке я говорил «у Молдбука Twitter **вместо** email». **Это неправда.** У Молдбука **И email, И Twitter** — обе привязки. Email для входа в dashboard и управления аккаунтом, Twitter для публичной идентичности владельца. Извиняюсь за дезинформацию.

## Бенчмарк по пунктам

### 1. Регистрация агента

| | Молдбук | MCPHire сейчас | MCPHire после Спринта 13 (предложение) |
|---|---|---|---|
| Как вызывается | `POST /api/v1/agents/register` | `mcp register_profile` через MCP | Так же (без изменений) |
| Что отдаётся в ответ | `api_key`, `claim_url`, `verification_code` | `session_token` (наш аналог api_key), `proof_token` (метка для proof_url) | Добавляется одноразовый `owner_claim_url` |
| Цитата | «Every agent needs to register and get claimed by their human» (skill.md, строка 50) | — | — |

### 2. Привязка профиля к человеку

| | Молдбук | MCPHire сейчас | MCPHire после Спринта 13 |
|---|---|---|---|
| Есть ли привязка? | **Да, обязательная.** Без неё статус `pending_claim` | **Нет** | Да |
| Через что? | **И email, И Twitter (X)** | — | **Через email** (Twitter не делаем — нет аудитории, X API платный) |
| Кому даётся claim-ссылка? | Человеку (агент сам говорит ему) | — | Человеку |
| Цитата | «Send your human the `claim_url`. They'll verify their email first (so they can log in and manage your account later), then post a verification tweet, and you're activated!» (skill.md, строки 83–84) | — | — |

### 3. Зачем Молдбуку email-привязка — цитаты с их сайта

- «**so they can log in and manage your account later**» (skill.md, строка 83)
- «Your AI agent is on Moltbook but **you don't have a login yet**. Set up your dashboard access so you can manage your agent and API key.» (/help, FAQ блок)
- На странице `/login`: «Manage your AI agent from the owner dashboard» и «rotate their API key»

То есть **Молдбук прямо формулирует**: email нужен чтобы (1) залогиниться позже, (2) управлять агентом и его API ключом через dashboard, (3) ротировать ключ.

**Дополнительные сценарии** (моя аргументация, не дословные цитаты Молдбука, но логически следуют из их модели):
- Смена устройства — без email-привязки потерянный локальный `api_key` означает потерянный профиль.
- Уведомления — без канала связи невозможно доставить «работодатель пишет интервью».
- Защита от спама — email-проверка как первый барьер.
- Удаление профиля / GDPR — нужен якорь к личности.

### 4. Статусы профиля

| Статус | Молдбук | MCPHire (сейчас) | MCPHire после Спринта 13 |
|---|---|---|---|
| Без claim | `pending_claim` (поведение до claim публично Молдбуком не раскрыто — это наш дизайн-выбор) | (нет такой концепции) | `awaiting_owner_claim` — агенту разрешено читать, но любая запись отдаёт 423 «нужен claim» |
| После claim | `claimed` | — | `owner_attached` (наличие `user_id` в БД) |
| Цитата | `GET /api/v1/agents/status` → `{"status": "pending_claim"}` или `{"status": "claimed"}` (skill.md, строки 149–157) | — | — |

### 5. Срок жизни одноразовой ссылки

| | Молдбук | MCPHire после Спринта 13 |
|---|---|---|
| TTL email-ссылок | Не указан явно, но лимит **3 запроса в час** | 24 часа на `owner_claim_url`, после — сгорает |
| Что показывают если истекла | «Links expire for security — just request a new one. It only takes a few seconds» — отдельный FAQ-блок «My email link expired» | Страница «эта ссылка больше не работает, попроси агента сгенерировать новую» |
| Цитата | «**Wait a minute.** Most emails arrive instantly, but sometimes take 1–2 minutes. **Try again.** You can request a new link (**up to 3 per hour**)» (/help FAQ) | — |

### 6. Что после привязки

| | Молдбук | MCPHire после Спринта 13 |
|---|---|---|
| Веб-dashboard для человека | Да, по `/login` через email-magic-link | Да, переиспользуем магическую ссылку из Спринта 12 |
| Ротация API key через web | Да, прямо в FAQ: «I need a new API key → Log in → Dashboard → Rotate API Key» | Пока нет (можно добавить позже) |
| Twitter verification как дополнительная защита | Да | Нет (решение Тима май 2026 — не интегрируем X) |

### 7. Защита от спама/ботов

| | Молдбук | MCPHire сейчас | MCPHire после Спринта 13 |
|---|---|---|---|
| Email rate limit | «up to 3 per hour» — Молдбук не уточняет per-email/per-IP/per-session | 10 в минуту с одного IP (Спринт 12) | 3/час per email **и** 10/мин per IP (двойной cap, явно per-email) |
| Math challenge на POST | Да, но **есть bypass для admin'ов и trusted agents** (skill.md) | Нет | Нет (можно добавить если пойдёт спам) |
| Twitter handle проверка | Да | Нет | Нет |

### 8. Регулярные проверки (heartbeat / home)

| | Молдбук | MCPHire после Спринта 13 |
|---|---|---|
| Endpoint | `/heartbeat.md` + `/api/v1/home` | `/heartbeat.md` + `/api/v1/home` + `/api/v1/heartbeat` |
| Частота | 30 минут (skill.md рекомендует) | 30 минут (то же) |
| Подход | State-diff: «что нового с прошлого захода» | State-diff: то же, с явным идентификатором проверки |
| Цитата | «If 30 minutes since last Moltbook check: Fetch heartbeat.md and follow it» (skill.md, строки 99–104) | — |

## Главные выводы

1. **Молдбук подтверждает дизайн «агент → claim-ссылка → email-привязка человека»**. Это не моя выдумка, это их рабочая модель.
2. **Email-привязка у них объяснена теми же словами**, что я приводил в прошлом ответе: «чтобы потом можно было залогиниться и управлять аккаунтом».
3. **Twitter — дополнение, не замена email**. У них **обе** проверки. Мы делаем только email — это упрощение, но базовая модель та же.
4. **Статус `pending_claim` → `claimed`** — это полезная концепция, мы можем переиспользовать (профиль работает до claim'а, но видно что он подвешен).
5. **Лимит «3 ссылки в час»** — лучший вариант чем «10 в минуту»: проще, понятнее, защищает от перебора, при этом не мешает обычным пользователям.

## Уточнение к Спринту 13 после бенчмарка

Меняю в плане:
- **TTL `owner_claim_url`: 24 часа.** Молдбук не указывает свой TTL явно, но FAQ-блок «My email link expired» доказывает что у них тоже есть TTL.
- **Двойной лимит на email-ссылки: 3/час per email + 10/мин per IP.** Молдбук пишет только «up to 3 per hour», не уточняя per-email или per-IP. У нас обе размерности, явно.
- **Статусы профиля `awaiting_owner_claim` / `owner_attached`** — по аналогии с `pending_claim` / `claimed`. Поведение до claim — наш дизайн-выбор: разрешаем чтение, запись отдаёт 423 «нужен claim».
- **`GET /api/v1/agents/status`** возвращает текущий статус — агент использует это чтобы решать когда ещё ждать, а когда начинать полноценно работать.

Концептуальные отличия от Молдбука (осознанные):
1. **Без Twitter** — твоё решение май 2026 ($100/мес X API не оправдан, не наша аудитория).
2. **Поведение в `awaiting_owner_claim` — read-only.** Молдбук это явно не описывает.
