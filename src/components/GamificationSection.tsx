import { ScrollReveal } from "@/hooks/useScrollReveal";
import { Trophy, Zap, Users, Star } from "lucide-react";

const GamificationSection = () => {
  const teams = [
    {
      name: "ЦЕХ ТИТАН",
      icon: Zap,
      description: "Сила. Скорость. Результат.",
    },
    {
      name: "ЦЕХ АТЛАНТ",
      icon: Trophy,
      description: "Выносливость. Стратегия. Победа.",
    },
  ];

  const howItWorks = [
    { icon: Star, text: "Каждый этап приносит очки твоей команде" },
    { icon: Users, text: "Соревнуйся за очки вместе с командой" },
    { icon: Trophy, text: "Лучшая команда получает бонусы" },
  ];

  return (
    <section className="section-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute right-0 top-1/3 translate-x-1/3 pointer-events-none opacity-25">
        <svg width="280" height="280" viewBox="0 0 280 280" className="animate-float-slow">
          <circle cx="140" cy="140" r="130" fill="none" stroke="#DFFF00" strokeWidth="3" />
          <circle cx="140" cy="140" r="90" fill="none" stroke="#DFFF00" strokeWidth="2" strokeDasharray="12,6" />
          <circle cx="140" cy="140" r="50" fill="#DFFF00" opacity="0.3" />
        </svg>
      </div>

      <div className="absolute left-0 bottom-1/4 -translate-x-1/2 pointer-events-none opacity-20">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <circle cx="90" cy="90" r="80" fill="none" stroke="#DFFF00" strokeWidth="2" />
          <circle cx="90" cy="90" r="40" fill="none" stroke="#DFFF00" strokeWidth="2" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="space-y-10">
          {/* Heading */}
          <ScrollReveal>
            <h2 className="heading-xl glitch-hover">
              КОМАНДНАЯ<br />
              ИГРА
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Присоединяйся к одному из цехов. Соревнуйся за очки вместе с командой.
            </p>
          </ScrollReveal>

          {/* Teams */}
          <ScrollReveal delay={200}>
            <div className="grid md:grid-cols-2 gap-6">
              {teams.map((team, index) => (
                <div
                  key={index}
                  className="border-3 border-foreground p-8 md:p-10 space-y-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_20px_-4px_rgba(223,255,0,0.4)]"
                >
                  <team.icon className="w-10 h-10 text-primary" strokeWidth={2.5} />
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight">
                    {team.name}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {team.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* How scoring works */}
          <ScrollReveal delay={300}>
            <div className="space-y-4 pt-4">
              {howItWorks.map((item, index) => (
                <div key={index} className="flex items-center gap-4 text-lg md:text-xl">
                  <item.icon className="w-6 h-6 flex-shrink-0 text-primary" strokeWidth={2.5} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Summary */}
          <ScrollReveal delay={400}>
            <p className="text-xl md:text-2xl font-bold pt-4">
              Поиск работы превращается в игру — и ты играешь не один.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default GamificationSection;
