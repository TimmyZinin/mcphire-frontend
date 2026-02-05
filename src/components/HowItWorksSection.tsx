const HowItWorksSection = () => {
  const steps = [
    { title: "ДИАГНОСТИКА", description: "понимаем твою точку А." },
    { title: "СТРАТЕГИЯ", description: "формируем план поиска." },
    { title: "РАБОТА", description: "созвоны, задания, разборы." },
    { title: "СРЕДА", description: "вокруг люди твоего уровня." },
    { title: "РЕЗУЛЬТАТ", description: "больше ясности, меньше хаоса." },
  ];

  return (
    <section className="section-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute left-0 bottom-1/4 -translate-x-1/3 pointer-events-none opacity-25">
        <svg width="220" height="220" viewBox="0 0 220 220" className="animate-float-slow">
          <circle cx="110" cy="110" r="100" fill="none" stroke="#DFFF00" strokeWidth="3" />
          <circle cx="110" cy="110" r="65" fill="none" stroke="#DFFF00" strokeWidth="2" strokeDasharray="8,6" />
          <circle cx="110" cy="110" r="30" fill="#DFFF00" opacity="0.5" />
        </svg>
      </div>
      
      <div className="section-container relative z-10">
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
