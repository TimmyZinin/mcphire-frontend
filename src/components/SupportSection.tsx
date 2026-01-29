import bgSupport from "@/assets/bg-support.jpg";

const SupportSection = () => {
  const points = [
    "опора",
    "структура",
    "рабочее состояние",
  ];

  return (
    <section className="section-secondary relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${bgSupport})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/95 to-secondary/90" />
      
      <div className="section-container relative z-10">
        <div className="space-y-12 text-center">
          {/* Heading */}
          <h2 className="heading-lg text-secondary-foreground">
            Когда нужно собраться —{" "}
            <span className="block mt-2">это нормально</span>
          </h2>
          
          {/* Text */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl text-secondary-foreground/80">
              Ты не обязан быть сильным всё время.
            </p>
            <p className="text-xl md:text-2xl text-secondary-foreground font-bold">
              Но ты можешь собраться.
            </p>
          </div>
          
          {/* Points */}
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12">
            {points.map((point, index) => (
              <div 
                key={index}
                className="bg-background/10 backdrop-blur-sm px-8 py-4"
              >
                <span className="text-xl md:text-2xl text-secondary-foreground font-bold uppercase tracking-wider">
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
