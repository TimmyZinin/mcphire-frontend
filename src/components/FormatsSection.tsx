const LEVEL_COLORS = ['#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

const FormatsSection = () => {
  const formats = [
    {
      name: "Экспертный разбор резюме",
      description: "Узнаешь, что на самом деле видят рекрутеры. Конкретные рекомендации по улучшению.",
      lead: "ведёт Кристина",
      icon: "📄",
    },
    {
      name: "Групповые разборы",
      description: "Твоя ситуация — в центре внимания группы. Получаешь конкретные решения.",
      lead: null,
      icon: "💡",
    },
    {
      name: "LinkedIn-сессии",
      description: "Профиль, который работает на тебя 24/7.",
      lead: "ведёт Тим",
      icon: "💼",
    },
    {
      name: "Симуляции интервью",
      description: "Практика сложных вопросов. Обратная связь от экспертов.",
      lead: null,
      icon: "🎤",
    },
    {
      name: "AI-инструменты",
      description: "Автоматизация рутины. Больше откликов за меньшее время.",
      lead: "ведёт Тим",
      icon: "🤖",
    },
  ];

  const infrastructure = [
    "2 групповые сессии в неделю с экспертами",
    "Закрытый чат участников (только действующие соискатели)",
    "Записи всех сессий с таймкодами",
    "База знаний: шаблоны, скрипты, чек-листы",
  ];

  return (
    <section className="section-white relative overflow-hidden">
      {/* Decorative circles — NRC palette */}
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 pointer-events-none opacity-10">
        <svg width="350" height="350" viewBox="0 0 350 350">
          <circle cx="175" cy="175" r="160" fill="none" stroke="#4ECDC4" strokeWidth="1.5" />
          <circle cx="175" cy="175" r="120" fill="none" stroke="#45B7D1" strokeWidth="1.5" />
          <circle cx="175" cy="175" r="80" fill="none" stroke="#96CEB4" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="space-y-12">
          {/* Heading */}
          <div className="space-y-4">
            <h2 className="heading-xl">
              ЧТО ВНУТРИ<br />
              СИСТЕМЫ
            </h2>
            <p className="text-muted-foreground text-lg">
              Инструменты, которые превращают хаотичный поиск в системную работу.
            </p>
          </div>

          {/* Rooftop work photo */}
          <div className="overflow-hidden rounded-2xl shadow-xl max-w-xl">
            <img
              src="/images/rooftop_work.png"
              alt="Участник работает на террасе с видом на город"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>

          {/* Formats grid — NRC card style */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formats.map((format, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border/30 bg-card shadow-lg p-6 space-y-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ borderTop: `3px solid ${LEVEL_COLORS[index % LEVEL_COLORS.length]}` }}
              >
                <div className="text-2xl">{format.icon}</div>
                <h3 className="font-black uppercase text-lg">
                  {format.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {format.description}
                </p>
                {format.lead && (
                  <p
                    className="text-xs font-bold uppercase inline-block px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: LEVEL_COLORS[index % LEVEL_COLORS.length] }}
                  >
                    {format.lead}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Infrastructure list */}
          <div className="space-y-4">
            <h3 className="heading-md">Инфраструктура</h3>
            <ul className="space-y-3">
              {infrastructure.map((item, index) => (
                <li key={index} className="list-arrow">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xl md:text-2xl font-bold pt-4 border-t border-border">
            Всё, что нужно для системного поиска — в одном месте.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FormatsSection;
