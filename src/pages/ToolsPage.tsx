import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ClipboardCheck, FileText, Bot } from "lucide-react";

interface Tool {
  icon: typeof ClipboardCheck;
  title: string;
  description: string;
  href?: string;
  ready: boolean;
}

// SalaryCalculator removed from listing per Sergei feedback 2026-05-21:
// "Калькулятор не факт, что нужна, давайте закоммитим её". Route still
// exists for direct links but page is no longer surfaced in /tools.
const tools: Tool[] = [
  {
    icon: ClipboardCheck,
    title: "Чеклист резюме",
    description: "Проверь своё резюме по 20 критериям рекрутеров",
    href: "/tools/resume-checklist",
    ready: true,
  },
  {
    icon: Bot,
    title: "AI-ревью резюме",
    description: "Проверь резюме по 15 критериям и получи рекомендации",
    href: "/tools/resume-review",
    ready: true,
  },
  {
    icon: FileText,
    title: "Генератор сопроводительного",
    description: "AI создаст сопроводительное письмо под вакансию",
    ready: false,
  },
];

const ToolsPage = () => {
  return (
    <main className="v3-canvas">
      <Helmet>
        <title>Бесплатные инструменты для поиска работы | MCPHire</title>
        <meta name="description" content="Чеклист резюме и AI-ревью резюме — бесплатные инструменты для IT-специалистов от MCPHire." />
        <link rel="canonical" href="https://mcphire.com/tools" />
        <meta property="og:title" content="Бесплатные инструменты для поиска работы" />
        <meta property="og:description" content="Чеклист резюме и AI-ревью — бесплатно для IT-специалистов." />
        <meta property="og:url" content="https://mcphire.com/tools" />
      </Helmet>

      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto" style={{ maxWidth: 1320 }}>
          <h1 className="v3-h1 mb-4">Инструменты</h1>
          <p className="text-lg text-v3-ink2 mb-10 max-w-2xl">
            Бесплатные инструменты для поиска работы
          </p>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon;
              const card = (
                <div
                  className={`v3-card p-6 h-full ${
                    tool.ready ? "transition-colors" : "opacity-75"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <IconComponent
                      size={32}
                      className="text-v3-hot flex-shrink-0"
                    />
                    <h3 className="font-bold text-xl text-v3-ink">{tool.title}</h3>
                  </div>

                  <p className="text-v3-ink2 mb-4">{tool.description}</p>

                  {tool.ready ? (
                    <span className="v3-pill" style={{ background: "var(--v3-ink)", color: "#fff", borderColor: "transparent" }}>
                      Открыть →
                    </span>
                  ) : (
                    <span className="v3-pill" style={{ color: "var(--v3-mute)" }}>
                      Скоро
                    </span>
                  )}
                </div>
              );

              return tool.ready && tool.href ? (
                <Link key={index} to={tool.href} className="no-underline">
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
