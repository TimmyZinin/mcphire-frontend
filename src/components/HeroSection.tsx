import { Send } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center py-section-sm md:py-section">
      <div className="section-container">
        <div className="space-y-8 md:space-y-10">
          {/* Main title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-none">
            СБОРКА
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground tracking-tight max-w-md">
            Когда нужно собраться
          </p>
          
          {/* Short description */}
          <p className="text-base md:text-lg text-foreground/80 max-w-lg leading-relaxed">
            Клуб для тех, кто не ищет мотивацию, а возвращает рабочее состояние.
          </p>
          
          {/* CTA */}
          <div className="pt-4">
            <a 
              href="https://t.me/sborka_club" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-telegram"
            >
              <Send className="w-4 h-4" />
              Подписаться на Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
