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
    <section className="section-dark border-t-4 border-secondary">
      <div className="section-container">
        <div className="space-y-12">
          {/* Heading */}
          <h2 className="heading-lg">
            Кто <span className="text-primary">собирает</span>
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
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary uppercase tracking-tight">
                      {founder.name}
                    </h3>
                    <p className="text-lg text-secondary font-medium mt-1">
                      {founder.role}
                    </p>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
                      {founder.subtitle}
                    </p>
                  </div>
                  
                  <p className="text-foreground/80 leading-relaxed">
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
