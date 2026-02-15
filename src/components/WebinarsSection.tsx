const WebinarsSection = () => {
  const topics = [
    "Почему отклики молчат (и как это исправить)",
    "3 ошибки в резюме, которые стоят офферов",
    "Как LinkedIn может работать на тебя 24/7",
    "Что отличает успешных соискателей от остальных",
  ];

  return (
    <section className="section-white relative overflow-hidden">
      {/* Decorative circles — NRC palette */}
      <div className="absolute left-0 top-1/3 -translate-x-1/2 pointer-events-none opacity-10">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#4ECDC4" strokeWidth="2" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="#45B7D1" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="space-y-8">
          <h2 className="heading-xl" id="webinar">
            НАЧНИ С<br />
            ВЕБИНАРА
          </h2>

          <h3 className="text-xl md:text-2xl font-bold">
            17 февраля, 15:00 МСК. Бесплатно. 60 минут практики.
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
            После вебинара ты поймёшь, подходит ли тебе СБОРКА.
          </p>

          {/* CTA — NRC style */}
          <a
            href="https://t.me/sborka_career_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary-nrc inline-block"
          >
            Записаться на вебинар
          </a>
        </div>
      </div>
    </section>
  );
};

export default WebinarsSection;
