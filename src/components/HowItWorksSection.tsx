import { ScrollReveal } from "@/hooks/useScrollReveal";

const LEVEL_COLORS = ['#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

const HowItWorksSection = () => {
  const steps = [
    {
      title: "КОМАНДА",
      description:
        "Тебя определяют в команду из 4-5 человек. Вместе вы проходите спринты, тренируете собеседования, проверяете резюме друг друга. Команда не даёт тебе слиться.",
      icon: "👥",
    },
    {
      title: "СПРИНТЫ",
      description:
        "Каждую неделю новый спринт с конкретными целями: отправить X откликов, пройти Y собеседований, обновить резюме. Пятница — подведение итогов. Лидерборд обновляется.",
      icon: "🏃",
    },
    {
      title: "БАЛЛЫ И СОРЕВНОВАНИЕ",
      description:
        "Каждое действие = очки. Отклик +2. Собеседование +15. Оффер +50. Пропустил встречу — минус 5. Команды соревнуются. Топ-3 получают призы.",
      icon: "🏆",
    },
    {
      title: "ЭКСПЕРТ ВНУТРИ",
      description:
        "Кристина — HR с опытом найма. 2 раза в неделю прожаривает резюме, разбирает стратегии, симулирует собеседования. Не утешает — говорит правду.",
      icon: "🎯",
    },
    {
      title: "TMA — ТВОЙ ПРОГРЕСС",
      description:
        "Telegram Mini App — твой личный кабинет. Баллы, streak, лидерборд, задачи спринта. Всё в одном месте. Внутри Telegram, без лишних приложений.",
      icon: "📱",
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
