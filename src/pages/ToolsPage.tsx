import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calculator, ClipboardCheck, FileText, Bot } from "lucide-react";

interface Tool {
  icon: typeof Calculator;
  title: string;
  description: string;
  href?: string;
  ready: boolean;
}

const tools: Tool[] = [
  {
    icon: Calculator,
    title: "Калькулятор зарплаты",
    description: "Узнай рыночную зарплату для своей роли и города",
    href: "/tools/salary",
    ready: true,
  },
  {
    icon: ClipboardCheck,
    title: "Чеклист резюме",
    description: "Проверь своё резюме по 20 критериям рекрутеров",
    href: "/tools/resume-checklist",
    ready: true,
  },
  {
    icon: FileText,
    title: "Генератор сопроводительного",
    description: "AI создаст сопроводительное письмо под вакансию",
    ready: false,
  },
  {
    icon: Bot,
    title: "AI-ревью резюме",
    description: "Получи оценку и рекомендации от AI за 30 секунд",
    ready: false,
  },
];

const ToolsPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Бесплатные инструменты для поиска работы | СБОРКА</title>
        <meta name="description" content="Калькулятор зарплаты, чеклист резюме и другие бесплатные инструменты для IT-специалистов от СБОРКИ." />
        <link rel="canonical" href="https://sborka.work/tools" />
        <meta property="og:title" content="Бесплатные инструменты для поиска работы" />
        <meta property="og:description" content="Калькулятор зарплаты, чеклист резюме — бесплатно для IT-специалистов." />
        <meta property="og:url" content="https://sborka.work/tools" />
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

      <section className="section-white">
        <div className="section-container">
          <h1 className="heading-xl mb-4">ИНСТРУМЕНТЫ</h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
            Бесплатные инструменты для поиска работы.
          </p>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon;
              const card = (
                <div
                  className={`rounded-2xl border border-border/30 bg-card shadow-lg p-6 ${
                    tool.ready ? "hover:border-primary/40 transition-colors" : "opacity-75"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <IconComponent
                      size={32}
                      className="text-primary flex-shrink-0"
                    />
                    <h3 className="font-bold text-xl">{tool.title}</h3>
                  </div>

                  <p className="text-muted-foreground mb-4">{tool.description}</p>

                  {tool.ready ? (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase bg-primary/15 text-primary">
                      ОТКРЫТЬ
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase bg-muted text-muted-foreground">
                      СКОРО
                    </span>
                  )}
                </div>
              );

              return tool.ready && tool.href ? (
                <Link key={index} to={tool.href}>
                  {card}
                </Link>
              ) : (
                <div key={index}>{card}</div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ToolsPage;
