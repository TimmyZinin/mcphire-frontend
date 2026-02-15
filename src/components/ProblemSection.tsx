import { ScrollReveal } from "@/hooks/useScrollReveal";

const ProblemSection = () => {
  return (
    <section className="section-white relative overflow-hidden">
      {/* Decorative circles — NRC palette */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 md:translate-x-0 pointer-events-none">
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="120" fill="none" stroke="#4ECDC4" strokeWidth="2" opacity="0.15" />
          <circle cx="150" cy="150" r="90" fill="none" stroke="#45B7D1" strokeWidth="2" opacity="0.12" />
          <circle cx="150" cy="150" r="60" fill="none" stroke="#96CEB4" strokeWidth="2" opacity="0.1" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="space-y-8">
          <ScrollReveal>
            <p className="text-lg md:text-xl text-muted-foreground mb-4">
              3 месяца без офферов? 50 откликов без ответа?
            </p>
            <h2 className="heading-xl">
              ПОЧЕМУ ПОИСК ЗАТЯГИВАЕТСЯ
            </h2>
          </ScrollReveal>

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
            <p className="text-xl md:text-2xl font-bold" style={{ color: '#4ECDC4' }}>
              Системе нужна система.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
