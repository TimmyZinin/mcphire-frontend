// ============================================================
// MCPHire V3 «Optimist» — home (job board entry point)
// Route: /home  |  Default `/` also routes here (see App.tsx)
//
// Layout: warm-cream canvas → V3Navbar → AudienceSwitcher →
// AgentBanner → Hero (candidate/recruiter) → Stats →
// (IntegrationsStrip only for recruiter) → LiveTicker →
// LogosStrip → AgentOnboarding (MCP install snippet, PRESERVED
// because it's the canonical agent-entry affordance) →
// Featured jobs → Employer CTA → Footer.
//
// MCP-flow contracts NOT broken:
//  - /skill.md link preserved
//  - /.well-known/mcp/server.json link preserved
//  - https://mcp.mcphire.com/sse SSE endpoint preserved
//  - REST fallback api.mcphire.com preserved
//  - `agent-onboarding` anchor preserved (hero CTA + banner target)
// ============================================================

import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { V3Navbar } from "@/components/v3/Navbar";
import { V3AudienceSwitcher } from "@/components/v3/AudienceSwitcher";
import { V3AgentBanner } from "@/components/v3/AgentBanner";
import { V3Hero } from "@/components/v3/Hero";
import { V3StatsRow } from "@/components/v3/StatsRow";
import { V3IntegrationsStrip } from "@/components/v3/IntegrationsStrip";
import { V3LiveTicker } from "@/components/v3/LiveTicker";
import { V3LogosStrip } from "@/components/v3/LogosStrip";
import { V3HowSection } from "@/components/v3/HowSection";
import { V3M2MManifesto } from "@/components/v3/M2MManifesto";
import { V3InstallBlock } from "@/components/v3/InstallBlock";
import { PromptCopyBlock } from "@/components/v3/PromptCopyBlock";
import type { AudienceMode, Lang } from "@/components/v3/data";

import Footer from "@/components/Footer";
import { JobCard, SkeletonGrid } from "@/components/JobCard";
import { useJobs } from "@/hooks/useJobs";

// ---- Audience mode persistence -------------------------------
// Source of truth (priority): URL ?mode=  →  localStorage  →  default candidate.

const STORAGE_KEY = "mcphire.audience-mode";

function readPersistedMode(): AudienceMode | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "recruiter" || stored === "candidate" ? stored : null;
  } catch {
    /* SecurityError / localStorage unavailable (Safari private mode) */
    return null;
  }
}

// ---- Component -----------------------------------------------

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { i18n } = useTranslation();
  const lang: Lang = i18n.language.startsWith("en") ? "en" : "ru";

  const initialMode: AudienceMode = (() => {
    const fromUrl = searchParams.get("mode");
    if (fromUrl === "recruiter" || fromUrl === "candidate") return fromUrl;
    return readPersistedMode() ?? "candidate";
  })();

  const [mode, setMode] = useState<AudienceMode>(initialMode);

  // Sync state ↔ URL bidirectionally so browser back/forward and in-app
  // navigation to `?mode=…` update the active audience.
  // Functional setSearchParams reads the latest URLSearchParams without
  // keeping `searchParams` in deps (it's a new object on every render).
  useEffect(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const current = next.get("mode");
      if (mode === "candidate") {
        if (current === null) return prev; // no-op → avoid extra history entry
        next.delete("mode");
      } else {
        if (current === mode) return prev;
        next.set("mode", mode);
      }
      return next;
    }, { replace: true });
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* localStorage unavailable (private browsing) — non-fatal */
    }
  }, [mode, setSearchParams]);

  // URL → state: react to browser back/forward or external link with ?mode=…
  // We only sync when URL carries an explicit valid value — null URL is treated
  // as "no opinion" and leaves the existing state alone, which keeps URL
  // canonical without fighting the state→URL effect during initial reconcile.
  const urlMode = searchParams.get("mode");
  useEffect(() => {
    if (urlMode === "recruiter" || urlMode === "candidate") {
      setMode((prev) => (prev === urlMode ? prev : urlMode));
    }
  }, [urlMode]);

  const { data: jobsData, isLoading: jobsLoading } = useJobs({ perPage: 6 });
  const jobs = jobsData?.data ?? [];

  return (
    <main className="v3-canvas min-h-screen">
      <Helmet>
        <title>MCPHire — найди IT-работу через AI-агента</title>
        <meta
          name="description"
          content="MCPHire — первый MCP-маркетплейс вакансий. Подключи Claude, Cursor или своего AI-агента — он найдёт работу, поторгуется и забронирует интервью за тебя."
        />
        <meta property="og:title" content="MCPHire — найди IT-работу через AI-агента" />
        <meta
          property="og:description"
          content="MCPHire — первый MCP-маркетплейс вакансий. Подключи Claude, Cursor или своего AI-агента — он найдёт работу, поторгуется и забронирует интервью за тебя."
        />
        <link rel="canonical" href="https://mcphire.com/" />
      </Helmet>

      <V3Navbar lang={lang} />

      {/* ---- Hero region ----------------------------------------- */}
      <section className="px-4 pb-14" style={{ paddingTop: 24 }}>
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <V3AudienceSwitcher mode={mode} setMode={setMode} lang={lang} />
          <V3AgentBanner lang={lang} />
          <div
            role="tabpanel"
            id="v3-audience-panel"
            aria-labelledby={`v3-audience-tab-${mode}`}
          >
            <V3Hero lang={lang} mode={mode} />
            <V3StatsRow lang={lang} mode={mode} />
            {mode === "recruiter" && <V3IntegrationsStrip lang={lang} />}
          </div>
          <div className="mt-4 lg:mt-5">
            <V3LiveTicker lang={lang} />
          </div>
          <V3LogosStrip lang={lang} mode={mode} />
        </div>
      </section>

      {/* ---- Agent onboarding (CANONICAL MCP-flow affordance) ----
          This block is the entry point AI agents land on.
          Preserves: /skill.md, server.json, mcp.mcphire.com/sse,
          install.sh, REST fallback. Restyled in V3 surface idiom. */}
      <section id="agent-onboarding" className="px-4 py-16 scroll-mt-24">
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div className="v3-card p-8 md:p-11">
            <div className="max-w-3xl mx-auto text-center">
              <span className="v3-pin">
                <span className="v3-pin-dot" />
                {lang === "ru" ? "Для AI-агентов · MCP-first" : "For AI agents · MCP-first"}
              </span>
              <h2 className="v3-h2 mt-4 mb-4">
                {lang === "ru" ? (
                  <>
                    Твой агент регистрирует тебя.{" "}
                    <span className="v3-serif text-v3-hot">за 3 минуты.</span>
                  </>
                ) : (
                  <>
                    Your agent registers you.{" "}
                    <span className="v3-serif text-v3-hot">in 3 minutes.</span>
                  </>
                )}
              </h2>
              <p className="text-v3-ink2 text-base md:text-[17px] mb-6 leading-relaxed">
                {lang === "ru" ? (
                  <>
                    Отправь своему агенту (Claude, Cursor, Cline — любой MCP-клиент) одну
                    строку ниже. Он прочитает инструкцию из{" "}
                    <code className="font-mono text-[14px] px-1.5 py-0.5 rounded bg-v3-bg">
                      skill.md
                    </code>
                    , соберёт ответы на ~150 вопросов из локального контекста, покажет
                    approval screen — ты жмёшь «ок», получаешь публичное CV + instant
                    TG-пуши матчей.
                  </>
                ) : (
                  <>
                    Send your agent (Claude, Cursor, Cline — any MCP client) one line below.
                    It reads instructions from{" "}
                    <code className="font-mono text-[14px] px-1.5 py-0.5 rounded bg-v3-bg">
                      skill.md
                    </code>
                    , collects answers from local context, shows you an approval screen — you
                    confirm, get a public CV + instant TG match pings.
                  </>
                )}
              </p>

              {/* Canonical agent prompt — DO NOT translate verbatim string */}
              <div className="v3-card text-left mb-6" style={{ padding: 22, border: "2px solid rgba(255,91,40,.3)" }}>
                <div className="font-mono text-xs uppercase tracking-wider text-v3-ink mb-3 font-semibold">
                  <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle" style={{ background: "var(--v3-hot)" }} aria-hidden />
                  {lang === "ru" ? "Отправь это своему агенту" : "Send this to your agent"}
                </div>
                <PromptCopyBlock
                  prompt="Read https://mcphire.com/skill.md and register me as a candidate"
                  lang={lang}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-left mb-8">
                {[
                  {
                    n: "01",
                    t: lang === "ru" ? "Отправь агенту" : "Send to your agent",
                    d: lang === "ru"
                      ? "Одну строку выше. Агент сам читает skill.md и знает что делать."
                      : "One line above. The agent reads skill.md and knows what to do.",
                  },
                  {
                    n: "02",
                    t: lang === "ru" ? "Подтверди ответы" : "Approve the answers",
                    d: lang === "ru"
                      ? "Агент покажет approval screen с собранными данными. Правишь, жмёшь «ок»."
                      : "Agent shows an approval screen with collected data. Edit, confirm.",
                  },
                  {
                    n: "03",
                    t: lang === "ru" ? "CV + матчи" : "CV + matches",
                    d: lang === "ru"
                      ? "Публичная ссылка на резюме + инстант-пуши новых вакансий в Telegram."
                      : "Public CV URL + instant Telegram pings for new matching jobs.",
                  },
                ].map((s) => (
                  <div key={s.n} className="v3-card p-5">
                    <div className="font-mono w-8 h-8 grid place-items-center rounded-lg bg-v3-ink text-white font-bold text-sm">
                      {s.n}
                    </div>
                    <div className="font-semibold mt-3 mb-1">{s.t}</div>
                    <p className="text-sm text-v3-ink2 leading-snug">{s.d}</p>
                  </div>
                ))}
              </div>

              {/* Technical fallback for users without MCP set up */}
              <details className="text-left v3-card" style={{ padding: 20, background: "rgba(241,236,227,.6)" }}>
                <summary className="cursor-pointer text-sm font-semibold text-v3-ink2 hover:text-v3-ink">
                  {lang === "ru"
                    ? "Если MCP не настроен — технические детали подключения"
                    : "If MCP isn't set up — connection details"}
                </summary>
                <div className="mt-4 space-y-4 text-sm text-v3-ink2">
                  <p>
                    {lang === "ru"
                      ? "Один раз в терминале (macOS / Linux / WSL):"
                      : "One-time in terminal (macOS / Linux / WSL):"}
                  </p>
                  <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed text-v3-ink bg-v3-bg p-3 rounded-lg border" style={{ borderColor: "var(--v3-line2)" }}>
{`curl -fsSL https://mcphire.com/install.sh | bash`}
                  </pre>
                  <p>
                    {lang === "ru"
                      ? "Или вручную добавь в claude_desktop_config.json:"
                      : "Or manually add to claude_desktop_config.json:"}
                  </p>
                  <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed text-v3-ink bg-v3-bg p-3 rounded-lg border" style={{ borderColor: "var(--v3-line2)" }}>
{`{
  "mcpServers": {
    "mcphire": {
      "type": "sse",
      "url": "https://mcp.mcphire.com/sse"
    }
  }
}`}
                  </pre>
                  <p className="text-xs">
                    {lang === "ru" ? (
                      <>
                        Путь к файлу: macOS{" "}
                        <code className="font-mono">~/Library/Application Support/Claude/</code>{" "}
                        · Windows <code className="font-mono">%APPDATA%/Claude/</code>. Полностью quit
                        Claude Desktop (⌘Q / File → Quit) и запусти заново.
                      </>
                    ) : (
                      <>
                        File path: macOS{" "}
                        <code className="font-mono">~/Library/Application Support/Claude/</code>{" "}
                        · Windows <code className="font-mono">%APPDATA%/Claude/</code>. Fully quit
                        Claude Desktop (⌘Q / File → Quit) and relaunch.
                      </>
                    )}
                  </p>
                  <p className="text-xs">
                    {lang === "ru" ? (
                      <>
                        Нет MCP? REST fallback живёт по адресу{" "}
                        <code className="font-mono">https://api.mcphire.com/api/v1/candidate/register</code>{" "}
                        — любой агент с <code className="font-mono">curl</code> может зарегать
                        человека без MCP-клиента.
                      </>
                    ) : (
                      <>
                        No MCP? REST fallback lives at{" "}
                        <code className="font-mono">https://api.mcphire.com/api/v1/candidate/register</code>{" "}
                        — any agent with <code className="font-mono">curl</code> can register a user
                        without an MCP client.
                      </>
                    )}
                  </p>
                </div>
              </details>

              <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                <a
                  href="https://mcphire.com/skill.md"
                  className="font-semibold text-v3-ink underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity"
                  style={{ textDecorationColor: "var(--v3-hot)" }}
                >
                  skill.md (canonical) →
                </a>
                <Link
                  to="/mcp"
                  className="font-semibold text-v3-ink2 hover:text-v3-ink transition-colors no-underline"
                >
                  MCP API docs →
                </Link>
                <a
                  href="https://mcphire.com/.well-known/mcp/server.json"
                  className="font-semibold text-v3-ink2 hover:text-v3-ink transition-colors no-underline"
                >
                  server.json (manifest) →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- How it works (Sprint 10) ---------------------------- */}
      <V3HowSection lang={lang} />

      {/* ---- M2M Manifesto (Sprint 10) --------------------------- */}
      <V3M2MManifesto lang={lang} />

      {/* ---- Install harness tabs (Sprint 10) -------------------- */}
      <V3InstallBlock lang={lang} />

      {/* ---- Featured Jobs --------------------------------------- */}
      <section className="px-4 py-16">
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div className="flex items-end justify-between mb-7 gap-4 flex-wrap">
            <h2 className="v3-h2">
              {lang === "ru" ? (
                <>Свежие <span className="v3-serif text-v3-hot">вакансии</span></>
              ) : (
                <>Fresh <span className="v3-serif text-v3-hot">jobs</span></>
              )}
            </h2>
            <Link to="/jobs" className="v3-btn v3-btn-ghost">
              {lang === "ru" ? "Все вакансии" : "All jobs"} →
            </Link>
          </div>

          {jobsLoading ? (
            <SkeletonGrid count={6} />
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} showMatchScore />
              ))}
            </div>
          ) : (
            <p className="text-v3-mute text-center py-16">
              {lang === "ru" ? "Вакансии загружаются..." : "Loading jobs..."}
            </p>
          )}
        </div>
      </section>

      {/* ---- Employer CTA (V3 dark card) ------------------------- */}
      <section className="px-4 py-16">
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <div
            className="v3-card relative overflow-hidden p-10 md:p-14 text-center"
            style={{ background: "var(--v3-ink)", color: "#fff" }}
          >
            <div
              aria-hidden
              className="v3-grad-cool absolute"
              style={{
                left: -120, bottom: -120, width: 360, height: 360, borderRadius: "50%",
                filter: "blur(40px)", opacity: 0.45,
              }}
            />
            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-widest opacity-60 mb-3">
                {lang === "ru" ? "Для работодателей" : "For employers"}
              </p>
              <h2 className="v3-h2 mb-5" style={{ color: "#fff" }}>
                {lang === "ru" ? (
                  <>Разместите вакансию — <span className="v3-serif text-v3-hot">первая бесплатно</span></>
                ) : (
                  <>Post a role — <span className="v3-serif text-v3-hot">first one free</span></>
                )}
              </h2>
              <p className="text-base md:text-lg opacity-80 max-w-xl mx-auto mb-7 leading-relaxed">
                {lang === "ru"
                  ? "AI-подбор, верифицированные кандидаты, MCP-доступ для ваших агентов. Платите только за реальные интервью."
                  : "AI matching, vetted candidates, MCP access for your agents. Pay only for real interviews."}
              </p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-sm opacity-80">
                {[
                  lang === "ru" ? "Без переплат за первую вакансию" : "First role free",
                  lang === "ru" ? "AI-подбор кандидатов" : "AI candidate matching",
                  lang === "ru" ? "MCP API для AI-агентов" : "MCP API for AI agents",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-v3-hot shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
              <Link to="/employers" className="v3-btn v3-btn-primary" style={{ background: "var(--v3-hot)" }}>
                {lang === "ru" ? "Разместить вакансию бесплатно" : "Post a role free"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default HomePage;
