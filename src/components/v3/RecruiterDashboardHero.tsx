// ============================================================
// MCPHire V3 — Recruiter dashboard hero
// Header card + KPI row (4 cards, first is gradient) +
// 5-stage pipeline columns + 60-min activity bar chart.
// ============================================================

interface KPI {
  label: string;
  value: string;
  delta?: string;
}

interface PipelineStage {
  name: string;
  total: number;
  hot: number;
  preview?: ReadonlyArray<{ initials: string; score: number; mins: number; name?: string }>;
}

interface RecruiterDashboardHeroProps {
  title?: string;
  subtitle?: string;
  kpis: ReadonlyArray<KPI>;
  stages: ReadonlyArray<PipelineStage>;
  activitySamples?: number; // bars in last 60 min (default 60)
}

const STAGE_GRADS = ["v3-grad-cool", "v3-grad-plum", "v3-grad-sun", "v3-grad-leaf", "v3-grad-hot"];

export function V3RecruiterDashboardHero({
  title = "Воронка найма",
  subtitle = "обновлено сейчас",
  kpis,
  stages,
  activitySamples = 60,
}: RecruiterDashboardHeroProps) {
  return (
    <div className="mx-auto" style={{ maxWidth: 1500 }}>
      {/* Header */}
      <div className="v3-card flex justify-between items-end gap-5 flex-wrap p-7">
        <div>
          <span className="v3-pin">
            <span className="v3-pin-dot" aria-hidden /> {subtitle}
          </span>
          <h2
            className="font-bold leading-none mt-3"
            style={{ fontSize: 44, letterSpacing: "-.03em" }}
          >
            {title} <span className="v3-serif text-v3-hot">Q2</span>
          </h2>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {kpis.map((k, i) => {
          const isFirst = i === 0;
          return (
            <div
              key={k.label}
              className={`v3-card ${isFirst ? "v3-grad-hot" : ""} p-5`}
              style={{ color: isFirst ? "#fff" : "var(--v3-ink)" }}
            >
              <span
                className="v3-mono text-[11px] uppercase"
                style={{
                  letterSpacing: ".08em",
                  opacity: isFirst ? 0.85 : 1,
                  color: isFirst ? "#fff" : "var(--v3-mute)",
                }}
              >
                {k.label}
              </span>
              <div
                className="font-bold leading-none mt-2.5"
                style={{ fontSize: 48, letterSpacing: "-.035em" }}
              >
                {k.value}
              </div>
              {k.delta && (
                <div
                  className="text-xs font-semibold mt-2"
                  style={{ color: isFirst ? "rgba(255,255,255,.85)" : "var(--v3-leaf)" }}
                >
                  ▲ {k.delta}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3.5 mt-4">
        {stages.map((s, i) => (
          <div key={s.name} className="v3-card p-4" style={{ minHeight: 320 }}>
            <div className="flex items-center justify-between">
              <span className="v3-chip" style={{ background: "var(--v3-bg)" }}>{s.name}</span>
              <span className="v3-mono text-xs text-v3-mute">{s.total}</span>
            </div>
            <div
              className={`${STAGE_GRADS[i % STAGE_GRADS.length]} flex items-baseline gap-2.5 mt-3.5 px-3.5 py-4`}
              style={{
                borderRadius: 16,
                // Sun gradient is light yellow — use ink text for AA contrast.
                color: STAGE_GRADS[i % STAGE_GRADS.length] === "v3-grad-sun" ? "var(--v3-ink)" : "#fff",
              }}
            >
              <span
                className="font-bold leading-none"
                style={{ fontSize: 40, letterSpacing: "-.03em" }}
              >
                {s.hot}
              </span>
              <span className="text-xs opacity-90">горячих</span>
            </div>
            {s.preview && s.preview.length > 0 && (
              <div className="grid gap-2.5 mt-4">
                {s.preview.slice(0, 3).map((p, k) => (
                  <div
                    key={`${p.initials}-${k}`}
                    className="flex gap-2.5 items-center px-2.5 py-2 rounded-xl"
                    style={{ background: "var(--v3-bg)" }}
                  >
                    <div
                      className="grid place-items-center font-bold text-[11px]"
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 9,
                        background: ["#ffd2b8", "#cfe0ff", "#e9d6ff", "#cfe7d8", "#fff0b8"][i % 5],
                        color: "var(--v3-ink)",
                      }}
                    >
                      {p.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      {p.name && (
                        <div className="text-[13px] font-semibold truncate">{p.name}</div>
                      )}
                      <div className="v3-mono text-[10px] text-v3-mute">{p.score} · {p.mins}m</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Activity chart */}
      <div className="v3-card p-6 mt-4">
        <div className="flex justify-between items-baseline">
          <h3 className="text-xl font-bold m-0" style={{ letterSpacing: "-.02em" }}>
            Активность агентов · последние 60 мин
          </h3>
          <span className="v3-chip">live</span>
        </div>
        <div
          className="grid items-end mt-4"
          style={{
            gridTemplateColumns: `repeat(${activitySamples}, 1fr)`,
            gap: 3,
            height: 80,
          }}
          aria-hidden
        >
          {Array.from({ length: activitySamples }).map((_, i) => {
            const v = 0.25 + Math.abs(Math.sin((i + 1) * 0.6)) * 0.75;
            const isLatest = i > activitySamples - 10;
            return (
              <div
                key={i}
                style={{
                  height: `${v * 100}%`,
                  borderRadius: 4,
                  background: isLatest
                    ? "var(--v3-hot)"
                    : "linear-gradient(180deg, #ffb38a, #ff5b28)",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
