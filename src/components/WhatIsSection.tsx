const WhatIsSection = () => {
  const principles = ["СТРУКТУРА", "РИТМ", "ОТВЕТСТВЕННОСТЬ", "ДВИЖЕНИЕ"];

  return (
    <section className="section-white">
      <div className="section-container">
        <div className="space-y-8">
          {/* Heading */}
          <h2 className="heading-xl">
            ЭТО РАБОЧАЯ<br />
            СРЕДА.
          </h2>
          
          {/* Body */}
          <div className="space-y-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
            <p>Не разговорный клуб.</p>
            <p>Не теоретическая программа.</p>
          </div>
          
          <p className="text-lg md:text-xl max-w-2xl">
            Среда, в которой появляется:
          </p>
          
          {/* Chips */}
          <div className="flex flex-wrap gap-3">
            {principles.map((principle, index) => (
              <span 
                key={index} 
                className="inline-block px-5 py-3 border-2 border-primary text-sm md:text-base font-bold uppercase tracking-wide transition-all duration-200 hover:bg-primary hover:text-primary-foreground cursor-default"
              >
                {principle}
              </span>
            ))}
          </div>
          
          {/* Summary */}
          <div className="space-y-2 text-lg md:text-xl max-w-2xl pt-4">
            <p>Здесь говорят прямо.</p>
            <p>Показывают слабые места.</p>
            <p className="font-bold">Помогают их закрыть.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
