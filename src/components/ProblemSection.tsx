import { ScrollReveal } from "@/hooks/useScrollReveal";

const ProblemSection = () => {
  return (
    <section className="section-white relative overflow-hidden">
      {/* Aggressive arrow piercing through */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 md:translate-x-0 pointer-events-none">
        <svg 
          width="300" 
          height="300" 
          viewBox="0 0 300 300" 
          className="animate-arrow-pulse"
        >
          {/* Explosion/crack lines */}
          <g className="animate-explosion">
            <line x1="150" y1="150" x2="100" y2="80" stroke="#DFFF00" strokeWidth="3" className="opacity-60" />
            <line x1="150" y1="150" x2="80" y2="120" stroke="#DFFF00" strokeWidth="2" className="opacity-50" />
            <line x1="150" y1="150" x2="90" y2="180" stroke="#DFFF00" strokeWidth="3" className="opacity-60" />
            <line x1="150" y1="150" x2="110" y2="220" stroke="#DFFF00" strokeWidth="2" className="opacity-50" />
            <line x1="150" y1="150" x2="70" y2="150" stroke="#DFFF00" strokeWidth="4" className="opacity-70" />
          </g>
          
          {/* Main arrow - pointing up-right */}
          <g className="animate-arrow-move">
            <polygon 
              points="150,50 250,150 200,150 200,250 100,250 100,150 50,150" 
              fill="#DFFF00" 
              transform="rotate(-45 150 150)"
            />
            {/* Arrow inner detail */}
            <polygon 
              points="150,80 220,150 180,150 180,220 120,220 120,150 80,150" 
              fill="#000000" 
              opacity="0.1"
              transform="rotate(-45 150 150)"
            />
          </g>
          
          {/* Impact shards */}
          <g className="animate-shards">
            <polygon points="60,100 70,90 80,105" fill="#DFFF00" opacity="0.8" />
            <polygon points="40,140 55,130 50,150" fill="#DFFF00" opacity="0.6" />
            <polygon points="70,200 85,190 80,210" fill="#DFFF00" opacity="0.7" />
            <polygon points="50,170 60,165 55,180" fill="#DFFF00" opacity="0.5" />
          </g>
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="space-y-8">
          {/* Heading */}
          <ScrollReveal>
            <h2 className="heading-xl glitch-hover">
              НИКТО НЕ ПРИДЁТ
            </h2>
          </ScrollReveal>
          
          {/* Body text */}
          <ScrollReveal delay={100}>
            <div className="space-y-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
              <p>Никто не придёт и не сделает за тебя.</p>
              <p>Ни коуч. Ни ментор. Ни мотивационный спикер.</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl font-bold max-w-2xl">
              Ты либо собираешь себя сам — либо остаёшься там, где застрял.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={300}>
            <p className="text-xl md:text-2xl font-bold">
              Выбирай.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
