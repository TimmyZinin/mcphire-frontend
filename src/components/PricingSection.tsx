import { Check, Minus } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "СТАРТ",
      price: "4 900",
      description: "Стримы и лекции + Канал + Записи материалов",
      highlighted: false,
      link: "https://t.me/tribute/app?startapp=sNBT",
    },
    {
      name: "ПРОРЫВ",
      price: "9 900",
      description: "Всё из СТАРТ + Групповая работа до 25 чел + Чат участников",
      badge: "Популярный выбор",
      highlighted: true,
      link: "https://t.me/tribute/app?startapp=sNBY",
    },
    {
      name: "VIP",
      price: "15 900",
      description: "Всё из ПРОРЫВ + Персональные звонки с экспертом + Все чаты",
      highlighted: false,
      link: "https://t.me/tribute/app?startapp=sNC0",
    },
  ];

  const features = [
    { name: "Стримы и лекции", start: true, proryv: true, vip: true },
    { name: "Канал с записями и материалами", start: true, proryv: true, vip: true },
    { name: "Групповые сессии", start: false, proryv: "2/нед", vip: "2/нед" },
    { name: "Закрытый чат участников", start: false, proryv: true, vip: true },
    { name: "Командное соревнование", start: false, proryv: true, vip: true },
    { name: "Buddy-система", start: false, proryv: true, vip: true },
    { name: "Персональный разбор резюме", start: false, proryv: "1/мес", vip: "2/мес" },
    { name: "Личный созвон с экспертом", start: false, proryv: false, vip: "1/2 нед." },
    { name: "Симуляция собеседования", start: false, proryv: false, vip: true },
    { name: "XP множитель", start: "×1.0", proryv: "×1.3", vip: "×1.5" },
  ];

  const renderFeatureValue = (value: boolean | string) => {
    if (value === true) {
      return <Check className="w-5 h-5 mx-auto" style={{ color: "#4ECDC4" }} />;
    }
    if (value === false) {
      return <Minus className="w-5 h-5 text-muted-foreground mx-auto" />;
    }
    return <span className="text-sm font-bold">{value}</span>;
  };

  return (
    <section id="pricing" className="section-white relative overflow-hidden">
      {/* Decorative circles — NRC palette */}
      <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-15">
        <svg width="400" height="400" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="180" fill="none" stroke="#4ECDC4" strokeWidth="3" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="#45B7D1" strokeWidth="2" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="space-y-8">
          {/* Heading */}
          <h2 className="heading-xl">
            ВЫБЕРИ СВОЙ<br />
            ТЕМП
          </h2>

          <p className="text-muted-foreground text-lg">
            Каждый тариф — свой ритм марафона. Начни с комфортного.
          </p>

          {/* Trial CTA — hidden until referral program is enabled
          <div className="bg-muted p-4 rounded-lg text-center" data-testid="trial-cta">
            <p className="font-bold">
              Пригласи 5 друзей — получи неделю СТАРТ бесплатно
            </p>
            <a
              href="https://t.me/Sborka_work_bot?start=ref_trial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm underline"
              style={{ color: '#4ECDC4' }}
            >
              Узнать подробнее →
            </a>
          </div>
          */}

          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`
                  p-6 md:p-8 flex flex-col relative rounded-2xl transition-shadow duration-200
                  ${plan.highlighted
                    ? 'bg-[hsl(174,62%,55%)] text-[#1A1A1A] shadow-xl shadow-[hsla(174,62%,55%,0.25)]'
                    : 'bg-background shadow-lg border border-border hover:shadow-xl'
                  }
                `}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-4 bg-[#1A1A1A] text-white px-3 py-1 text-xs font-bold uppercase rounded-full">
                    {plan.badge}
                  </div>
                )}

                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">
                  {plan.name}
                </h3>

                <p className="text-sm opacity-70 mb-6">
                  {plan.description}
                </p>

                <div className="mt-auto space-y-2">
                  <a href={plan.link} target="_blank" rel="noopener noreferrer" className="cta-primary-nrc w-full block text-center">
                    НАЧАТЬ
                  </a>
                  <p className="text-xs text-center opacity-70">
                    {plan.price} ₽ / месяц
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Features comparison table */}
          <div className="border border-border overflow-x-auto rounded-2xl shadow-md">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-black uppercase text-sm">Что входит</th>
                  <th className="p-4 font-black uppercase text-sm text-center w-24">Старт</th>
                  <th className="p-4 font-black uppercase text-sm text-center w-24 bg-primary">Прорыв</th>
                  <th className="p-4 font-black uppercase text-sm text-center w-24">VIP</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className={index !== features.length - 1 ? "border-b border-border" : ""}>
                    <td className="p-4 text-sm">{feature.name}</td>
                    <td className="p-4 text-center">{renderFeatureValue(feature.start)}</td>
                    <td className="p-4 text-center bg-primary/30">{renderFeatureValue(feature.proryv)}</td>
                    <td className="p-4 text-center">{renderFeatureValue(feature.vip)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
