const Footer = () => {
  return (
    <footer className="bg-background py-8 border-t border-foreground">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-muted-foreground">
          <div>
            <p className="font-bold text-foreground">СБОРКА</p>
            <p>Клуб карьерной дисциплины</p>
          </div>
          
          <p>
            Доступ осуществляется по подписке через Tribute.
          </p>
          
          <p>
            © СБОРКА 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
