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

        {/* Sidebar Banner */}
        <div className="mt-6 p-4 bg-gradient-to-br from-[hsl(174,62%,40%)] to-[hsl(174,62%,28%)] rounded-lg text-white">
          <p className="font-black text-sm uppercase tracking-wider mb-1">СБОРКА</p>
          <p className="text-xs text-white/80 mb-3 leading-relaxed">
            Карьерный клуб для IT-специалистов. Менторы, мок-собеседования, системный поиск работы.
          </p>
          <a
            href="https://t.me/Sborka_work_bot?start=knowledge_sidebar"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center px-3 py-2 bg-white text-[hsl(174,62%,30%)] text-xs font-bold rounded-md hover:bg-white/90 transition-colors"
          >
            Подробнее →
          </a>
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
