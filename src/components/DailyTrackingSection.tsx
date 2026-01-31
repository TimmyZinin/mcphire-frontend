const DailyTrackingSection = () => {
  const steps = [
    {
      time: "УТРО",
      action: "Ставишь задачу на день",
      description: "Конкретную, измеримую, связанную с поиском работы.",
    },
    {
      time: "ВЕЧЕР",
      action: "Отчитываешься о результате",
      description: "Публично. Перед группой. Без отмазок.",
    },
  ];

  return (
    <section className="section-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-20">
        <svg width="200" height="200" viewBox="0 0 200 200" className="animate-rotate-slow">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#DFFF00" strokeWidth="2" strokeDasharray="15,10" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#DFFF00" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="section-container relative z-10">
        <div className="space-y-8">
          {/* Heading */}
          <h2 className="heading-xl glitch-hover">
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
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Description */}
          <div className="border-t-2 border-foreground pt-6 space-y-4">
            <p className="text-xl md:text-2xl font-bold">
              Публичная ответственность работает лучше силы воли.
            </p>
            <p className="text-muted-foreground text-lg">
              Когда ты знаешь, что вечером отчитываешься — утром начинаешь действовать.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyTrackingSection;
