import bgWebinars from "@/assets/bg-webinars.jpg";

const WebinarsSection = () => {
  const topics = [
    "что реально происходит на рынке",
    "почему откликов мало",
    "где кандидаты теряют офферы",
    "что менять прямо сейчас",
  ];

  return (
    <section className="section-dark border-t-4 border-primary relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${bgWebinars})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/80" />
      
      <div className="section-container relative z-10">
        <div className="space-y-10">
          {/* Heading */}
          <h2 className="heading-lg">
            Точка входа
          </h2>
          
          <h3 className="heading-md text-accent">
            Начни с открытого вебинара.
          </h3>
          
          {/* Topics */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground uppercase tracking-wider">
              Разберём:
            </p>
            <ul className="space-y-3">
              {topics.map((topic, index) => (
                <li key={index} className="list-acid text-foreground">
                  {topic}
                </li>
              ))}
            </ul>
          </div>
          
          <p className="text-xl text-muted-foreground">
            Без приукрашивания.
          </p>
          
          {/* CTA */}
          <a 
            href="https://t.me/sborka_club" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-primary inline-block"
          >
            Записаться на вебинар
          </a>
        </div>
      </div>
    </section>
  );
};

export default WebinarsSection;
