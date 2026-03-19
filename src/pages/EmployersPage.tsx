import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";

const EmployersPage = () => {
  const steps = [
    { title: 'Разместите вакансию', desc: 'Заполните форму за 2 минуты. Self-service интерфейс без звонков и согласований.' },
    { title: 'AI-агенты рекомендуют', desc: 'MCP-сервер, ChatGPT, Claude и Perplexity автоматически рекомендуют вашу вакансию релевантным специалистам.' },
    { title: 'Получайте отклики', desc: 'Верифицированные IT-специалисты уровня Middle, Senior и Lead откликаются на ваши вакансии.' },
  ];

  const pricingPlans = [
    {
      name: 'СТАРТЕР', desc: 'Для небольших команд', price: '5 000 ₽', period: '/30 дней',
      featured: false,
      features: ['1 вакансия', '30 дней размещения', 'Базовая аналитика', 'MCP-интеграция'],
    },
    {
      name: 'БИЗНЕС', desc: 'Для активного найма', price: '12 000 ₽', period: '/30 дней',
      featured: true,
      features: ['5 вакансий', '30 дней размещения', 'Расширенная аналитика', 'MCP-интеграция', 'Приоритет в выдаче', 'Premium-бейдж'],
    },
    {
      name: 'ПРО', desc: 'Для HR-команд', price: '25 000 ₽', period: '/месяц',
      featured: false,
      features: ['Безлимит вакансий', '30 дней размещения', 'Полная аналитика', 'MCP-интеграция', 'Первое место в выдаче', 'Premium-бейдж', 'Персональный менеджер'],
    },
  ];

  const faqItems = [
    {
      q: 'Сколько стоит размещение?',
      a: 'От 5 000 до 25 000 рублей в зависимости от тарифа. СТАРТЕР — 5К за 1 вакансию, БИЗНЕС — 12К за 5 вакансий с приоритетом, ПРО — 25К за безлимит с персональным менеджером.'
    },
    {
      q: 'Как AI-агенты находят мою вакансию?',
      a: 'Мы используем MCP-сервер (Model Context Protocol). AI-агенты (Claude, ChatGPT, Perplexity) подключаются к нашему API и рекомендуют ваши вакансии пользователям, которые ищут релевантных специалистов.'
    },
    {
      q: 'Какие специалисты на платформе?',
      a: 'IT-специалисты уровня Middle, Senior и Lead. Мы фокусируемся на разработчиках, DevOps, QA, Product Managers, Data Scientists и других IT-ролях.'
    },
    {
      q: 'Как происходит оплата?',
      a: 'Онлайн через личный кабинет работодателя. Поддерживается безналичная оплата для юридических лиц и переводы для ИП/самозанятых.'
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Разместить вакансию — IT-рекрутинг через AI | MCPHire</title>
        <meta name="description" content="Размещайте вакансии на AI-powered джобборде MCPHire. MCP-интеграция, matching через AI-агентов, верифицированные IT-специалисты." />
        <link rel="canonical" href="https://mcphire.com/employers" />
      </Helmet>

      {/* Header */}
      <JobBoardNavbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-card/50">
        <div className="max-w-[1280px] mx-auto px-8 text-center">
          <h1 className="heading-xl mb-6">
            Нанимайте IT-специалистов<br />через AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ваши вакансии находят кандидатов через AI-агенты: Claude, ChatGPT, Perplexity и другие
          </p>
          <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-cta-hot text-white text-lg font-semibold hover:bg-cta-hot/90 transition-colors">
            Разместить вакансию
          </a>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-8">
          <h2 className="heading-lg text-center mb-12">Как это работает</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-extrabold text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-8">
          <h2 className="heading-lg text-center mb-12">Почему MCPHire</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all">
              <div className="text-lg font-bold mb-3">[MCP]</div>
              <h3 className="font-bold mb-2">MCP-сервер</h3>
              <p className="text-sm text-muted-foreground">
                Первый в России джобборд с MCP-интеграцией. Ваши вакансии видны AI-агентам напрямую.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all">
              <div className="text-lg font-bold mb-3">[IT]</div>
              <h3 className="font-bold mb-2">IT-ниша</h3>
              <p className="text-sm text-muted-foreground">
                Только Middle, Senior и Lead специалисты. Никаких Junior и нерелевантных кандидатов.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all">
              <div className="text-lg font-bold mb-3">[SEO]</div>
              <h3 className="font-bold mb-2">Google for Jobs</h3>
              <p className="text-sm text-muted-foreground">
                JSON-LD разметка на каждой вакансии. Ваши вакансии индексируются в Google.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all">
              <div className="text-lg font-bold mb-3">[DATA]</div>
              <h3 className="font-bold mb-2">Аналитика</h3>
              <p className="text-sm text-muted-foreground">
                Данные о зарплатах, трендах рынка и поведении кандидатов в вашем дашборде.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-8">
          <h2 className="heading-lg text-center mb-12">Тарифы</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <div key={i} className={`p-6 rounded-2xl bg-card relative ${
                plan.featured ? 'border-2 border-primary shadow-lg scale-[1.02]' : 'border border-border'
              }`}>
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider">
                    Популярный
                  </div>
                )}
                <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>
                <div className="mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground ml-1">{plan.period}</span>
                </div>
                <ul className="text-sm space-y-2 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="text-primary font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`block text-center py-3 rounded-full font-semibold text-sm transition-colors ${
                  plan.featured
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'border border-border hover:border-primary hover:text-primary'
                }`}>
                  Разместить
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-16">
        <div className="max-w-[1280px] mx-auto px-8 text-center">
          <h2 className="heading-lg mb-4">Готовы разместить вакансию?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Напишите нам — подключим аккаунт работодателя за 1 день. Ваши вакансии начнут получать отклики через AI-агентов.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="https://t.me/mcphire_support"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0088cc] text-white text-lg font-semibold hover:bg-[#0088cc]/90 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              Написать в Telegram
            </a>
            <a
              href="mailto:hire@mcphire.com?subject=Заявка на размещение вакансий"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-border text-foreground text-lg font-semibold hover:border-primary hover:text-primary transition-colors"
            >
              hire@mcphire.com
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            Уже 6 500+ компаний на платформе &#183; 14 000+ активных вакансий &#183; MCP-сервер для AI-агентов
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-8 max-w-3xl">
          <h2 className="heading-lg text-center mb-12">Частые вопросы</h2>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold text-base mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EmployersPage;
