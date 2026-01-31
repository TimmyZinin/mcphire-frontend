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
      badge: "Самый выбираемый формат",
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
      description: "Максимальная включённость. Количество мест ограничено.",
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
    <section className="section-dark border-t-4 border-primary">
      <div className="section-container">
        <div className="space-y-10">
          {/* Heading */}
          <div className="space-y-4">
            <h2 className="heading-lg">
              Форматы{" "}
              <span className="text-primary">участия</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Доступ открывается сразу после оплаты через Tribute.
            </p>
          </div>
          
          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`
                  bg-card p-6 md:p-8 space-y-6 relative
                  ${plan.highlighted 
                    ? 'border-4 border-primary' 
                    : 'border-4 border-border'
                  }
                `}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-4 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold uppercase">
                    {plan.badge}
                  </div>
                )}
                
                {/* Plan name */}
                <div>
                  <h3 className={`text-2xl md:text-3xl font-bold uppercase tracking-tight ${
                    plan.highlighted ? 'text-primary' : 'text-foreground'
                  }`}>
                    {plan.name}
                  </h3>
                  {plan.subtitle && (
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
                      {plan.subtitle}
                    </p>
                  )}
                </div>
                
                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">₽ / месяц</span>
                </div>
                
                {/* Description */}
                <p className="text-muted-foreground">
                  {plan.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      className="flex items-start gap-3 text-foreground/80"
                    >
                      <span className="text-primary flex-shrink-0">→</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Value proposition */}
          <div className="bg-card border-4 border-secondary p-6 md:p-8 space-y-4">
            <h4 className="text-xl md:text-2xl font-bold text-secondary uppercase">
              Важно
            </h4>
            <p className="text-lg text-foreground/80">
              Одна сильная корректировка стратегии часто экономит месяцы поиска.
            </p>
            <p className="text-lg text-foreground font-medium">
              Работа, найденная раньше, почти всегда окупает участие.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
