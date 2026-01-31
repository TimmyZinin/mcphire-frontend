import bgFinalCta from "@/assets/bg-final-cta.jpg";

const FinalCTASection = () => {
  return (
    <section className="section-dark border-t-4 border-primary py-24 md:py-32 relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url(${bgFinalCta})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/70" />
      
      <div className="section-container relative z-10">
        <div className="space-y-10 text-center">
          {/* Options */}
          <div className="space-y-4">
            <h2 className="heading-md text-muted-foreground">
              Можно продолжать дёргаться.
            </h2>
            <h2 className="heading-lg text-primary">
              Можно собраться и начать работать.
            </h2>
          </div>
          
          <p className="text-2xl text-foreground font-medium">
            Решение за тобой.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a 
              href="https://t.me/sborka_club" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-primary animate-pulse-glow"
            >
              Войти в Сборку
            </a>
            <a 
              href="https://t.me/sborka_club" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-secondary"
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
