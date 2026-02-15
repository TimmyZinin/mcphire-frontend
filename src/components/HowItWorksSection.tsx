import { ScrollReveal } from "@/hooks/useScrollReveal";

const LEVEL_COLORS = ['#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

const HowItWorksSection = () => {
  const steps = [
    {
      title: "ПОСТАВЬ ЦЕЛИ",
      description:
        "Каждый спринт начинается с конкретных целей: отправить отклики, обновить резюме, подготовиться к интервью. Ты знаешь, что делать — и когда.",
      icon: "🎯",
    },
    {
      title: "БЕГИ С BUDDY",
      description:
        "Тебе подбирают buddy — партнёра по поиску. Вместе вы проверяете резюме, репетируете интервью и держите друг друга в тонусе.",
      icon: "👥",
    },
    {
      title: "РАБОТАЙ В ГРУППЕ",
      description:
        "2 раза в неделю — групповые сессии с экспертами. Разбор стратегий, обратная связь, практика сложных вопросов. Команда поддерживает.",
      icon: "🏃",
    },
    {
      title: "ПОЛУЧИ ОФФЕР",
      description:
        "Системный подход + команда + эксперты = результат. Средний участник получает оффер за 6-8 недель.",
      icon: "🏆",
    },
  ];

  return (
    <section className="section-white relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="space-y-10">
          <ScrollReveal>
            <h2 className="heading-xl">
              КАК ЭТО<br />
              РАБОТАЕТ
            </h2>
          </ScrollReveal>

          {/* Team session photo */}
          <ScrollReveal delay={50}>
            <div className="overflow-hidden rounded-2xl shadow-xl max-w-2xl">
              <img
                src="/images/session_new.webp"
                alt="Групповая сессия в лофте — команда работает над стратегией"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div
                  className="p-8 h-full rounded-2xl border border-border/30 bg-card shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  style={{
                    borderTop: `3px solid ${LEVEL_COLORS[index % LEVEL_COLORS.length]}`,
                  }}
                >
                  <div className="text-3xl mb-4">{step.icon}</div>
                  <h3
                    className="uppercase mb-3 font-black text-lg"
                    style={{ color: LEVEL_COLORS[index % LEVEL_COLORS.length] }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
