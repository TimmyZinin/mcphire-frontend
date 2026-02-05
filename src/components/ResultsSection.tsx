import { ScrollReveal } from "@/hooks/useScrollReveal";

const ResultsSection = () => {
  const results = [
    { number: "6-8", label: "недель до оффера в среднем" },
    { number: "3x", label: "больше откликов от рекрутеров" },
    { number: "87%", label: "участников получают оффер за 2 месяца" },
  ];

  const changes = [
    "3x больше откликов на резюме",
    "Первое интервью за 2 недели",
    "Понимание своей реальной стоимости на рынке",
    "перестают бояться переговоров о зарплате",
    "получают офферы на 20-40% выше рынка",
  ];

  return (
    <section className="section-white relative overflow-hidden">
      {/* Decorative circles - right side */}
      <div className="absolute right-0 bottom-1/4 translate-x-1/3 pointer-events-none opacity-30">
        <svg width="250" height="250" viewBox="0 0 250 250" className="animate-float-slow">
          <circle cx="125" cy="125" r="100" fill="none" stroke="#DFFF00" strokeWidth="4" />
          <circle cx="125" cy="125" r="70" fill="none" stroke="#DFFF00" strokeWidth="3" strokeDasharray="10,5" />
          <circle cx="125" cy="125" r="40" fill="#DFFF00" opacity="0.4" />
        </svg>
      </div>
      
      <div className="section-container relative z-10">
        <div className="space-y-10">
          {/* Heading */}
          <ScrollReveal>
            <h2 className="heading-xl glitch-hover">
              РЕЗУЛЬТАТЫ<br />
              УЧАСТНИКОВ
            </h2>
          </ScrollReveal>
          
          {/* Stats */}
          <ScrollReveal delay={100}>
            <div className="grid md:grid-cols-3 gap-6">
              {results.map((result, index) => (
                <div key={index} className="border-2 border-foreground p-6 text-center">
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                    {result.number}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wide">
                    {result.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground">
              Что меняется после участия в СБОРКЕ:
            </p>
          </ScrollReveal>
          
          {/* Results list */}
          <ScrollReveal delay={300}>
            <ul className="space-y-3">
              {changes.map((change, index) => (
                <li key={index} className="list-arrow list-arrow-green">
                  {change}
                </li>
              ))}
            </ul>
          </ScrollReveal>
          
          {/* Main point */}
          <ScrollReveal delay={400}>
            <p className="text-xl md:text-2xl font-bold pt-4">
              Не просто находят работу — находят работу, которую хотят.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
