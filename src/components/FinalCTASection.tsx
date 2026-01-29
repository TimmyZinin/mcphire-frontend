import bgFinalCta from "@/assets/bg-final-cta.jpg";

const FinalCTASection = () => {
  return (
    <section className="section-secondary py-24 md:py-32 relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${bgFinalCta})` }}
      />
      
      {/* Decorative stars */}
      <div className="absolute top-10 left-10 text-primary text-4xl animate-float">★</div>
      <div className="absolute top-20 right-10 text-primary text-3xl animate-float" style={{ animationDelay: '0.5s' }}>★</div>
      <div className="absolute bottom-20 left-20 text-primary text-2xl animate-float" style={{ animationDelay: '1s' }}>★</div>
      <div className="absolute bottom-10 right-20 text-primary text-4xl animate-float" style={{ animationDelay: '1.5s' }}>★</div>
      
      <div className="section-container relative z-10">
        <div className="space-y-12 text-center">
          {/* Heading */}
          <h2 className="heading-xl text-primary" style={{ textShadow: '4px 4px 0 hsl(0 0% 0%)' }}>
            Готов собраться?
          </h2>
          
          {/* Subheading in comic panel */}
          <div className="inline-block bg-foreground p-6 comic-panel">
            <div className="space-y-2 text-xl md:text-2xl">
              <p className="text-background">Без мотивации.</p>
              <p className="text-background">Без обещаний.</p>
              <p className="text-primary font-bold">Системно и по-взрослому.</p>
            </div>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
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
              Начать с вебинара
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
