const WebinarsSection = () => {
  const topics = [
    "что реально происходит на рынке",
    "почему откликов мало",
    "где кандидаты теряют офферы",
    "что менять прямо сейчас",
  ];

  return (
    <section className="section-white">
      <div className="section-container">
        <div className="space-y-8">
          {/* Heading */}
          <h2 className="heading-xl">
            ТОЧКА ВХОДА
          </h2>
          
          <h3 className="text-xl md:text-2xl font-bold">
            Начни с открытого вебинара.
          </h3>
          
          {/* Topics */}
          <div className="space-y-4">
            <p className="text-muted-foreground uppercase tracking-wider text-sm">
              Разберём:
            </p>
            <ul className="space-y-3">
              {topics.map((topic, index) => (
                <li key={index} className="list-arrow">
                  {topic}
                </li>
              ))}
            </ul>
          </div>
          
          <p className="text-lg text-muted-foreground">
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
