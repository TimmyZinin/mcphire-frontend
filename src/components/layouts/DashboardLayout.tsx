// ============================================================
// MCPHire — Dashboard Layout
// Navbar + sidebar for employer / seeker dashboards.
// Sidebar on desktop, bottom nav on mobile.
// ============================================================

import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  PlusCircle,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import { useAuth } from "@/contexts/AuthContext";

// ---- Nav item types ----------------------------------------

interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
}

const seekerNav: NavItem[] = [
  { to: "/profile", label: "Мой профиль", icon: <User className="w-4 h-4" /> },
  { to: "/applications", label: "Мои отклики", icon: <FileText className="w-4 h-4" /> },
  { to: "/jobs", label: "Вакансии", icon: <Briefcase className="w-4 h-4" /> },
];

const employerNav: NavItem[] = [
  {
    to: "/employer/dashboard",
    label: "Дашборд",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    to: "/employer/jobs/create",
    label: "Разместить вакансию",
    icon: <PlusCircle className="w-4 h-4" />,
  },
  {
    to: "/employer/applications",
    label: "Отклики",
    icon: <Users className="w-4 h-4" />,
  },
];

// ---- Sidebar item ------------------------------------------

interface SidebarItemProps {
  item: NavItem;
  isActive: boolean;
  onClick?: () => void;
}

function SidebarItem({ item, isActive }: SidebarItemProps) {
  return (
    <Link
      to={item.to}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-semibold"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
    >
      {item.icon}
      {item.label}
    </Link>
  );
}

// ---- Layout ------------------------------------------------

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();
  const location = useLocation();

  const nav = user?.role === "employer" ? employerNav : seekerNav;
  const isActive = (to: string) => location.pathname === to || location.pathname.startsWith(to + "/");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <JobBoardNavbar />

      <div className="flex-1 flex max-w-[1280px] mx-auto w-full px-4 md:px-8 py-6 gap-8">
        {/* Sidebar — visible on desktop */}
        <aside className="hidden md:flex flex-col w-56 shrink-0">
          <nav className="flex flex-col gap-1 sticky top-24">
            {nav.map((item) => (
              <SidebarItem key={item.to} item={item} isActive={isActive(item.to)} />
            ))}
          </nav>
        </aside>

        {/* Page content */}
        <main className="flex-1 min-w-0 pb-20 md:pb-0">{children}</main>
      </div>

      {/* Bottom nav — visible on mobile only */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-background border-t border-border z-40 flex items-stretch">
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors",
              isActive(item.to)
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
            <span className="leading-none">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
