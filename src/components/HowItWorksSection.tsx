import illustrationSteps from "@/assets/illustration-steps.jpg";

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
    <section className="section-dark border-t-4 border-primary">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Illustration */}
          <div className="order-2 lg:order-1">
            <img 
              src={illustrationSteps} 
              alt="Шаги процесса"
              className="w-full h-auto border-4 border-primary"
            />
          </div>
          
          {/* Content */}
          <div className="space-y-12 order-1 lg:order-2">
            {/* Heading */}
            <h2 className="heading-lg">
              Как устроена{" "}
              <span className="text-accent">Сборка</span>
            </h2>
            
            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="flex gap-6 items-start"
                >
                  <div className="step-number flex-shrink-0">
                    {step.number}
                  </div>
                  <div className="space-y-2 pt-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground uppercase tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-lg md:text-xl text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
