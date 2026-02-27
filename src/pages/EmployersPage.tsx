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
      name: 'СТАРТЕР', desc: 'Для небольших команд', price: '15 000 ₽', period: '/30 дней',
      featured: false,
      features: ['1 вакансия', '30 дней размещения', 'Базовая аналитика', 'MCP-интеграция'],
    },
    {
      name: 'БИЗНЕС', desc: 'Для активного найма', price: '25 000 ₽', period: '/30 дней',
      featured: true,
      features: ['5 вакансий', '30 дней размещения', 'Расширенная аналитика', 'MCP-интеграция', 'Приоритет в выдаче'],
    },
    {
      name: 'ПРО', desc: 'Для HR-команд', price: '50 000 ₽', period: '/месяц',
      featured: false,
      features: ['Безлимит вакансий', '30 дней размещения', 'Полная аналитика', 'MCP-интеграция', 'Первое место в выдаче', 'Персональный менеджер'],
    },
  ];

  const faqItems = [
    {
      q: 'Сколько стоит размещение?',
      a: 'От 15 000 до 50 000 рублей в зависимости от тарифа. СТАРТЕР — 15К за 1 вакансию, БИЗНЕС — 25К за 5 вакансий, ПРО — 50К за безлимит.'
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
      a: 'Через Telegram бот @Sborka_work_bot. Поддерживается безналичная оплата для юридических лиц и переводы для ИП/самозанятых.'
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Разместить вакансию — IT-рекрутинг через AI | СБОРКА</title>
        <meta name="description" content="Размещайте вакансии на AI-powered джобборде СБОРКА. MCP-интеграция, matching через AI-агентов, верифицированные IT-специалисты." />
        <link rel="canonical" href="https://sborka.work/employers" />
      </Helmet>

      {/* Header */}
      <JobBoardNavbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-card/50">
        <div className="max-w-[1280px] mx-auto px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Нанимайте IT-специалистов<br />через AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ваши вакансии находят кандидатов через AI-агенты: Claude, ChatGPT, Perplexity и другие
          </p>
          <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#e8604c] text-white text-lg font-semibold hover:bg-[#d4503e] transition-colors">
            Разместить вакансию
          </a>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-center mb-12">Как это работает</h2>
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
          <h2 className="text-2xl font-extrabold tracking-tight text-center mb-12">Почему СБОРКА</h2>

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
          <h2 className="text-2xl font-extrabold tracking-tight text-center mb-12">Тарифы</h2>
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

      {/* Contact Form */}
      <section id="contact" className="py-16">
        <div className="max-w-[1280px] mx-auto px-8 max-w-xl">
          <h2 className="text-2xl font-extrabold tracking-tight text-center mb-8">Оставить заявку</h2>

          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const company = (form.elements[0] as HTMLInputElement).value;
            const email = (form.elements[1] as HTMLInputElement).value;
            const role = (form.elements[2] as HTMLInputElement).value;
            window.open(`https://t.me/Sborka_work_bot?start=employer_${encodeURIComponent(company)}`, '_blank');
            alert('Спасибо! Мы свяжемся с вами. Также напишите нам в Telegram для ускорения процесса.');
          }}>
            <div>
              <label className="block text-sm font-semibold mb-2 uppercase">Компания</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                placeholder="Название компании"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                placeholder="hr@company.ru"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase">Какую роль ищете</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                placeholder="Senior Frontend Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase">Описание вакансии</label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all min-h-[120px]"
                placeholder="Краткое описание вакансии, требования, условия..."
              />
            </div>

            <button type="submit" className="w-full py-3 rounded-full bg-[#e8604c] text-white font-semibold hover:bg-[#d4503e] transition-colors">
              Отправить заявку
            </button>
          </form>

          <p className="text-center text-muted-foreground mt-6">
            Или напишите нам: <a href="https://t.me/Sborka_work_bot" className="text-primary hover:underline">@Sborka_work_bot</a>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-8 max-w-3xl">
          <h2 className="text-2xl font-extrabold tracking-tight text-center mb-12">Частые вопросы</h2>

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
