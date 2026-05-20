// ============================================================
// MCPHire V3 — Wordmark + grad-hot mark with blinking cursor
// ============================================================

import { Link } from "react-router-dom";

interface V3LogoProps {
  size?: number;
  to?: string;
}

export function V3Logo({ size = 18, to = "/" }: V3LogoProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 font-bold tracking-tight no-underline text-v3-ink"
      style={{ fontSize: size, letterSpacing: "-0.02em" }}
    >
      <span className="v3-logo-mark v3-grad-hot">m</span>
      <span>MCPHire</span>
    </Link>
  );
}
