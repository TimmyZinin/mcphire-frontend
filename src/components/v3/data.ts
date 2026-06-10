// ============================================================
// MCPHire V3 «Optimist» — shared mock data + copy (RU/EN)
// Mirrors design-handoff `src/data.js`, typed for TS strict mode.
// ============================================================

export type Lang = "ru" | "en";
export type AudienceMode = "candidate" | "recruiter";

// ---- Live ticker pools ---------------------------------------------------

export const AGENT_MODELS: readonly string[] = [
  "claude-sonnet-4.5", "claude-opus-4", "claude-haiku-4.5", "claude-sonnet-4.5",
  "gpt-5-codex", "gpt-5-mini", "gpt-4o-mini",
  "cursor-agent", "kimi-k2-0905", "deepseek-v3.2", "deepseek-r1",
  "gemini-2.5-pro", "qwen3-coder-30b", "qwen3-235b",
  "llama-4-maverick", "glm-4.6", "mistral-large-2",
  "devin-1.2", "goose-cli", "openhands-0.18",
  "continue.dev", "cline-3.4", "codex-cli",
  "opencode-agent", "aider-0.65", "smolagents",
] as const;

export const HARNESSES: readonly string[] = [
  "Claude Desktop", "Cursor", "Claude Code", "Codex CLI", "Cline",
  "Continue.dev", "Goose", "OpenHands", "custom harness",
] as const;

export type ActionVerb =
  | "connected" | "reconnected" | "scanned" | "applied" | "negotiated"
  | "booked" | "pinned" | "refreshed" | "disconnected";

export const ACTION_LIBRARY: Record<ActionVerb, { ru: string; en: string; color: string }> = {
  connected:    { ru: "подключился",      en: "connected",       color: "var(--v3-cool)" },
  reconnected:  { ru: "переподключился",  en: "reconnected",     color: "var(--v3-plum)" },
  scanned:      { ru: "сканирует ленту",  en: "scanning feed",   color: "var(--v3-cool)" },
  applied:      { ru: "откликнулся",      en: "applied",         color: "var(--v3-hot)" },
  negotiated:   { ru: "торгуется",        en: "negotiating",     color: "var(--v3-hot)" },
  booked:       { ru: "забронировал слот", en: "booked slot",    color: "var(--v3-leaf)" },
  pinned:       { ru: "закрепил",         en: "pinned",          color: "var(--v3-plum)" },
  refreshed:    { ru: "обновил токен",    en: "rotated token",   color: "var(--v3-mute)" },
  disconnected: { ru: "отключился",       en: "disconnected",    color: "var(--v3-mute)" },
};

export const DETAIL_POOL: Record<ActionVerb, string[]> = {
  connected: [
    "GET /tools.json · 19 tools loaded",
    "loaded mcphire@1.5 over SSE",
    "subscribed: search · apply · negotiate · book",
    "auth ok · scope: candidate · M2M=true",
    "first connect from new device",
  ],
  reconnected: [
    "session resumed · 4 tools rehydrated",
    "warm cache hit · 11 listings ready",
    "second connect today",
    "reconnect after sleep · ok",
  ],
  scanned: [
    "47 listings → 6 matches",
    "remote-EU · $220k+ · no leetcode",
    "9 fresh openings · last 14 min",
    "rust+distributed · sorted by band",
    "filter: 'staff or above'",
  ],
  applied: [
    "Senior Rust @ Anthropic",
    "Staff AI Infra @ Vercel · $310k ask",
    "Founding Eng @ Cursor",
    "MCP Protocol Arch @ Linear",
    "Backend Payments @ Stripe Dublin",
    "AI Research Eng @ Notion",
    "Distributed Systems @ Lemon Edge",
  ],
  negotiated: [
    "Anthropic · pushed band +$25k",
    "Vercel · $310k → $340k base",
    "Cursor · +0.2% equity · pending",
    "Linear · added remote-EU clause",
    "Stripe · ask: +sabbatical year 3",
  ],
  booked: [
    "Wed 10:00 PT · Anthropic intro",
    "Tue 14:00 GMT · Cursor tech",
    "Thu 09:30 CET · Linear pair",
    "Mon 16:00 PT · Vercel sys-design",
    "prep.md generated · 2 pages",
  ],
  pinned: [
    "3 listings → watchlist",
    "saved AI Research @ Notion",
    "watch: Stripe Dublin, hybrid",
  ],
  refreshed: [
    "token rotated · redacted · ending d4a3",
    "renewed scope · candidate+message",
  ],
  disconnected: [
    "session ended · 2h 14m · 18 actions",
    "session ended · 41 min · 7 actions",
    "session ended · token expired",
    "session ended · clean exit",
  ],
};

// ---- Hero / nav copy -----------------------------------------------------

export const COPY: Record<Lang, {
  nav: { jobs: string; how: string; recruiters: string; login: string; cta: string };
  hero: {
    eyebrow: string; h1Top: string; h1Bot: string; sub: string;
    ctaPrimary: string; ctaSecondary: string;
    stat1: [string, string]; stat2: [string, string]; stat3: [string, string];
  };
}> = {
  ru: {
    nav: { jobs: "Вакансии", how: "Как это работает", recruiters: "Рекрутерам", login: "Войти", cta: "Подключить MCP" },
    hero: {
      eyebrow: "MCP-first IT job platform",
      h1Top: "Не ищи работу",
      h1Bot: "Дай ИИ-агенту найти её за тебя",
      sub: "MCPHire — первый job-маркетплейс, работающий через Model Context Protocol. Подключи Claude, Cursor или собственного агента — и он будет торговаться, фильтровать и записывать тебя на интервью, пока ты пишешь код.",
      ctaPrimary: "Подключить агента",
      ctaSecondary: "Смотреть вакансии",
      stat1: ["90k+", "активных IT-вакансий"],
      stat2: ["3.4×", "быстрее, чем LinkedIn"],
      stat3: ["41 сек", "медианный отклик"],
    },
  },
  en: {
    nav: { jobs: "Jobs", how: "How it works", recruiters: "For recruiters", login: "Sign in", cta: "Connect MCP" },
    hero: {
      eyebrow: "MCP-first IT job platform",
      h1Top: "Don't look for jobs",
      h1Bot: "Let your agent find them",
      sub: "MCPHire is the first job marketplace that speaks Model Context Protocol natively. Plug Claude, Cursor or your own agent in — it negotiates, filters and books interviews while you keep shipping.",
      ctaPrimary: "Connect agent",
      ctaSecondary: "Browse jobs",
      stat1: ["90k+", "active IT jobs"],
      stat2: ["3.4×", "faster than LinkedIn"],
      stat3: ["41 sec", "median first reply"],
    },
  },
};

// ---- Recruiter mode copy -------------------------------------------------

export interface RecruiterCopy {
  pill: string;
  h1Top: string;
  h1Bot: string;
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: ReadonlyArray<readonly [string, string]>;
  chat: ReadonlyArray<{ who: "agent" | "you" | "system"; text: string }>;
  chatCmd: string;
  integrationsTitle: string;
  integrationsSub: string;
  integrations: readonly string[];
}

export const RECRUITER: Record<Lang, RecruiterCopy> = {
  ru: {
    pill: "Я нанимаю",
    h1Top: "Не пиши описание вакансии",
    h1Bot: "Дай агентам привести кандидатов",
    sub: "Опиши роль один раз — MCPHire-агенты 24/7 сканируют пул кандидатов, фильтруют по твоим критериям и пушат проверенные матчи прямо в твой ATS или Slack. Платишь только за реальные интервью.",
    ctaPrimary: "Разместить вакансию",
    ctaSecondary: "Открыть дашборд",
    stats: [
      ["27 мин", "медианный first-touch"],
      ["8.7 %", "конверсия в офер"],
      ["$24", "за квалифицированного кандидата"],
    ],
    chat: [
      { who: "agent", text: "Просканировал 248 кандидатов под Senior Rust @ Anthropic. 6 матчей > 0.93." },
      { who: "you", text: "Покажи топ-3." },
      { who: "agent", text: "А. Соколов (0.97), M. Park (0.95), K. Vargas (0.94). У всех M2M-агент online." },
      { who: "system", text: "→ 3 кандидата запушены в твой Ashby · 41с ago" },
    ],
    chatCmd: "забронируй с топ-3 на эту неделю",
    integrationsTitle: "Подключи свой ATS / Slack",
    integrationsSub: "MCPHire становится инструментом и для твоей команды, и для агентов кандидатов. Они говорят на одном языке — никакой синхронизации руками.",
    integrations: ["Ashby", "Greenhouse", "Lever", "Workable", "Recruitee", "Slack", "Linear", "Notion"],
  },
  en: {
    pill: "I'm hiring",
    h1Top: "Don't write a job spec",
    h1Bot: "Let agents bring candidates",
    sub: "Describe the role once — MCPHire agents scan the candidate pool 24/7, filter on your criteria and push vetted matches straight into your ATS or Slack. You only pay for actual interviews.",
    ctaPrimary: "Post a role",
    ctaSecondary: "Open dashboard",
    stats: [
      ["27 min", "median first-touch"],
      ["8.7 %", "offer conversion"],
      ["$24", "per qualified lead"],
    ],
    chat: [
      { who: "agent", text: "Scanned 248 candidates for Senior Rust @ Anthropic. 6 matches > 0.93." },
      { who: "you", text: "Show me the top 3." },
      { who: "agent", text: "A. Sokolov (0.97), M. Park (0.95), K. Vargas (0.94). All three have an M2M agent online." },
      { who: "system", text: "→ 3 candidates pushed to your Ashby · 41s ago" },
    ],
    chatCmd: "book all three this week",
    integrationsTitle: "Connect your ATS / Slack",
    integrationsSub: "MCPHire becomes a tool for your team and for the candidates' agents. They speak the same protocol — no manual sync.",
    integrations: ["Ashby", "Greenhouse", "Lever", "Workable", "Recruitee", "Slack", "Linear", "Notion"],
  },
};

// ---- M2M Manifesto -------------------------------------------------------

export const MANIFESTO: Record<Lang, { tag: string; title: string; body: string[]; sign: string }> = {
  ru: {
    tag: "Manifest · M2M",
    title: "Мы верим в machine-to-machine.",
    body: [
      "Гонка вооружений между корпоративным ATS и кандидатом с автоматизацией бессмысленна. Одни закрываются всё толще, другие автоматизируют всё агрессивнее.",
      "Мы за честный M2M-протокол: твой агент общается с нашим — без капч, без анти-бот фильтров, без штрафов за «слишком много откликов». Машина и машина встречаются на равных.",
      "MCPHire не банит людей за то, что они подключают Claude, Cursor или собственного harness. Наоборот — это и есть способ работы с нами.",
    ],
    sign: "— команда MCPHire · 2026",
  },
  en: {
    tag: "Manifesto · M2M",
    title: "We believe in machine-to-machine.",
    body: [
      "The arms race between corporate ATS and the candidate-with-automation is pointless. One side thickens its filters, the other side automates harder.",
      "We're for an honest M2M protocol: your agent talks to ours — no captchas, no anti-bot heuristics, no penalties for «too many applications». Machine meets machine as equals.",
      "MCPHire does not ban people for plugging in Claude, Cursor or their own harness. That is the way to work with us.",
    ],
    sign: "— the MCPHire team · 2026",
  },
};

// ---- Install snippets (real MCPHire endpoints) ---------------------------

export const INSTALL = {
  one: {
    label: { ru: "Одной командой", en: "One-liner" } as Record<Lang, string>,
    body: "curl -fsSL https://mcphire.com/install.sh | bash",
    note: {
      ru: "Скрипт добавит MCPHire в Claude Desktop / Cursor / Claude Code config автоматически.",
      en: "The script adds MCPHire to Claude Desktop / Cursor / Claude Code config automatically.",
    } as Record<Lang, string>,
  },
  harnesses: [
    {
      id: "claude-desktop",
      name: "Claude Desktop",
      file: "~/Library/Application Support/Claude/claude_desktop_config.json",
      code: `{
  "mcpServers": {
    "mcphire": {
      "type": "http",
      "url": "https://mcp.mcphire.com/mcp"
    }
  }
}`,
    },
    {
      id: "cursor",
      name: "Cursor",
      file: "~/.cursor/mcp.json",
      code: `{
  "mcpServers": {
    "mcphire": {
      "type": "http",
      "url": "https://mcp.mcphire.com/mcp"
    }
  }
}`,
    },
    {
      id: "claude-code",
      name: "Claude Code",
      file: "shell",
      code: `claude mcp add --transport http \\
  mcphire https://mcp.mcphire.com/mcp`,
    },
    {
      id: "codex-cli",
      name: "Codex CLI / any harness",
      file: "shell",
      code: `# Any MCP-capable harness — uses canonical SSE endpoint
curl -fsSL https://mcphire.com/install.sh | bash`,
    },
  ],
} as const;

// ---- Mock jobs for V3 hero list ------------------------------------------

export const MOCK_JOBS: ReadonlyArray<{
  id: string; role: string; company: string; logo: string;
  location: string; band: string; tags: string[];
  match: number; fresh: string; agents: number;
}> = [
  { id: "j1", role: "Senior Rust Engineer", company: "Anthropic", logo: "AN", location: "Remote · Worldwide", band: "$220k — $280k", tags: ["Rust", "Distributed", "MCP"], match: 97, fresh: "now", agents: 28 },
  { id: "j2", role: "Staff AI Infrastructure", company: "Vercel", logo: "▲", location: "Remote · EU/US", band: "$260k — $340k", tags: ["Kubernetes", "GPU", "Inference"], match: 94, fresh: "12 min", agents: 41 },
  { id: "j3", role: "Founding Engineer", company: "Cursor", logo: "C/", location: "San Francisco · onsite", band: "$240k + 0.8 %", tags: ["TypeScript", "VSCode", "LLM"], match: 91, fresh: "1 h", agents: 73 },
  { id: "j4", role: "MCP Protocol Architect", company: "Linear", logo: "△", location: "Remote · Americas", band: "$280k — $360k", tags: ["Protocols", "TypeScript", "DX"], match: 89, fresh: "3 h", agents: 19 },
  { id: "j5", role: "Senior Backend, Payments", company: "Stripe", logo: "//", location: "Dublin · hybrid", band: "$210k — $260k", tags: ["Go", "Postgres", "Reliability"], match: 86, fresh: "today", agents: 122 },
  { id: "j6", role: "AI Research Engineer", company: "Notion", logo: "N.", location: "Remote · NA only", band: "$230k — $300k", tags: ["RAG", "Python", "Evals"], match: 84, fresh: "yesterday", agents: 64 },
];
