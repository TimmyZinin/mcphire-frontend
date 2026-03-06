// ============================================================
// MCPHire — Job Board Navbar
// Auth-aware: shows user dropdown when authenticated.
// ============================================================

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, LogOut, User, FileText, LayoutDashboard } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";

// ---- Nav links ---------------------------------------------

const navLinks = [
  { to: "/jobs", label: "Вакансии" },
  { to: "/employers", label: "Для работодателей" },
  { to: "/tools", label: "Инструменты" },
  { to: "/mcp", label: "MCP" },
  { to: "/pricing", label: "Тарифы" },
];

// ---- Helpers -----------------------------------------------

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ---- Component ---------------------------------------------

const JobBoardNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
      isActive(path)
        ? "text-primary bg-primary/10 font-semibold"
        : "text-muted-foreground hover:text-foreground hover:bg-muted"
    }`;

  const mobileLinkClass = (path: string) =>
    `px-4 py-3 rounded-xl text-base font-medium transition-colors ${
      isActive(path)
        ? "text-primary bg-primary/10 font-semibold"
        : "text-foreground hover:bg-muted"
    }`;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const dashboardLink =
    user?.role === "employer" ? "/employer/dashboard" : "/profile";
  const dashboardLabel =
    user?.role === "employer" ? "Дашборд" : "Мой профиль";

  return (
    <nav className="sticky top-0 z-50 bg-background/92 backdrop-blur-xl border-b border-border">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-heading font-black text-xl tracking-tight text-primary flex items-center gap-2"
        >
          <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-sm">
            M
          </span>
          MCPHire<span className="text-cta-hot">.</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass(link.to)}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right-side actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          {isAuthenticated && user ? (
            /* Authenticated: user avatar + dropdown */
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="hidden md:flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Меню аккаунта"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />
                    <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" />
                    Мой профиль
                  </Link>
                </DropdownMenuItem>
                {user.role === "seeker" && (
                  <DropdownMenuItem asChild>
                    <Link to="/applications" className="flex items-center gap-2 cursor-pointer">
                      <FileText className="w-4 h-4" />
                      Мои отклики
                    </Link>
                  </DropdownMenuItem>
                )}
                {user.role === "employer" && (
                  <DropdownMenuItem asChild>
                    <Link to="/employer/dashboard" className="flex items-center gap-2 cursor-pointer">
                      <LayoutDashboard className="w-4 h-4" />
                      Дашборд
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* Unauthenticated: Telegram CTA */
            <Link
              to="/auth/login"
              className="hidden md:inline-flex px-4 py-2 rounded-full text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Войти
            </Link>
          )}

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Меню"
            >
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle className="text-left font-heading font-black text-primary tracking-tight">
                  MCPHire
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 mt-6">
                {/* Nav links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={mobileLinkClass(link.to)}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="px-4 py-2">
                  <LanguageSwitcher />
                </div>

                <hr className="my-3 border-border" />

                {isAuthenticated && user ? (
                  /* Auth items in mobile sheet */
                  <>
                    <div className="flex items-center gap-3 px-4 py-2 mb-1">
                      <Avatar className="w-9 h-9">
                        <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />
                        <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.role === "employer" ? "Работодатель" : "Соискатель"}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={dashboardLink}
                      onClick={() => setOpen(false)}
                      className="px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                      {dashboardLabel}
                    </Link>
                    {user.role === "seeker" && (
                      <Link
                        to="/applications"
                        onClick={() => setOpen(false)}
                        className="px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        Мои отклики
                      </Link>
                    )}
                    <button
                      onClick={async () => {
                        setOpen(false);
                        await handleLogout();
                      }}
                      className="px-4 py-3 rounded-xl text-base font-medium text-destructive hover:bg-destructive/5 transition-colors flex items-center gap-2 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Выйти
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth/login"
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-xl text-base font-semibold text-white bg-primary text-center"
                  >
                    Войти
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default JobBoardNavbar;
