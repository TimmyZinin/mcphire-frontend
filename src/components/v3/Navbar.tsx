// ============================================================
// MCPHire V3 — sticky pill-nav with logo, links, agents-online pin,
// login + "Connect MCP" CTA. Reuses existing auth context.
// ============================================================

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, LogOut, User, FileText, LayoutDashboard } from "lucide-react";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { EmailVerificationBanner } from "@/components/auth/EmailVerificationBanner";
import { V3Logo } from "./Logo";
import type { Lang } from "./data";

const navLinks = [
  { to: "/jobs",      labelRu: "Вакансии",        labelEn: "Jobs" },
  { to: "/employers", labelRu: "Для работодателей", labelEn: "For employers" },
  { to: "/tools",     labelRu: "Инструменты",     labelEn: "Tools" },
  { to: "/mcp",       labelRu: "MCP",             labelEn: "MCP" },
];

function getInitials(name: string): string {
  return name.split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2);
}

interface V3NavbarProps {
  lang?: Lang;
  agentsOnline?: number;
}

export function V3Navbar({ lang: langProp, agentsOnline = 1247 }: V3NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang: Lang = langProp ?? (i18n.language.startsWith("en") ? "en" : "ru");
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const dashboardLink = user?.role === "employer" ? "/employer/dashboard" : "/profile";
  const dashboardLabel = user?.role === "employer"
    ? (lang === "ru" ? "Дашборд" : "Dashboard")
    : (lang === "ru" ? "Мой профиль" : "My profile");

  return (
    <>
      <nav className="sticky top-0 z-30 px-4 pt-3" aria-label="Main">
        <div
          className="v3-card mx-auto flex items-center gap-2 px-3 py-2.5"
          style={{
            maxWidth: 1320,
            borderRadius: 18,
            backdropFilter: "blur(20px)",
            background: "rgba(255,255,255,.78)",
          }}
        >
          <V3Logo />
          <span aria-hidden className="hidden md:inline-block w-px h-4 mx-1.5" style={{ background: "var(--v3-line)" }} />

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-3 py-1.5 rounded-[10px] text-sm font-medium no-underline transition-colors"
                  style={{
                    background: active ? "var(--v3-ink)" : "transparent",
                    color: active ? "#fff" : "var(--v3-ink2)",
                  }}
                >
                  {lang === "ru" ? link.labelRu : link.labelEn}
                </Link>
              );
            })}
          </div>

          <div className="flex-1" />

          {/* Agents-online pin (static count for now — Sprint 10 will wire live data) */}
          <span className="v3-pin hidden lg:inline-flex">
            <span className="v3-pin-dot" aria-hidden />
            {agentsOnline.toLocaleString()}{" "}
            {lang === "ru" ? "агентов онлайн" : "agents online"}
          </span>

          {/* Lang switcher (desktop) */}
          <div className="hidden md:flex items-center">
            <LanguageSwitcher />
          </div>

          {/* Auth area */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="hidden md:flex items-center gap-2 px-2 py-1 rounded-full hover:bg-v3-bg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-v3-hot"
                  aria-label={lang === "ru" ? "Меню аккаунта" : "Account menu"}
                >
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />
                    <AvatarFallback className="text-[10px] font-bold bg-v3-bg text-v3-ink">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-v3-ink max-w-[110px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" />
                    {lang === "ru" ? "Мой профиль" : "My profile"}
                  </Link>
                </DropdownMenuItem>
                {user.role === "seeker" && (
                  <DropdownMenuItem asChild>
                    <Link to="/applications" className="flex items-center gap-2 cursor-pointer">
                      <FileText className="w-4 h-4" />
                      {lang === "ru" ? "Мои отклики" : "My applications"}
                    </Link>
                  </DropdownMenuItem>
                )}
                {user.role === "employer" && (
                  <DropdownMenuItem asChild>
                    <Link to="/employer/dashboard" className="flex items-center gap-2 cursor-pointer">
                      <LayoutDashboard className="w-4 h-4" />
                      {lang === "ru" ? "Дашборд" : "Dashboard"}
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  {lang === "ru" ? "Выйти" : "Sign out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth/login" className="hidden md:inline-flex v3-btn v3-btn-ghost" style={{ height: 36, padding: "0 14px", fontSize: 13 }}>
              {lang === "ru" ? "Войти" : "Sign in"}
            </Link>
          )}

          {/* CTA: connect MCP */}
          <a
            href="#agent-onboarding"
            className="hidden md:inline-flex v3-btn v3-btn-primary"
            style={{ height: 36, padding: "0 14px", fontSize: 13 }}
          >
            {lang === "ru" ? "Подключить MCP" : "Connect MCP"} ↗
          </a>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="md:hidden p-2 rounded-lg hover:bg-v3-bg transition-colors"
              aria-label={lang === "ru" ? "Меню" : "Menu"}
            >
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <V3Logo />
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-xl text-base font-medium text-v3-ink hover:bg-v3-bg transition-colors"
                  >
                    {lang === "ru" ? link.labelRu : link.labelEn}
                  </Link>
                ))}
                <div className="px-4 py-2 flex items-center gap-3">
                  <LanguageSwitcher />
                </div>
                <hr className="my-3 border-v3-line" />

                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-2 mb-1">
                      <Avatar className="w-9 h-9">
                        <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />
                        <AvatarFallback className="text-xs font-bold bg-v3-bg text-v3-ink">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{user.name}</p>
                        <p className="text-xs text-v3-mute truncate">
                          {user.role === "employer"
                            ? (lang === "ru" ? "Работодатель" : "Employer")
                            : (lang === "ru" ? "Соискатель" : "Candidate")}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={dashboardLink}
                      onClick={() => setOpen(false)}
                      className="px-4 py-3 rounded-xl text-base font-medium text-v3-ink hover:bg-v3-bg transition-colors flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-v3-mute" />
                      {dashboardLabel}
                    </Link>
                    <button
                      onClick={async () => { setOpen(false); await handleLogout(); }}
                      className="px-4 py-3 rounded-xl text-base font-medium text-destructive hover:bg-destructive/5 transition-colors flex items-center gap-2 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      {lang === "ru" ? "Выйти" : "Sign out"}
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth/login"
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-xl text-base font-semibold text-white bg-v3-ink text-center no-underline"
                  >
                    {lang === "ru" ? "Войти" : "Sign in"}
                  </Link>
                )}
                <a
                  href="#agent-onboarding"
                  onClick={() => setOpen(false)}
                  className="mt-2 px-4 py-3 rounded-xl text-base font-semibold text-white text-center no-underline"
                  style={{ background: "var(--v3-hot)" }}
                >
                  {lang === "ru" ? "Подключить MCP" : "Connect MCP"} ↗
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <EmailVerificationBanner />
    </>
  );
}
