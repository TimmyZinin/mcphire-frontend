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
