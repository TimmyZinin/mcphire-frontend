import bgWebinars from "@/assets/bg-webinars.jpg";

const WebinarsSection = () => {
  const topics = [
    "«Почему сейчас не отвечают на резюме»",
    "«Как искать работу в 2025 году»",
    "«Что HR реально смотрит на собеседовании»",
  ];

  const features = [
    "отвечаем на вопросы рынка",
    "разбираем реальные ситуации",
    "говорим честно, без приукрашивания",
  ];

  return (
    <section className="section-accent relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${bgWebinars})` }}
      />
      
      <div className="section-container relative z-10">
        <div className="space-y-12">
          {/* Heading */}
          <h2 className="heading-lg text-secondary">
            Начни с{" "}
            <span className="text-foreground">открытого вебинара</span>
          </h2>
          
          {/* Description */}
          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-primary-foreground/80">
              Мы регулярно проводим вебинары и Q&A, где:
            </p>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="list-acid text-primary-foreground">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Topics */}
          <div className="space-y-6">
            <p className="text-lg text-primary-foreground/60 uppercase tracking-wider">
              Пример тем:
            </p>
            <div className="space-y-4">
              {topics.map((topic, index) => (
                <div 
                  key={index}
                  className="bg-foreground p-4 md:p-6 comic-panel"
                  style={{ transform: `rotate(${index % 2 === 0 ? -0.5 : 0.5}deg)` }}
                >
                  <p className="text-lg md:text-xl text-background font-medium">
                    {topic}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <a 
            href="https://t.me/sborka_club" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-secondary inline-block"
          >
            Записаться на ближайший вебинар
          </a>
        </div>
      </div>
    </section>
  );
};

export default WebinarsSection;
