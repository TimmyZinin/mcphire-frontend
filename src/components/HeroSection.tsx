const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Aggressive geometric elements - triangles and diagonal lines */}
      
      {/* Large triangle - top left */}
      <div className="absolute -top-20 -left-20 animate-float-slow">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <polygon points="0,200 100,0 200,200" fill="none" stroke="#DFFF00" strokeWidth="3" opacity="0.6" />
        </svg>
      </div>
      
      {/* Large triangle - bottom right */}
      <div className="absolute -bottom-32 -right-32 animate-pulse-scale" style={{ animationDelay: '2s' }}>
        <svg width="300" height="300" viewBox="0 0 300 300">
          <polygon points="0,300 150,0 300,300" fill="none" stroke="#DFFF00" strokeWidth="4" opacity="0.5" />
        </svg>
      </div>
      
      {/* Small filled triangle - top right */}
      <div className="absolute top-20 right-24 animate-float-medium">
        <svg width="40" height="35" viewBox="0 0 40 35">
          <polygon points="20,0 40,35 0,35" fill="#DFFF00" opacity="0.9" />
        </svg>
      </div>
      
      {/* Small filled triangle - bottom left */}
      <div className="absolute bottom-28 left-20 animate-float-slow" style={{ animationDelay: '1s' }}>
        <svg width="30" height="26" viewBox="0 0 30 26">
          <polygon points="15,0 30,26 0,26" fill="#DFFF00" opacity="0.8" />
        </svg>
      </div>
      
      {/* Diagonal line - top right */}
      <div className="absolute top-16 right-0 w-48 h-[3px] bg-primary opacity-60 -rotate-45 animate-slide-horizontal" />
      
      {/* Diagonal line - bottom left */}
      <div className="absolute bottom-24 left-0 w-64 h-[3px] bg-primary opacity-50 rotate-45 animate-slide-horizontal" style={{ animationDelay: '3s' }} />
      
      {/* Aggressive diagonal cross - right side */}
      <div className="absolute top-1/3 right-12 hidden lg:block opacity-60 animate-float-medium" style={{ animationDelay: '1.5s' }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <line x1="0" y1="0" x2="60" y2="60" stroke="#DFFF00" strokeWidth="3" />
          <line x1="60" y1="0" x2="0" y2="60" stroke="#DFFF00" strokeWidth="3" />
        </svg>
      </div>
      
      {/* Aggressive diagonal cross - left side */}
      <div className="absolute bottom-1/3 left-16 hidden lg:block opacity-50 animate-float-slow" style={{ animationDelay: '3s' }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <line x1="0" y1="0" x2="40" y2="40" stroke="#DFFF00" strokeWidth="2" />
          <line x1="40" y1="0" x2="0" y2="40" stroke="#DFFF00" strokeWidth="2" />
        </svg>
      </div>
      
      {/* Arrow pointing up-right - accent */}
      <div className="absolute top-1/4 left-1/4 hidden md:block opacity-70 animate-diagonal-drift">
        <svg width="50" height="50" viewBox="0 0 50 50">
          <polygon points="10,40 40,10 40,25 50,25 50,0 25,0 25,10 40,10 10,40" fill="#DFFF00" />
        </svg>
      </div>
      
      {/* Scattered sharp triangles */}
      <div className="absolute top-1/4 right-1/3 flex gap-4 opacity-60 hidden md:flex">
        <svg width="12" height="10" viewBox="0 0 12 10"><polygon points="6,0 12,10 0,10" fill="#DFFF00" /></svg>
        <svg width="12" height="10" viewBox="0 0 12 10"><polygon points="6,0 12,10 0,10" fill="#DFFF00" /></svg>
        <svg width="12" height="10" viewBox="0 0 12 10"><polygon points="6,0 12,10 0,10" fill="#DFFF00" /></svg>
      </div>
      
      <div className="absolute bottom-1/4 left-1/3 flex gap-3 opacity-60 hidden md:flex">
        <svg width="10" height="9" viewBox="0 0 10 9"><polygon points="5,0 10,9 0,9" fill="#DFFF00" /></svg>
        <svg width="10" height="9" viewBox="0 0 10 9"><polygon points="5,0 10,9 0,9" fill="#DFFF00" /></svg>
      </div>
      
      {/* Zigzag line - decorative */}
      <div className="absolute top-40 right-1/4 hidden lg:block opacity-40">
        <svg width="100" height="30" viewBox="0 0 100 30">
          <polyline points="0,15 20,0 40,30 60,0 80,30 100,15" fill="none" stroke="#DFFF00" strokeWidth="2" />
        </svg>
      </div>
      
      {/* Main content - centered */}
      <div className="w-full max-w-4xl mx-auto px-6 md:px-8 relative z-10 text-center">
        <div className="space-y-10">
          {/* Logo/Title */}
          <h1 className="heading-hero text-foreground glitch-hover">
            СБОРКА
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl font-medium text-foreground max-w-2xl mx-auto">
            Клуб карьерной дисциплины. Для тех, кто ищет работу, но не может заставить себя. Мы даём пинок + знания + окружение + трекинг.
          </p>
          
          {/* Tagline */}
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Здесь перестают жаловаться и начинают действовать.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <a 
              href="#pricing"
              className="px-12 py-5 bg-primary text-primary-foreground font-black text-lg uppercase tracking-tight hover:bg-foreground hover:text-background transition-colors"
            >
              ВОЙТИ В СБОРКУ
            </a>
            
            <a 
              href="#pricing"
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
