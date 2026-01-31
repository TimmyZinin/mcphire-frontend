const PricingSection = () => {
  const plans = [
    {
      name: "СТАРТ",
      price: "5 500",
      description: "Формат, в котором начинается движение.",
      features: [
        "стратегические вебинары",
        "групповые сессии",
        "разборы резюме",
        "закрытый чат",
        "трекинг",
        "практические задания",
      ],
      badge: null,
      highlighted: false,
    },
    {
      name: "ПРОРЫВ",
      price: "9 500",
      description: "Больше внимания. Быстрее прогресс.",
      features: [
        "всё из Старта",
        "личный разбор резюме",
        "индивидуальная обратная связь",
        "помощь со стратегией",
        "подготовка к интервью",
        "приоритет в разборах",
      ],
      badge: "Самый выбираемый",
      highlighted: true,
    },
    {
      name: "VIP",
      price: "15 000",
      description: "Максимальная включённость. Места ограничены.",
      features: [
        "всё из Прорыва",
        "персональные встречи",
        "глубокая проработка стратегии",
        "симуляции интервью",
        "приоритетная поддержка",
      ],
      badge: null,
      highlighted: false,
    },
  ];

  return (
    <section className="section-white">
      <div className="section-container">
        <div className="space-y-8">
          {/* Heading */}
          <h2 className="heading-xl">
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
                  p-6 md:p-8 space-y-6 relative border-2
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
                <div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                    {plan.name}
                  </h3>
                </div>
                
                {/* Description */}
                <p className="text-sm opacity-70">
                  {plan.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="flex-shrink-0">→</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <div className="mt-auto pt-4 space-y-2">
                  <button className="cta-primary w-full">
                    ПРИСОЕДИНИТЬСЯ
                  </button>
                  <p className="text-xs text-center opacity-70">
                    {plan.price} ₽ / месяц
                  </p>
                </div>
              </div>
            ))}
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
