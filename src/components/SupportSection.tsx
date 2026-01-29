import bgSupport from "@/assets/bg-support.jpg";

const SupportSection = () => {
  const points = [
    "опора",
    "структура",
    "рабочее состояние",
  ];

  return (
    <section className="section-dark relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${bgSupport})` }}
      />
      
      {/* Decorative stars */}
      <div className="absolute top-10 left-10 text-secondary text-3xl">★</div>
      <div className="absolute top-20 right-20 text-accent text-4xl">★</div>
      <div className="absolute bottom-10 right-10 text-secondary text-2xl">★</div>
      
      <div className="section-container relative z-10">
        <div className="space-y-12 text-center">
          {/* Heading */}
          <h2 className="heading-lg text-secondary">
            Когда нужно собраться —{" "}
            <span className="block mt-2 text-foreground">это нормально</span>
          </h2>
          
          {/* Text in speech bubble */}
          <div className="quote-block max-w-2xl mx-auto text-left">
            <p className="text-background">
              Ты не обязан быть сильным всё время.
            </p>
            <p className="text-primary font-bold text-2xl">
              Но ты можешь собраться.
            </p>
          </div>
          
          {/* Points */}
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8">
            {points.map((point, index) => (
              <div 
                key={index}
                className="bg-secondary text-secondary-foreground px-8 py-4 comic-panel"
                style={{ transform: `rotate(${index === 0 ? -3 : index === 2 ? 3 : 0}deg)` }}
              >
                <span className="text-xl md:text-2xl font-display uppercase tracking-wider">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
