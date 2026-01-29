import heroVideo from "@/assets/hero-video.mp4";
import logoSborka from "@/assets/logo-sborka.png";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center section-dark relative overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
      
      {/* Decorative stars */}
      <div className="absolute top-20 left-10 text-secondary text-4xl animate-float">★</div>
      <div className="absolute top-40 right-20 text-accent text-3xl animate-float" style={{ animationDelay: '0.5s' }}>★</div>
      <div className="absolute bottom-40 left-20 text-secondary text-2xl animate-float" style={{ animationDelay: '1s' }}>★</div>
      <div className="absolute bottom-20 right-10 text-accent text-4xl animate-float" style={{ animationDelay: '1.5s' }}>★</div>
      
      <div className="section-container relative z-10">
        <div className="space-y-8 md:space-y-12">
          {/* Logo */}
          <div className="max-w-md md:max-w-lg lg:max-w-xl">
            <img 
              src={logoSborka} 
              alt="СБОРКА - Когда нужно собраться" 
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
          
          {/* Subtitle in speech bubble style */}
          <div className="bg-foreground text-background p-4 md:p-6 inline-block border-4 border-background max-w-2xl relative comic-panel">
            <p className="text-xl md:text-2xl font-bold">
              Клуб карьерной устойчивости для тех, кто готов действовать
            </p>
          </div>
          
          {/* Description */}
          <div className="space-y-2 text-xl md:text-2xl max-w-2xl">
            <p className="text-muted-foreground">Рынок сложный. Работа ищется дольше.</p>
            <p className="text-foreground font-bold bg-secondary text-secondary-foreground inline-block px-3 py-1">
              Ты не сломан — ты в процессе.
            </p>
          </div>
          
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
