// ============================================================
// СБОРКА — Main Layout
// Wraps public pages: Navbar + main content + Footer
// ============================================================

import type { ReactNode } from "react";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <JobBoardNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
