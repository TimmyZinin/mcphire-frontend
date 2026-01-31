import bgProblem from "@/assets/bg-problem.jpg";

const ProblemSection = () => {
  return (
    <section className="section-dark border-t-4 border-destructive relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${bgProblem})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
      
      <div className="section-container relative z-10">
        <div className="space-y-10">
          {/* Heading */}
          <h2 className="heading-lg text-destructive">
            Никто не придёт спасать твою карьеру.
          </h2>
          
          {/* Reality check */}
          <div className="space-y-4 text-xl md:text-2xl text-muted-foreground max-w-2xl">
            <p>Можно месяцами отправлять резюме.</p>
            <p>Можно ждать «идеальную вакансию».</p>
            <p>Можно объяснять себе, что рынок плохой.</p>
          </div>
          
          <p className="text-2xl md:text-3xl text-foreground font-bold">
            Это ничего не меняет.
          </p>
          
          {/* Solution hint */}
          <div className="quote-block border-primary space-y-2">
            <p className="text-muted-foreground">Меняет только системная работа.</p>
            <p className="text-foreground font-bold">
              <span className="text-primary">СБОРКА</span> — место, где она начинается.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
