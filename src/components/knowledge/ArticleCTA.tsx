// ============================================================
// MCPHire — Article CTA (V3 «Optimist» — MCPHire MCP-flow)
// Was a Sborka webinar CTA; now points to /#agent-onboarding
// and the canonical MCP install entry point.
// ============================================================

interface ArticleCTAProps {
  slug: string;
  variant?: "inline" | "block";
}

const ArticleCTA = ({ slug, variant = "block" }: ArticleCTAProps) => {
  const href = `/?utm_source=knowledge&utm_campaign=${encodeURIComponent(slug)}#agent-onboarding`;

  if (variant === "inline") {
    return (
      <div
        className="my-8 v3-card p-6"
        style={{ background: "rgba(241,236,227,.6)" }}
      >
        <p className="text-base text-v3-ink">
          Хочешь, чтобы твой AI-агент сам нашёл вакансию и записал на интервью?{" "}
          <a
            href={href}
            className="font-semibold text-v3-ink underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity"
            style={{ textDecorationColor: "var(--v3-hot)" }}
          >
            Подключи MCPHire к Claude / Cursor →
          </a>
        </p>
      </div>
    );
  }

  return (
    <div
      className="my-12 v3-card relative overflow-hidden p-8 md:p-10 text-center"
      style={{ background: "var(--v3-ink)", color: "#fff" }}
    >
      <div
        aria-hidden
        className="v3-grad-hot absolute"
        style={{
          right: -80,
          top: -80,
          width: 240,
          height: 240,
          borderRadius: "50%",
          filter: "blur(40px)",
          opacity: 0.5,
        }}
      />
      <div className="relative">
        <h3 className="v3-h2 mb-3" style={{ color: "#fff" }}>
          Получи матч за 41 секунду
        </h3>
        <p className="opacity-80 mb-6 max-w-lg mx-auto leading-relaxed">
          Подключи MCPHire к Claude Desktop, Cursor или своему harness — AI-агент
          найдёт вакансию, поторгуется по вилке и забронирует интервью.
        </p>
        <a
          href={href}
          className="v3-btn v3-btn-primary"
          style={{ background: "var(--v3-hot)" }}
        >
          Подключить MCP →
        </a>
      </div>
    </div>
  );
};

export default ArticleCTA;
