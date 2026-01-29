import bgProblem from "@/assets/bg-problem.jpg";

const ProblemSection = () => {
  const problems = [
    "отправлять десятки резюме без ответа",
    "ходить на собеседования и не понимать, что пошло не так",
    "чувствовать тревогу, злость или пустоту",
    "сомневаться в себе, хотя раньше всё работало",
  ];

  return (
    <section className="section-accent relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${bgProblem})` }}
      />
      
      <div className="section-container relative z-10">
        <div className="space-y-12">
          {/* Heading with comic style */}
          <h2 className="heading-lg text-secondary">
            Если коротко —{" "}
            <span className="text-foreground">сейчас тяжело почти всем.</span>
          </h2>
          
          {/* Problems list */}
          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-primary-foreground/80">Ты можешь:</p>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="list-acid text-primary-foreground">
                  {problem}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Conclusion */}
          <p className="text-xl md:text-2xl text-foreground">
            И это <span className="bg-secondary text-secondary-foreground px-2 font-bold">не значит</span>, что ты плохой специалист.
          </p>
          
          {/* Quote block - speech bubble */}
          <div className="quote-block max-w-xl">
            <p className="text-secondary-foreground font-bold">Проблема не в тебе.</p>
            <p className="text-background">Проблема в рынке, хаосе и отсутствии структуры.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
