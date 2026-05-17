import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";

const EmployersPage = () => {
  const steps = [
    {
      title: "Отправь Claude одну строку",
      desc: "Скопируй промт ниже. Агент сам прочитает skill.md, соберёт ~40 ответов о компании (название, стек, локации, comp-band) из вашего GitHub org / website / careers page.",
    },
    {
      title: "Подтверди approval screen",
      desc: "Claude покажет собранные ответы. Правишь неточности, говоришь «ok» — агент создаёт employer-профиль через MCP.",
    },
    {
      title: "Постишь вакансию той же командой",
      desc: "«Запости вакансию Senior Backend, зп 350-550K, remote». Через минуты — instant TG-пуши релевантным кандидатам. Дальше: get_applicants → shortlist → invite.",
    },
  ];

  const faqItems = [
    {
      q: "Что значит «через Claude Desktop»? Я работодатель, не разработчик.",
      a: "Claude Desktop — бесплатный AI-клиент (claude.ai/download). Один раз добавляешь mcphire в конфиг (см. блок «Технические детали» ниже) — дальше регистрация компании и публикация вакансий через простой диалог с Claude. Без форм, без личного кабинета. Это и есть MCP-first.",
    },
    {
      q: "Как AI-агенты находят мою вакансию?",
      a: "После post_vacancy через MCP вакансия попадает в общий пул. Кандидаты, чей агент подключён к mcphire (Claude Desktop, Cursor, Cline, любой MCP-клиент), получают instant TG-пуш с inline-кнопкой «Откликнуться». Параллельно вакансия рендерится в публичный SSG /jobs/* с JSON-LD для Google for Jobs.",
    },
    {
      q: "Какие специалисты на платформе?",
      a: "IT-специалисты с верифицированным claim_token (paste в публичный артефакт: GitHub bio, LinkedIn headline, Gist). Фокус: Middle, Senior, Lead — разработчики, DevOps, QA, Product, Data. Закрытая альфа — небольшой, но качественный пул.",
    },
    {
      q: "Сколько это стоит?",
      a: "Сейчас — бесплатно. Запуск платных тарифов — после стабилизации MCP-flow. Если хочешь быть в первой когорте платных работодателей, напиши Тиму после регистрации компании.",
    },
    {
      q: "А если у нас нет Claude Desktop?",
      a: "REST fallback живёт по адресу https://api.mcphire.com/v1/. Любой агент с curl может вызвать те же tools. Полная схема — в server.json и llms-full.txt.",
    },
  ];

  const employerPrompt = `Read https://mcphire.com/llms.txt and follow the employer onboarding protocol to register my company on mcphire. Use context from our GitHub org, website, and careers page. Show me the approval screen before calling register_employer_profile.`;

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Нанимай через AI — MCPHire для работодателей</title>
        <meta
          name="description"
          content="Регистрируй компанию и постишь вакансии через Claude Desktop. Без форм, без личного кабинета. MCP-first marketplace для IT-найма."
        />
        <link rel="canonical" href="https://mcphire.com/employers" />
      </Helmet>

      <JobBoardNavbar />

      {/* ---- Hero — Claude Desktop prompt (MCP-first parity) ---- */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-card/50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
              <span>🤖</span>
              <span>Для работодателей</span>
            </div>
            <h1 className="heading-xl mb-5">
              Дай Claude Desktop адрес mcphire.com —<br className="hidden md:block" />
              он зарегистрирует твою компанию
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Без форм, без личного кабинета. Агент собирает ~40 ответов о компании из вашего публичного контекста,
              показывает approval screen, ты жмёшь «ok» — компания зарегистрирована, можно постить вакансии.
            </p>

            {/* Canonical prompt block */}
            <div className="bg-card border-2 border-primary/30 rounded-2xl p-6 text-left shadow-lg mb-8">
              <div className="text-xs uppercase tracking-wider text-primary mb-3 font-semibold">
                Отправь это своему агенту
              </div>
              <pre className="text-sm md:text-base whitespace-pre-wrap leading-relaxed text-foreground font-mono">
                {employerPrompt}
              </pre>
            </div>

            {/* 3 steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-10">
              {steps.map((step, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-card">
                  <div className="text-xl mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    0{i + 1}
                  </div>
                  <div className="font-semibold mb-1">{step.title}</div>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* client_setup details */}
            <details className="text-left bg-muted/40 border border-border rounded-xl p-5" id="client-setup">
              <summary className="cursor-pointer text-sm font-semibold text-muted-foreground hover:text-foreground">
                Если MCP не настроен — технические детали подключения
              </summary>
              <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                <p>
                  Один раз в терминале (macOS / Linux / WSL):
                </p>
                <pre className="text-xs whitespace-pre-wrap leading-relaxed text-foreground font-mono bg-background p-3 rounded border border-border">
                  {`curl -fsSL https://mcphire.com/install.sh | bash`}
                </pre>
                <p>
                  Или вручную добавь в <code className="text-xs">claude_desktop_config.json</code>:
                </p>
                <pre className="text-xs whitespace-pre-wrap leading-relaxed text-foreground font-mono bg-background p-3 rounded border border-border">
                  {`{
  "mcpServers": {
    "mcphire": {
      "type": "sse",
      "url": "https://mcp.mcphire.com/sse"
    }
  }
}`}
                </pre>
                <p className="text-xs">
                  Путь к файлу: macOS <code>~/Library/Application Support/Claude/</code> · Windows{" "}
                  <code>%APPDATA%/Claude/</code>. Полностью quit Claude Desktop (⌘Q / File → Quit) и запусти заново.
                </p>
                <p className="text-xs">
                  Нет MCP-клиента? REST fallback: <code>https://api.mcphire.com/v1/</code> — любой агент с{" "}
                  <code>curl</code> может вызвать те же tools.
                </p>
              </div>
            </details>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <a
                href="https://mcphire.com/llms.txt"
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                llms.txt (employer protocol) →
              </a>
              <a
                href="https://mcphire.com/.well-known/mcp/server.json"
                className="font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                server.json (manifest) →
              </a>
              <Link
                to="/mcp"
                className="font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                MCP API docs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---- What you get ---- */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <h2 className="heading-lg text-center mb-12">Что ты получаешь</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all">
              <div className="text-lg font-bold mb-3">[MCP]</div>
              <h3 className="font-bold mb-2">Регистрация без форм</h3>
              <p className="text-sm text-muted-foreground">
                5 employer-tools в проде: register_employer_profile, post_vacancy, get_my_vacancies, get_applicants,
                delete_employer_profile.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all">
              <div className="text-lg font-bold mb-3">[PUSH]</div>
              <h3 className="font-bold mb-2">Instant TG-матчи</h3>
              <p className="text-sm text-muted-foreground">
                После post_vacancy релевантные кандидаты получают пуш в Telegram с inline-кнопкой «Откликнуться» за
                1-5 минут.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all">
              <div className="text-lg font-bold mb-3">[SEO]</div>
              <h3 className="font-bold mb-2">Google for Jobs</h3>
              <p className="text-sm text-muted-foreground">
                Каждая вакансия — публичная SSG-страница с JSON-LD JobPosting. Индексируется в Google как
                структурированная вакансия.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all">
              <div className="text-lg font-bold mb-3">[PII]</div>
              <h3 className="font-bold mb-2">Приватность по умолчанию</h3>
              <p className="text-sm text-muted-foreground">
                get_applicants возвращает cv_url + stack без email/phone. PII раскрывается только после shortlist →
                «Интересно» → accept slot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
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

      {/* ---- Footer support fallback (very small) ---- */}
      <section className="py-8 border-t border-border">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center text-xs text-muted-foreground">
          Сломалось что-то в MCP-flow или нужна помощь с настройкой?{" "}
          <a
            href="https://t.me/mcphire_support"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            Напиши в support
          </a>
          .
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EmployersPage;
