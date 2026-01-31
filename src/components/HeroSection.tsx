const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Decorative geometric elements in lime */}
      
      {/* Large arc - top left */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] border-[3px] border-primary rounded-full opacity-60 animate-pulse-scale" />
      
      {/* Large arc - bottom right */}
      <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] border-[3px] border-primary rounded-full opacity-50 animate-pulse-scale" style={{ animationDelay: '2s' }} />
      
      {/* Small filled circle - top right */}
      <div className="absolute top-20 right-20 w-10 h-10 bg-primary rounded-full opacity-90 animate-float-slow" />
      
      {/* Small filled circle - bottom left */}
      <div className="absolute bottom-24 left-16 w-6 h-6 bg-primary rounded-full opacity-80 animate-float-medium" style={{ animationDelay: '1s' }} />
      
      {/* Horizontal line - top */}
      <div className="absolute top-24 right-0 w-1/4 h-[3px] bg-primary opacity-60 animate-slide-horizontal" />
      
      {/* Horizontal line - bottom */}
      <div className="absolute bottom-32 left-0 w-1/3 h-[3px] bg-primary opacity-50 animate-slide-horizontal" style={{ animationDelay: '3s' }} />
      
      {/* Vertical line - right */}
      <div className="absolute top-0 right-32 w-[3px] h-1/4 bg-primary opacity-40 animate-slide-vertical" />
      
      {/* Vertical line - left */}
      <div className="absolute bottom-0 left-24 w-[3px] h-1/3 bg-primary opacity-40 animate-slide-vertical" style={{ animationDelay: '2s' }} />
      
      {/* Small square accent - top right */}
      <div className="absolute top-40 right-1/4 w-5 h-5 border-3 border-primary opacity-70 animate-float-slow" style={{ animationDelay: '2.5s' }} />
      
      {/* Cross element - left side */}
      <div className="absolute top-1/3 left-12 hidden lg:block opacity-50 animate-float-medium" style={{ animationDelay: '1.5s' }}>
        <div className="w-16 h-[3px] bg-primary" />
        <div className="w-[3px] h-16 bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      {/* Cross element - right side */}
      <div className="absolute bottom-1/3 right-16 hidden lg:block opacity-50 animate-float-slow" style={{ animationDelay: '3s' }}>
        <div className="w-12 h-[2px] bg-primary" />
        <div className="w-[2px] h-12 bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      {/* Dotted accents - scattered */}
      <div className="absolute top-1/4 left-1/3 flex gap-3 opacity-60 hidden md:flex">
        <div className="w-2 h-2 bg-primary rounded-full" />
        <div className="w-2 h-2 bg-primary rounded-full" />
        <div className="w-2 h-2 bg-primary rounded-full" />
      </div>
      
      <div className="absolute bottom-1/4 right-1/3 flex gap-3 opacity-60 hidden md:flex">
        <div className="w-2 h-2 bg-primary rounded-full" />
        <div className="w-2 h-2 bg-primary rounded-full" />
      </div>
      
      {/* Diagonal line accent */}
      <div className="absolute top-1/2 left-8 w-32 h-[2px] bg-primary opacity-40 rotate-45 hidden lg:block" />
      <div className="absolute bottom-1/2 right-8 w-24 h-[2px] bg-primary opacity-40 -rotate-45 hidden lg:block" />
      
      {/* Main content - centered */}
      <div className="w-full max-w-4xl mx-auto px-6 md:px-8 relative z-10 text-center">
        <div className="space-y-10">
          {/* Logo/Title */}
          <h1 className="heading-hero text-foreground">
            СБОРКА
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl font-medium text-foreground max-w-2xl mx-auto">
            Не курс. Не коучинг. Инфраструктура для карьерного движения.
          </p>
          
          {/* Tagline */}
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Здесь перестают жаловаться и начинают действовать.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <a 
              href="https://t.me/sborka_club" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-12 py-5 bg-primary text-primary-foreground font-black text-lg uppercase tracking-tight hover:bg-foreground hover:text-background transition-colors"
            >
              ВОЙТИ В СБОРКУ
            </a>
            
            <a 
              href="https://t.me/sborka_club" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors text-base"
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
