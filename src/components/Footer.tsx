import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background py-8 border-t border-foreground">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-muted-foreground">
          <div>
            <p className="font-bold text-foreground">СБОРКА</p>
            <p>Клуб карьерной дисциплины</p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-6">
            <p>
              Доступ осуществляется по подписке через Tribute.
            </p>
            <Link to="/knowledge" className="hover:text-foreground transition-colors">
              База знаний
            </Link>
            <Link to="/partners" className="hover:text-foreground transition-colors">
              Партнёрская программа
            </Link>
          </div>

          <p>
            &copy; СБОРКА 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
