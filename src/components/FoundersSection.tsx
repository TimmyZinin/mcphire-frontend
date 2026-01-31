import timPhoto from "@/assets/tim-zinin.jpeg";
import kristinaPhoto from "@/assets/kristina-zhukova.jpeg";

const FoundersSection = () => {
  const founders = [
    {
      name: "Тим Зинин",
      description: "LinkedIn-стратегии, аутрич, AI-инструменты для поиска работы. 20+ лет в маркетинге.",
      image: timPhoto,
    },
    {
      name: "Кристина Жукова",
      description: "HR-эксперт. Прожарка резюме, карьерный трекинг, разбор стратегии поиска.",
      image: kristinaPhoto,
    },
  ];

  return (
    <section className="section-white">
      <div className="section-container">
        <div className="space-y-8">
          {/* Heading */}
          <h2 className="heading-xl glitch-hover">
            СБОРКУ ВЕДУТ<br />
            ПРАКТИКИ
          </h2>
          
          {/* Founders grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {founders.map((founder, index) => (
              <div key={index} className="space-y-4">
                {/* Photo */}
                <div className="aspect-square overflow-hidden border border-foreground">
                  <img 
                    src={founder.image} 
                    alt={founder.name}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                
                {/* Info */}
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-black uppercase">
                    {founder.name}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {founder.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Summary */}
          <p className="text-xl md:text-2xl font-bold pt-4">
            СБОРКУ ведут практики.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
