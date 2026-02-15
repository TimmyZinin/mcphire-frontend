import { ScrollReveal } from "@/hooks/useScrollReveal";
import { Trophy, Zap, Users, Star } from "lucide-react";

const GamificationSection = () => {
  const teams = [
    {
      name: "ЦЕХ ТИТАН",
      icon: Zap,
      description: "Сила. Скорость. Результат.",
      color: "#4ECDC4",
    },
    {
      name: "ЦЕХ АТЛАНТ",
      icon: Trophy,
      description: "Выносливость. Стратегия. Победа.",
      color: "#45B7D1",
    },
  ];

  const howItWorks = [
    { icon: Star, text: "Каждый этап приносит очки твоей команде" },
    { icon: Users, text: "Соревнуйся за очки вместе с командой" },
    { icon: Trophy, text: "Лучшая команда получает бонусы" },
  ];

  return (
    <section className="section-white relative overflow-hidden">
      {/* Decorative circles — NRC palette */}
      <div className="absolute right-0 top-1/3 translate-x-1/3 pointer-events-none opacity-15">
        <svg width="280" height="280" viewBox="0 0 280 280" className="animate-float-slow">
          <circle cx="140" cy="140" r="130" fill="none" stroke="#4ECDC4" strokeWidth="2" />
          <circle cx="140" cy="140" r="90" fill="none" stroke="#45B7D1" strokeWidth="1.5" strokeDasharray="12,6" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="space-y-10">
          <ScrollReveal>
            <h2 className="heading-xl">
              КОМАНДНАЯ<br />
              ИГРА
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Присоединяйся к одному из цехов. Соревнуйся за очки вместе с командой.
            </p>
          </ScrollReveal>

          {/* Teams — NRC card style */}
          <ScrollReveal delay={200}>
            <div className="grid md:grid-cols-2 gap-6">
              {teams.map((team, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border/30 bg-card shadow-lg p-8 md:p-10 space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ borderLeft: `4px solid ${team.color}` }}
                >
                  <team.icon className="w-10 h-10" style={{ color: team.color }} strokeWidth={2.5} />
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
                  <item.icon className="w-6 h-6 flex-shrink-0 text-[#4ECDC4]" strokeWidth={2.5} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

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
