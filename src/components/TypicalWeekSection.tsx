const TypicalWeekSection = () => {
  const schedule = [
    {
      days: "ПН — ПТ",
      time: "ежедневно",
      activity: "Трекинг задач",
      description: "Утром — задача. Вечером — отчёт. Публично в чате.",
    },
    {
      days: "СРЕДА",
      time: "15:00",
      activity: "Групповая сессия",
      description: "Разборы ситуаций, ответы на вопросы, работа над стратегией.",
    },
    {
      days: "СУББОТА",
      time: "12:00",
      activity: "Практическая сессия",
      description: "Прожарка резюме, LinkedIn-профилей, симуляция интервью.",
    },
  ];

  return (
    <section className="section-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute left-0 top-1/3 -translate-x-1/2 pointer-events-none opacity-15">
        <svg width="250" height="250" viewBox="0 0 250 250">
          <circle cx="125" cy="125" r="110" fill="none" stroke="#DFFF00" strokeWidth="3" />
          <circle cx="125" cy="125" r="80" fill="none" stroke="#DFFF00" strokeWidth="2" />
          <circle cx="125" cy="125" r="50" fill="none" stroke="#DFFF00" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="section-container relative z-10">
        <div className="space-y-8">
          {/* Heading */}
          <h2 className="heading-xl glitch-hover">
            ТИПИЧНАЯ<br />
            НЕДЕЛЯ
          </h2>
          
          <p className="text-muted-foreground text-lg">
            Регулярность важнее интенсивности. Каждую неделю — системная работа.
          </p>
          
          {/* Schedule */}
          <div className="grid md:grid-cols-3 gap-6">
            {schedule.map((item, index) => (
              <div 
                key={index}
                className="border-2 border-foreground p-6 space-y-4"
              >
                {/* Days chip */}
                <div className="inline-block bg-primary px-4 py-2 font-black text-sm uppercase">
                  {item.days}
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
          
          {/* Summary */}
          <p className="text-xl md:text-2xl font-bold pt-4">
            6 часов работы в неделю. Результат — за 6-8 недель.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TypicalWeekSection;
