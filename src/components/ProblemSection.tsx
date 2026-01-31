import { ScrollReveal } from "@/hooks/useScrollReveal";

const ProblemSection = () => {
  return (
    <section className="section-white">
      <div className="section-container">
        <div className="space-y-8">
          {/* Heading */}
          <ScrollReveal>
            <h2 className="heading-xl">
              НИКТО НЕ ПРИДЁТ<br />
              СПАСАТЬ ТВОЮ<br />
              КАРЬЕРУ.
            </h2>
          </ScrollReveal>
          
          {/* Body text */}
          <ScrollReveal delay={100}>
            <div className="space-y-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
              <p>Можно месяцами отправлять резюме.</p>
              <p>Можно ждать "идеальную вакансию".</p>
              <p>Можно объяснять себе, что рынок плохой.</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl font-bold max-w-2xl">
              Это ничего не меняет.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={300}>
            <p className="text-lg md:text-xl max-w-2xl">
              Меняет только системная работа.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={400}>
            <p className="text-xl md:text-2xl font-bold">
              СБОРКА — место, где она начинается.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
