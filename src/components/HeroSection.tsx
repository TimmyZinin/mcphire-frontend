const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Decorative circles - aggressive but round */}
      
      {/* Large circle - top left */}
      <div className="absolute -top-20 -left-20 animate-float-slow">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#DFFF00" strokeWidth="3" opacity="0.6" />
        </svg>
      </div>
      
      {/* Large circle - bottom right */}
      <div className="absolute -bottom-32 -right-32 animate-pulse-scale" style={{ animationDelay: '2s' }}>
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="140" fill="none" stroke="#DFFF00" strokeWidth="4" opacity="0.5" />
        </svg>
      </div>
      
      {/* Small filled circle - top right */}
      <div className="absolute top-20 right-24 animate-float-medium">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="#DFFF00" opacity="0.9" />
        </svg>
      </div>
      
      {/* Small filled circle - bottom left */}
      <div className="absolute bottom-28 left-20 animate-float-slow" style={{ animationDelay: '1s' }}>
        <svg width="30" height="30" viewBox="0 0 30 30">
          <circle cx="15" cy="15" r="13" fill="#DFFF00" opacity="0.8" />
        </svg>
      </div>
      
      {/* Diagonal line - top right */}
      <div className="absolute top-16 right-0 w-48 h-[3px] bg-primary opacity-60 -rotate-45 animate-slide-horizontal" />
      
      {/* Diagonal line - bottom left */}
      <div className="absolute bottom-24 left-0 w-64 h-[3px] bg-primary opacity-50 rotate-45 animate-slide-horizontal" style={{ animationDelay: '3s' }} />
      
      {/* Cross made of circles - right side */}
      <div className="absolute top-1/3 right-12 hidden lg:block opacity-60 animate-float-medium" style={{ animationDelay: '1.5s' }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="10" r="6" fill="#DFFF00" />
          <circle cx="30" cy="50" r="6" fill="#DFFF00" />
          <circle cx="10" cy="30" r="6" fill="#DFFF00" />
          <circle cx="50" cy="30" r="6" fill="#DFFF00" />
          <circle cx="30" cy="30" r="4" fill="#DFFF00" />
        </svg>
      </div>
      
      {/* Cross made of circles - left side */}
      <div className="absolute bottom-1/3 left-16 hidden lg:block opacity-50 animate-float-slow" style={{ animationDelay: '3s' }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="5" r="4" fill="#DFFF00" />
          <circle cx="20" cy="35" r="4" fill="#DFFF00" />
          <circle cx="5" cy="20" r="4" fill="#DFFF00" />
          <circle cx="35" cy="20" r="4" fill="#DFFF00" />
        </svg>
      </div>
      
      {/* Arrow pointing up-right - accent */}
      <div className="absolute top-1/4 left-1/4 hidden md:block opacity-70 animate-diagonal-drift">
        <svg width="50" height="50" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" stroke="#DFFF00" strokeWidth="2" />
          <circle cx="25" cy="25" r="8" fill="#DFFF00" />
        </svg>
      </div>
      
      {/* Scattered small circles */}
      <div className="absolute top-1/4 right-1/3 flex gap-4 opacity-60 hidden md:flex">
        <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="#DFFF00" /></svg>
        <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="#DFFF00" /></svg>
        <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="#DFFF00" /></svg>
      </div>
      
      <div className="absolute bottom-1/4 left-1/3 flex gap-3 opacity-60 hidden md:flex">
        <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="#DFFF00" /></svg>
        <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="#DFFF00" /></svg>
      </div>
      
      {/* Dotted arc - decorative */}
      <div className="absolute top-40 right-1/4 hidden lg:block opacity-40">
        <svg width="100" height="50" viewBox="0 0 100 50">
          <path d="M 10 40 Q 50 0 90 40" fill="none" stroke="#DFFF00" strokeWidth="2" strokeDasharray="5,5" />
        </svg>
      </div>
      
      {/* Main content - centered */}
      <div className="w-full max-w-4xl mx-auto px-6 md:px-8 relative z-10 text-center">
        <div className="space-y-10">
          {/* Pre-title */}
          <p className="text-lg md:text-xl text-muted-foreground uppercase tracking-wider">
            Ищешь работу 2+ месяца?
          </p>
          
          {/* Logo/Title */}
          <h1 className="heading-hero text-foreground glitch-hover">
            СБОРКА
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl font-medium text-foreground max-w-2xl mx-auto">
            Поиск работы — это не кабала. Это командная игра, где ты соревнуешься за оффер.
          </p>
          
          {/* Tagline */}
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Средний участник получает первый оффер за 6-8 недель
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <a 
              href="#pricing"
              className="px-12 py-5 bg-primary text-primary-foreground font-black text-lg uppercase tracking-tight hover:bg-foreground hover:text-background transition-colors"
            >
              НАЧАТЬ ИСКАТЬ ПРАВИЛЬНО
            </a>
            
            <a 
              href="https://t.me/sborka_career_bot"
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
