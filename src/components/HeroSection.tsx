const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center bg-foreground relative overflow-hidden">
      {/* Decorative geometric elements in lime */}
      
      {/* Large arc - top right */}
      <div className="absolute -top-48 -right-48 w-[600px] h-[600px] border-[3px] border-primary rounded-full opacity-60 animate-pulse-scale" />
      
      {/* Medium arc - bottom left */}
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] border-2 border-primary rounded-full opacity-40 animate-pulse-scale" style={{ animationDelay: '2s' }} />
      
      {/* Small filled circle - top left */}
      <div className="absolute top-24 left-16 w-8 h-8 bg-primary rounded-full opacity-80 animate-float-slow" />
      
      {/* Small filled circle - bottom right */}
      <div className="absolute bottom-32 right-24 w-6 h-6 bg-primary rounded-full opacity-70 animate-float-medium" style={{ animationDelay: '1s' }} />
      
      {/* Horizontal line - top */}
      <div className="absolute top-32 left-0 w-1/3 h-[2px] bg-primary opacity-50 animate-slide-horizontal" />
      
      {/* Horizontal line - bottom */}
      <div className="absolute bottom-40 right-0 w-1/4 h-[2px] bg-primary opacity-40 animate-slide-horizontal" style={{ animationDelay: '3s' }} />
      
      {/* Vertical line - left */}
      <div className="absolute top-0 left-24 w-[2px] h-1/3 bg-primary opacity-30 animate-slide-vertical" />
      
      {/* Small square accent */}
      <div className="absolute top-1/2 right-12 w-4 h-4 border-2 border-primary opacity-60 animate-float-slow" style={{ animationDelay: '2.5s' }} />
      
      {/* Cross element - decorative */}
      <div className="absolute top-40 right-1/3 hidden lg:block opacity-40 animate-float-medium" style={{ animationDelay: '1.5s' }}>
        <div className="w-12 h-[2px] bg-primary" />
        <div className="w-[2px] h-12 bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      {/* Dotted accent */}
      <div className="absolute bottom-1/3 left-1/4 flex gap-2 opacity-50">
        <div className="w-2 h-2 bg-primary rounded-full" />
        <div className="w-2 h-2 bg-primary rounded-full" />
        <div className="w-2 h-2 bg-primary rounded-full" />
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            {/* Logo/Title - white on black */}
            <h1 className="heading-hero text-background">
              СБОРКА
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl font-bold uppercase tracking-tight text-background">
              Закрытый клуб карьерной дисциплины
            </p>
            
            {/* Tagline */}
            <p className="text-lg md:text-xl text-background/60">
              СОБЕРИСЬ. НАЧНИ РАБОТАТЬ.
            </p>
          </div>
          
          {/* Right side - CTA Card */}
          <div className="bg-background text-foreground p-8 md:p-12 space-y-8 relative">
            {/* Corner accent */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-primary" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-primary" />
            
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                Хватит откладывать
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
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
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-muted-foreground text-sm uppercase">или</span>
                <div className="flex-1 h-px bg-border"></div>
              </div>
              
              <a 
                href="https://t.me/sborka_club" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center px-8 py-5 border-2 border-foreground text-foreground font-bold text-base uppercase tracking-tight hover:bg-foreground hover:text-background transition-colors"
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
