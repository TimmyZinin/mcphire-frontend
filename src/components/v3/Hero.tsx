// ============================================================
// MCPHire V3 — Hero (candidate + recruiter variants)
// Grid 1.4fr / 1fr: left = headline + 2 CTAs + mono command,
// right = chat simulation. Accent swaps hot↔cool by mode.
// ============================================================

import { Link } from "react-router-dom";
import type { AudienceMode, Lang } from "./data";
import { COPY, RECRUITER } from "./data";
import { V3Bubble } from "./Bubble";

interface HeroProps {
  lang: Lang;
  mode: AudienceMode;
}

export function V3Hero({ lang, mode }: HeroProps) {
  return mode === "recruiter"
    ? <HeroRecruiter lang={lang} />
    : <HeroCandidate lang={lang} />;
}

// ---- Candidate hero ------------------------------------------------------

function HeroCandidate({ lang }: { lang: Lang }) {
  const copy = COPY[lang].hero;
  const splitAt = lang === "ru" ? 2 : 1;
  const botParts = copy.h1Bot.split(" ");
  const botSerif = botParts.slice(0, splitAt).join(" ");
  const botRest = botParts.slice(splitAt).join(" ");

  return (
    <div className="grid gap-4 lg:gap-5 items-stretch grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
      {/* Left — headline card */}
      <div className="v3-card relative overflow-hidden p-8 md:p-11">
        <div
          aria-hidden
          className="v3-grad-hot absolute"
          style={{
            right: -120, top: -120, width: 360, height: 360, borderRadius: "50%",
            filter: "blur(40px)", opacity: 0.55,
          }}
        />
        <div className="relative">
          <span className="v3-pin"><span className="v3-pin-dot" /> {copy.eyebrow}</span>
          <h1 className="v3-h1 mt-5">
            {copy.h1Top}
            <br />
            <span className="text-v3-hot">
              <span className="v3-serif">{botSerif} </span>
              {botRest}
            </span>
          </h1>
          <p className="mt-5 text-[17px] leading-snug text-v3-ink2 max-w-[580px]">
            {copy.sub}
          </p>
          <div className="flex flex-wrap gap-2.5 mt-7">
            <a href="#agent-onboarding" className="v3-btn v3-btn-primary">▶ {copy.ctaPrimary}</a>
            <Link to="/jobs" className="v3-btn v3-btn-ghost">{copy.ctaSecondary} →</Link>
          </div>
          <div className="font-mono text-xs text-v3-mute mt-5">
            $ curl -fsSL https://mcphire.com/install.sh | bash
          </div>
        </div>
      </div>

      {/* Right — chat simulation */}
      <div className="v3-card p-5 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <div className="v3-grad-cool grid place-items-center w-9 h-9 rounded-xl text-white font-bold">A</div>
          <div>
            <div className="font-semibold text-sm">{lang === "ru" ? "Твой агент" : "Your agent"}</div>
            <div className="font-mono text-[11px] text-v3-mute">claude-sonnet-4.5 · mcphire@1.5</div>
          </div>
          <div className="flex-1" />
          <span className="v3-pill" style={{ height: 24, fontSize: 11 }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-v3-leaf mr-1.5" />
            live
          </span>
        </div>
        <div className="flex flex-col gap-2 mt-1.5">
          <V3Bubble who="agent" text={lang === "ru"
            ? "Нашёл 18 rust-вакансий, остановился на Anthropic — 0.97 match."
            : "Found 18 rust roles, top is Anthropic at 0.97 match."} />
          <V3Bubble who="recruiter" text={lang === "ru"
            ? "Можем 265 base + 60 RSU. Ср 10:00 PT?"
            : "We can do 265 base + 60 RSU. Wed 10am PT?"} />
          <V3Bubble who="agent" text={lang === "ru"
            ? "Беру. Бронирую и пишу prep-док."
            : "Taking it. Booking the slot, drafting prep doc."} />
          <V3Bubble who="system" text={lang === "ru"
            ? "📅 Бронь: ср 10:00 PT · prep.md → 2 страницы"
            : "📅 Booked: Wed 10am PT · prep.md → 2 pages"} />
        </div>
        <div className="font-mono mt-auto p-3 rounded-2xl bg-v3-bg flex items-center gap-2">
          <span className="text-v3-ink font-bold" aria-hidden>$</span>
          <span className="text-v3-ink2 text-[13px]">
            {lang === "ru" ? "поторгуйся ещё на 10к" : "push for 10k more"}
          </span>
          <span className="flex-1" />
          <span className="inline-block w-[2px] h-3.5 bg-v3-ink" style={{ animation: "v3-blink 1s steps(1) infinite" }} />
        </div>
      </div>
    </div>
  );
}

// ---- Recruiter hero ------------------------------------------------------

function HeroRecruiter({ lang }: { lang: Lang }) {
  const r = RECRUITER[lang];
  const splitAt = lang === "ru" ? 2 : 1;
  const botParts = r.h1Bot.split(" ");
  const botSerif = botParts.slice(0, splitAt).join(" ");
  const botRest = botParts.slice(splitAt).join(" ");

  return (
    <div className="grid gap-4 lg:gap-5 items-stretch grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
      {/* Left — headline card */}
      <div className="v3-card relative overflow-hidden p-8 md:p-11">
        <div
          aria-hidden
          className="v3-grad-cool absolute"
          style={{
            right: -120, top: -120, width: 360, height: 360, borderRadius: "50%",
            filter: "blur(40px)", opacity: 0.5,
          }}
        />
        <div className="relative">
          <span className="v3-pin">
            <span
              className="v3-pin-dot"
              style={{ background: "var(--v3-cool)", boxShadow: "0 0 0 4px rgba(42,77,255,.18)" }}
            />{" "}
            {r.pill} · MCPHire for hiring teams
          </span>
          <h1 className="v3-h1 mt-5">
            {r.h1Top}
            <br />
            <span className="text-v3-cool">
              <span className="v3-serif">{botSerif} </span>
              {botRest}
            </span>
          </h1>
          <p className="mt-5 text-[17px] leading-snug text-v3-ink2 max-w-[580px]">
            {r.sub}
          </p>
          <div className="flex flex-wrap gap-2.5 mt-7">
            <Link to="/employers" className="v3-btn v3-btn-cool">▶ {r.ctaPrimary}</Link>
            <Link to="/employer/dashboard" className="v3-btn v3-btn-ghost">{r.ctaSecondary} →</Link>
          </div>
          <div className="font-mono text-xs text-v3-mute mt-5">
            $ mcphire post --role "Senior Rust" --band 220-280k --remote
          </div>
        </div>
      </div>

      {/* Right — sourcing agent chat */}
      <div className="v3-card p-5 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <div className="v3-grad-plum grid place-items-center w-9 h-9 rounded-xl text-white font-bold">R</div>
          <div>
            <div className="font-semibold text-sm">
              {lang === "ru" ? "Твой рекрутер-агент" : "Your sourcing agent"}
            </div>
            <div className="font-mono text-[11px] text-v3-mute">mcphire-sourcer · ashby-sync · 24/7</div>
          </div>
          <div className="flex-1" />
          <span className="v3-pill" style={{ height: 24, fontSize: 11 }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-v3-leaf mr-1.5" />
            sourcing
          </span>
        </div>
        <div className="flex flex-col gap-2 mt-1.5">
          {r.chat.map((c, i) => (
            <V3Bubble key={`${c.who}-${i}`} who={c.who} text={c.text} />
          ))}
        </div>
        <div className="font-mono mt-auto p-3 rounded-2xl bg-v3-bg flex items-center gap-2">
          <span className="text-v3-ink font-bold" aria-hidden>$</span>
          <span className="text-v3-ink2 text-[13px]">{r.chatCmd}</span>
          <span className="flex-1" />
          <span className="inline-block w-[2px] h-3.5 bg-v3-ink" style={{ animation: "v3-blink 1s steps(1) infinite" }} />
        </div>
      </div>
    </div>
  );
}
