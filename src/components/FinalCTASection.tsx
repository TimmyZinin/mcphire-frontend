const FinalCTASection = () => {
  return (
    <section className="section-black">
      <div className="section-container">
        <div className="space-y-8">
          {/* Options */}
          <div className="space-y-2">
            <p className="text-xl md:text-2xl text-background/60">
              Можно продолжать дёргаться.
            </p>
            <h2 className="heading-xl text-background">
              МОЖНО СОБРАТЬСЯ<br />
              И НАЧАТЬ РАБОТАТЬ.
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl text-background/80">
            Решение за тобой.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="https://t.me/sborka_club" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-5 bg-primary text-primary-foreground font-black text-lg md:text-xl uppercase tracking-tight hover:bg-background hover:text-foreground transition-colors"
            >
              Войти в Сборку
            </a>
            <a 
              href="https://t.me/sborka_club" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-5 border-2 border-background text-background font-black text-lg md:text-xl uppercase tracking-tight hover:bg-background hover:text-foreground transition-colors"
            >
              Попасть на вебинар
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
