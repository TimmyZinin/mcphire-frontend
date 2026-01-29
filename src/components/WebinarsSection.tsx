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
    <section className="section-dark border-t-4 border-primary">
      <div className="section-container">
        <div className="space-y-12">
          {/* Heading */}
          <h2 className="heading-lg">
            Начни с{" "}
            <span className="text-accent">открытого вебинара</span>
          </h2>
          
          {/* Description */}
          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-muted-foreground">
              Мы регулярно проводим вебинары и Q&A, где:
            </p>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="list-acid">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Topics */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground uppercase tracking-wider">
              Пример тем:
            </p>
            <div className="space-y-4">
              {topics.map((topic, index) => (
                <div 
                  key={index}
                  className="bg-card p-4 md:p-6 border-l-4 border-secondary"
                >
                  <p className="text-lg md:text-xl text-foreground font-medium">
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
            className="cta-primary inline-block"
          >
            Записаться на ближайший вебинар
          </a>
        </div>
      </div>
    </section>
  );
};

export default WebinarsSection;
