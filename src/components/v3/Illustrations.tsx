// ============================================================
// MCPHire V3 — flat-vector step illustrations
// Stripe/Linear-style primitives (rect, circle, path).
// Tinted with a single accent per scene.
// ============================================================

interface IllustrationProps {
  tint?: string;
}

export function V3IllustrationPlug({ tint = "#fff" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 240 160" width="100%" height="100%" style={{ display: "block" }} aria-hidden="true" focusable="false">
      <rect x="32" y="36" width="120" height="78" rx="8" fill="#fff" />
      <rect x="32" y="36" width="120" height="14" rx="8" fill="#181410" />
      <circle cx="42" cy="43" r="2.6" fill="#ff5b28" />
      <circle cx="50" cy="43" r="2.6" fill="#ffd55a" />
      <circle cx="58" cy="43" r="2.6" fill="#0a8a52" />
      <rect x="22" y="114" width="140" height="6" rx="3" fill="#181410" />
      <rect x="40" y="56" width="76" height="6" rx="3" fill="#dfd8cd" />
      <rect x="40" y="68" width="56" height="6" rx="3" fill="#dfd8cd" />
      <rect x="40" y="80" width="48" height="6" rx="3" fill="#0a8a52" />
      <rect x="40" y="92" width="40" height="6" rx="3" fill="#dfd8cd" />
      <path d="M 152 80 C 180 80, 180 130, 200 130" stroke={tint} strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="180" y="116" width="44" height="32" rx="6" fill="#181410" />
      <rect x="186" y="124" width="6" height="6" rx="1" fill={tint} />
      <rect x="196" y="124" width="6" height="6" rx="1" fill={tint} />
      <rect x="186" y="134" width="6" height="6" rx="1" fill={tint} />
      <rect x="196" y="134" width="6" height="6" rx="1" fill={tint} />
      <text x="206" y="138" fill={tint} fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="10">MCP</text>
    </svg>
  );
}

export function V3IllustrationProfile({ tint = "#fff" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 240 160" width="100%" height="100%" style={{ display: "block" }} aria-hidden="true" focusable="false">
      <rect x="60" y="36" width="120" height="92" rx="10" fill="#fff" />
      <circle cx="84" cy="68" r="14" fill="#ff5b28" />
      <rect x="106" y="58" width="60" height="8" rx="4" fill="#181410" />
      <rect x="106" y="72" width="42" height="6" rx="3" fill="#dfd8cd" />
      <rect x="72" y="96" width="32" height="14" rx="7" fill="#cfe0ff" />
      <rect x="110" y="96" width="26" height="14" rx="7" fill="#e9d6ff" />
      <rect x="142" y="96" width="30" height="14" rx="7" fill="#cfe7d8" />
      <rect x="14" y="14" width="38" height="16" rx="8" fill={tint} stroke="#181410" strokeWidth="1.4" />
      <text x="22" y="25" fill="#181410" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="9">Rust</text>
      <rect x="198" y="22" width="36" height="16" rx="8" fill={tint} stroke="#181410" strokeWidth="1.4" />
      <text x="206" y="33" fill="#181410" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="9">MCP</text>
      <rect x="6" y="124" width="44" height="16" rx="8" fill={tint} stroke="#181410" strokeWidth="1.4" />
      <text x="13" y="135" fill="#181410" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="9">tokio</text>
    </svg>
  );
}

export function V3IllustrationCalendar({ tint = "#fff" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 240 160" width="100%" height="100%" style={{ display: "block" }} aria-hidden="true" focusable="false">
      <rect x="22" y="30" width="120" height="100" rx="10" fill="#fff" />
      <rect x="22" y="30" width="120" height="20" rx="10" fill="#181410" />
      <rect x="22" y="42" width="120" height="8" fill="#181410" />
      <circle cx="38" cy="40" r="3" fill="#ff5b28" />
      <circle cx="48" cy="40" r="3" fill="#ffd55a" />
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 5 }).map((_, c) => {
          const isBooked = r === 1 && c === 2;
          return (
            <rect
              key={`${r}-${c}`}
              x={30 + c * 22}
              y={60 + r * 16}
              width="18"
              height="12"
              rx="2"
              fill={isBooked ? "#0a8a52" : "#f1ece3"}
            />
          );
        })
      )}
      <text x="30" y="124" fill="#181410" fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="9">Wed · 10:00 PT</text>
      <circle cx="186" cy="56" r="22" fill="#ffd55a" />
      <circle cx="194" cy="50" r="20" fill={tint} />
      <rect x="148" y="86" width="76" height="36" rx="10" fill="#fff" stroke="#181410" strokeWidth="1.4" />
      <path d="M 160 122 L 156 132 L 170 122 Z" fill="#fff" stroke="#181410" strokeWidth="1.4" />
      <rect x="156" y="94" width="46" height="6" rx="3" fill="#181410" />
      <rect x="156" y="104" width="32" height="6" rx="3" fill="#ff5b28" />
    </svg>
  );
}
