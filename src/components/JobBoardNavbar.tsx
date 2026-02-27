import { Link, useLocation } from "react-router-dom";

const JobBoardNavbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className="sticky top-0 z-50 bg-background/92 backdrop-blur-xl border-b border-border">
      <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-black text-xl tracking-tight text-primary flex items-center gap-2">
          <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-sm">С</span>
          СБОРКА<span className="text-[#e8604c]">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link to="/jobs" className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/jobs') ? 'text-primary bg-primary/10 font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
            Вакансии
          </Link>
          <Link to="/employers" className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/employers') ? 'text-primary bg-primary/10 font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
            Для работодателей
          </Link>
          <Link to="/tools" className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/tools') ? 'text-primary bg-primary/10 font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
            Инструменты
          </Link>
          <Link to="/mcp" className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/mcp') ? 'text-primary bg-primary/10 font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
            MCP
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <a href="https://t.me/Sborka_work_bot" target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 rounded-full text-sm font-semibold text-primary border border-primary/30 hover:bg-primary/5 transition-colors">
            Войти через бот
          </a>
        </div>
      </div>
    </nav>
  );
};

export default JobBoardNavbar;
