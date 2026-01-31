import { ScrollReveal } from "@/hooks/useScrollReveal";

const WhatIsSection = () => {
  const principles = ["СТРУКТУРА", "РИТМ", "ОТВЕТСТВЕННОСТЬ", "ДВИЖЕНИЕ"];

  return (
    <section className="section-white">
      <div className="section-container">
        <div className="space-y-8">
          {/* Heading */}
          <ScrollReveal>
            <h2 className="heading-xl glitch-hover">
              ЭТО РАБОЧАЯ<br />
              СРЕДА.
            </h2>
          </ScrollReveal>
          
          {/* Body */}
          <ScrollReveal delay={100}>
            <div className="space-y-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
              <p>Не разговорный клуб.</p>
              <p>Не теоретическая программа.</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl max-w-2xl">
              Среда, в которой появляется:
            </p>
          </ScrollReveal>
          
          {/* Chips */}
          <ScrollReveal delay={300}>
            <div className="flex flex-wrap gap-4">
              {principles.map((principle, index) => (
                <span 
                  key={index} 
                  className="inline-block px-6 py-4 border-3 border-primary bg-primary/5 text-base md:text-lg font-black uppercase tracking-wide transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 hover:shadow-[0_8px_20px_-4px_rgba(223,255,0,0.5)] cursor-default"
                >
                  {principle}
                </span>
              ))}
            </div>
          </ScrollReveal>
          
          {/* Summary */}
          <ScrollReveal delay={400}>
            <div className="space-y-2 text-lg md:text-xl max-w-2xl pt-4">
              <p>Здесь говорят прямо.</p>
              <p>Показывают слабые места.</p>
              <p className="font-bold">Помогают их закрыть.</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
