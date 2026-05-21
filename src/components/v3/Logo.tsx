// ============================================================
// MCPHire V3 — Wordmark + grad-hot mark with blinking cursor
//
// Sergei feedback 2026-05-21:
//   - При клике на лого внизу страницы — возвращать к началу.
//   - Курсор в марке "съехал" / "в другом регистре" — выровнен по
//     baseline глифа "m" через CSS (см. index.css .v3-logo-mark::after).
// ============================================================

import type { MouseEventHandler } from "react";
import { Link, useLocation } from "react-router-dom";

interface V3LogoProps {
  size?: number;
  to?: string;
}

export function V3Logo({ size = 18, to = "/" }: V3LogoProps) {
  const { pathname } = useLocation();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (pathname === to) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className="inline-flex items-center gap-2 font-bold tracking-tight no-underline text-v3-ink"
      style={{ fontSize: size, letterSpacing: "-0.02em" }}
    >
      <span className="v3-logo-mark v3-grad-hot">m</span>
      <span>MCPHire</span>
    </Link>
  );
}
