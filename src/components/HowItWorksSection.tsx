import bgHowItWorks from "@/assets/bg-how-it-works.jpg";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      title: "Вход",
      description: "Ты приходишь на открытый вебинар или Q&A.",
    },
    {
      number: "2",
      title: "Фокус",
      description: "Мы разбираем твою ситуацию: рынок, позицию, стратегию.",
    },
    {
      number: "3",
      title: "Работа",
      description: "Регулярные встречи, задания, разборы, трекинг.",
    },
    {
      number: "4",
      title: "Поддержка",
      description: "Ты не один. Люди рядом — в таком же процессе.",
    },
    {
      number: "5",
      title: "Результат",
      description: "Ясность, структура, спокойствие и движение вперёд.",
    },
  ];

  return (
    <section className="section-secondary relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${bgHowItWorks})` }}
      />
      
      <div className="section-container relative z-10">
        <div className="space-y-12">
          {/* Heading */}
          <h2 className="heading-lg text-secondary-foreground">
            Как устроена{" "}
            <span className="text-primary">Сборка</span>
          </h2>
          
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex gap-6 items-start"
              >
                <div className="step-number flex-shrink-0" style={{ transform: `rotate(${index % 2 === 0 ? -3 : 3}deg)` }}>
                  {step.number}
                </div>
                <div className="space-y-2 pt-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-secondary-foreground uppercase tracking-tight font-display">
                    {step.title}
                  </h3>
                  <p className="text-lg md:text-xl text-secondary-foreground/80">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
