import { useState } from "react";

interface TOCProps {
  sections: { heading: string }[];
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-zа-яё0-9\s-]/gi, "")
    .replace(/\s+/g, "-")
    .slice(0, 60);

const TableOfContents = ({ sections }: TOCProps) => {
  const [open, setOpen] = useState(false);

  const items = [
    ...sections.map((s) => ({ label: s.heading, id: slugify(s.heading) })),
    { label: "Типичные ошибки", id: "mistakes" },
    { label: "План действий", id: "action-plan" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <>
      {/* Desktop sticky sidebar */}
      <aside className="hidden lg:block sticky top-20 self-start w-56 shrink-0">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Содержание
        </p>
        <nav>
          <ul className="space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-muted-foreground hover:text-foreground transition-colors block leading-snug"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar — MCP CTA */}
        <div
          className="mt-6 v3-card relative overflow-hidden p-4"
          style={{ background: "var(--v3-ink)", color: "#fff" }}
        >
          <div
            aria-hidden
            className="v3-grad-hot absolute"
            style={{
              right: -40, top: -40, width: 120, height: 120,
              borderRadius: "50%", filter: "blur(30px)", opacity: 0.5,
            }}
          />
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-wider mb-1 opacity-80">MCP-first</p>
            <p className="text-sm font-semibold mb-1">Подключи Claude / Cursor</p>
            <p className="text-xs opacity-75 mb-3 leading-relaxed">
              Твой AI-агент найдёт вакансию, поторгуется и забронирует интервью.
            </p>
            <a
              href="/#agent-onboarding"
              className="block text-center px-3 py-2 text-xs font-bold rounded-lg text-v3-ink hover:opacity-90 transition-opacity"
              style={{ background: "var(--v3-hot)" }}
            >
              Подключить MCP →
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile collapsible */}
      <div className="lg:hidden mb-8 border border-border rounded-lg">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold"
        >
          <span>Содержание</span>
          <span className="text-muted-foreground">{open ? "−" : "+"}</span>
        </button>
        {open && (
          <nav className="px-4 pb-4">
            <ul className="space-y-2 text-sm">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};

export { slugify };
export default TableOfContents;
