import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">СБОРКА</span>
            <span>·</span>
            <span>AI-платформа для найма</span>
          </div>
          <div className="flex gap-4">
            <Link to="/jobs" className="hover:text-primary transition-colors">Вакансии</Link>
            <Link to="/employers" className="hover:text-primary transition-colors">Работодателям</Link>
            <Link to="/knowledge" className="hover:text-primary transition-colors">База знаний</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Конфиденциальность</Link>
          </div>
          <span>© 2026 СБОРКА</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
