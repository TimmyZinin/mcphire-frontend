import { ScrollReveal } from "@/hooks/useScrollReveal";

const STAT_COLORS = ['#4ECDC4', '#45B7D1', '#FF6B6B'];

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
    "Перестают бояться переговоров о зарплате",
    "Получают офферы на 20-40% выше рынка",
  ];

  return (
    <section className="section-white relative overflow-hidden">
      {/* Decorative circles — NRC palette */}
      <div className="absolute right-0 bottom-1/4 translate-x-1/3 pointer-events-none opacity-20">
        <svg width="250" height="250" viewBox="0 0 250 250" className="animate-float-slow">
          <circle cx="125" cy="125" r="100" fill="none" stroke="#4ECDC4" strokeWidth="2" />
          <circle cx="125" cy="125" r="70" fill="none" stroke="#45B7D1" strokeWidth="1.5" strokeDasharray="10,5" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="space-y-10">
          <ScrollReveal>
            <h2 className="heading-xl">
              РЕЗУЛЬТАТЫ<br />
              УЧАСТНИКОВ
            </h2>
          </ScrollReveal>

          {/* Hero photo — offer celebration */}
          <ScrollReveal delay={50}>
            <div className="overflow-hidden rounded-2xl shadow-xl max-w-2xl mx-auto">
              <img
                src="/images/offer.png"
                alt="Участница СБОРКИ получила оффер"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          {/* Stats — Large numbers NRC style */}
          <ScrollReveal delay={100}>
            <div className="grid md:grid-cols-3 gap-6">
              {results.map((result, index) => (
                <div key={index} className="rounded-2xl border border-border/30 bg-card shadow-lg p-8 text-center">
                  <div className="text-5xl md:text-6xl font-black mb-3" style={{ color: STAT_COLORS[index] }}>
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

          <ScrollReveal delay={300}>
            <ul className="space-y-3">
              {changes.map((change, index) => (
                <li key={index} className="list-arrow list-arrow-green">
                  {change}
                </li>
              ))}
            </ul>
          </ScrollReveal>

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
