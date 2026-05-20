// ============================================================
// MCPHire V3 — Audience switcher (candidate ↔ recruiter)
// Big segmented control; active gets ink fill + left accent bar.
// ============================================================

import type { AudienceMode, Lang } from "./data";

interface AudienceSwitcherProps {
  mode: AudienceMode;
  setMode: (m: AudienceMode) => void;
  lang: Lang;
}

export function V3AudienceSwitcher({ mode, setMode, lang }: AudienceSwitcherProps) {
  const options: ReadonlyArray<{ id: AudienceMode; label: string; icon: string; accent: string }> = [
    { id: "candidate", label: lang === "ru" ? "Я ищу работу" : "I want a job",  icon: "💼", accent: "var(--v3-hot)" },
    { id: "recruiter", label: lang === "ru" ? "Я нанимаю"     : "I'm hiring",   icon: "🎯", accent: "var(--v3-cool)" },
  ];

  return (
    <div
      className="v3-card flex gap-1.5 p-1.5 mb-4"
      style={{ borderRadius: 18, background: "rgba(255,255,255,.85)" }}
      role="tablist"
      aria-label={lang === "ru" ? "Аудитория" : "Audience"}
    >
      {options.map((o) => {
        const active = mode === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role="tab"
            id={`v3-audience-tab-${o.id}`}
            aria-selected={active}
            aria-controls="v3-audience-panel"
            onClick={() => setMode(o.id)}
            className="relative flex-1 flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-2xl border-0 cursor-pointer font-semibold text-[15px] transition-all overflow-hidden"
            style={{
              background: active ? "var(--v3-ink)" : "transparent",
              color: active ? "#fff" : "var(--v3-ink2)",
            }}
          >
            {active && (
              <span
                aria-hidden
                style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: o.accent }}
              />
            )}
            <span className="text-lg" aria-hidden>{o.icon}</span>
            <span>{o.label}</span>
            {active && (
              <span aria-hidden className="ml-1 text-xs" style={{ color: o.accent }}>●</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
