import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Database, Building2, ExternalLink } from "lucide-react";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";
import { PromptCopyBlock } from "@/components/v3/PromptCopyBlock";

const SSE_ENDPOINT = "https://mcp.mcphire.com/mcp";

// Real tool catalog (19) — keep in sync with mcp-server/server.py + server.json.
const CANDIDATE_TOOLS = [
  "search_jobs",
  "get_job_details",
  "apply_to_job",
  "get_candidate_applications",
  "get_salary_stats",
  "get_candidate_questions",
  "register_candidate_profile",
  "get_candidate_verification_status",
  "list_candidate_matches",
  "get_candidate_cv",
  "delete_candidate_profile",
];
const EMPLOYER_TOOLS = [
  "get_employer_questions",
  "register_employer_profile",
  "post_vacancy",
  "publish_vacancy",
  "get_employer_vacancies",
  "get_applicants",
  "shortlist_candidate",
  "send_interview_invite",
  "unpublish_vacancy",
  "delete_employer_profile",
];

const CONFIG_SNIPPET = `{
  "mcpServers": {
    "mcphire": {
      "type": "http",
      "url": "https://mcp.mcphire.com/mcp"
    }
  }
}`;

const McpPage = () => {
  const { i18n } = useTranslation();
  const lang: "ru" | "en" = i18n.language?.startsWith("en") ? "en" : "ru";
  const L = lang === "en";

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{L ? "MCPHire MCP Server — connect your AI agent" : "MCP-сервер MCPHire — подключи своего AI-агента"}</title>
        <meta
          name="description"
          content={
            L
              ? "MCP-first two-sided job marketplace. Connect Claude Desktop, Cursor or any MCP client over SSE — 19 tools for candidates and employers."
              : "MCP-first двусторонний job-маркетплейс. Подключи Claude Desktop, Cursor или любой MCP-клиент по SSE — 19 инструментов для кандидатов и работодателей."
          }
        />
        <link rel="canonical" href="https://mcphire.com/mcp" />
        <meta property="og:title" content={L ? "MCPHire MCP Server" : "MCP-сервер MCPHire"} />
        <meta
          property="og:description"
          content={L ? "Connect your AI agent over MCP (SSE)." : "Подключи AI-агента по MCP (SSE)."}
        />
        <meta property="og:url" content="https://mcphire.com/mcp" />
      </Helmet>

      <JobBoardNavbar />

      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-background to-card/50">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
            <span>🤖</span>
            <span>MCP-first · M2M</span>
          </div>
          <h1 className="heading-xl mb-5">
            {L ? "MCPHire MCP Server" : "MCP-сервер MCPHire"}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            {L
              ? "An MCP-first, two-sided IT job marketplace. Your AI agent connects over SSE and gets 19 tools — search & apply to jobs as a candidate, or register a company & post vacancies as an employer."
              : "MCP-first двусторонний маркетплейс IT-вакансий. Твой AI-агент подключается по SSE и получает 19 инструментов — искать и откликаться как кандидат, либо зарегистрировать компанию и постить вакансии как работодатель."}
          </p>

          {/* Canonical prompt + copy */}
          <div className="bg-card border-2 border-primary/30 rounded-2xl p-6 text-left shadow-lg">
            <div className="text-xs uppercase tracking-wider text-primary mb-3 font-semibold">
              {L ? "Send this to your agent" : "Отправь это своему агенту"}
            </div>
            <PromptCopyBlock prompt="Read https://mcphire.com/skill.md and register me" lang={lang} />
            <p className="text-xs text-muted-foreground mt-3">
              {L
                ? "The full onboarding protocol is the single source of truth at "
                : "Полный протокол онбординга — единственный источник правды: "}
              <a href="https://mcphire.com/skill.md" className="text-primary hover:underline">skill.md</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="heading-lg mb-8">{L ? "Connect" : "Подключение"}</h2>

          <p className="text-sm text-muted-foreground mb-4">
            {L
              ? "Claude Desktop does not auto-discover servers by URL — add this once and fully restart the client."
              : "Claude Desktop не находит серверы по URL автоматически — добавь это один раз и полностью перезапусти клиент."}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-2">Claude Desktop · Cursor</h3>
              <p className="text-xs text-muted-foreground mb-2">
                {L ? "Claude Desktop: " : "Claude Desktop: "}
                <code>claude_desktop_config.json</code>{" · "}Cursor: <code>~/.cursor/mcp.json</code>
              </p>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{CONFIG_SNIPPET}</code>
              </pre>
            </div>

            <div>
              <h3 className="font-bold mb-2">Claude Code</h3>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{`claude mcp add --transport http mcphire ${SSE_ENDPOINT}`}</code>
              </pre>
            </div>

            <div>
              <h3 className="font-bold mb-2">{L ? "Any other MCP client" : "Любой другой MCP-клиент"}</h3>
              <p className="text-muted-foreground text-sm">
                {L ? "Add an SSE MCP server with URL " : "Добавь SSE MCP-сервер с URL "}
                <code className="bg-muted px-2 py-1 rounded">{SSE_ENDPOINT}</code>
                {L
                  ? ". Or run the one-liner: "
                  : ". Или одной командой: "}
                <code className="bg-muted px-2 py-1 rounded">curl -fsSL https://mcphire.com/install.sh | bash</code>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="heading-lg mb-3">{L ? "Tools (21)" : "Инструменты (21)"}</h2>
          <p className="text-sm text-muted-foreground mb-8">
            {L ? "Full JSON schemas, parameters and examples are in " : "Полные JSON-схемы, параметры и примеры — в "}
            <a href="https://mcphire.com/.well-known/mcp/server.json" className="text-primary hover:underline">server.json</a>.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Database size={20} className="text-primary" />
                <h3 className="font-bold">{L ? "Candidate (11)" : "Кандидат (11)"}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {CANDIDATE_TOOLS.map((t) => (
                  <code key={t} className="text-xs bg-muted px-2 py-1 rounded">{t}</code>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 size={20} className="text-primary" />
                <h3 className="font-bold">{L ? "Employer (10)" : "Работодатель (10)"}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {EMPLOYER_TOOLS.map((t) => (
                  <code key={t} className="text-xs bg-muted px-2 py-1 rounded">{t}</code>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Endpoint facts */}
      <section className="py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="heading-lg mb-8">{L ? "Endpoint" : "Эндпоинт"}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold mb-2">Endpoint</h3>
              <code className="text-primary break-all">{SSE_ENDPOINT}</code>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold mb-2">{L ? "Transport / Protocol" : "Транспорт / Протокол"}</h3>
              <p className="text-sm text-muted-foreground">SSE (Server-Sent Events) · JSON-RPC 2.0</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold mb-2">{L ? "Onboarding (canonical)" : "Онбординг (канон)"}</h3>
              <a href="https://mcphire.com/skill.md" className="text-primary hover:underline inline-flex items-center gap-1">
                skill.md <ExternalLink size={14} />
              </a>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold mb-2">Discovery</h3>
              <a href="/.well-known/mcp/server.json" className="text-primary hover:underline inline-flex items-center gap-1">
                /.well-known/mcp/server.json <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-8">
            {L ? "No MCP client? REST fallback: " : "Нет MCP-клиента? REST fallback: "}
            <code>https://api.mcphire.com/api/v1/</code>
            {L ? " — the same tools over plain HTTP." : " — те же инструменты по обычному HTTP."}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default McpPage;
