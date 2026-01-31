const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center bg-background">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            {/* Logo/Title */}
            <h1 className="heading-hero text-foreground">
              [ СБОРКА ]
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl font-bold uppercase tracking-tight">
              Закрытый клуб карьерной дисциплины
            </p>
            
            {/* Tagline */}
            <p className="text-lg md:text-xl text-muted-foreground">
              СОБЕРИСЬ. НАЧНИ РАБОТАТЬ.
            </p>
          </div>
          
          {/* Right side - CTA Card */}
          <div className="bg-foreground text-background p-8 md:p-12 space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                Хватит откладывать
              </h2>
              <p className="text-muted text-base md:text-lg">
                Вступай в клуб или начни с бесплатного вебинара
              </p>
            </div>
            
            <div className="space-y-4">
              <a 
                href="https://t.me/sborka_club" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center px-8 py-5 bg-primary text-primary-foreground font-black text-lg uppercase tracking-tight hover:bg-primary/90 transition-colors"
              >
                ВСТУПИТЬ В КЛУБ
              </a>
              
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-muted"></div>
                <span className="text-muted text-sm uppercase">или</span>
                <div className="flex-1 h-px bg-muted"></div>
              </div>
              
              <a 
                href="https://t.me/sborka_club" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center px-8 py-5 border-2 border-background text-background font-bold text-base uppercase tracking-tight hover:bg-background hover:text-foreground transition-colors"
              >
                Бесплатный вебинар →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
