// ============================================================
// MCPHire V3 — Job detail hero card
// Full-width grad-hot header with white text, blurred corner blob,
// company avatar, role, salary band, match badge, primary action.
// ============================================================

import type { ReactNode } from "react";

interface JobDetailHeroProps {
  companyName: string;
  companyVerified?: boolean;
  title: string;
  salaryLabel: string;       // already formatted, e.g. "$220k — $280k" or "Зарплата не указана"
  location?: string;
  freshLabel?: string;       // e.g. "12 min", "today"
  matchScore?: number | null;
  matchLabel?: string;       // "MATCH" / "match"
  tags?: string[];
  primaryAction?: ReactNode; // existing Apply button injected verbatim
  secondaryAction?: ReactNode;
}

export function V3JobDetailHero({
  companyName,
  companyVerified,
  title,
  salaryLabel,
  location,
  freshLabel,
  matchScore,
  matchLabel = "match",
  tags = [],
  primaryAction,
  secondaryAction,
}: JobDetailHeroProps) {
  return (
    <div
      className="v3-card v3-grad-hot relative overflow-hidden mt-4"
      style={{ color: "#fff", padding: "32px 36px 36px" }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: -80,
          top: -80,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "rgba(255,255,255,.18)",
          filter: "blur(10px)",
        }}
      />
      <div className="relative">
        <div className="flex items-center gap-3">
          <div
            className="grid place-items-center font-bold text-2xl shrink-0"
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "rgba(255,255,255,.2)",
              backdropFilter: "blur(20px)",
            }}
            aria-hidden
          >
            {companyName[0]?.toUpperCase()}
          </div>
          <div>
            <div className="text-sm opacity-90 flex items-center gap-2">
              {companyName}
              {companyVerified && (
                <span className="v3-mono text-[10px]" style={{ background: "rgba(255,255,255,.2)", padding: "2px 6px", borderRadius: 6 }}>
                  ✓
                </span>
              )}
              {location && <span className="opacity-70"> · {location}</span>}
            </div>
            {freshLabel && (
              <div className="v3-mono text-xs opacity-70 mt-1">● {freshLabel}</div>
            )}
          </div>
        </div>

        <h1
          className="font-bold leading-none mt-5"
          style={{
            fontSize: "clamp(40px, 5.5vw, 72px)",
            letterSpacing: "-.035em",
          }}
        >
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <span className="text-[22px] font-bold">{salaryLabel}</span>
          {matchScore != null && (
            <span
              className="v3-pill"
              style={{
                background: "#fff",
                color: "var(--v3-hot)",
                fontWeight: 700,
                border: "none",
              }}
            >
              ★ {matchLabel} {matchScore}
            </span>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((t) => (
              <span
                key={t}
                className="v3-mono text-xs px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(255,255,255,.18)",
                  backdropFilter: "blur(20px)",
                  letterSpacing: "-.005em",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {(primaryAction || secondaryAction) && (
          <div className="flex flex-wrap gap-2.5 mt-6">
            {primaryAction}
            {secondaryAction}
          </div>
        )}
      </div>
    </div>
  );
}
