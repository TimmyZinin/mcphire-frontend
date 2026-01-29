const WhatIsSection = () => {
  const items = [
    "группа людей в похожем состоянии",
    "регулярные вебинары и Q&A",
    "разборы резюме, кейсов, ситуаций",
    "дисциплина, трекинг и ответственность",
    "спокойная, взрослая поддержка",
  ];

  return (
    <section className="section-accent">
      <div className="section-container">
        <div className="space-y-12">
          {/* Heading */}
          <div className="space-y-4">
            <h2 className="heading-lg text-primary-foreground">
              Сборка — это не мотивация.
            </h2>
            <p className="heading-md text-primary-foreground/80">Это система.</p>
          </div>
          
          {/* Subtext */}
          <div className="space-y-2 text-xl md:text-2xl text-primary-foreground/80">
            <p>Мы не вдохновляем.</p>
            <p className="text-primary-foreground font-bold">Мы собираем.</p>
          </div>
          
          {/* Items list */}
          <div className="space-y-4">
            <p className="text-lg text-primary-foreground/60 uppercase tracking-wider">Сборка — это:</p>
            <ul className="space-y-3">
              {items.map((item, index) => (
                <li 
                  key={index} 
                  className="flex items-center gap-4 text-lg md:text-xl text-primary-foreground"
                >
                  <span className="w-2 h-2 bg-primary-foreground flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quote */}
          <div className="border-l-4 border-primary-foreground pl-6 py-2 space-y-2">
            <p className="text-xl md:text-2xl text-primary-foreground/80">Здесь не лечат.</p>
            <p className="text-xl md:text-2xl text-primary-foreground font-bold">
              Здесь помогают собраться и действовать.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
