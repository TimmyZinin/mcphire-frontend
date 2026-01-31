import timPhoto from "@/assets/tim-zinin.jpeg";
import kristinaPhoto from "@/assets/kristina-zhukova.jpeg";

const FoundersSection = () => {
  const founders = [
    {
      name: "Тим Зинин",
      description: "Маркетолог с 20+ годами опыта. Работал на глобальных рынках. Понимает, как компании принимают решения о найме.",
      image: timPhoto,
    },
    {
      name: "Кристина Жукова",
      description: "HR-лидер. Знает, почему кандидатов не берут — и что с этим делать.",
      image: kristinaPhoto,
    },
  ];

  return (
    <section className="section-dark border-t-4 border-secondary">
      <div className="section-container">
        <div className="space-y-10">
          {/* Heading */}
          <h2 className="heading-lg">
            Кто ведёт{" "}
            <span className="text-primary">Сборку</span>
          </h2>
          
          {/* Founders grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {founders.map((founder, index) => (
              <div 
                key={index}
                className="bg-card border-4 border-border hover:border-primary transition-colors duration-300"
              >
                {/* Photo */}
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={founder.image} 
                    alt={founder.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                
                {/* Info */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary uppercase tracking-tight">
                    {founder.name}
                  </h3>
                  
                  <p className="text-foreground/80 leading-relaxed text-lg">
                    {founder.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Summary */}
          <p className="text-xl md:text-2xl text-foreground font-bold text-center">
            <span className="text-primary">СБОРКУ</span> ведут практики.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
