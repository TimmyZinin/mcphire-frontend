const Footer = () => {
  return (
    <footer className="bg-card py-12 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo / Brand */}
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-primary uppercase tracking-tighter">
              Сборка
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Карьерная устойчивость
            </p>
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a 
              href="https://t.me/sborka_club" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Telegram
            </a>
            <span className="text-border">|</span>
            <a 
              href="#" 
              className="hover:text-primary transition-colors"
            >
              Политика конфиденциальности
            </a>
          </div>
          
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © Сборка {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
