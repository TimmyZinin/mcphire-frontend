import { ScrollReveal } from "@/hooks/useScrollReveal";

const ResultsSection = () => {
  const results = [
    "перестают метаться",
    "начинают получать больше откликов",
    "понимают, как себя продавать",
    "увереннее проходят интервью",
    "чувствуют опору",
  ];

  return (
    <section className="section-white">
      <div className="section-container">
        <div className="space-y-8">
          {/* Heading */}
          <ScrollReveal>
            <h2 className="heading-xl">
              ЧТО МЕНЯЕТСЯ<br />
              ВНУТРИ
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <p className="text-lg md:text-xl text-muted-foreground">
              Через несколько недель участники обычно:
            </p>
          </ScrollReveal>
          
          {/* Results list */}
          <ScrollReveal delay={200}>
            <ul className="space-y-3">
              {results.map((result, index) => (
                <li key={index} className="list-arrow">
                  {result}
                </li>
              ))}
            </ul>
          </ScrollReveal>
          
          {/* Main point */}
          <ScrollReveal delay={300}>
            <p className="text-xl md:text-2xl font-bold pt-4">
              Главное — снова появляется движение.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
