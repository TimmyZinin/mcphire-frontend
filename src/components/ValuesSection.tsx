import bgValues from "@/assets/bg-values.jpg";

const ValuesSection = () => {
  const values = [
    "Дисциплина важнее вдохновения",
    "Структура сильнее хаоса",
    "Спокойствие продуктивнее паники",
    "Честность вместо обещаний",
    "Работа вместо иллюзий",
  ];

  return (
    <section className="section-secondary relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${bgValues})` }}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-primary text-4xl">★</div>
      <div className="absolute bottom-10 right-10 text-primary text-3xl">★</div>
      
      <div className="section-container relative z-10">
        <div className="space-y-12">
          {/* Heading */}
          <h2 className="heading-lg text-secondary-foreground">
            Принципы <span className="text-primary">Сборки</span>
          </h2>
          
          {/* Values */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="flex items-center gap-6 bg-foreground p-4 md:p-6 comic-panel"
                style={{ transform: `rotate(${index % 2 === 0 ? -0.5 : 0.5}deg)` }}
              >
                <span 
                  className="text-4xl md:text-5xl font-display text-primary"
                  style={{ textShadow: '2px 2px 0 hsl(0 0% 0%)' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-xl md:text-2xl text-background font-medium">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
