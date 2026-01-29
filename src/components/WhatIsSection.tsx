import bgWhatIs from "@/assets/bg-what-is.jpg";

const WhatIsSection = () => {
  const items = [
    "группа людей в похожем состоянии",
    "регулярные вебинары и Q&A",
    "разборы резюме, кейсов, ситуаций",
    "дисциплина, трекинг и ответственность",
    "спокойная, взрослая поддержка",
  ];

  return (
    <section className="section-dark relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${bgWhatIs})` }}
      />
      
      {/* Decorative stars */}
      <div className="absolute top-10 right-10 text-secondary text-3xl">★</div>
      <div className="absolute bottom-10 left-10 text-accent text-2xl">★</div>
      
      <div className="section-container relative z-10">
        <div className="space-y-12">
          {/* Heading */}
          <div className="space-y-4">
            <h2 className="heading-lg text-secondary">
              Сборка — это не мотивация.
            </h2>
            <p className="heading-md text-accent">Это система.</p>
          </div>
          
          {/* Subtext in comic panel */}
          <div className="comic-panel bg-foreground p-6 inline-block max-w-md">
            <p className="text-background text-xl">Мы не вдохновляем.</p>
            <p className="text-primary font-bold text-2xl">Мы собираем.</p>
          </div>
          
          {/* Items list */}
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground uppercase tracking-wider">Сборка — это:</p>
            <ul className="space-y-3">
              {items.map((item, index) => (
                <li 
                  key={index} 
                  className="flex items-center gap-4 text-lg md:text-xl text-foreground"
                >
                  <span className="text-secondary font-bold">★</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quote */}
          <div className="bg-secondary p-6 max-w-xl comic-panel">
            <p className="text-xl md:text-2xl text-secondary-foreground">Здесь не лечат.</p>
            <p className="text-xl md:text-2xl text-secondary-foreground font-bold">
              Здесь помогают собраться и действовать.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
