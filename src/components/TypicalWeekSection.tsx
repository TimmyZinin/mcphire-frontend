const TypicalWeekSection = () => {
  const schedule = [
    {
      days: "ПН — ПТ",
      time: "ежедневно",
      activity: "Трекинг в Telegram",
      description: "Отчёт о действиях. Публично. Без оправданий.",
    },
    {
      days: "СРЕДА",
      time: "15:00",
      activity: "Групповая сессия",
      description: "Разборы, вопросы, работа над стратегией.",
    },
    {
      days: "СУББОТА",
      time: "12:00",
      activity: "Вторая сессия",
      description: "Hot seat, прожарка резюме, практика.",
    },
  ];

  return (
    <section className="section-white">
      <div className="section-container">
        <div className="space-y-8">
          {/* Heading */}
          <h2 className="heading-xl glitch-hover">
            ТИПИЧНАЯ<br />
            НЕДЕЛЯ
          </h2>
          
          <p className="text-muted-foreground text-lg">
            Это рабочая среда, где люди действуют вместе.
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
            Каждую неделю — конкретные шаги. Не мотивация, а движение.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TypicalWeekSection;
