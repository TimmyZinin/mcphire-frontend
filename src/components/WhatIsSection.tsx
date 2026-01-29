const WhatIsSection = () => {
  const items = [
    "Регулярные вебинары",
    "Честные Q&A",
    "Разборы карьерных ситуаций",
    "Дисциплина вместо шума",
    "Среда, которая держит",
  ];

  return (
    <section className="py-section-sm md:py-section">
      <div className="section-container">
        <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-10">
          Что такое Сборка
        </h2>
        
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li 
              key={index}
              className="flex items-center text-lg md:text-xl text-foreground"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="list-marker-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhatIsSection;
