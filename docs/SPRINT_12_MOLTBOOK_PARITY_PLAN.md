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
2. **Maintenance window — остановить writers перед cleanup** (Codex round 10 HIGH-1):
   ```bash
   # Остановить API/MCP/TG контейнеры на время cleanup+migration
   ssh root@185.202.239.165 'docker stop mcphire-api mcphire-mcp mcphire-tg-bot'
   # После успешной миграции:
   # docker start mcphire-api mcphire-mcp mcphire-tg-bot
   ```
   Это блокирует все источники INSERT в `users`. Альтернатива (без downtime UI): `LOCK TABLE users IN ACCESS EXCLUSIVE MODE` в той же транзакции — блокирует даже SELECT, но писатели падают с lock timeout. Maintenance window предпочтительнее (5-10 минут общий downtime).

3. **Targeted DELETE — enforced guard через PL/pgSQL DO block** (Codex round 5 MEDIUM-2 + round 6 MEDIUM-1):

   ⚠️ **Schema verified 23 мая 2026**, FK references к `users`:
   - `agent_profiles.user_id` → `ON DELETE CASCADE` (ok, cascade сам сработает).
   - `applications.user_id` → `NO ACTION` (DELETE упадёт с FK violation если есть applications).
   - `saved_jobs.user_id` → `NO ACTION` (DELETE упадёт).
   - `jobs.created_by` → `NO ACTION` (DELETE упадёт если есть jobs).

   Текущее состояние прода: 0 jobs.created_by NOT NULL, 9 applications (8 от NULL-email + 1 от komova.xiu@yandex.ru), 1 saved_jobs. **Без явного очищения дочерних таблиц DELETE FROM users упадёт.**

   ```sql
   DO $$
   DECLARE
     expected_users_max INT := 27;
     expected_agent_profiles_max INT := 5;
     expected_applications_max INT := 9;
     expected_saved_jobs_max INT := 1;
     actual_users INT;
     actual_agent_profiles INT;
     actual_applications INT;
     actual_saved_jobs INT;
     to_delete_ids UUID[];
   BEGIN
     -- ⚠️ MCP sentinel user (id = c659afa0-5781-5574-89a0-c74b0e5ada39,
     --    email=NULL by design — uuid5(NAMESPACE_DNS, 'mcp.mcphire.com') в
     --    mcp-server/server.py:33) ИСКЛЮЧАЕТСЯ из cleanup. Он используется
     --    как applications.user_id для всех MCP/TG apply-flows.

     -- 1. Lock target rows under FOR UPDATE — фиксируем set, защита от concurrent insert
     SELECT array_agg(id) INTO to_delete_ids FROM (
       SELECT id FROM users
       WHERE id != 'c659afa0-5781-5574-89a0-c74b0e5ada39'::uuid  -- protect MCP sentinel
         AND (
           email IS NULL
           OR email LIKE '%@example.com'
           OR email LIKE '%@mcphire.com'
           OR email LIKE 'test-%'
           OR email LIKE 'qa-%'
           OR email LIKE 'sprint%-%'
           OR email LIKE 'pentest_%'
           OR email LIKE 'tim.zinin+%@gmail.com'
         )
       FOR UPDATE
     ) sub;

     -- 2. Count exact cascade impact
     actual_users := COALESCE(array_length(to_delete_ids, 1), 0);
     SELECT COUNT(*) INTO actual_agent_profiles
       FROM agent_profiles WHERE user_id = ANY(to_delete_ids);
     SELECT COUNT(*) INTO actual_applications
       FROM applications WHERE user_id = ANY(to_delete_ids);
     SELECT COUNT(*) INTO actual_saved_jobs
       FROM saved_jobs WHERE user_id = ANY(to_delete_ids);

     RAISE NOTICE 'Preflight: users=%, agent_profiles=%, applications=%, saved_jobs=%',
       actual_users, actual_agent_profiles, actual_applications, actual_saved_jobs;

     -- 3. Bounds enforcement — если что-то выше expected, AbortMission
     IF actual_users > expected_users_max THEN
       RAISE EXCEPTION 'Aborted: users count % > expected %', actual_users, expected_users_max;
     END IF;
     IF actual_agent_profiles > expected_agent_profiles_max THEN
       RAISE EXCEPTION 'Aborted: agent_profiles count % > expected %',
         actual_agent_profiles, expected_agent_profiles_max;
     END IF;
     IF actual_applications > expected_applications_max THEN
       RAISE EXCEPTION 'Aborted: applications count % > expected %',
         actual_applications, expected_applications_max;
     END IF;
     IF actual_saved_jobs > expected_saved_jobs_max THEN
       RAISE EXCEPTION 'Aborted: saved_jobs count % > expected %',
         actual_saved_jobs, expected_saved_jobs_max;
     END IF;

     -- 4. Очистка дочерних таблиц без CASCADE (по locked id set)
     DELETE FROM applications WHERE user_id = ANY(to_delete_ids);
     DELETE FROM saved_jobs WHERE user_id = ANY(to_delete_ids);
     -- jobs.created_by — на проде 0 rows, но защищаемся:
     UPDATE jobs SET created_by = NULL WHERE created_by = ANY(to_delete_ids);

     -- 5. Финальный DELETE users (agent_profiles каскадно)
     DELETE FROM users WHERE id = ANY(to_delete_ids);

     -- 6. ⚠️ PRE-COMMIT assertions (Codex round 9 MEDIUM-1):
     --    проверки внутри транзакции, так чтобы RAISE EXCEPTION откатил всё.

     -- (a) MCP sentinel должен остаться
     IF NOT EXISTS (
       SELECT 1 FROM users
       WHERE id = 'c659afa0-5781-5574-89a0-c74b0e5ada39'::uuid
     ) THEN
       RAISE EXCEPTION 'Sentinel MCP user lost — aborting';
     END IF;

     -- (b) Predicate cleanup полный кроме sentinel
     IF EXISTS (
       SELECT 1 FROM users
       WHERE id != 'c659afa0-5781-5574-89a0-c74b0e5ada39'::uuid
         AND (email IS NULL
           OR email LIKE '%@example.com' OR email LIKE '%@mcphire.com'
           OR email LIKE 'test-%' OR email LIKE 'qa-%' OR email LIKE 'sprint%-%'
           OR email LIKE 'pentest_%' OR email LIKE 'tim.zinin+%@gmail.com')
     ) THEN
       RAISE EXCEPTION 'Predicate cleanup incomplete';
     END IF;

     RAISE NOTICE 'Cleanup complete: % users deleted', actual_users;
   END $$;
   ```

   Запускается **внутри транзакции**: `BEGIN; DO $$ ... $$; COMMIT;`. Любой `RAISE EXCEPTION` в `DO` block откатывает всю транзакцию автоматически. Если COMMIT прошёл — все assertions удовлетворены.

3. **Post-commit info queries** (вне транзакции — read-only, не блокеры):
   ```sql
   -- (a) Тимовы реальные emails остались — для record-keeping
   SELECT email FROM users
   WHERE email IN ('timzinin@gmai.com', 'tim.zinin@gmail.com');

   -- (b) Agent-graph awaiting_claim не пострадал (информативно)
   SELECT COUNT(*) FROM agent_profiles WHERE user_id IS NULL;
   -- ожидаем: примерно 59 (64 total - ~5 cleanup'нутых через CASCADE).
   ```
   **Если что-то пошло не так пост-фактум** — atomic restore (Codex round 10 HIGH-2):
   ```bash
   # 1. Остановить writers (если ещё не остановлены)
   ssh root@185.202.239.165 'docker stop mcphire-api mcphire-mcp mcphire-tg-bot'
   # 2. Atomic restore: --single-transaction = всё в одной TX, --exit-on-error = stop at first error.
   #    Если что-то fail-нёт, БД останется в pre-restore состоянии (commit не произойдёт).
   ssh root@185.202.239.165 'docker exec -i zinin-postgres pg_restore \
     --clean --if-exists --single-transaction --exit-on-error \
     -U mcphire -d mcphire < /backup/mcphire-pre-s12-YYYYMMDD-HHMM.dump'
   # 3. Verify restore success
   ssh root@185.202.239.165 'docker exec zinin-postgres psql -U mcphire -d mcphire \
     -c "SELECT COUNT(*) FROM users; SELECT COUNT(*) FROM agent_profiles;"'
   # Expected: ~27 users, ~64 agent_profiles (pre-S12 state).
   # 4. Restart writers
   ssh root@185.202.239.165 'docker start mcphire-api mcphire-mcp mcphire-tg-bot'
   ```
   Безопасная альтернатива (если есть подозрения): restore в новую БД `mcphire_restore` через `--dbname=mcphire_restore`, verify, потом swap connection string в env.

4. **Tim's email** (`timzinin@gmai.com` typo + `tim.zinin@gmail.com`) — в predicate **не попадают**, остаются. Magic-link login заработает на них.
5. **⚠️ ДО Alembic миграции — убрать `email_verified` / `password_hash` / `telegram_id` из ВСЕГО кода** (Codex round 7 CRITICAL + round 8 HIGH-1):

   **Backend (FastAPI ORM):**
   - `backend/app/models/user.py:29` — убрать `email_verified: Mapped[bool]` column из ORM модели User. То же для `password_hash`, `telegram_id`, `email_verification_token`, `email_verification_sent_at`.
   - `backend/app/schemas/auth.py` — убрать `email_verified` из `UserResponse`/`MeResponse` Pydantic schemas.
   - `backend/app/services/auth_service.py` — все ссылки на `user.email_verified`, `user.password_hash`, `user.telegram_id` удаляются вместе с роутами `/register`, `/login`, `/telegram`, `/google`, `/verify-email`.
   - `backend/app/dependencies.py` и любые `select(User)` — после ORM-фикса будут работать (просто не маппят дропнутые колонки).

   **MCP-server:**
   - `mcp-server/server.py:116` — INSERT `users(id, name, role, email_verified, is_open_to_work)` → убрать `email_verified`.

   **TG-bot:**
   - `tg-bot/db.py` — все raw SQL писания в `users` с `email_verified` колонкой → убрать.

   **Pre-deploy verification grep** (Codex round 9 HIGH-1 — paths правильные для split repos):
   ```bash
   # Backend mono-repo (~/mcphire-mcp) — backend ORM/services + MCP + TG bot
   rg -n "email_verified|password_hash|telegram_id|email_verification" \
     ~/mcphire-mcp/backend/app ~/mcphire-mcp/mcp-server ~/mcphire-mcp/tg-bot \
     --glob '!**/alembic/versions/**'
   # Expected: 0 matches.

   # Frontend repo (~/mcphire-frontend)
   rg -n "email_verified|password_hash|telegram_id|email_verification|TelegramLoginButton|GoogleLoginButton" \
     ~/mcphire-frontend/src
   # Expected: 0 matches.
   ```
   **Оба grep должны вернуть 0 ДО** запуска alembic migration. Если ненулёвой результат — миграция не запускается.

   Все эти правки коммитятся **в том же PR** что миграция, deploy одновременно. Smoke после deploy: `/auth/me` (используя свежий magic-link токен) возвращает 200 (защита от Codex round 8 HIGH-1) + MCP `apply_to_job` создаёт application с sentinel user (защита от round 7 CRITICAL).

6. **Alembic миграция** (после DELETE и code update):
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

**Backend (SSRF hardening claim_verifier — aiohttp-based, end-to-end):**

⚠️ **DNS-rebinding защита через IP-pinning + custom resolver** (Codex round 4 HIGH-2, round 5 HIGH-2, round 6 HIGH-2).

**Зависимость:** добавить `aiohttp>=3.9` в `backend/requirements.txt`. httpx (текущий) **не используется** для outbound proof_url fetch — его API не позволяет cleanly pin remote IP с сохранением SNI.

**Новый модуль** `backend/app/utils/safe_fetcher.py` — `async def safe_fetch(url: str) -> str`:

```python
import socket
import ssl
import ipaddress
import aiohttp
from aiohttp.abc import AbstractResolver
from urllib.parse import urlparse, urljoin

PRIVATE_NETS = [
    ipaddress.ip_network('10.0.0.0/8'),
    ipaddress.ip_network('172.16.0.0/12'),
    ipaddress.ip_network('192.168.0.0/16'),
    ipaddress.ip_network('127.0.0.0/8'),       # loopback
    ipaddress.ip_network('169.254.0.0/16'),    # link-local + AWS metadata
    ipaddress.ip_network('100.64.0.0/10'),     # CGNAT
    ipaddress.ip_network('0.0.0.0/8'),
    ipaddress.ip_network('::1/128'),           # IPv6 loopback
    ipaddress.ip_network('fc00::/7'),          # IPv6 ULA
    ipaddress.ip_network('fe80::/10'),         # IPv6 link-local
]

def _is_private(ip_str: str) -> bool:
    """Reject private/special-use IPs. Normalizes IPv4-mapped IPv6
       (::ffff:127.0.0.1, ::ffff:169.254.169.254) before policy check
       to prevent SSRF bypass via AAAA records."""
    ip = ipaddress.ip_address(ip_str)
    # Unwrap IPv4-mapped IPv6 → treat as IPv4 (Codex round 7 HIGH-3)
    if isinstance(ip, ipaddress.IPv6Address) and ip.ipv4_mapped:
        ip = ip.ipv4_mapped
    # Belt-and-suspenders: reject anything not globally routable
    if not ip.is_global:
        return True
    return any(ip in net for net in PRIVATE_NETS)


class VettedIPResolver(AbstractResolver):
    """aiohttp resolver that only returns pre-vetted IPs.
       Защита от DNS-rebinding: при втором resolve во время connect
       возвращает тот же vetted IP, не подвержен повторному запросу."""
    def __init__(self, hostname: str, vetted_ip: str, port: int):
        self._hostname = hostname
        self._vetted_ip = vetted_ip
        self._port = port

    async def resolve(self, host, port=0, family=socket.AF_INET):
        if host != self._hostname:
            raise OSError(f"DNS rebinding blocked: unexpected host {host}")
        family = socket.AF_INET6 if ':' in self._vetted_ip else socket.AF_INET
        return [{
            'hostname': self._hostname,
            'host': self._vetted_ip,   # ← IP, not hostname
            'port': port or self._port,
            'family': family,
            'proto': 0,
            'flags': 0,
        }]

    async def close(self):
        pass


async def safe_fetch(url: str, max_redirects: int = 3,
                     max_bytes: int = 1024 * 1024) -> str:
    """SSRF-safe HTTP GET. Returns decoded text or raises SafeFetchError."""
    for hop in range(max_redirects + 1):
        parsed = urlparse(url)

        # 1. Scheme allowlist
        if parsed.scheme != 'https':
            raise SafeFetchError(f"non-https scheme: {parsed.scheme}")

        # 2. Resolve + denylist check
        port = parsed.port or 443
        infos = socket.getaddrinfo(parsed.hostname, port,
                                    type=socket.SOCK_STREAM)
        ips = list({info[4][0] for info in infos})
        for ip in ips:
            if _is_private(ip):
                raise SafeFetchError(f"private IP resolved: {ip}")
        vetted_ip = ips[0]

        # 3. aiohttp с VettedIPResolver — connect to vetted IP, SNI = original hostname
        resolver = VettedIPResolver(parsed.hostname, vetted_ip, port)
        connector = aiohttp.TCPConnector(
            resolver=resolver,
            ssl=ssl.create_default_context(),
            family=socket.AF_UNSPEC,
            use_dns_cache=False,        # каждый раз через VettedIPResolver
        )
        timeout = aiohttp.ClientTimeout(connect=5, sock_read=10, total=15)
        async with aiohttp.ClientSession(connector=connector,
                                         trust_env=False,   # ← no env proxies
                                         timeout=timeout) as session:
            async with session.get(url, allow_redirects=False) as resp:
                # 4. Validate peer matches vetted_ip
                peer = resp.connection.transport.get_extra_info('peername')
                if peer and peer[0] != vetted_ip:
                    raise SafeFetchError(
                        f"peer IP {peer[0]} != vetted {vetted_ip}")

                # 5. Manual redirect handling (Codex round 7 MEDIUM-1 fix:
                #    `continue` instead of `break` + urljoin for relative URLs)
                if resp.status in (301, 302, 303, 307, 308):
                    if hop >= max_redirects:
                        raise SafeFetchError("too many redirects")
                    location = resp.headers.get('Location', '')
                    if not location:
                        raise SafeFetchError("redirect without Location")
                    url = urljoin(str(resp.url), location)
                    continue  # exit async with blocks, next iteration

                # 6. Content-type allowlist
                ct = resp.headers.get('Content-Type', '').lower()
                if not (ct.startswith('text/') or
                        ct.startswith('application/json')):
                    raise SafeFetchError(f"bad content-type: {ct}")

                # 7. Stream read with size cap
                chunks = []
                total = 0
                async for chunk in resp.content.iter_chunked(8192):
                    total += len(chunk)
                    if total > max_bytes:
                        raise SafeFetchError(f"response > {max_bytes} bytes")
                    chunks.append(chunk)

                body = b''.join(chunks)
                encoding = resp.charset or 'utf-8'
                return body.decode(encoding, errors='replace')
    raise SafeFetchError("redirect loop")
```

**`claim_verifier.py:47-53`** заменяет `httpx.get(proof_url, follow_redirects=True)` на `safe_fetch(proof_url)`. Сохраняется substring check логика.

**Retry budget:** оборачивается в `tenacity.retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2, max=30))`.

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
- Unit SSRF (14 кейсов): http scheme, localhost, AWS metadata 169.254.169.254, RFC1918, redirect-to-private, redirect chain, timeout 15s, oversized 5MB, binary content-type, accept public https markdown, **DNS-rebinding attack** (preflight resolve = public, connect-time resolve = private — должен reject через IP-pin), **env-proxy bypass** (export HTTP_PROXY=evil → должно игнориться), **IPv4-mapped IPv6 bypass** (`::ffff:127.0.0.1`, `::ffff:169.254.169.254` через AAAA — должны reject), **relative redirect** (`Location: /new-path` → urljoin resolve + повтор policy).
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
    # Backfill: копируем claim_tokens.token → agent_profiles.proof_token
    # Verified schema (prod 23 мая): claim_tokens(token PK, profile_id FK, proof_url, ...)
    op.execute("""
        UPDATE agent_profiles ap
        SET proof_token = ct.token
        FROM claim_tokens ct
        WHERE ct.profile_id = ap.id
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
- `GET /api/v1/home` — для агента (Bearer `session_token` — existing field): state-diff. **Idempotent + server-issued cursor** (Codex round 4 MEDIUM-1 + round 5 MEDIUM-1 + round 6 HIGH-1 fixes):
  - В **одной транзакции** под `SELECT FOR UPDATE` на agent_profiles row:
    ```sql
    SELECT pending_home_cursor, last_home_checked_at
    FROM agent_profiles
    WHERE id = $agent_id FOR UPDATE;
    ```
  - Логика:
    - Если `pending_home_cursor IS NOT NULL` → **переиспользуем** его (single-flight). Окно для query: `(last_home_checked_at, pending_home_cursor]`. Это обеспечивает идемпотентность — параллельные/повторные /home возвращают те же события.
    - Если `pending_home_cursor IS NULL` → ставим `pending_home_cursor = NOW()` (новый снимок). Окно: `(last_home_checked_at, NOW()]`.
  - Query events: `WHERE created_at > COALESCE(last_home_checked_at, '-infinity'::timestamptz) AND created_at <= pending_home_cursor`. **`COALESCE` обязателен** (Codex round 7 HIGH-2): для существующих профилей `last_home_checked_at IS NULL` после миграции, без COALESCE первое окно ack-ит пустоту и теряет все события до миграции. Alternative — backfill в миграции `UPDATE agent_profiles SET last_home_checked_at = created_at`. Выбираем `COALESCE` (проще, не трогает данные).
  - Возвращает `{new_jobs, unread_replies, proof_url_status, next_suggested_action}`. **Cursor не возвращается клиенту.**
- `POST /api/v1/heartbeat` (без body, Codex round 5 MEDIUM-1):
  ```sql
  UPDATE agent_profiles
  SET last_seen_at = NOW(),
      last_home_checked_at = pending_home_cursor,
      pending_home_cursor = NULL
  WHERE id = $agent_id
    AND pending_home_cursor IS NOT NULL
  RETURNING id
  ```
  0 строк → 409 (агент шлёт heartbeat без предшествующего /home — клиент должен сначала прочитать /home).
- Новые колонки миграция: `ALTER TABLE agent_profiles ADD COLUMN last_home_checked_at TIMESTAMPTZ NULL, ADD COLUMN pending_home_cursor TIMESTAMPTZ NULL`.
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
- `test_heartbeat_without_home_returns_409` — POST /heartbeat без предшествующего /home (pending_home_cursor IS NULL) → 409.
- `test_heartbeat_cursor_not_client_controllable` — попытка передать body `{cursor_as_of: "9999-12-31"}` → проигнорировано, сервер использует pending_home_cursor.
- `test_home_state_diff` — два запроса с интервалом, между ними новая вакансия → второй запрос отдаёт её в `new_jobs`.
- `test_home_no_event_loss_under_race` — между `/home` query и heartbeat ack создаётся новая вакансия → она появляется в **следующем** `/home` (не теряется). Симулируется через async race в pytest.
- `test_home_idempotent_under_overlap` — два concurrent `/home` без промежуточного heartbeat → возвращают **тот же** snapshot (тот же pending_home_cursor, те же new_jobs). Если первый ответ потерян, второй replay-ит то же окно. Симулируется через `asyncio.gather`.
- `test_home_first_call_no_null_lower_bound` — agent с `last_home_checked_at IS NULL` (свежий после миграции), в БД 3 job-события созданных до /home → первый /home возвращает все 3 (не пустой). Защита от Codex round 7 HIGH-2.
- `test_mcp_apply_works_after_migration` — после деплоя миграции + code update: симулировать MCP `apply_to_job` flow → application успешно создан, использует sentinel user c659afa0-... (защита от Codex round 7 CRITICAL-1).
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

### Round 10 (concurrency + atomic restore, 2026-05-23)
| # | Решение |
|---|---|
| HIGH-1 FOR UPDATE не блокирует новых INSERT | Maintenance window: `docker stop mcphire-api mcphire-mcp mcphire-tg-bot` перед cleanup+migration. Writers off → нет источников новых test rows. Restart после успешного COMMIT. Downtime 5-10 мин. |
| HIGH-2 pg_restore partial на ошибке | Команда расширена: `pg_restore --clean --if-exists --single-transaction --exit-on-error` — всё в одной TX, stop at first error, БД остаётся pre-restore при fail. Альтернатива: restore в новую БД + swap connection string. |

### Round 9 (grep paths + pre-commit assertions, 2026-05-23)
| # | Решение |
|---|---|
| HIGH-1 grep paths cross-repo не работают | Разделено на 2 grep: один по `~/mcphire-mcp/{backend/app,mcp-server,tg-bot}`, второй по `~/mcphire-frontend/src`. Оба должны вернуть 0 ДО миграции. |
| MEDIUM-1 «ROLLBACK после COMMIT» невозможен | Sentinel + predicate-cleanup assertions перенесены **внутрь** транзакции DO block (`RAISE EXCEPTION` если sentinel missing или predicate не пустой → auto-rollback). Post-commit queries теперь read-only info, не блокеры. Real recovery path = pg_restore из pg_dump backup. |

### Round 8 (backend ORM + post-check correctness, 2026-05-23)
| # | Решение |
|---|---|
| HIGH-1 backend ORM/schemas/services тоже маппят `email_verified` | Расширен pre-migration checklist: `User` model + `auth_service.py` + `schemas/auth.py` + `dependencies.py` правятся одновременно с MCP/TG. Verification grep расширен на `backend/app` + `frontend/src`. Smoke `/auth/me` после deploy. |
| MEDIUM-1 post-check `users <= 1` conflict с sentinel preservation | Заменено на 4 explicit assertions: (a) sentinel UUID exists, (b) predicate cleanup полный кроме sentinel, (c) Тимовы emails enumerated, (d) agent-graph awaiting_claim не пострадал. |

### Round 7 (sentinel + NULL bound + IPv6-mapped + redirect, 2026-05-23)
| # | Решение |
|---|---|
| CRITICAL-1 cleanup стирает MCP sentinel user + ломает MCP/TG apply | DELETE predicate excludes `id != c659afa0-5781-5574-89a0-c74b0e5ada39`. До миграции — обновить `mcp-server/server.py:116` и `tg-bot/db.py` raw SQL чтобы убрать `email_verified` колонку. Smoke test `test_mcp_apply_works_after_migration`. |
| HIGH-2 /home `created_at > NULL` always false | `WHERE created_at > COALESCE(last_home_checked_at, '-infinity'::timestamptz)`. Тест `test_home_first_call_no_null_lower_bound`. |
| HIGH-3 SSRF bypass через IPv4-mapped IPv6 (`::ffff:127.0.0.1`) | `_is_private` unwrap-ит `IPv6Address.ipv4_mapped` перед policy check + belt-and-suspenders `not ip.is_global`. Тест `test_ipv4_mapped_ipv6_bypass`. |
| MEDIUM-1 redirect `break` вместо `continue` + нет urljoin | `continue` (продолжает outer for-loop), `url = urljoin(str(resp.url), location)` для relative. Тест `test_relative_redirect`. |

### Round 6 (idempotency + SSRF consistency + cascade coverage, 2026-05-23)
| # | Решение |
|---|---|
| HIGH-1 heartbeat acks unseen cursor через overlapping /home | `/home` теперь idempotent под `SELECT FOR UPDATE`: если `pending_home_cursor IS NOT NULL` — reuse тот же snapshot (single-flight). Тест `test_home_idempotent_under_overlap`. |
| HIGH-2 SSRF секция inconsistent (httpx + aiohttp) | Полностью переписан в aiohttp с конкретным working кодом (`safe_fetcher.py`). Все упоминания httpx убраны. |
| MEDIUM-1 DELETE guard manual, не покрывает все FK | Переписано через PL/pgSQL `DO $$ ... $$` block с `RAISE EXCEPTION` на mismatch. Verified все 4 FK к users (`agent_profiles` CASCADE, `applications`/`saved_jobs`/`jobs.created_by` без CASCADE → явная очистка дочерних таблиц до DELETE users). Locked `to_delete_ids` через FOR UPDATE. |

### Round 5 (shippability + cursor exploit + delete safety, 2026-05-23)
| # | Решение |
|---|---|
| HIGH-1 backfill columns wrong (`ct.claim_token`/`ct.agent_profile_id`) | Verified actual schema: `claim_tokens.token` (PK) + `claim_tokens.profile_id` (FK). Backfill SQL исправлен. |
| HIGH-2 IP-pinning не shippable в httpx 0.28.1 | Заменено на конкретную реализацию через aiohttp + `VettedIPResolver(AbstractResolver)` + URL rewrite на vetted IP + Host header + `server_hostname` для SNI + peer validation через `transport.get_extra_info('peername')`. Добавляем aiohttp в requirements.txt. |
| MEDIUM-1 heartbeat cursor exploitable | Cursor больше не client-supplied. /home обновляет `pending_home_cursor` server-side. /heartbeat (без body) applies pending → `last_home_checked_at`. Агент не может подделать timestamp. |
| MEDIUM-2 DELETE без transactional guard | Preflight через CTE возвращает exact cascade impact + DELETE с RETURNING внутри транзакции + сверка с expected counts (≤27 users, ≤5 agent_profiles, ≤0 applications) + auto-ROLLBACK на mismatch. |

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
