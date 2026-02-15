const LEVEL_COLORS = ['#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF6B6B'];
const LEVEL_NAMES = ['Разминка', 'Темп', 'Ускорение', 'Прорыв', 'Финишная', 'ОФФЕР'];

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Decorative circles - NRC palette */}
      <div className="absolute -top-20 -left-20 animate-float-slow">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#4ECDC4" strokeWidth="3" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute -bottom-32 -right-32 animate-pulse-scale" style={{ animationDelay: '2s' }}>
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="140" fill="none" stroke="#45B7D1" strokeWidth="4" opacity="0.3" />
        </svg>
      </div>

      <div className="absolute top-20 right-24 animate-float-medium">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="#4ECDC4" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute bottom-28 left-20 animate-float-slow" style={{ animationDelay: '1s' }}>
        <svg width="30" height="30" viewBox="0 0 30 30">
          <circle cx="15" cy="15" r="13" fill="#96CEB4" opacity="0.5" />
        </svg>
      </div>

      {/* Main content */}
      <div className="w-full max-w-4xl mx-auto px-6 md:px-8 relative z-10 text-center">
        <div className="space-y-10">
          {/* Pre-title */}
          <p className="text-lg md:text-xl text-muted-foreground uppercase tracking-wider">
            Карьерный клуб дисциплины
          </p>

          {/* Logo/Title */}
          <h1 className="heading-hero text-foreground">
            СБОРКА
          </h1>

          {/* Marathon tagline */}
          <p className="text-lg md:text-xl lg:text-2xl font-medium text-foreground max-w-2xl mx-auto">
            Марафон к офферу — вместе.
          </p>

          {/* Animated progress bar — levels */}
          <div className="max-w-lg mx-auto" data-testid="hero-progress">
            <div className="flex justify-between mb-2">
              {LEVEL_NAMES.map((name, i) => (
                <span
                  key={name}
                  className="text-xs font-bold uppercase"
                  style={{ color: LEVEL_COLORS[i], opacity: 0.8 }}
                >
                  {name}
                </span>
              ))}
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden flex">
              {LEVEL_COLORS.map((color, i) => (
                <div
                  key={i}
                  className="h-full transition-all duration-1000"
                  style={{
                    width: `${100 / LEVEL_COLORS.length}%`,
                    backgroundColor: color,
                    opacity: 0.9,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Group photo */}
          <div className="overflow-hidden rounded-2xl shadow-xl max-w-2xl mx-auto">
            <img
              src="/images/hero_new.webp"
              alt="Уверенный мужчина на крыше ночного города — энергия и стиль СБОРКИ"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Не скорость — а постоянство. Средний участник получает оффер за 6-8 недель.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <a
              href="#pricing"
              className="cta-primary-nrc"
              data-testid="hero-cta"
            >
              НАЧАТЬ БЕСПЛАТНО
            </a>

            <a
              href="#webinar"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#4ECDC4] text-[#4ECDC4] font-bold text-base uppercase tracking-tight hover:bg-[#4ECDC4] hover:text-background transition-colors rounded-lg"
            >
              Вебинар 17 февраля →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
