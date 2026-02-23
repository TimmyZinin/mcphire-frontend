export interface Role {
  slug: string;
  nameRu: string;
  nameEn: string;
  searchQuery: string;
}

export interface Topic {
  slug: string;
  nameRu: string;
  category: string;
  titleTemplate: (role: string) => string;
  metaTemplate: (role: string) => string;
}

export interface ArticleMeta {
  slug: string;
  roleSlug: string;
  topicSlug: string;
  category: string;
  title: string;
  metaDescription: string;
  keyStat: string;
  readingTime: number;
  updatedDate: string;
}

export interface SalaryData {
  grade: string;
  moscow: number | null;
  spb: number | null;
  russia: number | null;
  remote: number | null;
}

export interface ArticleContent {
  meta: ArticleMeta;
  quickAnswer: string;
  sections: { heading: string; content: string }[];
  salaryTable?: SalaryData[];
  topSkills?: string[];
  topEmployers?: string[];
  mistakes: string[];
  actionPlan: string[];
  faq: { question: string; answer: string }[];
  relatedSlugs: string[];
  expertQuote: { text: string; author: string; role: string };
}

export const ROLES: Role[] = [
  { slug: "python-developer", nameRu: "Python-разработчик", nameEn: "Python Developer", searchQuery: "Python разработчик" },
  { slug: "frontend-developer", nameRu: "Frontend-разработчик", nameEn: "Frontend Developer", searchQuery: "Frontend разработчик" },
  { slug: "backend-developer", nameRu: "Backend-разработчик", nameEn: "Backend Developer", searchQuery: "Backend разработчик" },
  { slug: "devops-engineer", nameRu: "DevOps-инженер", nameEn: "DevOps Engineer", searchQuery: "DevOps инженер" },
  { slug: "qa-engineer", nameRu: "QA-инженер", nameEn: "QA Engineer", searchQuery: "QA инженер тестировщик" },
  { slug: "product-manager", nameRu: "Продакт-менеджер", nameEn: "Product Manager", searchQuery: "Product Manager продакт" },
  { slug: "data-scientist", nameRu: "Data Scientist", nameEn: "Data Scientist", searchQuery: "Data Scientist аналитик данных" },
  { slug: "java-developer", nameRu: "Java-разработчик", nameEn: "Java Developer", searchQuery: "Java разработчик" },
  { slug: "mobile-developer", nameRu: "Mobile-разработчик", nameEn: "Mobile Developer", searchQuery: "Mobile разработчик iOS Android" },
  { slug: "ux-ui-designer", nameRu: "UX/UI-дизайнер", nameEn: "UX/UI Designer", searchQuery: "UX UI дизайнер" },
];

export const TOPICS: Topic[] = [
  {
    slug: "salary",
    nameRu: "Зарплаты",
    category: "salaries",
    titleTemplate: (r) => `Зарплата ${r} в 2026: Junior, Middle, Senior, Lead`,
    metaTemplate: (r) => `Актуальные зарплаты ${r} в России в 2026 году. Медиана по грейдам, сравнение Москва vs СПб vs удалёнка. Данные hh.ru.`,
  },
  {
    slug: "resume",
    nameRu: "Резюме",
    category: "resume",
    titleTemplate: (r) => `Как написать резюме ${r}: гид с примерами 2026`,
    metaTemplate: (r) => `Пошаговое руководство по написанию резюме ${r}. Структура, ключевые слова для ATS, типичные ошибки. Шаблон + чек-лист.`,
  },
  {
    slug: "interview",
    nameRu: "Собеседование",
    category: "interview",
    titleTemplate: (r) => `Собеседование ${r}: 30 вопросов + как отвечать`,
    metaTemplate: (r) => `Типичные вопросы на собеседовании ${r}. Технические и поведенческие вопросы, STAR-метод, чек-лист подготовки.`,
  },
  {
    slug: "career-path",
    nameRu: "Карьерный путь",
    category: "career",
    titleTemplate: (r) => `Карьерный путь ${r}: от Junior до Lead`,
    metaTemplate: (r) => `Как вырасти от Junior до Lead ${r}. Навыки по грейдам, сроки, зарплатные ожидания, что нужно для промо.`,
  },
  {
    slug: "skills",
    nameRu: "Навыки",
    category: "skills",
    titleTemplate: (r) => `Навыки ${r} в 2026: что учить и что устарело`,
    metaTemplate: (r) => `Востребованные навыки ${r} в 2026 году. Топ технологий из вакансий hh.ru, что учить, что уже не нужно.`,
  },
  {
    slug: "job-search",
    nameRu: "Поиск работы",
    category: "job-search",
    titleTemplate: (r) => `Системный поиск работы ${r}: план на 30-60 дней`,
    metaTemplate: (r) => `Как ${r} найти работу за 30-60 дней. Пошаговая система: резюме, отклики, собеседования, оффер. Данные рынка 2026.`,
  },
  {
    slug: "companies",
    nameRu: "Где работать",
    category: "job-search",
    titleTemplate: (r) => `Лучшие компании для ${r} в России 2026`,
    metaTemplate: (r) => `Топ работодателей для ${r} в 2026 году. Зарплаты, условия, стек, отзывы. Яндекс, VK, Сбер, Тинькофф и другие.`,
  },
  {
    slug: "remote",
    nameRu: "Удалёнка",
    category: "salaries",
    titleTemplate: (r) => `Удалёнка для ${r}: зарплаты, вакансии, подводные камни`,
    metaTemplate: (r) => `Удалённая работа ${r} в 2026. Сравнение зарплат офис vs удалёнка, кол-во вакансий, как найти и удержать.`,
  },
  {
    slug: "negotiation",
    nameRu: "Переговоры",
    category: "career",
    titleTemplate: (r) => `Переговоры о зарплате ${r}: как получить +20-40%`,
    metaTemplate: (r) => `Как ${r} торговаться о зарплате. Скрипты, тактики, данные рынка для аргументации. Реальные примеры.`,
  },
  {
    slug: "burnout",
    nameRu: "Выгорание",
    category: "career",
    titleTemplate: (r) => `Выгорание ${r}: признаки, причины и что делать`,
    metaTemplate: (r) => `Профессиональное выгорание ${r}. Как распознать, 7 шагов восстановления, когда менять работу. Советы от менторов.`,
  },
];

export const CATEGORIES = [
  { slug: "salaries", nameRu: "Зарплаты и рынок", color: "#4ECDC4" },
  { slug: "resume", nameRu: "Резюме", color: "#45B7D1" },
  { slug: "interview", nameRu: "Собеседования", color: "#FFEAA7" },
  { slug: "career", nameRu: "Карьера и рост", color: "#DDA0DD" },
  { slug: "skills", nameRu: "Навыки", color: "#96CEB4" },
  { slug: "job-search", nameRu: "Поиск работы", color: "#FF6B6B" },
  { slug: "job-search-active", nameRu: "Активный поиск работы", color: "#E17055" },
  { slug: "market-crisis", nameRu: "Рынок труда и кризис", color: "#636E72" },
  { slug: "career-guidance", nameRu: "Карьерное ориентирование", color: "#6C5CE7" },
  { slug: "hr-consultation", nameRu: "HR-консультация", color: "#00B894" },
  { slug: "work-support", nameRu: "Поддержка при работе", color: "#FDCB6E" },
  { slug: "career-change", nameRu: "Смена профессии", color: "#E84393" },
  { slug: "layoff", nameRu: "Увольнение и сокращение", color: "#D63031" },
];

export const EXPERT_QUOTES = {
  tim: [
    { text: "Рынок IT в 2026 году — это не про количество вакансий, а про качество подготовки. Те, кто подходит системно, получают офферы на 20-40% выше рынка.", author: "Тим Зинин", role: "Co-founder СБОРКИ, AI & Product" },
    { text: "Резюме — это продающий документ, не автобиография. Метрики, результаты, конкретика. Рекрутер тратит 7 секунд — каждое слово должно работать.", author: "Тим Зинин", role: "Co-founder СБОРКИ, AI & Product" },
    { text: "AI не заменяет разработчиков — он меняет требования. Кто умеет работать с AI-инструментами, получает +30% к рыночной стоимости.", author: "Тим Зинин", role: "Co-founder СБОРКИ, AI & Product" },
    { text: "Выгорание — это не слабость, а сигнал. В СБОРКЕ мы видим: 70% случаев выгорания решаются сменой окружения, а не профессии.", author: "Тим Зинин", role: "Co-founder СБОРКИ, AI & Product" },
    { text: "Удалёнка — это не скидка к зарплате. Senior-специалисты на удалёнке часто получают больше, чем офисные, потому что работают на московские компании из регионов.", author: "Тим Зинин", role: "Co-founder СБОРКИ, AI & Product" },
  ],
  kristina: [
    { text: "За 8 лет в рекрутинге я видела тысячи резюме. Главная ошибка — писать про обязанности вместо результатов. Компаниям нужны достижения, а не описание должности.", author: "Кристина Жукова", role: "Co-founder СБОРКИ, 8 лет в рекрутинге" },
    { text: "Собеседование — это переговоры, а не экзамен. Лучшие кандидаты задают вопросы, а не просто отвечают. Это показывает зрелость и интерес.", author: "Кристина Жукова", role: "Co-founder СБОРКИ, 8 лет в рекрутинге" },
    { text: "80% вакансий закрываются через нетворкинг, а не через отклики на hh.ru. Системный поиск — это не только сайты, но и связи, рекомендации, прямые выходы на нанимающих менеджеров.", author: "Кристина Жукова", role: "Co-founder СБОРКИ, 8 лет в рекрутинге" },
    { text: "Торговаться о зарплате — нормально. Рекрутеры ОЖИДАЮТ этого. Кандидат, который не торгуется, вызывает больше вопросов, чем тот, кто просит на 20% больше.", author: "Кристина Жукова", role: "Co-founder СБОРКИ, 8 лет в рекрутинге" },
    { text: "Карьерный рост — это не только про hard skills. После Senior уровня 80% промо зависят от коммуникации, менторства и умения влиять на бизнес-решения.", author: "Кристина Жукова", role: "Co-founder СБОРКИ, 8 лет в рекрутинге" },
  ],
};

export function generateArticleSlug(roleSlug: string, topicSlug: string): string {
  return `${roleSlug}-${topicSlug}`;
}

export function getArticleUrl(category: string, slug: string): string {
  return `/knowledge/${category}/${slug}`;
}

export function generateAllArticleMetas(): ArticleMeta[] {
  const articles: ArticleMeta[] = [];
  const now = "февраль 2026";

  for (const role of ROLES) {
    for (const topic of TOPICS) {
      const slug = generateArticleSlug(role.slug, topic.slug);
      articles.push({
        slug,
        roleSlug: role.slug,
        topicSlug: topic.slug,
        category: topic.category,
        title: topic.titleTemplate(role.nameRu),
        metaDescription: topic.metaTemplate(role.nameRu),
        keyStat: "",
        readingTime: 8,
        updatedDate: now,
      });
    }
  }

  return articles;
}
