const HowItWorksSection = () => {
  const steps = [
    { title: "ДИАГНОСТИКА", description: "понимаем твою точку А." },
    { title: "СТРАТЕГИЯ", description: "формируем план поиска." },
    { title: "РАБОТА", description: "созвоны, задания, разборы." },
    { title: "СРЕДА", description: "вокруг люди твоего уровня." },
    { title: "РЕЗУЛЬТАТ", description: "больше ясности, меньше хаоса." },
  ];

  return (
    <section className="section-white">
      <div className="section-container">
        <div className="space-y-8">
          {/* Heading */}
          <h2 className="heading-xl glitch-hover">
            КАК УСТРОЕНА<br />
            РАБОТА
          </h2>
          
          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-3 text-lg md:text-xl">
                <span className="font-black">{step.title}</span>
                <span className="text-muted-foreground">— {step.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
