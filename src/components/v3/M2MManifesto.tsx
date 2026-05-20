// ============================================================
// MCPHire V3 — M2M Manifesto card
// Warm pastel-gradient surface with corner plum blob,
// 3-column body, mono sign + tagline footer.
// ============================================================

import type { Lang } from "./data";
import { MANIFESTO } from "./data";

interface M2MManifestoProps {
  lang: Lang;
}

export function V3M2MManifesto({ lang }: M2MManifestoProps) {
  const m = MANIFESTO[lang];
  return (
    <section className="px-4 py-12">
      <div className="mx-auto" style={{ maxWidth: 1320 }}>
        <div
          className="v3-card relative overflow-hidden p-10 md:p-12"
          style={{ background: "linear-gradient(135deg, #fff7ee 0%, #ffe2d2 60%, #ffd1ff 100%)" }}
        >
          <div
            aria-hidden
            className="v3-grad-plum absolute"
            style={{
              right: -60, top: -60, width: 220, height: 220,
              borderRadius: "50%", opacity: 0.4,
            }}
          />
          <div className="relative">
            <span className="v3-pin" style={{ background: "#fff", borderColor: "transparent" }}>
              <span
                className="v3-pin-dot"
                style={{ background: "var(--v3-hot)", boxShadow: "0 0 0 4px rgba(255,91,40,.2)" }}
                aria-hidden
              />
              {m.tag}
            </span>
            <h2 className="v3-h2 mt-4 leading-tight">
              {lang === "ru" ? "Мы верим в " : "We believe in "}
              <span className="v3-serif text-v3-hot">machine-to-machine</span>
              <span>.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-7">
              {m.body.map((p, i) => (
                <div key={i}>
                  <div className="v3-mono w-9 h-9 rounded-xl grid place-items-center text-white font-bold text-sm" style={{ background: "var(--v3-ink)" }}>
                    0{i + 1}
                  </div>
                  <p className="text-[15px] leading-snug mt-3 text-v3-ink">{p}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center flex-wrap gap-2 mt-7 pt-4.5 border-t" style={{ borderColor: "var(--v3-line)" }}>
              <span className="v3-mono text-xs text-v3-ink2">{m.sign}</span>
              <span className="v3-mono text-xs text-v3-ink2">M2M · NO CAPTCHA · NO BANS · HONEST SIGNAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
