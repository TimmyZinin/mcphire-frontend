import { ScrollReveal } from "@/hooks/useScrollReveal";

const WhatIsSection = () => {
  const principles = ["HH", "LINKEDIN", "TELEGRAM-ЧАТЫ", "ПРЯМЫЕ ВЫХОДЫ"];

  return (
    <section className="section-white relative overflow-hidden">
      {/* Decorative circles — NRC palette */}
      <div className="absolute left-0 top-1/3 -translate-x-1/2 pointer-events-none opacity-40">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#4ECDC4" strokeWidth="2" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="#45B7D1" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="space-y-8">
          <ScrollReveal>
            <h2 className="heading-xl">
              КОМАНДНАЯ ИГРА<br />
              В ПОИСК РАБОТЫ
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="space-y-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
              <p>Сборка превращает рутину поиска в командный спринт.</p>
              <p>Ты не один — рядом команда, баллы, соревнование и азарт.</p>
              <p>Искать работу наконец-то весело.</p>
            </div>
          </ScrollReveal>

          {/* Buddy pair photo */}
          <ScrollReveal delay={150}>
            <div className="overflow-hidden rounded-2xl shadow-xl max-w-xl">
              <img
                src="/images/buddy_pair.png"
                alt="Buddy-пара работает вместе в кафе"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl max-w-2xl">
              Практическая система, которая даёт:
            </p>
          </ScrollReveal>

          {/* Chips — NRC style */}
          <ScrollReveal delay={300}>
            <div className="flex flex-wrap gap-4">
              {principles.map((principle, index) => (
                <span
                  key={index}
                  className="inline-block px-6 py-4 rounded-xl border border-border bg-card text-base md:text-lg font-black uppercase tracking-wide transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#4ECDC4]/40 cursor-default"
                >
                  {principle}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="space-y-2 text-lg md:text-xl max-w-2xl pt-4">
              <p>Эксперты видят твои слепые зоны.</p>
              <p>Группа держит в тонусе.</p>
              <p className="font-bold">Ты получаешь результат, а не очередной сертификат.</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
