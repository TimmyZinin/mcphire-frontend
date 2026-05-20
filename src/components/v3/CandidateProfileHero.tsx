// ============================================================
// MCPHire V3 — Candidate profile hero
// Two-card row: personal card + grad-hot MCP score card (144px digit).
// ============================================================

import type { ReactNode } from "react";

interface CandidateProfileHeroProps {
  name: string;
  title: string;
  location?: string;
  ask?: string;
  available?: string;
  match: number;
  matchSubtitle?: string;        // e.g. "композитный · 8 сигналов" or "completeness preview"
  skillSignals?: ReadonlyArray<readonly [string, number]>;
  highlights?: string[];
  primaryAction?: ReactNode;
  secondaryActions?: ReactNode;
  statusLabel?: string; // e.g. "Открыт к офферам · агент онлайн"
  avatarUrl?: string;
}

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
}

export function V3CandidateProfileHero({
  name,
  title,
  location,
  ask,
  available,
  match,
  matchSubtitle,
  skillSignals = [],
  highlights = [],
  primaryAction,
  secondaryActions,
  statusLabel,
  avatarUrl,
}: CandidateProfileHeroProps) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 lg:gap-5">
        {/* Left — personal card */}
        <div className="v3-card relative overflow-hidden p-8">
          <div
            aria-hidden
            className="v3-grad-cool absolute"
            style={{
              left: -80, top: -80, width: 260, height: 260,
              borderRadius: "50%", opacity: 0.15, filter: "blur(20px)",
            }}
          />
          <div className="relative flex flex-wrap items-center gap-6">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="shrink-0"
                style={{ width: 120, height: 120, borderRadius: 28, objectFit: "cover" }}
              />
            ) : (
              <div
                className="v3-grad-plum grid place-items-center text-white font-bold shrink-0"
                style={{ width: 120, height: 120, borderRadius: 28, fontSize: 44 }}
                aria-hidden
              >
                {initials(name)}
              </div>
            )}
            <div className="min-w-0">
              {statusLabel && (
                <span className="v3-pin">
                  <span className="v3-pin-dot" aria-hidden /> {statusLabel}
                </span>
              )}
              <h1
                className="font-bold leading-none mt-3"
                style={{ fontSize: 44, letterSpacing: "-.03em" }}
              >
                {name}
              </h1>
              <div className="text-v3-ink2 text-[17px] mt-1.5">{title}</div>
              <div className="flex flex-wrap gap-3.5 text-v3-ink2 text-sm mt-3.5">
                {location && <span>📍 {location}</span>}
                {ask && <span>💰 {ask}</span>}
                {available && <span>📅 {available}</span>}
              </div>
            </div>
          </div>
          {(primaryAction || secondaryActions) && (
            <div className="flex flex-wrap gap-2.5 mt-6 relative">
              {primaryAction}
              {secondaryActions}
            </div>
          )}
        </div>

        {/* Right — MCP score card (grad-hot, 144px digit) */}
        <div
          className="v3-card v3-grad-hot relative overflow-hidden flex flex-col justify-between"
          style={{ color: "#fff", padding: 28 }}
        >
          <span
            className="v3-mono text-[11px] uppercase opacity-85"
            style={{ letterSpacing: ".08em" }}
          >
            MCP score
          </span>
          <div>
            <div
              className="font-bold leading-none"
              style={{ fontSize: 144, letterSpacing: "-.05em" }}
            >
              {match}
            </div>
            <div className="text-sm opacity-90 mt-1">{matchSubtitle ?? `композитный · ${skillSignals.length || 8} сигналов`}</div>
          </div>
          {skillSignals.length > 0 && (
            <div className="grid gap-2 mt-4">
              {skillSignals.map(([label, v]) => (
                <div key={label}>
                  <div className="flex justify-between text-xs opacity-90">
                    <span>{label}</span>
                    <span>{v}</span>
                  </div>
                  <div
                    className="rounded-full mt-1"
                    style={{ height: 4, background: "rgba(255,255,255,.25)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${Math.max(0, Math.min(100, v))}%`, background: "#fff" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Highlights row (3 cards) */}
      {highlights.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {highlights.slice(0, 3).map((h, i) => (
            <div key={i} className="v3-card p-6">
              <div
                className={`${["v3-grad-cool", "v3-grad-plum", "v3-grad-leaf"][i]} grid place-items-center text-white font-bold`}
                style={{ width: 44, height: 44, borderRadius: 14 }}
              >
                0{i + 1}
              </div>
              <div className="text-[18px] font-semibold mt-3.5" style={{ letterSpacing: "-.015em" }}>
                {h}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
