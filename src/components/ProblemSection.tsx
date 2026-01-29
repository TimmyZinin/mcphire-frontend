const ProblemSection = () => {
  const problems = [
    "отправлять десятки резюме без ответа",
    "ходить на собеседования и не понимать, что пошло не так",
    "чувствовать тревогу, злость или пустоту",
    "сомневаться в себе, хотя раньше всё работало",
  ];

  return (
    <section className="section-dark border-t-4 border-primary">
      <div className="section-container">
        <div className="space-y-12">
          {/* Heading */}
          <h2 className="heading-lg">
            Если коротко —{" "}
            <span className="text-secondary">сейчас тяжело почти всем.</span>
          </h2>
          
          {/* Problems list */}
          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-muted-foreground">Ты можешь:</p>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="list-acid">
                  {problem}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Conclusion */}
          <p className="text-xl md:text-2xl text-foreground">
            И это <span className="text-primary font-bold">не значит</span>, что ты плохой специалист.
          </p>
          
          {/* Quote block */}
          <div className="quote-block space-y-2 border-secondary">
            <p className="text-secondary">Проблема не в тебе.</p>
            <p className="text-foreground">Проблема в рынке, хаосе и отсутствии структуры.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
