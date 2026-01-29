import illustrationCta from "@/assets/illustration-cta.jpg";

const FinalCTASection = () => {
  return (
    <section className="section-dark border-t-4 border-primary py-24 md:py-32 relative overflow-hidden">
      {/* Background illustration */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src={illustrationCta} 
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="section-container relative z-10">
        <div className="space-y-12 text-center">
          {/* Heading */}
          <h2 className="heading-xl text-primary">
            Готов собраться?
          </h2>
          
          {/* Subheading */}
          <div className="space-y-2 text-xl md:text-2xl text-muted-foreground">
            <p>Без мотивации.</p>
            <p>Без обещаний.</p>
            <p className="text-foreground font-medium">Системно и по-взрослому.</p>
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
