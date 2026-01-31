const ProblemSection = () => {
  return (
    <section className="section-white">
      <div className="section-container">
        <div className="space-y-8">
          {/* Heading */}
          <h2 className="heading-xl">
            НИКТО НЕ ПРИДЁТ<br />
            СПАСАТЬ ТВОЮ<br />
            КАРЬЕРУ.
          </h2>
          
          {/* Body text */}
          <div className="space-y-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
            <p>Можно месяцами отправлять резюме.</p>
            <p>Можно ждать "идеальную вакансию".</p>
            <p>Можно объяснять себе, что рынок плохой.</p>
          </div>
          
          <p className="text-lg md:text-xl font-bold max-w-2xl">
            Это ничего не меняет.
          </p>
          
          <p className="text-lg md:text-xl max-w-2xl">
            Меняет только системная работа.
          </p>
          
          <p className="text-xl md:text-2xl font-bold">
            СБОРКА — место, где она начинается.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
