import { ScrollReveal } from "@/hooks/useScrollReveal";

const WhyItWorksSection = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#000000", padding: "80px 20px" }}
    >
      <div className="section-container relative z-10">
        <ScrollReveal>
          <h2
            className="heading-xl glitch-hover mb-10"
            style={{ color: "#DFFF00" }}
          >
            ПОЧЕМУ ЭТО
            <br />
            РАБОТАЕТ
          </h2>
        </ScrollReveal>

        <div className="space-y-6">
          <ScrollReveal delay={100}>
            <p style={{ color: "#FFFFFF", fontSize: "20px", lineHeight: 1.7 }}>
              Искать работу одному — отвратительно. Ты сидишь в тишине,
              отправляешь резюме в пустоту, ждёшь, сомневаешься. Никто не знает,
              что ты через это проходишь.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p style={{ color: "#FFFFFF", fontSize: "20px", lineHeight: 1.7 }}>
              СБОРКА — это другой подход. Здесь ты в команде. Здесь каждое
              действие — это очки. Здесь есть люди, которые понимают, через что
              ты идёшь, потому что они идут через то же самое. Прямо сейчас.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p style={{ color: "#FFFFFF", fontSize: "20px", lineHeight: 1.7 }}>
              Мы не обещаем, что будет легко. Мы обещаем, что не будет скучно. И
              не будет одиноко.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default WhyItWorksSection;
