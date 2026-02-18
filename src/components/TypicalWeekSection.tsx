const LEVEL_COLORS = ['#4ECDC4', '#45B7D1', '#96CEB4', '#4ECDC4'];

const TIER_BADGES: Record<string, { label: string; color: string }> = {
  start: { label: "СТАРТ", color: "#96CEB4" },
  proryv: { label: "ПРОРЫВ", color: "#45B7D1" },
  vip: { label: "VIP", color: "#4ECDC4" },
};

const TypicalWeekSection = () => {
  const schedule = [
    {
      days: "ПОНЕДЕЛЬНИК",
      time: "19:00",
      activity: "Стрим / Лекция",
      description: "Тематическое занятие в формате стрима. Доступно всем тарифам.",
      tiers: ["start", "proryv", "vip"],
    },
    {
      days: "ВТОРНИК",
      time: "15:00",
      activity: "Групповая сессия",
      description: "Разборы ситуаций, ответы на вопросы, работа над стратегией.",
      tiers: ["proryv", "vip"],
    },
    {
      days: "ПЯТНИЦА",
      time: "15:00",
      activity: "Групповая сессия",
      description: "Разборы ситуаций, ответы на вопросы, работа над стратегией.",
      tiers: ["proryv", "vip"],
    },
    {
      days: "СРЕДА",
      time: "По записи",
      activity: "Персональная сессия",
      description: "Разбор резюме, LinkedIn-профилей, симуляция интервью. Букинг через Calendly.",
      tiers: ["vip"],
    },
  ];

  return (
    <section className="section-white relative overflow-hidden">
      {/* Decorative circles — NRC palette */}
      <div className="absolute left-0 top-1/3 -translate-x-1/2 pointer-events-none opacity-10">
        <svg width="250" height="250" viewBox="0 0 250 250">
          <circle cx="125" cy="125" r="110" fill="none" stroke="#4ECDC4" strokeWidth="2" />
          <circle cx="125" cy="125" r="80" fill="none" stroke="#45B7D1" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="space-y-8">
          <h2 className="heading-xl">
            ТИПИЧНАЯ<br />
            НЕДЕЛЯ
          </h2>

          <p className="text-muted-foreground text-lg">
            Регулярность важнее интенсивности. Каждую неделю — системная работа.
          </p>

          {/* Focus photo */}
          <div className="overflow-hidden rounded-2xl shadow-xl max-w-lg">
            <img
              src="/images/focus_new.webp"
              alt="Мужчина в наушниках за ноутбуком — deep work в потоке"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>

          {/* Schedule — NRC card style */}
          <div className="grid md:grid-cols-2 gap-6">
            {schedule.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border/30 bg-card shadow-lg p-6 space-y-4"
                style={{ borderTop: `3px solid ${LEVEL_COLORS[index]}` }}
              >
                {/* Days chip + Tier badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div
                    className="inline-block px-4 py-2 rounded-full font-black text-sm uppercase text-white"
                    style={{ backgroundColor: LEVEL_COLORS[index] }}
                  >
                    {item.days}
                  </div>
                  {item.tiers.map((tier) => {
                    const badge = TIER_BADGES[tier];
                    return (
                      <div
                        key={tier}
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase border-2"
                        style={{ borderColor: badge.color, color: badge.color }}
                      >
                        {badge.label}
                      </div>
                    );
                  })}
                </div>

                {/* Time */}
                <p className="text-3xl md:text-4xl font-black">
                  {item.time}
                </p>

                {/* Activity */}
                <h3 className="text-lg font-bold uppercase">
                  {item.activity}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xl md:text-2xl font-bold pt-4">
            6 часов работы в неделю. Результат — за 6-8 недель.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TypicalWeekSection;
