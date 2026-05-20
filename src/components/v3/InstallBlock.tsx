// ============================================================
// MCPHire V3 — InstallBlock
// Tabs (4 harnesses) → file path + copy → dark code-pre →
// one-liner footer. Uses real MCPHire SSE endpoint snippets.
// ============================================================

import { useState } from "react";
import type { Lang } from "./data";
import { INSTALL } from "./data";

interface InstallBlockProps {
  lang: Lang;
}

export function V3InstallBlock({ lang }: InstallBlockProps) {
  const [active, setActive] = useState<string>(INSTALL.harnesses[0].id);
  const [copied, setCopied] = useState<"code" | "one" | null>(null);
  const cur = INSTALL.harnesses.find((h) => h.id === active) ?? INSTALL.harnesses[0];

  const copy = async (text: string, key: "code" | "one") => {
    let ok = false;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch {
      /* fall through to legacy fallback */
    }
    if (!ok) {
      // Legacy fallback for insecure contexts (file://) and old browsers.
      // textarea must be removed even if select()/execCommand throw → finally.
      let ta: HTMLTextAreaElement | null = null;
      try {
        ta = document.createElement("textarea");
        ta.value = text;
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
    setCopied(ok ? key : null);
    if (ok) {
      window.setTimeout(() => setCopied((k) => (k === key ? null : k)), 1500);
    }
  };

  return (
    <section className="px-4 pb-16">
      <div className="mx-auto" style={{ maxWidth: 1320 }}>
        <div className="v3-card overflow-hidden p-0">
          {/* Header */}
          <div className="px-6 pt-5 flex items-center gap-3 flex-wrap">
            <span className="v3-pin" style={{ background: "var(--v3-ink)", color: "#fff" }}>
              <span
                className="v3-pin-dot"
                style={{ background: "var(--v3-leaf)", boxShadow: "0 0 0 4px rgba(10,138,82,.25)" }}
                aria-hidden
              />
              M2M ready · MCP 1.5
            </span>
            <h3 className="text-[22px] font-bold m-0" style={{ letterSpacing: "-.02em" }}>
              {lang === "ru" ? "Подключи свой harness" : "Connect your harness"}
            </h3>
          </div>

          {/* Tabs */}
          <div
            className="flex flex-wrap gap-1.5 px-6 pt-4"
            role="tablist"
            aria-label={lang === "ru" ? "MCP-клиенты" : "MCP harnesses"}
          >
            {INSTALL.harnesses.map((h) => {
              const isActive = active === h.id;
              return (
                <button
                  key={h.id}
                  type="button"
                  role="tab"
                  id={`v3-install-tab-${h.id}`}
                  aria-selected={isActive}
                  aria-controls="v3-install-panel"
                  onClick={() => setActive(h.id)}
                  className="px-3.5 py-2 rounded-full border text-sm font-semibold cursor-pointer transition-colors"
                  style={{
                    borderColor: "var(--v3-line)",
                    background: isActive ? "var(--v3-ink)" : "#fff",
                    color: isActive ? "#fff" : "var(--v3-ink2)",
                    letterSpacing: "-.005em",
                  }}
                >
                  {h.name}
                </button>
              );
            })}
          </div>

          {/* Path + copy */}
          <div className="px-6 pt-3 flex justify-between items-center text-xs v3-mono text-v3-mute">
            <span className="truncate">{cur.file}</span>
            <button
              type="button"
              onClick={() => copy(cur.code, "code")}
              className="text-v3-ink font-semibold hover:opacity-80 transition-opacity"
              aria-label={lang === "ru" ? "Скопировать код" : "Copy code"}
            >
              {copied === "code"
                ? (lang === "ru" ? "✓ скопировано" : "✓ copied")
                : (lang === "ru" ? "↪ копировать" : "↪ copy")}
            </button>
          </div>

          {/* Code block */}
          <pre
            id="v3-install-panel"
            role="tabpanel"
            aria-labelledby={`v3-install-tab-${active}`}
            className="mx-6 mt-2 px-5 py-4 rounded-xl text-[13px] leading-relaxed overflow-x-auto"
            style={{ background: "#161310", color: "#f1ece3" }}
          >
            <code>{cur.code}</code>
          </pre>

          {/* One-liner footer */}
          <div className="flex justify-between items-center gap-3 flex-wrap px-6 py-4">
            <div className="v3-mono text-xs text-v3-ink2 min-w-0 flex items-center gap-2">
              <span className="text-v3-ink font-bold" aria-hidden>$</span>
              <span className="truncate">{INSTALL.one.body}</span>
              <button
                type="button"
                onClick={() => copy(INSTALL.one.body, "one")}
                className="text-v3-ink font-semibold hover:opacity-80 transition-opacity shrink-0"
                aria-label={lang === "ru" ? "Скопировать однострочник" : "Copy one-liner"}
              >
                {copied === "one"
                  ? (lang === "ru" ? "✓" : "✓")
                  : (lang === "ru" ? "↪" : "↪")}
              </button>
            </div>
            <span className="text-[11px] text-v3-mute">{INSTALL.one.note[lang]}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
