// ============================================================
// MCPHire — PromptCopyBlock
// Shows the canonical "tell your agent" prompt + a Copy button.
// Copy logic mirrors InstallBlock.tsx (clipboard API + legacy fallback).
// ============================================================

import { useState } from "react";
import { track } from "@/lib/track";
import type { Lang } from "./data";

interface PromptCopyBlockProps {
  prompt: string;
  lang: Lang;
}

export function PromptCopyBlock({ prompt, lang }: PromptCopyBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    let ok = false;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(prompt);
        ok = true;
      }
    } catch {
      /* fall through to legacy fallback */
    }
    if (!ok) {
      let ta: HTMLTextAreaElement | null = null;
      try {
        ta = document.createElement("textarea");
        ta.value = prompt;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-1000px";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      } finally {
        if (ta && ta.parentNode) ta.parentNode.removeChild(ta);
      }
    }
    setCopied(ok);
    if (ok) {
      track("skill_line_copy", { page: window.location.pathname });
      window.setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div
      className="relative rounded-xl px-4 py-3 pr-24 overflow-x-auto max-w-full"
      style={{ background: "#161310" }}
    >
      <button
        type="button"
        onClick={copy}
        className="v3-mono absolute top-1/2 -translate-y-1/2 right-2 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-v3-hot"
        style={{ background: "rgba(255,255,255,.10)", color: "#f1ece3", backdropFilter: "blur(4px)" }}
        aria-label={lang === "ru" ? "Скопировать промт" : "Copy prompt"}
      >
        {copied ? (lang === "ru" ? "✓ скопировано" : "✓ copied") : (lang === "ru" ? "Копировать" : "Copy")}
      </button>
      <code className="block whitespace-pre-wrap break-words v3-mono text-[13px]" style={{ color: "#f1ece3" }}>
        {prompt}
      </code>
    </div>
  );
}
