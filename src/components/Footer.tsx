import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-muted/30">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-black text-xl tracking-tight text-primary flex items-center gap-2 mb-3">
              <span className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xs">С</span>
              СБОРКА
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Карьерный клуб для IT-специалистов Middle, Senior и Lead.
            </p>
            {/* Social links */}
            <div className="flex gap-3 mt-4">
              <a href="https://t.me/public_sborka" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                Telegram
              </a>
              <a href="https://www.linkedin.com/in/timzinin/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                LinkedIn
              </a>
              <a href="https://vk.com/sborka_work" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                VK
              </a>
            </div>
          </div>

          {/* Соискателям */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3 uppercase tracking-wide">Соискателям</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/jobs" className="text-muted-foreground hover:text-primary transition-colors">Вакансии</Link></li>
              <li><Link to="/knowledge" className="text-muted-foreground hover:text-primary transition-colors">База знаний</Link></li>
              <li><Link to="/tools/salary" className="text-muted-foreground hover:text-primary transition-colors">Калькулятор зарплат</Link></li>
              <li><Link to="/tools/resume-checklist" className="text-muted-foreground hover:text-primary transition-colors">Чеклист резюме</Link></li>
              <li><Link to="/tools/resume-review" className="text-muted-foreground hover:text-primary transition-colors">AI-ревью резюме</Link></li>
            </ul>
          </div>

          {/* Работодателям */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3 uppercase tracking-wide">Работодателям</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/employers" className="text-muted-foreground hover:text-primary transition-colors">Разместить вакансию</Link></li>
              <li><Link to="/mcp" className="text-muted-foreground hover:text-primary transition-colors">MCP API</Link></li>
              <li><Link to="/partners" className="text-muted-foreground hover:text-primary transition-colors">Партнёрская программа</Link></li>
            </ul>
          </div>

          {/* О клубе */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3 uppercase tracking-wide">О клубе</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://t.me/Sborka_work_bot?start=webinar4_site" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
                  Открытый урок 5 марта
                </a>
              </li>
              <li>
                <a href="https://t.me/Sborka_work_bot" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  Telegram-бот
                </a>
              </li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Конфиденциальность</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <span>© 2026 СБОРКА. Все права защищены.</span>
          <span>AI-платформа для IT-карьеры</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
