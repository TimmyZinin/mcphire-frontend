const DailyTrackingSection = () => {
  const steps = [
    {
      time: "УТРО",
      action: "Ставишь 1 карьерную задачу",
    },
    {
      time: "ВЕЧЕР",
      action: "Отмечаешь выполнение",
    },
  ];

  return (
    <section className="section-white">
      <div className="section-container">
        <div className="space-y-8">
          {/* Heading */}
          <h2 className="heading-xl">
            ЕЖЕДНЕВНЫЙ<br />
            ТРЕКИНГ
          </h2>
          
          {/* Steps */}
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="border-2 border-foreground p-8 space-y-4"
              >
                <div className="inline-block bg-primary px-4 py-2 font-black text-sm uppercase">
                  {step.time}
                </div>
                <p className="text-2xl md:text-3xl font-bold">
                  {step.action}
                </p>
              </div>
            ))}
          </div>
          
          {/* Description */}
          <div className="border-t-2 border-foreground pt-6 space-y-4">
            <p className="text-xl md:text-2xl font-bold">
              Публично, в чате. Без оправданий.
            </p>
            <p className="text-muted-foreground text-lg">
              Каждый день — маленький шаг. Каждый шаг — на виду у группы.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyTrackingSection;
