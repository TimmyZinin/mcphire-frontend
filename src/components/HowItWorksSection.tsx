import { ScrollReveal } from "@/hooks/useScrollReveal";

const HowItWorksSection = () => {
  const steps = [
    { title: "ДИАГНОСТИКА", description: "Понимаем, где ты сейчас. Разбираем резюме, стратегию, позиционирование." },
    { title: "СТРАТЕГИЯ", description: "Формируем чёткий план поиска: куда, как и зачем откликаться." },
    { title: "РАБОТА", description: "Регулярные созвоны, задания, разборы. Никакой теории без практики." },
    { title: "СРЕДА", description: "Вокруг — люди твоего уровня. Поддержка, конкуренция, движение." },
    { title: "РЕЗУЛЬТАТ", description: "Больше ясности, больше откликов, меньше хаоса. Оффер ближе." },
  ];

  return (
    <section className="section-white relative overflow-hidden">
      <div className="absolute left-0 bottom-1/4 -translate-x-1/3 pointer-events-none opacity-25">
        <svg width="220" height="220" viewBox="0 0 220 220" className="animate-float-slow">
          <circle cx="110" cy="110" r="100" fill="none" stroke="#DFFF00" strokeWidth="3" />
          <circle cx="110" cy="110" r="65" fill="none" stroke="#DFFF00" strokeWidth="2" strokeDasharray="8,6" />
          <circle cx="110" cy="110" r="30" fill="#DFFF00" opacity="0.5" />
        </svg>
      </div>

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
                    border: "1px solid #333",
                    borderTop: "4px solid #DFFF00",
                    borderRadius: 0,
                  }}
                >
                  <h3
                    className="text-xl md:text-2xl uppercase mb-3"
                    style={{ color: "#DFFF00", fontWeight: 900 }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "#FFFFFF", fontWeight: 400 }}
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
