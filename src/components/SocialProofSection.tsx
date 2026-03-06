{/* Fix #30 — Social proof section */}
const SocialProofSection = () => {
  const testimonials = [
    {
      text: "За 5 недель в MCPHire получил 3 предложения. Выбрал лучшее — на 35% выше прошлой зарплаты.",
      name: "Дмитрий",
      role: "Product Manager",
      weeks: 5,
    },
    {
      text: "Buddy-система — это гениально. Одной мне бы не хватило дисциплины. А с партнёром — ни одного пропущенного дня.",
      name: "Анна",
      role: "UX Designer",
      weeks: 7,
    },
    {
      text: "Эксперты увидели в моём резюме то, что я не замечал 3 года. После правок — отклик вырос в 4 раза.",
      name: "Максим",
      role: "Backend Developer",
      weeks: 6,
    },
  ];

  return (
    <section className="section-dark">
      <div className="section-container">
        <div className="space-y-8">
          {/* Fix #31 — participant counter */}
          <div className="flex items-baseline gap-4">
            <span className="text-5xl md:text-6xl font-black text-[#4ECDC4]">47</span>
            <span className="text-lg md:text-xl text-white/60 uppercase tracking-wider">человек уже в марафоне</span>
          </div>

          <h2 className="heading-lg text-white">
            ЧТО ГОВОРЯТ УЧАСТНИКИ
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card-dark space-y-4">
                <p className="text-white/70 text-base leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid hsl(0 0% 16%)' }}>
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.role}</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full text-black" style={{ backgroundColor: '#4ECDC4' }}>
                    {t.weeks} нед.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
