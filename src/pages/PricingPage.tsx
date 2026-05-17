// ============================================================
// MCPHire — Pricing page
// Route: /pricing — HIDDEN until monetization launch.
//
// Sprint 1 (MCP-first parity): pricing is intentionally hidden.
// Tim's call: surface monetization only after MCP onboarding flow
// is stable and we know what to charge.
//
// Implementation: <Navigate replace to="/" />. We do NOT 404 here —
// /pricing might still be linked from external sources (old emails,
// old SMM posts) and redirect-to-home preserves that traffic.
// ============================================================

import { Navigate } from "react-router-dom";

export default function PricingPage() {
  return <Navigate to="/" replace />;
}
