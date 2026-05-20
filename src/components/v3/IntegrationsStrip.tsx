// ============================================================
// MCPHire V3 — ATS / Slack integrations strip (recruiter mode only)
// ============================================================

import type { Lang } from "./data";
import { RECRUITER } from "./data";

const ICON_COLORS = ["#ff5b28", "#0a8a52", "#a04bff", "#2a4dff", "#ffd55a", "#4a154b", "#5e6ad2", "#000"];

interface IntegrationsStripProps {
  lang: Lang;
}

export function V3IntegrationsStrip({ lang }: IntegrationsStripProps) {
  const r = RECRUITER[lang];
  return (
    <div className="v3-card mt-4 lg:mt-5 px-6 py-7">
      <div className="grid items-center gap-7 grid-cols-1 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <span className="v3-pin">
            <span
              className="v3-pin-dot"
              style={{ background: "var(--v3-cool)", boxShadow: "0 0 0 4px rgba(42,77,255,.18)" }}
            />{" "}
            M2M
          </span>
          <h3 className="text-[26px] font-bold leading-tight mt-3 mb-1.5" style={{ letterSpacing: "-.02em" }}>
            {r.integrationsTitle}
          </h3>
          <p className="text-v3-ink2 text-sm leading-snug">{r.integrationsSub}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {r.integrations.map((name, i) => (
            <div
              key={name}
              className="flex items-center gap-2.5 px-3.5 py-3 rounded-2xl bg-v3-bg border"
              style={{ borderColor: "var(--v3-line2)" }}
            >
              <div
                className="w-7 h-7 rounded-lg grid place-items-center text-white text-[13px] font-bold shrink-0"
                style={{ background: ICON_COLORS[i % ICON_COLORS.length] }}
              >
                {name[0]}
              </div>
              <span className="text-sm font-semibold truncate">{name}</span>
              <span className="flex-1" />
              <span className="text-[10px] font-bold text-v3-leaf">●</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
