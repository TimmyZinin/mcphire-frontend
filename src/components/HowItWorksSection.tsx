import bgHowItWorks from "@/assets/bg-how-it-works.jpg";

const HowItWorksSection = () => {
  const steps = [
    {
      title: "Диагностика",
      description: "понимаем твою точку А.",
    },
    {
      title: "Стратегия",
      description: "формируем план поиска.",
    },
    {
      title: "Работа",
      description: "созвоны, задания, разборы.",
    },
    {
      title: "Среда",
      description: "вокруг люди твоего уровня.",
    },
    {
      title: "Результат",
      description: "больше ясности, меньше хаоса.",
    },
  ];

  return (
    <section className="section-dark border-t-4 border-secondary relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${bgHowItWorks})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-l from-background via-background/90 to-background/80" />
      
      <div className="section-container relative z-10">
        <div className="space-y-10">
          {/* Heading */}
          <h2 className="heading-lg">
            Как устроена{" "}
            <span className="text-secondary">работа</span>
          </h2>
          
          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex gap-4 items-baseline"
              >
                <span className="text-primary font-bold text-2xl">→</span>
                <div>
                  <span className="text-xl md:text-2xl font-bold text-foreground uppercase">
                    {step.title}
                  </span>
                  <span className="text-xl md:text-2xl text-muted-foreground">
                    {" — "}{step.description}
                  </span>
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
