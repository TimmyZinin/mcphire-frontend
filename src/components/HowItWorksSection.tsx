import { ScrollReveal } from "@/hooks/useScrollReveal";

const HowItWorksSection = () => {
  const steps = [
    {
      title: "КОМАНДА",
      description:
        "Тебя определяют в команду из 4-5 человек. Вместе вы проходите спринты, тренируете собеседования, проверяете резюме друг друга. Команда не даёт тебе слиться.",
    },
    {
      title: "СПРИНТЫ",
      description:
        "Каждую неделю новый спринт с конкретными целями: отправить X откликов, пройти Y собеседований, обновить резюме. Пятница — подведение итогов. Лидерборд обновляется.",
    },
    {
      title: "БАЛЛЫ И СОРЕВНОВАНИЕ",
      description:
        "Каждое действие = очки. Отклик +2. Собеседование +15. Оффер +50. Пропустил встречу — минус 5. Команды соревнуются. Топ-3 получают призы.",
    },
    {
      title: "ЭКСПЕРТ ВНУТРИ",
      description:
        "Кристина — HR с опытом найма. 2 раза в неделю прожаривает резюме, разбирает стратегии, симулирует собеседования. Не утешает — говорит правду.",
    },
    {
      title: "TMA — ТВОЙ ПРОГРЕСС",
      description:
        "Telegram Mini App — твой личный кабинет. Баллы, streak, лидерборд, задачи спринта. Всё в одном месте. Внутри Telegram, без лишних приложений.",
    },
  ];

  return (
    <section className="section-white relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="space-y-10">
          <ScrollReveal>
            <h2 className="heading-xl glitch-hover">
              КАК ЭТО<br />
              РАБОТАЕТ
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div
                  className="p-8 h-full"
                  style={{
                    backgroundColor: "#000000",
                    border: "1px solid #333333",
                    borderTop: "4px solid #DFFF00",
                  }}
                >
                  <h3
                    className="uppercase mb-3"
                    style={{
                      color: "#DFFF00",
                      fontWeight: 900,
                      fontSize: "20px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: 1.6,
                    }}
                  >
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
