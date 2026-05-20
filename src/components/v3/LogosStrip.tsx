// ============================================================
// MCPHire V3 — Trusted-by companies strip
// ============================================================

import type { AudienceMode, Lang } from "./data";

const COMPANIES = ["Anthropic", "Cursor", "Vercel", "Linear", "Stripe", "Notion", "Replit"];

interface LogosStripProps {
  lang: Lang;
  mode: AudienceMode;
}

export function V3LogosStrip({ lang, mode }: LogosStripProps) {
  const eyebrow =
    mode === "recruiter"
      ? lang === "ru" ? "НАНИМАЮТ ЧЕРЕЗ MCPHIRE" : "HIRING ON MCPHIRE"
      : lang === "ru" ? "АГЕНТЫ ИЗ" : "AGENTS FROM";

  return (
    <div className="v3-card mt-4 lg:mt-5 px-6 py-5 flex flex-wrap items-center gap-x-8 gap-y-3">
      <span className="font-mono text-xs text-v3-mute shrink-0">{eyebrow}</span>
      {COMPANIES.map((c) => (
        <span
          key={c}
          className="text-base font-semibold text-v3-ink2"
          style={{ letterSpacing: "-.01em" }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}
