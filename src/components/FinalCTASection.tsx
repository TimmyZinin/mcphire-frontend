import { Send } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section className="py-section md:py-32">
      <div className="section-container">
        <div className="quiet-divider mb-16" />
        
        <div className="text-center space-y-8">
          {/* CTA Button */}
          <a 
            href="https://t.me/sborka_club" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-telegram"
          >
            <Send className="w-4 h-4" />
            Подписаться на Telegram
          </a>
          
          {/* Small note */}
          <p className="text-xs text-muted-foreground tracking-wide">
            Без спама. Только рабочее состояние.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
