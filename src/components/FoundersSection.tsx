import timPhoto from "@/assets/tim-zinin.jpeg";
import kristinaPhoto from "@/assets/kristina-zhukova.jpeg";

const FoundersSection = () => {
  const founders = [
    {
      name: "Тим Зинин",
      role: "CMO с 20-летним опытом",
      subtitle: "Фаундер Botanica School",
      description: "Помогаю взломать рынок и получить лиды на твоё резюме. Расскажу про построение личного бренда и как привлекать на себя рекрутеров.",
      image: timPhoto,
    },
    {
      name: "Кристина Жукова",
      role: "Co-founder & CEO at EXZEV",
      subtitle: "Executive Search",
      description: "Нахожу «тех самых» лидеров и помогаю выстраивать структуру для кратного роста. Оптимизирую найм: внедряю системные процессы, экономящие время собственника. Оцениваю кадров, анализирую рынок по окладу.",
      image: kristinaPhoto,
    },
  ];

  return (
    <section className="section-dark relative overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute top-10 right-20 text-secondary text-4xl animate-float">★</div>
      <div className="absolute bottom-20 left-10 text-accent text-3xl animate-float" style={{ animationDelay: '0.5s' }}>★</div>
      
      <div className="section-container relative z-10">
        <div className="space-y-12">
          {/* Heading */}
          <h2 className="heading-lg text-secondary">
            Кто стоит за <span className="text-foreground">Сборкой</span>
          </h2>
          
          {/* Founders grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {founders.map((founder, index) => (
              <div 
                key={index}
                className="bg-foreground p-6 comic-panel"
                style={{ transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)` }}
              >
                {/* Photo */}
                <div className="mb-6 overflow-hidden border-4 border-background">
                  <img 
                    src={founder.image} 
                    alt={founder.name}
                    className="w-full aspect-square object-cover object-top"
                  />
                </div>
                
                {/* Info */}
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-display text-primary" style={{ textShadow: '2px 2px 0 hsl(0 0% 0%)' }}>
                    {founder.name}
                  </h3>
                  <p className="text-lg font-bold text-secondary bg-secondary-foreground inline-block px-2">
                    {founder.role}
                  </p>
                  <p className="text-sm text-background/60 uppercase tracking-wider">
                    {founder.subtitle}
                  </p>
                  <p className="text-background text-lg leading-relaxed">
                    {founder.description}
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

export default FoundersSection;
