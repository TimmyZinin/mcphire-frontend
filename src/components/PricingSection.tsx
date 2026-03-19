import { Check, Minus } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "СТАРТЕР",
      price: "5 000",
      description: "Для небольших команд — разместите вакансию и получите отклики от IT-специалистов",
      highlighted: false,
      features: ["1 вакансия", "30 дней размещения", "Базовая аналитика", "MCP-интеграция"],
    },
    {
      name: "БИЗНЕС",
      price: "12 000",
      description: "Для активного найма — приоритет в выдаче и расширенная аналитика",
      badge: "Популярный",
      highlighted: true,
      features: ["5 вакансий", "30 дней размещения", "Расширенная аналитика", "MCP-интеграция", "Приоритет в выдаче", "Premium-бейдж"],
    },
    {
      name: "ПРО",
      price: "25 000",
      description: "Для HR-команд — безлимитные вакансии, топ выдача, персональный менеджер",
      highlighted: false,
      features: ["Безлимит вакансий", "30 дней размещения", "Полная аналитика", "MCP-интеграция", "Первое место в выдаче", "Premium-бейдж", "Персональный менеджер"],
    },
  ];

  const features = [
    { name: "Размещение вакансий", starter: "1", business: "5", pro: "Безлимит" },
    { name: "MCP-интеграция (AI-агенты)", starter: true, business: true, pro: true },
    { name: "Базовая аналитика (просмотры, отклики)", starter: true, business: true, pro: true },
    { name: "Расширенная аналитика (конверсии, источники)", starter: false, business: true, pro: true },
    { name: "Приоритет в выдаче", starter: false, business: true, pro: true },
    { name: "Premium-бейдж на вакансии", starter: false, business: true, pro: true },
    { name: "Первое место в категории", starter: false, business: false, pro: true },
    { name: "Персональный менеджер", starter: false, business: false, pro: true },
    { name: "Брендирование страницы компании", starter: false, business: false, pro: true },
  ];

  const renderFeatureValue = (value: boolean | string) => {
    if (value === true) {
      return <Check className="w-5 h-5 mx-auto text-primary" />;
    }
    if (value === false) {
      return <Minus className="w-5 h-5 text-muted-foreground mx-auto" />;
    }
    return <span className="text-sm font-bold">{value}</span>;
  };

  return (
    <section id="pricing" className="py-16 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
        <div className="space-y-8">
          <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground">
            Тарифы для работодателей
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl">
            Ваши вакансии уже видны AI-агентам. Выберите тариф, чтобы получить приоритет и больше откликов.
          </p>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`
                  p-6 md:p-8 flex flex-col relative rounded-2xl transition-shadow duration-200
                  ${plan.highlighted
                    ? 'border-2 border-primary shadow-xl scale-[1.02]'
                    : 'bg-card shadow-lg border border-border hover:shadow-xl'
                  }
                `}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 text-xs font-bold uppercase rounded-full tracking-wider">
                    {plan.badge}
                  </div>
                )}

                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-1">
                  {plan.name}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">
                  {plan.description}
                </p>

                <div className="mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="text-3xl font-bold">{plan.price} &#8381;</span>
                  <span className="text-sm text-muted-foreground ml-1">/30 дней</span>
                </div>

                <ul className="text-sm space-y-2 mb-6 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="text-primary font-bold">&#10003;</span> {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto space-y-2">
                  <a
                    href="#contact"
                    className={`block text-center py-3 rounded-full font-semibold text-sm transition-colors ${
                      plan.highlighted
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'border border-border hover:border-primary hover:text-primary'
                    }`}
                  >
                    Оставить заявку
                  </a>
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
                  <th className="p-4 font-black uppercase text-sm text-center w-28">Стартер</th>
                  <th className="p-4 font-black uppercase text-sm text-center w-28 bg-primary/10">Бизнес</th>
                  <th className="p-4 font-black uppercase text-sm text-center w-28">Про</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className={index !== features.length - 1 ? "border-b border-border" : ""}>
                    <td className="p-4 text-sm">{feature.name}</td>
                    <td className="p-4 text-center">{renderFeatureValue(feature.starter)}</td>
                    <td className="p-4 text-center bg-primary/5">{renderFeatureValue(feature.business)}</td>
                    <td className="p-4 text-center">{renderFeatureValue(feature.pro)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <div id="contact" className="text-center py-8">
            <h3 className="font-bold text-xl mb-4">Готовы разместить вакансию?</h3>
            <p className="text-muted-foreground mb-6">Напишите нам — подключим за 1 день</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://t.me/mcphire_support"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0088cc] text-white text-lg font-semibold hover:bg-[#0088cc]/90 transition-colors"
              >
                Написать в Telegram
              </a>
              <a
                href="mailto:hire@mcphire.com?subject=Заявка на размещение вакансий"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-border text-foreground text-lg font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                hire@mcphire.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
