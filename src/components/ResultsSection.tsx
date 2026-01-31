import bgResults from "@/assets/bg-results.jpg";

const ResultsSection = () => {
  const results = [
    "перестают метаться",
    "начинают получать больше откликов",
    "понимают, как себя продавать",
    "увереннее проходят интервью",
    "чувствуют опору",
  ];

  return (
    <section className="section-dark border-t-4 border-accent relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${bgResults})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/80" />
      
      <div className="section-container relative z-10">
        <div className="space-y-10">
          {/* Heading */}
          <h2 className="heading-lg">
            Что меняется{" "}
            <span className="text-accent">внутри</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground">
            Через несколько недель участники обычно:
          </p>
          
          {/* Results list */}
          <ul className="space-y-4">
            {results.map((result, index) => (
              <li key={index} className="list-acid text-foreground">
                {result}
              </li>
            ))}
          </ul>
          
          {/* Main point */}
          <p className="text-2xl md:text-3xl text-foreground font-bold">
            Главное — снова появляется{" "}
            <span className="text-primary">движение</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
