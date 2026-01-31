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
          <h2 className="heading-xl">
            ЧТО МЕНЯЕТСЯ<br />
            ВНУТРИ
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground">
            Через несколько недель участники обычно:
          </p>
          
          {/* Results list */}
          <ul className="space-y-3">
            {results.map((result, index) => (
              <li key={index} className="list-arrow">
                {result}
              </li>
            ))}
          </ul>
          
          {/* Main point */}
          <p className="text-xl md:text-2xl font-bold pt-4">
            Главное — снова появляется движение.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
