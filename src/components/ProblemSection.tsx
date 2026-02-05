import { ScrollReveal } from "@/hooks/useScrollReveal";

const ProblemSection = () => {
  return (
    <section className="section-white relative overflow-hidden">
      {/* Decorative circles - energy burst effect */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 md:translate-x-0 pointer-events-none">
        <svg 
          width="300" 
          height="300" 
          viewBox="0 0 300 300" 
          className="animate-pulse-scale"
        >
          {/* Expanding rings */}
          <circle cx="150" cy="150" r="120" fill="none" stroke="#DFFF00" strokeWidth="3" opacity="0.3" className="animate-ping-slow" />
          <circle cx="150" cy="150" r="90" fill="none" stroke="#DFFF00" strokeWidth="4" opacity="0.5" />
          <circle cx="150" cy="150" r="60" fill="none" stroke="#DFFF00" strokeWidth="3" opacity="0.6" />
          <circle cx="150" cy="150" r="30" fill="#DFFF00" opacity="0.8" />
          
          {/* Orbiting small circles */}
          <g className="animate-orbit">
            <circle cx="150" cy="50" r="8" fill="#DFFF00" opacity="0.9" />
          </g>
          <g className="animate-orbit-reverse">
            <circle cx="250" cy="150" r="6" fill="#DFFF00" opacity="0.7" />
          </g>
          
          {/* Scattered dots */}
          <circle cx="80" cy="100" r="5" fill="#DFFF00" opacity="0.6" className="animate-float-slow" />
          <circle cx="220" cy="80" r="4" fill="#DFFF00" opacity="0.5" className="animate-float-medium" />
          <circle cx="100" cy="220" r="6" fill="#DFFF00" opacity="0.7" className="animate-float-slow" />
          <circle cx="200" cy="240" r="4" fill="#DFFF00" opacity="0.5" className="animate-float-medium" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="space-y-8">
          {/* Heading */}
          <ScrollReveal>
            <p className="text-lg md:text-xl text-muted-foreground mb-4">
              3 месяца без офферов? 50 откликов без ответа?
            </p>
            <h2 className="heading-xl glitch-hover">
              ПОЧЕМУ ПОИСК ЗАТЯГИВАЕТСЯ
            </h2>
          </ScrollReveal>
          
          {/* Body text */}
          <ScrollReveal delay={100}>
            <div className="space-y-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
              <p>Ты откликаешься. Молчание.</p>
              <p>Проходишь собеседование. Отказ без объяснений.</p>
              <p>Пробуешь новые подходы. Ничего не меняется.</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl font-bold max-w-2xl">
              Проблема не в рынке. Проблема в том, что ты действуешь хаотично.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={300}>
            <p className="text-xl md:text-2xl font-bold">
              Системе нужна система.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
