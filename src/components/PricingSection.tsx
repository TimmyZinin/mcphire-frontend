import { Check, Minus } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "СТАРТ",
      price: "5 500",
      description: "Еженедельные стримы + Командное соревнование + Чат и материалы",
      highlighted: false,
      link: "https://t.me/tribute/app?startapp=sNBT",
    },
    {
      name: "ПРОРЫВ",
      price: "9 500",
      description: "Всё из СТАРТ + Практика (разборы, симуляции, лаборатории)",
      badge: "Популярный выбор",
      highlighted: true,
      link: "https://t.me/tribute/app?startapp=sNBY",
    },
    {
      name: "VIP",
      price: "15 000",
      description: "Всё из ПРОРЫВ + Персональная работа с экспертом",
      highlighted: false,
      link: "https://t.me/tribute/app?startapp=sNC0",
    },
  ];

  const features = [
    { name: "Групповые сессии", start: "2/нед", proryv: "2/нед", vip: "2/нед" },
    { name: "Закрытый чат участников", start: true, proryv: true, vip: true },
    { name: "Записи и материалы", start: true, proryv: true, vip: true },
    { name: "Командное соревнование", start: true, proryv: true, vip: true },
    { name: "Персональный разбор резюме", start: false, proryv: "1/мес", vip: "2/мес" },
    { name: "Личный созвон с экспертом", start: false, proryv: false, vip: "1/2 нед." },
    { name: "Симуляция собеседования", start: false, proryv: false, vip: true },
  ];

  const renderFeatureValue = (value: boolean | string) => {
    if (value === true) {
      return <Check className="w-5 h-5 mx-auto" style={{ color: "#DFFF00" }} />;
    }
    if (value === false) {
      return <Minus className="w-5 h-5 text-muted-foreground mx-auto" />;
    }
    return <span className="text-sm font-bold">{value}</span>;
  };

  return (
    <section id="pricing" className="section-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
        <svg width="400" height="400" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="180" fill="none" stroke="#DFFF00" strokeWidth="3" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="#DFFF00" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="section-container relative z-10">
        <div className="space-y-8">
          {/* Heading */}
          <h2 className="heading-xl glitch-hover">
            ВЫБЕРИ СВОЙ<br />
            ФОРМАТ
          </h2>
          
          <p className="text-muted-foreground text-lg">
            Доступ открывается сразу после оплаты. Отмена в любой момент.
          </p>
          
          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`
                  p-6 md:p-8 flex flex-col relative border-2
                  ${plan.highlighted 
                    ? 'border-foreground bg-primary' 
                    : 'border-foreground bg-background'
                  }
                `}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-4 bg-foreground text-background px-3 py-1 text-xs font-bold uppercase">
                    {plan.badge}
                  </div>
                )}
                
                {/* Plan name */}
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">
                  {plan.name}
                </h3>
                
                {/* Description */}
                <p className="text-sm opacity-70 mb-6">
                  {plan.description}
                </p>
                
                {/* CTA Button */}
                <div className="mt-auto space-y-2">
                  <a href={plan.link} target="_blank" rel="noopener noreferrer" className="cta-primary w-full block text-center">
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
          <div className="border-2 border-foreground overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-foreground">
                  <th className="text-left p-4 font-black uppercase text-sm">Что входит</th>
                  <th className="p-4 font-black uppercase text-sm text-center w-24">Старт</th>
                  <th className="p-4 font-black uppercase text-sm text-center w-24 bg-primary">Прорыв</th>
                  <th className="p-4 font-black uppercase text-sm text-center w-24">VIP</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className={index !== features.length - 1 ? "border-b border-foreground/20" : ""}>
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
