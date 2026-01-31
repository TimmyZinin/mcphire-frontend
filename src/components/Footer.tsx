const Footer = () => {
  return (
    <footer className="bg-card py-12 border-t-4 border-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo / Brand */}
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-primary uppercase tracking-tighter">
              Сборка
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Клуб карьерной дисциплины
            </p>
          </div>
          
          {/* Info */}
          <p className="text-sm text-muted-foreground text-center">
            Доступ осуществляется по подписке через Tribute.
          </p>
          
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © СБОРКА 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
