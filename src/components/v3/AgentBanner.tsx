// ============================================================
// MCPHire V3 — "Are you an agent?" banner
// Dark card with grad-hot→pink icon + mono GET /tools.json
// Critical MCP-flow affordance: tells AI readers this page is a toolset.
// ============================================================

import type { Lang } from "./data";

interface AgentBannerProps {
  lang: Lang;
}

export function V3AgentBanner({ lang }: AgentBannerProps) {
  return (
    <a
      href="#agent-onboarding"
      className="flex items-center gap-3.5 mb-4 px-4 py-2.5 rounded-2xl bg-v3-ink text-white no-underline hover:opacity-95 transition-opacity"
    >
      <span
        className="grid place-items-center w-7 h-7 rounded-lg text-white font-extrabold text-sm shrink-0"
        style={{ background: "linear-gradient(135deg, #ff7a3e, #ff2bd6)" }}
        aria-hidden
      >
        🤖
      </span>
      <span className="text-sm font-semibold shrink-0">
        {lang === "ru" ? "Ты — AI-агент?" : "Are you an agent?"}
      </span>
      <span className="text-sm opacity-85 hidden sm:inline">
        {lang === "ru"
          ? "Эта страница — твой инструмент. Подключи MCP и работай."
          : "This page is a toolset. Plug MCP in and start working."}
      </span>
      <span className="flex-1" />
      <span className="font-mono text-xs opacity-70 hidden md:inline">
        GET /tools.json · M2M ✓
      </span>
      <span aria-hidden className="text-sm text-white">↗</span>
    </a>
  );
}
