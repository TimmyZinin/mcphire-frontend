// ============================================================
// MCPHire V3 — Stats row (3 bento cards under hero)
// Candidate: grad-hot card + 2 white | Recruiter: grad-cool + 2 white
// ============================================================

import type { AudienceMode, Lang } from "./data";
import { COPY, RECRUITER } from "./data";

interface StatsRowProps {
  lang: Lang;
  mode: AudienceMode;
}

export function V3StatsRow({ lang, mode }: StatsRowProps) {
  return mode === "recruiter"
    ? <StatsRecruiter lang={lang} />
    : <StatsCandidate lang={lang} />;
}

function StatsCandidate({ lang }: { lang: Lang }) {
  const c = COPY[lang].hero;
  return (
    <div className="grid gap-4 lg:gap-5 mt-4 lg:mt-5 grid-cols-1 md:grid-cols-3">
      <div className="v3-card v3-grad-hot relative overflow-hidden px-6 py-7 text-white">
        <span className="font-mono text-[11px] uppercase tracking-wider opacity-80">
          {lang === "ru" ? "Сейчас в системе" : "Live in the system"}
        </span>
        <div className="text-[64px] font-bold leading-none mt-2.5" style={{ letterSpacing: "-.03em" }}>
          {c.stat1[0]}
        </div>
        <div className="text-sm opacity-90 mt-1">{c.stat1[1]}</div>
      </div>

      <div className="v3-card px-6 py-7">
        <span className="font-mono text-[11px] uppercase tracking-wider text-v3-mute">
          {lang === "ru" ? "VS legacy job boards" : "vs legacy boards"}
        </span>
        <div className="v3-serif text-[64px] font-bold leading-none mt-2.5" style={{ letterSpacing: "-.03em" }}>
          {c.stat2[0]}
        </div>
        <div className="text-sm text-v3-ink2 mt-1">{c.stat2[1]}</div>
      </div>

      <div className="v3-card px-6 py-7 flex gap-6 items-center">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-v3-mute">
            {lang === "ru" ? "Медианный отклик" : "Median reply"}
          </span>
          <div
            className="text-[64px] font-bold leading-none mt-2.5 text-v3-cool"
            style={{ letterSpacing: "-.03em" }}
          >
            {c.stat3[0]}
          </div>
          <div className="text-sm text-v3-ink2 mt-1">{c.stat3[1]}</div>
        </div>
        <div className="flex-1 grid grid-cols-12 gap-[3px] h-20 items-end" aria-hidden>
          {Array.from({ length: 12 }).map((_, i) => {
            const h = 20 + Math.abs(Math.sin(i * 0.9)) * 60;
            return (
              <div
                key={i}
                style={{
                  height: `${h}%`,
                  borderRadius: 4,
                  background: i === 11 ? "var(--v3-hot)" : "#e7e0d6",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatsRecruiter({ lang }: { lang: Lang }) {
  const r = RECRUITER[lang];
  const labels = lang === "ru"
    ? ["Первый контакт", "В офер", "За кандидата"]
    : ["First touch", "→ offer", "Per lead"];
  const colors = ["#fff", "var(--v3-cool)", "var(--v3-leaf)"];

  return (
    <div className="grid gap-4 lg:gap-5 mt-4 lg:mt-5 grid-cols-1 md:grid-cols-3">
      {r.stats.map(([n, l], i) => {
        const isFirst = i === 0;
        return (
          <div
            key={`${n}-${l}`}
            className={`v3-card ${isFirst ? "v3-grad-cool" : ""} relative overflow-hidden px-6 py-7`}
            style={{ color: isFirst ? "#fff" : "var(--v3-ink)" }}
          >
            <span
              className="font-mono text-[11px] uppercase tracking-wider"
              style={{ color: isFirst ? "rgba(255,255,255,.85)" : "var(--v3-mute)" }}
            >
              {labels[i]}
            </span>
            <div
              className="text-[64px] font-bold leading-none mt-2.5"
              style={{ letterSpacing: "-.03em", color: colors[i] }}
            >
              {n}
            </div>
            <div
              className="text-sm mt-1"
              style={{ color: isFirst ? "rgba(255,255,255,.9)" : "var(--v3-ink2)" }}
            >
              {l}
            </div>
          </div>
        );
      })}
    </div>
  );
}
