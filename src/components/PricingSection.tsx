import { Check, Minus } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "СТАРТ",
      price: "5 500",
      description: "Формат, в котором начинается движение.",
      highlighted: false,
    },
    {
      name: "ПРОРЫВ",
      price: "9 500",
      description: "Больше внимания. Быстрее прогресс.",
      badge: "Самый выбираемый",
      highlighted: true,
    },
    {
      name: "VIP",
      price: "15 000",
      description: "Максимальная включённость. Места ограничены.",
      highlighted: false,
    },
  ];

  const features = [
    { name: "Групповые сессии", start: "2/нед", proryv: "2/нед", vip: "2/нед" },
    { name: "Закрытый чат", start: true, proryv: true, vip: true },
    { name: "Материалы и записи", start: true, proryv: true, vip: true },
    { name: "Трекинг в Telegram", start: true, proryv: true, vip: true },
    { name: "Личный разбор резюме", start: false, proryv: "1/мес", vip: "2/мес" },
    { name: "Личный созвон", start: false, proryv: false, vip: true },
    { name: "Симуляция собеседования", start: false, proryv: false, vip: true },
  ];

  const renderFeatureValue = (value: boolean | string) => {
    if (value === true) {
      return <Check className="w-5 h-5 text-primary mx-auto" />;
    }
    if (value === false) {
      return <Minus className="w-5 h-5 text-muted-foreground mx-auto" />;
    }
    return <span className="text-sm font-bold">{value}</span>;
  };

  return (
    <section id="pricing" className="section-white">
      <div className="section-container">
        <div className="space-y-8">
          {/* Heading */}
          <h2 className="heading-xl glitch-hover">
            ФОРМАТЫ<br />
            УЧАСТИЯ
          </h2>
          
          <p className="text-muted-foreground text-lg">
            Доступ открывается сразу после оплаты через Tribute.
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
                  <button className="cta-primary w-full">
                    ВСТУПИТЬ
                  </button>
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
          
          {/* Value proposition */}
          <div className="border-2 border-foreground p-6 md:p-8 space-y-4">
            <h4 className="text-lg md:text-xl font-black uppercase">
              Важно
            </h4>
            <p className="text-muted-foreground">
              Одна сильная корректировка стратегии часто экономит месяцы поиска.
            </p>
            <p className="font-bold">
              Работа, найденная раньше, почти всегда окупает участие.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
