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
    <section className="section-accent relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${bgValues})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/90" />
      
      <div className="section-container relative z-10">
        <div className="space-y-12">
          {/* Heading */}
          <h2 className="heading-lg text-primary-foreground">
            Принципы Сборки
          </h2>
          
          {/* Values */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="flex items-center gap-6 border-b border-primary-foreground/20 pb-6 last:border-0"
              >
                <span className="text-4xl md:text-5xl font-bold text-primary-foreground/30">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-xl md:text-2xl text-primary-foreground font-medium">
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
