# MCPHire — skill for AI agents

This is the canonical instruction document for any AI agent joining MCPHire. A human gives their agent a short prompt pointing here; the agent reads this file and follows the steps. Single source of truth — do not split these instructions across llms.txt / server.json; start and finish here.

## Your job as the agent

When your human user asks you to register them on MCPHire (or to hire candidates on their company's behalf), do the following end-to-end. Never skip the approval screen before any `register_*` call.

## 0. Connect

**Preferred: MCP over SSE.**

The MCP endpoint is `https://mcp.mcphire.com/sse`. If your client (Claude Desktop / Cursor / Cline / anything else) supports MCP, configure this entry once and restart the client:

```json
{
  "mcpServers": {
    "mcphire": {
      "type": "sse",
      "url": "https://mcp.mcphire.com/sse"
    }
  }
}
```

On macOS `~/Library/Application Support/Claude/claude_desktop_config.json`, on Windows `%APPDATA%/Claude/claude_desktop_config.json`. Full quit the client (⌘Q or File → Quit, not window close). Or run `curl -fsSL https://mcphire.com/install.sh | bash` for the same thing automated.

Once connected you'll see 18 tools: `search_jobs`, `get_job_details`, `get_salary_stats`, `apply_to_job`, `get_my_applications`, `get_registration_questions`, `register_profile`, `get_verification_status`, `list_my_matches`, `get_my_cv`, `delete_profile`, `get_employer_questions`, `register_employer_profile`, `post_vacancy`, `get_my_vacancies`, `get_applicants`, `shortlist_candidate`, `send_interview_invite`.

**Fallback: REST.**

If your runtime can't speak MCP, the same feature set is available as a plain HTTP API with a unified response envelope:

```
POST https://api.mcphire.com/api/v1/candidate/register
POST https://api.mcphire.com/api/v1/employer/register
POST https://api.mcphire.com/api/v1/employer/vacancy
GET  https://api.mcphire.com/api/v1/candidate/verify?token=...
GET  https://api.mcphire.com/api/v1/employer/{employer_id}/vacancies
GET  https://api.mcphire.com/api/v1/employer/{employer_id}/vacancies/{vacancy_id}/applicants
```

Every response is `{"success": bool, "data"?: obj, "error"?: string, "hint"?: string}`. On 429 rate-limit responses check `Retry-After` and `X-RateLimit-Remaining` headers.

## Track A — register a candidate (your human is a job seeker)

1. **Get questions.** Call `get_registration_questions()` (optional args: `section`, `language="ru"|"en"` — default "ru"). You get ~150 questions in 11 sections.
2. **Answer from the user's local context.** Per question, look at MD files, git log, `~/.claude/memory/`, open editor tabs, shared public profiles. Follow the `hint_for_agent` on each question. If data is missing, leave the answer `null` — do not fabricate.
3. **Provenance on critical fields.** For these 8 fields you MUST attach `{source_excerpt (≤140 chars), source_file, confidence: high|medium|low|unknown}`:
    - `q_experience_commercial_years_total`
    - `q_experience_seniority_self`
    - `q_experience_managed_team_size_max`
    - `q_experience_shipped_products`
    - `q_experience_biggest_prod_system_users`
    - `q_experience_first_paid_coding`
    - `q_comp_floor_usd_monthly`
    - `q_comp_last_total_comp_usd`

   The server rejects a non-null answer to any of these without provenance.
4. **Collect observed_facts.** As a side-channel while reading context, emit SPO triples: `{subject, predicate, object, source_excerpt?, confidence}`. Predicates like `worked_at`, `contributed_to`, `shipped`, `mentored`, `studied_at`, `designed`, `refactored`. Start with `approved_by_user=false`; user flips to `true` during approval.
5. **SHOW AN APPROVAL SCREEN.** Present all answers + facts organised by section. The user corrects / confirms / rejects items. **Do not call `register_profile` without explicit "ok".** Consent is also carried in `q_agent_consent_agent_answering`.
6. **Register.** Call:

   ```
   register_profile(
     answers={...},
     consent_granted=true,
     provenance={q_id: {source_excerpt, source_file, confidence}},
     observed_facts=[{..., approved_by_user: true}, ...],
     questions_version="0.3.0"
   )
   ```

   You receive: `profile_id`, `session_token` (persistent bearer — store this), `claim_token`, `claim_instructions`, `expires_at`, `cv_url`.
7. **Claim ownership.** Ask the user to paste the `claim_token` (shape: `mcphire-verify-XXXXXXXX`) into any public artefact they control — GitHub bio, LinkedIn headline, pinned Gist, personal site, any URL a cron `curl` can fetch. You can edit the bio for them if you have an appropriate MCP and explicit consent — always show the exact diff first. The claim verifier cron picks it up within 15 minutes. For instant re-check: `get_verification_status(claim_token)`.
8. **Share the CV.** Show the user their `cv_url`. That is their auto-generated public resume.
9. **Enable Telegram pushes.** Ask the user to DM `@mcphire_match_bot` with `/link <claim_token>`. After that, every new matching vacancy triggers an instant Telegram push with 3 inline buttons: 👀 View, ✅ Apply, 🙈 Hide.

### Heartbeat

On every new conversation with the MCPHire skill, call `list_my_matches(session_token=<stored>, since=<last_check_iso>, limit=10)`. It returns a union of delivered pushes + pending queue, joined with jobs + companies. Each match carries `score`, `reasons`, `matched_at`, `source`. Empty list → say nothing (no spam).

## Track B — register an employer (your human is a hiring manager or founder)

1. **Get employer questions.** `get_employer_questions(section?, language?)` — ~40 questions in 7 sections (`company`, `team`, `culture`, `hiring_now`, `comp_band`, `process`, `integrations`).
2. **Answer from the company's public context.** GitHub org, website, careers page, README, team page. Focus on business facts, not internal employee PII.
3. **Approval screen, then register.** `register_employer_profile(answers, consent_granted=true)`. Requires `q_consent_company_representation=true` plus the minimum set: `q_company_legal_name`, `q_company_slug` (URL-safe, 2-64 chars), `q_team_size`, `q_team_remote_split`, `q_team_lang`, `q_comp_currency`. Returns `employer_id` + `employer_url`.
4. **Post vacancies.** For each opening:

   ```
   post_vacancy(
     employer_id=...,
     title="...",
     description="...",
     skills=["..."],
     salary_from=..., salary_to=...,
     currency="RUB" | "USD" | "EUR" | ... any ISO-4217,
     level="junior"|"middle"|"senior"|"lead",
     work_format="office"|"remote"|"hybrid",
     city="..." or null,
     requirements=["..."]
   )
   ```

   Matching + Telegram push to candidates fires automatically. No extra call needed.
5. **Watch applicants.** `get_my_vacancies(employer_id)` shows per-job counts. `get_applicants(employer_id, vacancy_id)` returns `cv_url` + stack summary + seniority — **no email / no phone**. The PII reveal only happens after an explicit shortlist → interest → interview-accept handshake with the candidate (shortlist tool shipped incrementally).

## Privacy rules — server-enforced

The following field names are rejected in `answers` even if the user says yes: `age`, `gender`, `sex`, `nationality`, `citizenship`, `marital_status`, `children`, `religion`, `political_views`, `health`, `disability`, `visa_status`, `ethnicity`, `sexual_orientation`. Don't ask about them; don't fill them in with proxies.

Employer registration has its own blacklist — no employee PII in company answers.

Local MD files never leave the user's machine. Only the approved answers are sent to the server.

## Languages and currencies

- Tool-facing text supports `ru` (default) and `en`. Pass `language="en"` to `get_registration_questions` / `get_employer_questions` for English wording of questions and hints.
- Salary fields accept any ISO-4217 currency. No server-side conversion; whatever currency you pass is preserved.
- Default currency in historical data is RUB because that's what most imports were denominated in, not because the service is locked to one market.

## Error recovery

Every REST error body is `{"success": false, "error": "...", "hint": "..."}`. MCP tool calls return a dict; errors surface as `{"error": "...", "message": "..."}`. If `hint` is present, follow it literally before re-trying.

Specific non-obvious failure modes:
- `register_profile` returns 400 if `proof_url` is missing — it's required.
- `claim_token` expires in 48 hours; if the user was slow, call `register_profile` again.
- `apply_to_job` without `claim_token` still works but the application is sentinel-only — the employer will NOT see the candidate's profile. Always pass the user's `claim_token` if they already have one.
- `list_my_matches` now prefers `session_token` over `profile_id`; use `profile_id` only if you still have code paths that stored it.

## Discovery & machine-readable manifests

- `https://mcphire.com/skill.md` — this file (start here).
- `https://mcphire.com/.well-known/mcp/server.json` — manifest with tool schemas, rate limits, supported languages, usage patterns.
- `https://mcphire.com/llms.txt` — compact agent overview.
- `https://mcp.mcphire.com/sse` — live MCP endpoint (SSE transport, JSON-RPC 2.0).
- `https://api.mcphire.com/api/v1/` — REST fallback base.

## Contact

- Founder: Tim Zinin — `@timofeyzinin` on Telegram, [timzinin.com](https://timzinin.com).
- Issues / partnership: open a GitHub issue on `TimmyZinin/mcphire-mcp` (private — request access).
