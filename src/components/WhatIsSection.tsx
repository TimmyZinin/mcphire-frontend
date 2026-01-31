import { ScrollReveal } from "@/hooks/useScrollReveal";

const WhatIsSection = () => {
  const principles = ["СТРАТЕГИЯ", "РИТМ", "ОБРАТНАЯ СВЯЗЬ", "РЕЗУЛЬТАТ"];

  return (
    <section className="section-white relative overflow-hidden">
      {/* Decorative circles - left side */}
      <div className="absolute left-0 top-1/3 -translate-x-1/2 pointer-events-none opacity-40">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#DFFF00" strokeWidth="3" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="#DFFF00" strokeWidth="2" />
          <circle cx="100" cy="100" r="20" fill="#DFFF00" opacity="0.6" />
        </svg>
      </div>
      
      <div className="section-container relative z-10">
        <div className="space-y-8">
          {/* Heading */}
          <ScrollReveal>
            <h2 className="heading-xl glitch-hover">
              ЭТО НЕ КУРС.<br />
              ЭТО СИСТЕМА.
            </h2>
          </ScrollReveal>
          
          {/* Body */}
          <ScrollReveal delay={100}>
            <div className="space-y-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
              <p>Не мотивационные лекции.</p>
              <p>Не теория про «как надо».</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl max-w-2xl">
              Практическая система, которая даёт:
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
              <p>Эксперты видят твои слепые зоны.</p>
              <p>Группа держит в тонусе.</p>
              <p className="font-bold">Ты получаешь результат, а не очередной сертификат.</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
