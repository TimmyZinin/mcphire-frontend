import heroVideo from "@/assets/hero-video.mp4";

const HeroSection = () => {
  const benefits = [
    "выстраиваешь стратегию поиска",
    "получаешь прямую обратную связь",
    "исправляешь ошибки, которые тормозят офферы",
    "работаешь среди сильных специалистов",
    "возвращаешь контроль над карьерой",
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center section-dark relative overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
      
      <div className="section-container relative z-10">
        <div className="space-y-8 md:space-y-10">
          {/* Main title */}
          <h1 className="heading-xl">
            <span className="text-primary">СБОРКА</span>
          </h1>
          
          {/* Tagline */}
          <p className="heading-md text-foreground max-w-3xl">
            Хватит ныть.{" "}
            <span className="text-primary">Собирайся и работай.</span>
          </p>
          
          {/* Hard truths */}
          <div className="space-y-2 text-lg md:text-xl text-muted-foreground max-w-2xl">
            <p>Рынок не обязан быть удобным.</p>
            <p>Компании не обязаны тебя выбирать.</p>
            <p>Никто не будет разбираться в твоём потенциале, если ты сам не навёл порядок.</p>
          </div>
          
          <p className="text-xl md:text-2xl text-foreground font-medium max-w-2xl">
            Если поиск затянулся — значит пора менять подход.
          </p>
          
          {/* What is SBORKA */}
          <div className="space-y-4 max-w-2xl">
            <p className="text-lg md:text-xl text-foreground">
              <span className="text-primary font-bold">СБОРКА</span> — клуб карьерной дисциплины.
            </p>
            <p className="text-muted-foreground">
              Здесь перестают жаловаться и начинают действовать.
            </p>
          </div>
          
          {/* Benefits list */}
          <ul className="space-y-3 max-w-2xl">
            {benefits.map((benefit, index) => (
              <li key={index} className="list-acid text-foreground/90">
                {benefit}
              </li>
            ))}
          </ul>
          
          <p className="text-lg text-muted-foreground italic">
            Это место для тех, кто готов собраться.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
              Попасть на открытый вебинар
            </a>
          </div>
          
          {/* Payment note */}
          <p className="text-sm text-muted-foreground">
            Доступ оформляется через Tribute.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
