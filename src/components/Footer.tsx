// ============================================================
// MCPHire V3 — footer
// Reuses V3 tokens (warm cream surface, ink + mute text).
// No partner cross-promo. M2M tagline on bottom bar.
// ============================================================

import { Link } from "react-router-dom";
import { V3Logo } from "@/components/v3/Logo";

const Footer = () => {
  return (
    <footer className="border-t mt-8" style={{ borderColor: "var(--v3-line2)", background: "rgba(241,236,227,.5)" }}>
      <div className="mx-auto px-4 md:px-8 py-12" style={{ maxWidth: 1320 }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <V3Logo />
            <p className="text-sm text-v3-ink2 leading-relaxed mt-3">
              Первый MCP-маркетплейс IT-вакансий. Машина с машиной.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://t.me/mcphire" target="_blank" rel="noopener noreferrer" className="text-v3-ink2 hover:text-v3-ink transition-colors text-sm font-medium">
                Telegram
              </a>
              <a href="https://www.linkedin.com/in/timzinin/" target="_blank" rel="noopener noreferrer" className="text-v3-ink2 hover:text-v3-ink transition-colors text-sm font-medium">
                LinkedIn
              </a>
              <a href="https://x.com/timzinin" target="_blank" rel="noopener noreferrer" className="text-v3-ink2 hover:text-v3-ink transition-colors text-sm font-medium">
                X
              </a>
            </div>
          </div>

          {/* Кандидатам */}
          <div>
            <h4 className="font-mono text-xs text-v3-mute mb-3 uppercase tracking-wider">Кандидатам</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/jobs" className="text-v3-ink2 hover:text-v3-ink transition-colors">Вакансии</Link></li>
              <li><Link to="/tools/salary" className="text-v3-ink2 hover:text-v3-ink transition-colors">Калькулятор зарплат</Link></li>
              <li><Link to="/tools/resume-checklist" className="text-v3-ink2 hover:text-v3-ink transition-colors">Чеклист резюме</Link></li>
              <li><Link to="/tools/resume-review" className="text-v3-ink2 hover:text-v3-ink transition-colors">AI-ревью резюме</Link></li>
              <li><Link to="/knowledge" className="text-v3-ink2 hover:text-v3-ink transition-colors">База знаний</Link></li>
            </ul>
          </div>

          {/* Работодателям */}
          <div>
            <h4 className="font-mono text-xs text-v3-mute mb-3 uppercase tracking-wider">Работодателям</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/employers" className="text-v3-ink2 hover:text-v3-ink transition-colors">Разместить вакансию</Link></li>
              <li><Link to="/employer/dashboard" className="text-v3-ink2 hover:text-v3-ink transition-colors">Дашборд</Link></li>
              <li><Link to="/mcp" className="text-v3-ink2 hover:text-v3-ink transition-colors">MCP API</Link></li>
            </ul>
          </div>

          {/* MCP / агентам */}
          <div>
            <h4 className="font-mono text-xs text-v3-mute mb-3 uppercase tracking-wider">Агентам</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://mcphire.com/skill.md"
                  className="text-v3-ink font-semibold underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity"
                  style={{ textDecorationColor: "var(--v3-hot)" }}
                >
                  skill.md (canonical)
                </a>
              </li>
              <li>
                <a href="https://mcphire.com/.well-known/mcp/server.json" className="text-v3-ink2 hover:text-v3-ink transition-colors">
                  server.json (manifest)
                </a>
              </li>
              <li>
                <a href="https://mcphire.com/llms.txt" className="text-v3-ink2 hover:text-v3-ink transition-colors">
                  llms.txt
                </a>
              </li>
              <li><Link to="/privacy" className="text-v3-ink2 hover:text-v3-ink transition-colors">Конфиденциальность</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-v3-mute font-mono border-t" style={{ borderColor: "var(--v3-line2)" }}>
          <span>© 2026 MCPHire</span>
          <span>M2M · BAN-FREE · NO CAPTCHA · HONEST SIGNAL</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
