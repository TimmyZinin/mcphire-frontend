import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const EmployersPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Разместить вакансию — IT-рекрутинг через AI | СБОРКА</title>
        <meta name="description" content="Размещайте вакансии на AI-powered джобборде СБОРКА. MCP-интеграция, matching через AI-агентов, верифицированные IT-специалисты." />
        <link rel="canonical" href="https://sborka.work/employers" />
      </Helmet>

      {/* Header */}
      <header className="border-b border-border">
        <div className="section-container py-4 flex items-center justify-between">
          <Link to="/" className="font-black text-xl uppercase tracking-tight">
            СБОРКА
          </Link>
          <a href="/#pricing" className="cta-text text-sm">
            Тарифы
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="section-black py-20">
        <div className="section-container text-center">
          <h1 className="heading-xl text-white mb-6">
            НАНИМАЙТЕ IT-СПЕЦИАЛИСТОВ<br />ЧЕРЕЗ AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ваши вакансии находят кандидатов через AI-агенты: Claude, ChatGPT, Perplexity и другие
          </p>
          <a href="#contact" className="cta-primary-nrc inline-block text-lg px-8 py-4">
            Разместить вакансию
          </a>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-white py-16">
        <div className="section-container">
          <h2 className="heading-lg text-center mb-12">Как это работает</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary">01</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Разместите вакансию</h3>
              <p className="text-muted-foreground">
                Заполните форму за 2 минуты. Self-service интерфейс без звонков и согласований.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary">02</span>
              </div>
              <h3 className="font-bold text-xl mb-2">AI-агенты рекомендуют</h3>
              <p className="text-muted-foreground">
                MCP-сервер, ChatGPT, Claude и Perplexity автоматически рекомендуют вашу вакансию релевантным специалистам.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary">03</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Получайте отклики</h3>
              <p className="text-muted-foreground">
                Верифицированные IT-специалисты уровня Middle, Senior и Lead откликаются на ваши вакансии.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section-white py-16 bg-card/30">
        <div className="section-container">
          <h2 className="heading-lg text-center mb-12">Почему СБОРКА</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-border bg-card">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-bold mb-2">MCP-сервер</h3>
              <p className="text-sm text-muted-foreground">
                Первый в России джобборд с MCP-интеграцией. Ваши вакансии видны AI-агентам напрямую.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold mb-2">IT-ниша</h3>
              <p className="text-sm text-muted-foreground">
                Только Middle, Senior и Lead специалисты. Никаких Junior и нерелевантных кандидатов.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-bold mb-2">Google for Jobs</h3>
              <p className="text-sm text-muted-foreground">
                JSON-LD разметка на каждой вакансии. Ваши вакансии индексируются в Google.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-bold mb-2">Аналитика</h3>
              <p className="text-sm text-muted-foreground">
                Данные о зарплатах, трендах рынка и поведении кандидатов в вашем дашборде.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-white py-16">
        <div className="section-container">
          <h2 className="heading-lg text-center mb-12">Тарифы</h2>

          <div className="grid md:grid-cols6 max-w-4xl mx-auto">
            {/* Starter-3 gap- */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-bold text-xl mb-2">СТАРТЕР</h3>
              <p className="text-muted-foreground mb-4">Для небольших команд</p>
              <p className="text-3xl font-bold mb-4">15 000 ₽<span className="text-sm font-normal text-muted-foreground">/30 дней</span></p>
              <ul className="text-sm space-y-2 mb-6">
                <li>✓ 1 вакансия</li>
                <li>✓ 30 дней размещения</li>
                <li>✓ Базовая аналитика</li>
                <li>✓ MCP-интеграция</li>
              </ul>
              <a href="#contact" className="cta-primary-nrc block text-center">
                Разместить
              </a>
            </div>

            {/* Business */}
            <div className="p-6 rounded-2xl border-2 border-primary bg-card relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-full">
                РЕКОМЕНДУЕМ
              </div>
              <h3 className="font-bold text-xl mb-2">БИЗНЕС</h3>
              <p className="text-muted-foreground mb-4">Для активного найма</p>
              <p className="text-3xl font-bold mb-4">25 000 ₽<span className="text-sm font-normal text-muted-foreground">/30 дней</span></p>
              <ul className="text-sm space-y-2 mb-6">
                <li>✓ 5 вакансий</li>
                <li>✓ 30 дней размещения</li>
                <li>✓ Расширенная аналитика</li>
                <li>✓ MCP-интеграция</li>
                <li>✓ Приоритет в выдаче</li>
              </ul>
              <a href="#contact" className="cta-primary-nrc block text-center">
                Разместить
              </a>
            </div>

            {/* Pro */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-bold text-xl mb-2">ПРО</h3>
              <p className="text-muted-foreground mb-4">Для HR-команд</p>
              <p className="text-3xl font-bold mb-4">50 000 ₽<span className="text-sm font-normal text-muted-foreground">/месяц</span></p>
              <ul className="text-sm space-y-2 mb-6">
                <li>✓ Безлимит вакансий</li>
                <li>✓ 30 дней размещения</li>
                <li>✓ Полная аналитика</li>
                <li>✓ MCP-интеграция</li>
                <li>✓ Первое место в выдаче</li>
                <li>✓ Персональный менеджер</li>
              </ul>
              <a href="#contact" className="cta-primary-nrc block text-center">
                Разместить
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="section-white py-16">
        <div className="section-container max-w-xl">
          <h2 className="heading-lg text-center mb-8">Оставить заявку</h2>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-semibold mb-2 uppercase">Компания</label>
              <input
                type="text"
                className="w-full p-3 rounded-xl border border-border bg-card text-foreground"
                placeholder="Название компании"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-xl border border-border bg-card text-foreground"
                placeholder="hr@company.ru"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase">Какую роль ищете</label>
              <input
                type="text"
                className="w-full p-3 rounded-xl border border-border bg-card text-foreground"
                placeholder="Senior Frontend Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase">Описание вакансии</label>
              <textarea
                className="w-full p-3 rounded-xl border border-border bg-card text-foreground min-h-[120px]"
                placeholder="Краткое описание вакансии, требования, условия..."
              />
            </div>

            <button type="submit" className="cta-primary-nrc w-full py-3">
              Отправить заявку
            </button>
          </form>

          <p className="text-center text-muted-foreground mt-6">
            Или напишите нам: <a href="https://t.me/Sborka_work_bot" className="text-primary hover:underline">@Sborka_work_bot</a>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-white py-16 bg-card/30">
        <div className="section-container max-w-3xl">
          <h2 className="heading-lg text-center mb-12">Частые вопросы</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-2">Сколько стоит размещение?</h3>
              <p className="text-muted-foreground">
                От 15 000 до 50 000 рублей в зависимости от тарифа. СТАРТЕР — 15К за 1 вакансию, БИЗНЕС — 25К за 5 вакансий, ПРО — 50К за безлимит.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Как AI-агенты находят мою вакансию?</h3>
              <p className="text-muted-foreground">
                Мы используем MCP-сервер (Model Context Protocol). AI-агенты (Claude, ChatGPT, Perplexity) подключаются к нашему API и рекомендуют ваши вакансии пользователям, которые ищут релевантных специалистов.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Какие специалисты на платформе?</h3>
              <p className="text-muted-foreground">
                IT-специалисты уровня Middle, Senior и Lead. Мы фокусируемся на разработчиках, DevOps, QA, Product Managers, Data Scientists и других IT-ролях.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Как происходит оплата?</h3>
              <p className="text-muted-foreground">
                Через Telegram бот @Sborka_work_bot. Поддерживается безналичная оплата для юридических лиц и переводы для ИП/самозанятых.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8 border-t border-foreground">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-bold text-foreground">СБОРКА</p>
              <p>Клуб карьерной дисциплины</p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:gap-6">
              <p>Доступ осуществляется по подписке через Tribute.</p>
              <Link to="/knowledge" className="hover:text-foreground transition-colors">
                База знаний
              </Link>
              <Link to="/partners" className="hover:text-foreground transition-colors">
                Партнёрская программа
              </Link>
            </div>

            <p>© СБОРКА 2026</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default EmployersPage;
