// ============================================================
// MCPHire V3 — "How it works" section
// Header card → 3-step illustrations → M2M manifesto → InstallBlock
// ============================================================

import type { Lang } from "./data";
import {
  V3IllustrationPlug,
  V3IllustrationProfile,
  V3IllustrationCalendar,
} from "./Illustrations";

interface HowSectionProps {
  lang: Lang;
}

const STEPS = {
  ru: [
    { n: "01", t: "Подключи MCP-сервер", d: "Одна команда в Claude Desktop или Cursor — и MCPHire появляется как инструмент." },
    { n: "02", t: "Опиши себя один раз",   d: "Агент сам составит профиль из репозиториев, резюме, переписки и поведения." },
    { n: "03", t: "Спи спокойно",          d: "Агент откликается, торгуется по вилке, отвечает рекрутерам и согласует слоты в календаре." },
  ],
  en: [
    { n: "01", t: "Plug in the MCP server",   d: "One line in Claude Desktop or Cursor and MCPHire appears as a tool." },
    { n: "02", t: "Describe yourself once",   d: "The agent assembles your profile from repos, CV, chats and behaviour." },
    { n: "03", t: "Sleep on it",              d: "The agent applies, negotiates the band, replies to recruiters and books interview slots." },
  ],
} as const;

const TITLES = {
  ru: { title: "Как агент работает за тебя", lastWord: "тебя", pin: "3 шага · от 4 минут",
        intro: "MCPHire — это не сайт. Это набор инструментов для агента. Можно использовать сайт, конечно, мы старались. Но самое интересное начинается, когда ты подключаешь MCP.",
        stepEyebrow: "ШАГ" },
  en: { title: "How your agent works",      lastWord: "works",  pin: "3 steps · ~4 min",
        intro: "MCPHire isn't really a site. It's a toolset for agents. You can browse the site of course, we tried. But the magic starts when you wire up MCP.",
        stepEyebrow: "STEP" },
} as const;

export function V3HowSection({ lang }: HowSectionProps) {
  const t = TITLES[lang];
  const steps = STEPS[lang];
  const grads = ["v3-grad-hot", "v3-grad-cool", "v3-grad-plum"];
  const illustrations = [V3IllustrationPlug, V3IllustrationProfile, V3IllustrationCalendar];
  const titleParts = t.title.split(" ");
  const titleHead = titleParts.slice(0, -1).join(" ");

  return (
    <section className="px-4 py-16">
      <div className="mx-auto" style={{ maxWidth: 1320 }}>
        {/* Header card */}
        <div className="v3-card p-10 md:p-12">
          <span className="v3-pin"><span className="v3-pin-dot" aria-hidden /> {t.pin}</span>
          <h2 className="v3-h2 mt-4 leading-tight">
            {titleHead}{" "}
            <span className="v3-serif text-v3-hot">{t.lastWord}</span>
          </h2>
          <p className="text-v3-ink2 text-[17px] max-w-[640px] mt-2">
            {t.intro}
          </p>
        </div>

        {/* 3-step grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mt-4 lg:mt-5">
          {steps.map((s, i) => {
            const Illustration = illustrations[i];
            return (
              <div key={s.n} className="v3-card p-6 flex flex-col gap-3.5" style={{ minHeight: 320 }}>
                <div
                  className={`${grads[i]} relative overflow-hidden`}
                  style={{
                    aspectRatio: "4 / 3",
                    margin: "-24px -24px 0 -24px",
                    borderRadius: "24px 24px 0 0",
                    padding: 14,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <span
                    className="absolute font-mono text-[10px] uppercase text-white px-2 py-0.5 rounded"
                    style={{
                      left: 12, top: 10, letterSpacing: ".06em",
                      background: "rgba(0,0,0,.18)", backdropFilter: "blur(6px)",
                    }}
                  >
                    {t.stepEyebrow} {s.n}
                  </span>
                  <Illustration />
                </div>
                <div className="pt-2">
                  <span className="v3-chip">{t.stepEyebrow} {s.n}</span>
                  <h3 className="text-[26px] font-bold mt-2.5 mb-1.5" style={{ letterSpacing: "-.02em" }}>
                    {s.t}
                  </h3>
                  <p className="text-v3-ink2 text-sm leading-snug">{s.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
