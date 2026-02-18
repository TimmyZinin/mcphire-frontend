const LEVEL_COLORS = ['#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

const ScheduleSection = () => {
  const weeks = [
    {
      week: "Неделя 1",
      module: "Диагностика",
      result: "SMART-цель поиска",
      sessions: [
        { day: "Пн", type: "Лекция", title: "Аудит карьеры: где ты сейчас и куда идёшь", lead: "Тим" },
        { day: "Вт", type: "Группа", title: "Постановка SMART-цели + разбор ситуаций" },
        { day: "Пт", type: "Группа", title: "Чек-ин: план на неделю + buddy-знакомство" },
      ],
    },
    {
      week: "Неделя 2",
      module: "Инструменты",
      result: "Резюме + LinkedIn",
      sessions: [
        { day: "Пн", type: "Лекция", title: "Резюме, которое проходит ATS и цепляет рекрутера", lead: "Кристина" },
        { day: "Вт", type: "Группа", title: "Прожарка резюме: разбор 3-4 участников" },
        { day: "Пт", type: "Группа", title: "LinkedIn-профиль: как стать видимым для рекрутеров", lead: "Тим" },
      ],
    },
    {
      week: "Неделя 3-4",
      module: "Активный поиск",
      result: "50+ откликов",
      sessions: [
        { day: "Пн", type: "Лекция", title: "Стратегия поиска: площадки, аутрич, нетворкинг", lead: "Тим" },
        { day: "Вт", type: "Группа", title: "Разбор откликов и сопроводительных писем" },
        { day: "Пт", type: "Группа", title: "AI-инструменты для автоматизации рассылки", lead: "Тим" },
      ],
    },
    {
      week: "Неделя 5-6",
      module: "Собеседования",
      result: "3+ интервью",
      sessions: [
        { day: "Пн", type: "Лекция", title: "Подготовка к интервью: STAR, вопросы, переговоры", lead: "Кристина" },
        { day: "Вт", type: "Группа", title: "Симуляция интервью + обратная связь" },
        { day: "Пт", type: "Группа", title: "Переговоры о зарплате и анализ офферов" },
      ],
    },
    {
      week: "Неделя 7-8",
      module: "Финиш",
      result: "Оффер или план",
      sessions: [
        { day: "Пн", type: "Лекция", title: "Выбор оффера и адаптация на новом месте", lead: "Тим" },
        { day: "Вт", type: "Группа", title: "Финальный разбор: что сработало, что дальше" },
        { day: "Пт", type: "Группа", title: "Выпуск: итоги марафона + план развития" },
      ],
    },
  ];

  return (
    <section id="schedule" className="section-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute right-0 top-1/4 translate-x-1/2 pointer-events-none opacity-10">
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="130" fill="none" stroke="#45B7D1" strokeWidth="2" />
          <circle cx="150" cy="150" r="90" fill="none" stroke="#4ECDC4" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="heading-xl">
              РАСПИСАНИЕ<br />
              ЗАНЯТИЙ
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              8 недель системной работы. Каждая неделя — конкретный модуль с измеримым результатом.
            </p>
          </div>

          {/* Weeks */}
          <div className="space-y-6">
            {weeks.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className="rounded-2xl border border-border/30 bg-card shadow-lg overflow-hidden"
                style={{ borderLeft: `4px solid ${LEVEL_COLORS[weekIndex % LEVEL_COLORS.length]}` }}
              >
                {/* Week header */}
                <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 border-b border-border/20">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-block px-4 py-1.5 rounded-full font-black text-sm uppercase text-white"
                      style={{ backgroundColor: LEVEL_COLORS[weekIndex % LEVEL_COLORS.length] }}
                    >
                      {week.week}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">
                      {week.module}
                    </h3>
                  </div>
                  <div className="md:ml-auto">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase border-2 border-border text-muted-foreground">
                      Результат: {week.result}
                    </span>
                  </div>
                </div>

                {/* Sessions */}
                <div className="divide-y divide-border/15">
                  {week.sessions.map((session, sessionIndex) => (
                    <div
                      key={sessionIndex}
                      className="px-5 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                    >
                      <div className="flex items-center gap-3 sm:w-40 flex-shrink-0">
                        <span className="text-sm font-bold text-muted-foreground w-6">
                          {session.day}
                        </span>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
                            session.type === "Лекция"
                              ? "bg-primary/15 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {session.type}
                        </span>
                      </div>
                      <p className="text-sm md:text-base font-medium flex-1">
                        {session.title}
                      </p>
                      {session.lead && (
                        <span
                          className="text-xs font-bold uppercase px-2.5 py-1 rounded-full text-white flex-shrink-0 self-start sm:self-center"
                          style={{ backgroundColor: LEVEL_COLORS[weekIndex % LEVEL_COLORS.length] }}
                        >
                          {session.lead}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming events */}
          <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 md:p-8 space-y-4">
            <h3 className="heading-md">Ближайшие занятия</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-bold uppercase text-primary">19 февраля, 18:00</p>
                <p className="font-bold">Как устроен найм в 2026</p>
                <p className="text-sm text-muted-foreground">Открытый вебинар</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold uppercase text-primary">24 февраля, 18:00</p>
                <p className="font-bold">Система поиска работы за 30-60 дней</p>
                <p className="text-sm text-muted-foreground">Открытый вебинар</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold uppercase text-primary">26 февраля, 18:00</p>
                <p className="font-bold">Живой разбор профилей</p>
                <p className="text-sm text-muted-foreground">Открытый вебинар</p>
              </div>
            </div>
          </div>

          <p className="text-xl md:text-2xl font-bold pt-4">
            Каждый понедельник — лекция. Каждый вторник и пятница — групповая работа.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
