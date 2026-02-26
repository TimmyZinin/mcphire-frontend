import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Terminal, Code, Database, TrendingUp, ExternalLink } from "lucide-react";

const McpPage = () => {
  const tools = [
    {
      icon: Database,
      name: "salary_data",
      description: "Зарплаты по ролям и городам (15 ролей × 5 городов)",
      example: `// Запрос
{ "tool": "salary_data", "params": { "role": "Frontend Developer", "city": "Москва" } }

// Ответ
{ "salaryFrom": 180000, "salaryTo": 350000, "currency": "₽", "level": "Middle" }`,
    },
    {
      icon: Terminal,
      name: "resume_review",
      description: "Анализ резюме (15 критериев)",
      example: `// Запрос
{ "tool": "resume_review", "params": { "resumeText": "Опыт работы 5 лет..." } }

// Ответ
{ "score": 75, "categories": { "structure": 20, "experience": 20, "skills": 15, "formatting": 20 }, "recommendations": [...] }`,
    },
    {
      icon: Code,
      name: "job_search",
      description: "Поиск IT-вакансий (50+ позиций)",
      example: `// Запрос
{ "tool": "job_search", "params": { "skills": ["React", "TypeScript"], "city": "Москва", "level": "Senior" } }

// Ответ
{ "jobs": [{ "id": "1", "title": "Senior Frontend...", "company": "Яндекс", "salaryFrom": 350000 }] }`,
    },
    {
      icon: TrendingUp,
      name: "market_trends",
      description: "Тренды рынка труда",
      example: `// Запрос
{ "tool": "market_trends", "params": { "period": "2026-Q1" } }

// Ответ
{ "demand": { "React": "+15%", "Python": "+12%" }, "salaryDynamics": "+8%", "vacanciesCount": 1240 }`,
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>MCP-сервер СБОРКА — AI Job Search API | СБОРКА</title>
        <meta
          name="description"
          content="Подключите AI-агента к российскому рынку IT-вакансий через Model Context Protocol. Salary data, resume review, job search."
        />
        <link rel="canonical" href="https://sborka.work/mcp" />
        <meta
          property="og:title"
          content="MCP-сервер СБОРКА — AI Job Search API"
        />
        <meta
          property="og:description"
          content="Подключите AI-агента к российскому рынку IT-вакансий"
        />
        <meta property="og:url" content="https://sborka.work/mcp" />
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
      <section className="section-black">
        <div className="section-container text-center py-16">
          <h1 className="heading-xl text-white mb-6">
            MCP-СЕРВЕР
            <br />
            КАРЬЕРНОГО ПОИСКА
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Подключите AI-агента к российскому рынку IT-вакансий через Model
            Context Protocol
          </p>
        </div>
      </section>

      {/* Tools */}
      <section className="section-white">
        <div className="section-container">
          <h2 className="heading-lg mb-8">ИНСТРУМЕНТЫ</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <div
                  key={tool.name}
                  className="border border-border rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <IconComponent size={24} className="text-primary" />
                    <h3 className="font-bold text-lg">{tool.name}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{tool.description}</p>
                  <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                    <code>{tool.example}</code>
                  </pre>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Connection */}
      <section className="section-white">
        <div className="section-container">
          <h2 className="heading-lg mb-8">ПОДКЛЮЧЕНИЕ</h2>

          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Claude Desktop</h3>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{`// claude_desktop_config.json
{
  "mcpServers": {
    "sborka-career": {
      "url": "https://mcp.sborka.work/mcp"
    }
  }
}`}</code>
              </pre>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-4">Cursor / Windsurf</h3>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{`// .cursor/mcp.json
{
  "mcpServers": {
    "sborka-career": {
      "url": "https://mcp.sborka.work/mcp"
    }
  }
}`}</code>
              </pre>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-4">Другие клиенты</h3>
              <p className="text-muted-foreground mb-4">
                Добавьте MCP сервер с URL:{" "}
                <code className="bg-muted px-2 py-1 rounded">
                  https://mcp.sborka.work/mcp
                </code>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="section-white">
        <div className="section-container">
          <h2 className="heading-lg mb-8">ДОКУМЕНТАЦИЯ</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-border rounded-xl p-6">
              <h3 className="font-bold text-lg mb-3">Endpoint</h3>
              <code className="text-primary">https://mcp.sborka.work/mcp</code>
            </div>
            <div className="border border-border rounded-xl p-6">
              <h3 className="font-bold text-lg mb-3">Protocol</h3>
              <p>JSON-RPC 2.0 over HTTP</p>
            </div>
            <div className="border border-border rounded-xl p-6">
              <h3 className="font-bold text-lg mb-3">Transport</h3>
              <p>HTTP (Streamable)</p>
            </div>
            <div className="border border-border rounded-xl p-6">
              <h3 className="font-bold text-lg mb-3">Discovery</h3>
              <a
                href="/.well-known/mcp/server.json"
                className="text-primary hover:underline flex items-center gap-1"
              >
                / .well-known/mcp/server.json
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="/llms.txt"
              className="cta-primary-nrc inline-flex items-center gap-2"
            >
              <ExternalLink size={16} />
              Описание для LLM (llms.txt)
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default McpPage;
