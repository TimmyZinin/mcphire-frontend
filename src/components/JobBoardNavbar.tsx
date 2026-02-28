import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { to: "/jobs", label: "Вакансии" },
  { to: "/employers", label: "Для работодателей" },
  { to: "/tools", label: "Инструменты" },
  { to: "/mcp", label: "MCP" },
];

const JobBoardNavbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isActive = (path: string) => location.pathname.startsWith(path);

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
      isActive(path)
        ? "text-primary bg-primary/10 font-semibold"
        : "text-muted-foreground hover:text-foreground hover:bg-muted"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-background/92 backdrop-blur-xl border-b border-border">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-black text-xl tracking-tight text-primary flex items-center gap-2">
          <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-sm">С</span>
          СБОРКА<span className="text-cta-hot">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass(link.to)}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href="https://t.me/Sborka_work_bot" target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex px-4 py-2 rounded-full text-sm font-semibold text-primary border border-primary/30 hover:bg-primary/5 transition-colors">
            Войти через бот
          </a>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Меню">
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle className="text-left font-black text-primary tracking-tight">СБОРКА</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive(link.to)
                        ? "text-primary bg-primary/10 font-semibold"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="my-3 border-border" />
                <a
                  href="https://t.me/Sborka_work_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl text-base font-semibold text-primary bg-primary/10 text-center"
                >
                  Войти через бот
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default JobBoardNavbar;
