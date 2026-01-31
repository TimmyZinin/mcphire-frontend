const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center bg-background py-16 md:py-24">
      <div className="section-container">
        <div className="space-y-8 md:space-y-12">
          {/* Main title - HUGE */}
          <h1 className="heading-hero text-foreground">
            СБОРКА
          </h1>
          
          {/* Tagline */}
          <p className="text-lg md:text-xl lg:text-2xl max-w-2xl leading-relaxed">
            Не курс. Не коучинг.{" "}
            <span className="font-bold">Инфраструктура для карьерного движения.</span>
            <br />
            Здесь перестают жаловаться и начинают действовать.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
            <a 
              href="https://t.me/sborka_club" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-primary"
            >
              Войти в Сборку
            </a>
            <a 
              href="https://t.me/sborka_club" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-text py-4"
            >
              или начни с бесплатного вебинара →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
