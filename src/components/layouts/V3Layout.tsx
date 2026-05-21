// ============================================================
// MCPHire V3 — universal layout wrapper
// V3Navbar (sticky pill-nav) + page content + V3 Footer
// Used by pages that don't render their own navbar/footer.
//
// NOTE: wrapper is <div>, not <main>, because all wrapped pages
// already render their own <main> element (PrivacyPolicy, ToolsPage,
// SalaryCalculator, ResumeChecklist, ResumeReview). Avoids nested
// landmark roles — Codex review 2026-05-22.
// ============================================================

import type { ReactNode } from "react";
import { V3Navbar } from "@/components/v3/Navbar";
import Footer from "@/components/Footer";

interface V3LayoutProps {
  children: ReactNode;
}

export function V3Layout({ children }: V3LayoutProps) {
  return (
    <div className="v3-canvas min-h-screen flex flex-col">
      <V3Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
