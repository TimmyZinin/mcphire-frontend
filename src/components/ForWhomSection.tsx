import bgForWhom from "@/assets/bg-for-whom.jpg";

const ForWhomSection = () => {
  const forWhom = [
    "Middle / Senior специалисты",
    "Руководители и тимлиды",
    "Люди в поиске работы",
    "Люди в карьерном тупике",
    "Те, кто устал от мотивационных курсов",
  ];

  const notFor = [
    "тем, кто ждёт «волшебную кнопку»",
    "тем, кто хочет быстрых обещаний",
    "тем, кто не готов работать",
  ];

  return (
    <section className="section-accent relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${bgForWhom})` }}
      />
      
      <div className="section-container relative z-10">
        <div className="space-y-16">
          {/* For whom */}
          <div className="space-y-8">
            <h2 className="heading-lg text-secondary">
              Кому подойдёт{" "}
              <span className="text-foreground">Сборка</span>
            </h2>
            
            <ul className="space-y-4">
              {forWhom.map((item, index) => (
                <li key={index} className="list-acid text-primary-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Not for */}
          <div className="space-y-8">
            <h3 className="heading-md text-foreground">
              Не подойдёт
            </h3>
            
            <ul className="space-y-4">
              {notFor.map((item, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-4 text-lg md:text-xl text-primary-foreground/80"
                >
                  <span className="text-foreground font-bold flex-shrink-0 bg-primary-foreground text-primary px-2">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWhomSection;
