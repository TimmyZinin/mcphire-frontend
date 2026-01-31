const FinalCTASection = () => {
  return (
    <section className="section-black relative overflow-hidden">
      {/* Decorative circles - inverted colors for dark bg */}
      <div className="absolute right-0 top-1/4 translate-x-1/2 pointer-events-none opacity-20">
        <svg width="400" height="400" viewBox="0 0 400 400" className="animate-float-slow">
          <circle cx="200" cy="200" r="180" fill="none" stroke="#DFFF00" strokeWidth="2" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="#DFFF00" strokeWidth="2" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="#DFFF00" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="absolute left-0 bottom-0 -translate-x-1/3 translate-y-1/3 pointer-events-none opacity-15">
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="120" fill="none" stroke="#DFFF00" strokeWidth="3" />
          <circle cx="150" cy="150" r="60" fill="#DFFF00" opacity="0.3" />
        </svg>
      </div>
      
      <div className="section-container relative z-10">
        <div className="space-y-8">
          {/* Options */}
          <div className="space-y-4">
            <p className="text-xl md:text-2xl text-background/60">
              Можно ждать. Можно надеяться. Можно откладывать.
            </p>
            <h2 className="heading-xl text-background glitch-hover">
              А МОЖНО НАЧАТЬ<br />
              ДЕЙСТВОВАТЬ.
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl text-background/80 max-w-2xl">
            Средний участник находит работу за 6-8 недель. Сколько месяцев ты уже ищешь?
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-5 bg-primary text-primary-foreground font-black text-lg md:text-xl uppercase tracking-tight hover:bg-background hover:text-foreground transition-colors"
            >
              Начать искать правильно
            </a>
            <a 
              href="https://t.me/sborka_club" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-5 border-2 border-background text-background font-black text-lg md:text-xl uppercase tracking-tight hover:bg-background hover:text-foreground transition-colors"
            >
              Бесплатный вебинар
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
