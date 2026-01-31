const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center bg-background relative overflow-hidden">
      {/* Decorative geometric elements */}
      
      {/* Large circle - top right */}
      <div className="absolute -top-32 -right-32 w-96 h-96 border-[3px] border-primary rounded-full opacity-60" />
      
      {/* Small filled circle - left */}
      <div className="absolute top-1/4 -left-8 w-16 h-16 bg-primary rounded-full" />
      
      {/* Square - bottom left */}
      <div className="absolute bottom-32 left-20 w-12 h-12 border-2 border-primary rotate-12" />
      
      {/* Horizontal line - top */}
      <div className="absolute top-40 left-0 w-1/3 h-[2px] bg-primary opacity-40" />
      
      {/* Vertical line - right side */}
      <div className="absolute top-0 right-1/4 w-[2px] h-1/2 bg-primary opacity-30" />
      
      {/* Small square - right */}
      <div className="absolute top-1/3 right-16 w-8 h-8 bg-primary opacity-80" />
      
      {/* Cross element - bottom right */}
      <div className="absolute bottom-48 right-32 hidden lg:block">
        <div className="w-24 h-[2px] bg-primary" />
        <div className="w-[2px] h-24 bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      {/* Diagonal line */}
      <div className="absolute bottom-0 left-1/4 w-64 h-[2px] bg-primary rotate-45 origin-left opacity-50" />
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
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
          <div className="bg-foreground text-background p-8 md:p-12 space-y-8 relative">
            {/* Corner accent */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-primary" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-primary" />
            
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
