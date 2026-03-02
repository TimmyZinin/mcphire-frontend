const WebinarsSection = () => {
  const topics = [
    "Что такое СБОРКА и как устроен карьерный клуб",
    "Формат работы: спринты, команды, менторы",
    "Результаты участников — реальные кейсы",
    "Ответы на ваши вопросы в прямом эфире",
  ];

  return (
    <section id="webinar" className="section-white relative overflow-hidden">
      {/* Decorative circles — NRC palette */}
      <div className="absolute left-0 top-1/3 -translate-x-1/2 pointer-events-none opacity-10">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#4ECDC4" strokeWidth="2" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="#45B7D1" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="space-y-8">
          <h2 className="heading-xl">
            ОТКРЫТЫЙ<br />
            УРОК
          </h2>

          <h3 className="text-xl md:text-2xl font-bold">
            5 марта, 16:00 МСК. Регистрация через бота.
          </h3>

          {/* Topics */}
          <div className="space-y-4">
            <p className="text-muted-foreground uppercase tracking-wider text-sm">
              На встрече:
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
            Приходи, познакомься с клубом и задай свои вопросы.
          </p>

          {/* CTA — NRC style */}
          <a
            href="https://t.me/Sborka_work_bot?start=webinar4_site"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary-nrc inline-block"
          >
            Зарегистрироваться
          </a>
        </div>
      </div>
    </section>
  );
};

export default WebinarsSection;
