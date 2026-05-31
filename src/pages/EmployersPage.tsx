import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";
import { PromptCopyBlock } from "@/components/v3/PromptCopyBlock";

const EmployersPage = () => {
  const { i18n } = useTranslation();
  const lang: "ru" | "en" = i18n.language?.startsWith("en") ? "en" : "ru";
  const L = lang === "en";

  const steps = L
    ? [
        {
          title: "Send Claude one line",
          desc: "Copy the prompt below. The agent reads skill.md itself and collects ~40 answers about the company (name, stack, locations, comp band) from your GitHub org / website / careers page.",
        },
        {
          title: "Confirm the approval screen",
          desc: "Claude shows the collected answers. You fix any inaccuracies and type the exact phrase: «I agree to register the company on MCPHire». Only then does the agent call register_employer_profile — any other input is treated as an edit to the form, not as consent.",
        },
        {
          title: "Post a vacancy with the same command",
          desc: "«Post a Senior Backend role, salary 350-550K, remote». Within minutes — instant TG pushes to relevant candidates. Then: get_applicants → shortlist → invite.",
        },
      ]
    : [
        {
          title: "Отправь Claude одну строку",
          desc: "Скопируй промт ниже. Агент сам прочитает skill.md, соберёт ~40 ответов о компании (название, стек, локации, comp-band) из вашего GitHub org / website / careers page.",
        },
        {
          title: "Подтверди approval screen",
          desc: "Claude покажет собранные ответы. Правишь неточности и пишешь точную фразу: «я согласен зарегистрировать компанию в MCPHire». Только после неё агент вызывает register_employer_profile — любой другой ввод трактуется как правка анкеты, не как consent.",
        },
        {
          title: "Постишь вакансию той же командой",
          desc: "«Запости вакансию Senior Backend, зп 350-550K, remote». Через минуты — instant TG-пуши релевантным кандидатам. Дальше: get_applicants → shortlist → invite.",
        },
      ];

  const faqItems = L
    ? [
        {
          q: "What does «through Claude Desktop» mean? I'm an employer, not a developer.",
          a: "Claude Desktop is a free AI client (claude.ai/download). You add mcphire to the config once (see «Technical details» below) — after that, registering the company and posting vacancies happens through a simple chat with Claude. No forms, no dashboard. That's what MCP-first means.",
        },
        {
          q: "How do AI agents find my vacancy?",
          a: "After post_vacancy via MCP, the vacancy enters the shared pool. Candidates whose agent is connected to mcphire (Claude Desktop, Cursor, Cline, any MCP client) get an instant TG push with an inline «Apply» button. In parallel, the vacancy is rendered as a public SSG /jobs/* page with JSON-LD for Google for Jobs.",
        },
        {
          q: "What kind of specialists are on the platform?",
          a: "IT specialists with a verified claim_token (pasted into a public artifact: GitHub bio, LinkedIn headline, Gist). Focus: Middle, Senior, Lead — developers, DevOps, QA, Product, Data. Closed alpha — a small but high-quality pool.",
        },
        {
          q: "How much does it cost?",
          a: "Right now — free. Paid plans launch after the MCP flow stabilizes. If you want to be in the first cohort of paying employers, message Tim after registering your company.",
        },
        {
          q: "What if we don't have Claude Desktop?",
          a: "A REST fallback lives at https://api.mcphire.com/api/v1/. Any agent with curl can call the same tools. The full schema is in server.json and skill.md.",
        },
      ]
    : [
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
          a: "REST fallback живёт по адресу https://api.mcphire.com/api/v1/. Любой агент с curl может вызвать те же tools. Полная схема — в server.json и skill.md.",
        },
      ];

  const cards = L
    ? [
        { tag: "[MCP]", title: "Registration without forms", desc: "8 employer tools in prod: register_employer_profile, post_vacancy, publish_vacancy, get_my_vacancies, get_applicants, shortlist_candidate, send_interview_invite, get_employer_questions." },
        { tag: "[PUSH]", title: "Instant TG matches", desc: "After post_vacancy, relevant candidates get a Telegram push with an inline «Apply» button within 1-5 minutes." },
        { tag: "[SEO]", title: "Google for Jobs", desc: "Every vacancy is a public SSG page with JSON-LD JobPosting. Indexed by Google as a structured job posting." },
        { tag: "[PII]", title: "Privacy by default", desc: "get_applicants returns cv_url + stack without email/phone. PII is revealed only after shortlist → «Interested» → accept slot." },
      ]
    : [
        { tag: "[MCP]", title: "Регистрация без форм", desc: "8 employer-tools в проде: register_employer_profile, post_vacancy, publish_vacancy, get_my_vacancies, get_applicants, shortlist_candidate, send_interview_invite, get_employer_questions." },
        { tag: "[PUSH]", title: "Instant TG-матчи", desc: "После post_vacancy релевантные кандидаты получают пуш в Telegram с inline-кнопкой «Откликнуться» за 1-5 минут." },
        { tag: "[SEO]", title: "Google for Jobs", desc: "Каждая вакансия — публичная SSG-страница с JSON-LD JobPosting. Индексируется в Google как структурированная вакансия." },
        { tag: "[PII]", title: "Приватность по умолчанию", desc: "get_applicants возвращает cv_url + stack без email/phone. PII раскрывается только после shortlist → «Интересно» → accept slot." },
      ];

  const employerPrompt = `Read https://mcphire.com/skill.md and register my company`;

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{L ? "Hire via AI — MCPHire for employers" : "Нанимай через AI — MCPHire для работодателей"}</title>
        <meta
          name="description"
          content={
            L
              ? "Register your company and post vacancies through Claude Desktop. No forms, no dashboard. An MCP-first marketplace for IT hiring."
              : "Регистрируй компанию и постишь вакансии через Claude Desktop. Без форм, без личного кабинета. MCP-first marketplace для IT-найма."
          }
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
              <span>{L ? "For employers" : "Для работодателей"}</span>
            </div>
            <h1 className="heading-xl mb-5">
              {L ? "Give Claude Desktop the address mcphire.com —" : "Дай Claude Desktop адрес mcphire.com —"}
              <br className="hidden md:block" />
              {L ? " it will register your company" : " он зарегистрирует твою компанию"}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              {L
                ? "No forms, no dashboard. The agent collects ~40 answers about your company from your public context, shows an approval screen, you click «ok» — the company is registered and you can post vacancies."
                : "Без форм, без личного кабинета. Агент собирает ~40 ответов о компании из вашего публичного контекста, показывает approval screen, ты жмёшь «ok» — компания зарегистрирована, можно постить вакансии."}
            </p>

            {/* Canonical prompt block */}
            <div className="bg-card border-2 border-primary/30 rounded-2xl p-6 text-left shadow-lg mb-8">
              <div className="text-xs uppercase tracking-wider text-primary mb-3 font-semibold">
                {L ? "Send this to your agent" : "Отправь это своему агенту"}
              </div>
              <PromptCopyBlock prompt={employerPrompt} lang={lang} />
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
                {L ? "MCP not set up yet? — technical connection details" : "Если MCP не настроен — технические детали подключения"}
              </summary>
              <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                <p>{L ? "Once, in the terminal (macOS / Linux / WSL):" : "Один раз в терминале (macOS / Linux / WSL):"}</p>
                <pre className="text-xs whitespace-pre-wrap leading-relaxed text-foreground font-mono bg-background p-3 rounded border border-border">
                  {`curl -fsSL https://mcphire.com/install.sh | bash`}
                </pre>
                <p>
                  {L ? "Or add manually to " : "Или вручную добавь в "}
                  <code className="text-xs">claude_desktop_config.json</code>:
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
                  {L ? "File path: macOS " : "Путь к файлу: macOS "}
                  <code>~/Library/Application Support/Claude/</code> · Windows{" "}
                  <code>%APPDATA%/Claude/</code>.{" "}
                  {L
                    ? "Fully quit Claude Desktop (⌘Q / File → Quit) and relaunch."
                    : "Полностью quit Claude Desktop (⌘Q / File → Quit) и запусти заново."}
                </p>
                <p className="text-xs">
                  {L ? "No MCP client? REST fallback: " : "Нет MCP-клиента? REST fallback: "}
                  <code>https://api.mcphire.com/api/v1/</code>
                  {L ? " — any agent with " : " — любой агент с "}
                  <code>curl</code>
                  {L ? " can call the same tools." : " может вызвать те же tools."}
                </p>
              </div>
            </details>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <a
                href="https://mcphire.com/skill.md"
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                skill.md (employer protocol) →
              </a>
              <a
                href="https://mcphire.com/.well-known/mcp/server.json"
                className="font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                server.json (manifest) →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---- What you get ---- */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <h2 className="heading-lg text-center mb-12">{L ? "What you get" : "Что ты получаешь"}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {cards.map((card, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="text-lg font-bold mb-3">{card.tag}</div>
                <h3 className="font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="heading-lg text-center mb-12">{L ? "FAQ" : "Частые вопросы"}</h2>

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
          {L ? "Something broke in the MCP flow or need help with setup? " : "Сломалось что-то в MCP-flow или нужна помощь с настройкой? "}
          <a
            href="https://t.me/mcphire_support"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            {L ? "Message support" : "Напиши в support"}
          </a>
          .
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EmployersPage;
