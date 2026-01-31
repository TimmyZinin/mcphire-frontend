import bgWhatIs from "@/assets/bg-what-is.jpg";

const WhatIsSection = () => {
  const items = [
    "структура",
    "ритм",
    "ответственность",
    "движение",
  ];

  return (
    <section className="section-accent relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${bgWhatIs})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-l from-primary/90 via-primary/95 to-primary" />
      
      <div className="section-container relative z-10">
        <div className="space-y-10">
          {/* Heading */}
          <h2 className="heading-lg text-primary-foreground">
            СБОРКА — это рабочая система.
          </h2>
          
          {/* What it's not */}
          <div className="space-y-2 text-xl md:text-2xl text-primary-foreground/80">
            <p>Не разговорный клуб.</p>
            <p>Не теоретическая программа.</p>
          </div>
          
          {/* What it is */}
          <div className="space-y-6">
            <p className="text-lg text-primary-foreground/60 uppercase tracking-wider">
              Среда, в которой появляется:
            </p>
            <div className="flex flex-wrap gap-4">
              {items.map((item, index) => (
                <div 
                  key={index}
                  className="bg-primary-foreground/10 backdrop-blur-sm px-6 py-3"
                >
                  <span className="text-xl md:text-2xl text-primary-foreground font-bold uppercase">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quote */}
          <div className="border-l-4 border-primary-foreground pl-6 py-2 space-y-2">
            <p className="text-xl md:text-2xl text-primary-foreground/80">Здесь говорят прямо.</p>
            <p className="text-xl md:text-2xl text-primary-foreground/80">Показывают слабые места.</p>
            <p className="text-xl md:text-2xl text-primary-foreground font-bold">
              Помогают их закрыть.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
