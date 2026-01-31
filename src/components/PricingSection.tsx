const PricingSection = () => {
  const plans = [
    {
      name: "СТАНДАРТ",
      subtitle: "ОСНОВА СБОРКИ",
      price: "9 900",
      description: "Формат, в котором начинается движение.",
      features: [
        "стратегические вебинары",
        "групповые сессии",
        "разборы резюме",
        "закрытый чат",
        "трекинг",
        "практические задания",
      ],
      badge: "Самый выбираемый",
      highlighted: true,
    },
    {
      name: "ПРЕМИУМ",
      subtitle: null,
      price: "15 900",
      description: "Больше внимания. Быстрее прогресс.",
      features: [
        "всё из Стандарта",
        "личный разбор резюме",
        "индивидуальная обратная связь",
        "помощь со стратегией",
        "подготовка к интервью",
        "приоритет в разборах",
      ],
      badge: null,
      highlighted: false,
    },
    {
      name: "VIP",
      subtitle: null,
      price: "29 900",
      description: "Максимальная включённость. Места ограничены.",
      features: [
        "всё из Премиум",
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
                  {plan.subtitle && (
                    <p className="text-xs uppercase tracking-wider mt-1 opacity-70">
                      {plan.subtitle}
                    </p>
                  )}
                </div>
                
                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-black">
                    {plan.price}
                  </span>
                  <span className="text-sm opacity-70">₽ / месяц</span>
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
