import { ScrollReveal } from "@/hooks/useScrollReveal";

const ProblemSection = () => {
  return (
    <section className="section-white">
      <div className="section-container">
        <div className="space-y-8">
          {/* Heading */}
          <ScrollReveal>
            <h2 className="heading-xl">
              НИКТО НЕ ПРИДЁТ
            </h2>
          </ScrollReveal>
          
          {/* Body text */}
          <ScrollReveal delay={100}>
            <div className="space-y-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
              <p>Никто не придёт и не сделает за тебя.</p>
              <p>Ни коуч. Ни ментор. Ни карьерный клуб.</p>
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
