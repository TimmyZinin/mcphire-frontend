import heroVideo from "@/assets/hero-video.mp4";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center section-dark relative overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
      
      {/* Background stripes */}
      <div className="absolute inset-0 stripe-bg opacity-30" />
      
      <div className="section-container relative z-10">
        <div className="space-y-8 md:space-y-12">
          {/* Main title */}
          <h1 className="heading-xl">
            <span className="text-primary">СБОРКА.</span>
          </h1>
          
          <p className="heading-md text-foreground max-w-3xl">
            Когда нужно собраться —{" "}
            <span className="text-primary">это нормально.</span>
          </p>
          
          {/* Subtitle */}
          <div className="space-y-2 text-xl md:text-2xl text-muted-foreground max-w-2xl">
            <p>Рынок сложный.</p>
            <p>Работа ищется дольше.</p>
            <p className="text-foreground font-medium">Ты не сломан — ты в процессе.</p>
          </div>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-foreground max-w-2xl leading-relaxed">
            Сборка — это пространство, где люди{" "}
            <span className="text-primary font-bold">возвращают себе дисциплину, ясность и уверенность</span>{" "}
            в поиске работы и карьере.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="https://t.me/sborka_club" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-primary animate-pulse-glow"
            >
              Присоединиться к Сборке
            </a>
            <a 
              href="https://t.me/sborka_club" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-secondary"
            >
              Записаться на вебинар
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
