// ============================================================
// СБОРКА — Auth Layout
// Centered card layout for login / register pages.
// No main navbar — minimal branding only.
// ============================================================

import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 px-4 py-12">
      {/* Minimal branding */}
      <Link
        to="/"
        className="font-heading font-black text-2xl tracking-tight text-primary flex items-center gap-2 mb-8"
      >
        <span className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-black text-sm">
          С
        </span>
        СБОРКА<span className="text-[hsl(var(--cta-hot,_11_73%_54%))]">.</span>
      </Link>

      {/* Content card */}
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-sm p-8">
        {children}
      </div>

      {/* Footer note */}
      <p className="mt-6 text-xs text-muted-foreground text-center">
        © 2026 СБОРКА. Карьерный клуб для IT-специалистов.
      </p>
    </div>
  );
}
