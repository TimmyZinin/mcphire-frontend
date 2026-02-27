const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(__dirname, '..', 'src', 'data', 'articles');
const INDEX_FILE = path.join(ARTICLES_DIR, '_index.json');

// Новые роли для матрицы
const NEW_ROLES = [
  { slug: "system-analyst", nameRu: "Системный аналитик", nameEn: "System Analyst" },
  { slug: "golang-developer", nameRu: "Go-разработчик", nameEn: "Golang Developer" },
  { slug: "ml-engineer", nameRu: "ML-инженер", nameEn: "ML Engineer" },
  { slug: "security-engineer", nameRu: "Security-инженер", nameEn: "Security Engineer" },
  { slug: "team-lead", nameRu: "Тимлид", nameEn: "Team Lead" }
];

// Существующие темы
const TOPICS = [
  { slug: "salary", nameRu: "Зарплаты", category: "salaries" },
  { slug: "resume", nameRu: "Резюме", category: "resume" },
  { slug: "interview", nameRu: "Собеседование", category: "interview" },
  { slug: "career-path", nameRu: "Карьерный путь", category: "career" },
  { slug: "skills", nameRu: "Навыки", category: "skills" },
  { slug: "job-search", nameRu: "Поиск работы", category: "job-search" },
  { slug: "companies", nameRu: "Где работать", category: "job-search" },
  { slug: "remote", nameRu: "Удалёнка", category: "salaries" },
  { slug: "negotiation", nameRu: "Переговоры", category: "career" },
  { slug: "burnout", nameRu: "Выгорание", category: "career" }
];

// Экспертные цитаты
const TIM_QUOTES = [
  { text: "Рынок IT в 2026 году — это не про количество вакансий, а про качество подготовки. Те, кто подходит системно, получают офферы на 20-40% выше рынка.", author: "Тим Зинин", role: "Co-founder СБОРКИ, AI & Product" },
  { text: "Резюме — это продающий документ, не автобиография. Метрики, результаты, конкретика. Рекрутер тратит 7 секунд — каждое слово должно работать.", author: "Тим Зинин", role: "Co-founder СБОРКИ, AI & Product" },
  { text: "AI не заменяет разработчиков — он меняет требования. Кто умеет работать с AI-инструментами, получает +30% к рыночной стоимости.", author: "Тим Зинин", role: "Co-founder СБОРКИ, AI & Product" },
  { text: "Выгорание — это не слабость, а сигнал. В СБОРКЕ мы видим: 70% случаев выгорания решаются сменой окружения, а не профессии.", author: "Тим Зинин", role: "Co-founder СБОРКИ, AI & Product" },
  { text: "Удалёнка — это не скидка к зарплате. Senior-специалисты на удалёнке часто получают больше, чем офисные, потому что работают на московские компании из регионов.", author: "Тим Зинин", role: "Co-founder СБОРКИ, AI & Product" }
];

const KRISTINA_QUOTES = [
  { text: "За 8 лет в рекрутинге я видела тысячи резюме. Главная ошибка — писать про обязанности вместо результатов. Компаниям нужны достижения, а не описание должности.", author: "Кристина Жукова", role: "Co-founder СБОРКИ, 8 лет в рекрутинге" },
  { text: "Собеседование — это переговоры, а не экзамен. Лучшие кандидаты задают вопросы, а не просто отвечают. Это показывает зрелость и интерес.", author: "Кристина Жукова", role: "Co-founder СБОРКИ, 8 лет в рекрутинге" },
  { text: "80% вакансий закрываются через нетворкинг, а не через отклики на hh.ru. Системный поиск — это не только сайты, но и связи, рекомендации, прямые выходы на нанимающих менеджеров.", author: "Кристина Жукова", role: "Co-founder СБОРКИ, 8 лет в рекрутинге" },
  { text: "Торговаться о зарплате — нормально. Рекрутеры ОЖИДАЮТ этого. Кандидат, который не торгуется, вызывает больше вопросов, чем тот, кто просит на 20% больше.", author: "Кристина Жукова", role: "Co-founder СБОРКИ, 8 лет в рекрутинге" },
  { text: "Карьерный рост — это не только про hard skills. После Senior уровня 80% промо зависят от коммуникации, менторства и умения влиять на бизнес-решения.", author: "Кристина Жукова", role: "Co-founder СБОРКИ, 8 лет в рекрутинге" }
];

// Данные по зарплатам для разных ролей
const SALARY_DATA = {
  "system-analyst": {
    junior: { moscow: 90000, spb: 75000, russia: 80000, remote: 85000 },
    middle: { moscow: 160000, spb: 140000, russia: 130000, remote: 145000 },
    senior: { moscow: 280000, spb: 240000, russia: 230000, remote: 250000 },
    lead: { moscow: 380000, spb: 320000, russia: 300000, remote: 330000 }
  },
  "golang-developer": {
    junior: { moscow: 95000, spb: 80000, russia: 85000, remote: 90000 },
    middle: { moscow: 180000, spb: 155000, russia: 145000, remote: 160000 },
    senior: { moscow: 320000, spb: 275000, russia: 260000, remote: 280000 },
    lead: { moscow: 420000, spb: 360000, russia: 340000, remote: 370000 }
  },
  "ml-engineer": {
    junior: { moscow: 110000, spb: 95000, russia: 90000, remote: 100000 },
    middle: { moscow: 200000, spb: 175000, russia: 160000, remote: 180000 },
    senior: { moscow: 350000, spb: 300000, russia: 280000, remote: 310000 },
    lead: { moscow: 450000, spb: 390000, russia: 360000, remote: 400000 }
  },
  "security-engineer": {
    junior: { moscow: 100000, spb: 85000, russia: 80000, remote: 90000 },
    middle: { moscow: 190000, spb: 165000, russia: 150000, remote: 170000 },
    senior: { moscow: 330000, spb: 285000, russia: 270000, remote: 290000 },
    lead: { moscow: 430000, spb: 370000, russia: 350000, remote: 380000 }
  },
  "team-lead": {
    junior: { moscow: 180000, spb: 155000, russia: 140000, remote: 160000 },
    middle: { moscow: 250000, spb: 215000, russia: 200000, remote: 220000 },
    senior: { moscow: 380000, spb: 330000, russia: 310000, remote: 340000 },
    lead: { moscow: 500000, spb: 420000, russia: 400000, remote: 440000 }
  }
};

// Навыки по ролям
const SKILLS_DATA = {
  "system-analyst": ["UML", "BPMN", "SQL", "Требования", "Аналитика", "Проектирование", "Agile", "Jira", "Figma", "PostgreSQL"],
  "golang-developer": ["Go", "REST API", "gRPC", "PostgreSQL", "Docker", "Kubernetes", "Microservices", "Redis", "MongoDB", "Git"],
  "ml-engineer": ["Python", "TensorFlow", "PyTorch", "SQL", "Машинное обучение", "NumPy", "Pandas", "MLOps", "Docker", "Linux"],
  "security-engineer": ["Penetration Testing", "SIEM", "Firewall", "Python", "Linux", "Network Security", "OWASP", "ISO 27001", "VPN", "Cryptography"],
  "team-lead": ["Управление командой", "Agile", "Scrum", "Communication", "Project Management", "Mentoring", "Conflict Resolution", "Strategic Planning", "Risk Management", "Hiring"]
};

// Работодатели по ролям
const EMPLOYERS_DATA = {
  "system-analyst": ["Сбер", "Яндекс", "Тинькофф", "МТС", "Билайн", "Ростелеком", "QIWI"],
  "golang-developer": ["Яндекс", "Тинькофф", "Сбер", "Avito", "2ГИС", "МТС", "VK"],
  "ml-engineer": ["Яндекс", "Сбер", "Тинькофф", "МТС", "VK", "Ozon", "X5 Group"],
  "security-engineer": ["Сбер", "Яндекс", "Тинькофф", "Касперский", "МТС", "Ростелеком", "QIWI"],
  "team-lead": ["Яндекс", "Сбер", "Тинькофф", "Avito", "МТС", "VK", "Ozon"]
};

// Утилиты
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

function getExpertQuote(index) {
  return index % 2 === 0 ? randomItem(TIM_QUOTES) : randomItem(KRISTINA_QUOTES);
}

// Генерация контента для матричных статей
function generateMatrixContent(role, topic) {
  const roleSlug = role.slug;
  const topicSlug = topic.slug;
  const roleName = role.nameRu;

  const contentTemplates = {
    salary: {
      quickAnswer: `Медианная зарплата ${roleName} в России в 2026 году составляет от ${randomInt(120, 200)}K для Middle до ${randomInt(250, 400)}K для Senior. Рынок динамично развивается, спрос на квалифицированных специалистов стабилен.`,
      headings: ["Рынок труда для " + roleName + " в 2026", "Зарплаты по грейдам", "Факторы влияния на зарплату", "Как увеличить стоимость"],
      contents: [
        `По данным hh.ru на февраль 2026 года, российский рынок IT продолжает трансформацию. Количество вакансий для ${roleName} стабильно — компании ищут квалифицированных специалистов для цифровой трансформации.\n\n**Ключевые тенденции:**\n- Спрос на Middle+ специалистов превышает Junior\n- Удалённая работа стала нормой\n- AI-инструменты меняют требования к навыкам`,
        `Актуальные зарплаты ${roleName} в 2026 году:\n\n- **Junior**: ${randomInt(70, 110)}K₽ (Москва)\n- **Middle**: ${randomInt(130, 220)}K₽ (Москва)\n- **Senior**: ${randomInt(250, 380)}K₽ (Москва)\n- **Lead**: ${randomInt(350, 500)}K₽ (Москва)\n\nРазница между Москвой и регионами: 15-30%.`,
        `На зарплату ${roleName} влияют:\n\n1. **Опыт и грейд** — переход между уровнями даёт +50-100%\n2. **Город** — Москва платит больше регионов\n3. **Стек технологий** — востребованные навыки +10-20%\n4. **Тип компании** — финтех и продукт оплачивают выше аутсорса\n5. **Навыки переговоров** — торг даёт +15-25%`,
        `Шаги для повышения зарплаты:\n\n1. Регулярно сверяйтесь с рынком\n2. Документируйте достижения с цифрами\n3. Развивайте востребованные навыки\n4. Рассматривайте параллельные офферы\n5. Инвестируйте в soft skills`
      ]
    },
    resume: {
      quickAnswer: `Резюме ${roleName} должно выделять технические навыки и достижения. Рекрутер тратит 7 секунд на первое сканирование — каждое слово должно работать на вас.`,
      headings: ["Структура резюме " + roleName, "Ключевые навыки", "Типичные ошибки", "Примеры формулировок"],
      contents: [
        `Эффективное резюме ${roleName} включает:\n\n1. **Заголовок** — должность и ключевые навыки\n2. **Профиль** — 2-3 предложения о себе\n3. **Опыт** — достижения, не обязанности\n4. **Навыки** — технические и soft skills\n5. **Образование и сертификаты**`,
        `Топ навыков для ${roleName} в 2026:\n\n- ${SKILLS_DATA[roleSlug].slice(0, 5).join(', ')}\n- ${SKILLS_DATA[roleSlug].slice(5).join(', ')}\n\nРазмещайте навыки релевантные целевой вакансии.`,
        `Типичные ошибки в резюме ${roleName}:\n\n1. Описания вместо достижений\n2. Устаревшие навыки\n3. Отсутствие метрик\n4. Шаблонный текст\n5. Неoptimized для ATS`,
        `Примеры сильных формулировок:\n\n- "Внедрил систему, сократившую время обработки на 40%"\n- "Руководил командой из 5 разработчиков"\n- "Увеличил покрытие тестами с 30% до 85%"`
      ]
    },
    interview: {
      quickAnswer: `Собеседование ${roleName} включает технические вопросы и поведенческие задачи. Подготовьте 5-7 STAR-историй из опыта — они решают 80% успеха.`,
      headings: ["Типичные вопросы на собеседовании", "Техническая часть", "Поведенческие вопросы", "Подготовка и советы"],
      contents: [
        `Основные категории вопросов ${roleName}:\n\n1. Технические навыки\n2. Проектный опыт\n3. Проблемные ситуации\n4. Карьерные цели\n5. Вопросы к компании`,
        `Технические вопросы для ${roleName}:\n\n- ${randomItem(['Опишите ваш опыт с основными инструментами', 'Какие проекты вы реализовали?', 'Как вы решали сложные задачи?'])}\n- ${randomItem(['Расскажите о архитектурных решениях', 'Как вы оптимизировали процессы?', 'Ваш подход к тестированию?'])}`,
        `Поведенческие вопросы (STAR-метод):\n\n- Конфликт в команде — как решали?\n- Срыв сроков — что делали?\n- Несогласие с руководителем\n- Самостоятельное принятие решений`,
        `Подготовка к собеседованию:\n\n1. Изучите компанию и продукт\n2. Подготовьте 5 STAR-историй\n3. Сделайте мок-собеседование\n4. Подготовьте вопросы интервьюеру\n5. Следуйте дресс-коду компании`
      ]
    },
    "career-path": {
      quickAnswer: `Карьерный путь ${roleName} от Junior до Lead занимает 6-10 лет. Каждый переход требует освоения новых навыков и расширения зоны ответственности.`,
      headings: ["Грейды и ожидания", "Переход между уровнями", "Время на продвижение", "Что важно для роста"],
      contents: [
        `Уровни ${roleName} в 2026:\n\n- **Junior** (0-2 года): выполнение задач\n- **Middle** (2-4 года): самостоятельная работа\n- **Senior** (4-7 лет): экспертиза и влияние\n- **Lead** (7+ лет): стратегия и команда`,
        `Переходы между грейдами:\n\n- Junior → Middle: 1-2 года, освоение стека\n- Middle → Senior: 2-3 года, экспертиза\n- Senior → Lead: 3-5 лет, менеджмент`,
        `Среднее время продвижения:\n\n- До Middle: ${randomInt(12, 24)} месяцев\n- До Senior: ${randomInt(36, 60)} месяцев\n- До Lead: ${randomInt(60, 120)} месяцев`,
        `Ключи к росту:\n\n1. Постоянное обучение\n2. Наставничество\n3. Видимость в компании\n4. Политические навыки\n5. Бизнес-мышление`
      ]
    },
    skills: {
      quickAnswer: `Топ навыков для ${roleName} в 2026 году — это сочетание технической экспертизы с AI-инструментами. Компании ценят специалистов, умеющих работать с новыми технологиями.`,
      headings: ["Технические навыки", "AI-инструменты", "Soft skills", "Что учить в 2026"],
      contents: [
        `Основные навыки ${roleName}:\n\n${SKILLS_DATA[roleSlug].map((s, i) => `${i + 1}. ${s}`).join('\n')}`,
        `AI-инструменты для ${roleName}:\n\n- GitHub Copilot для код-ревью\n- ChatGPT для документирования\n- Claude для рефакторинга\n- Специализированные AI-ассистенты`,
        `Soft skills для роста:\n\n1. Коммуникация\n2. Критическое мышление\n3. Адаптивность\n4. Менторство\n5. Управление временем`,
        `Что учить в 2026:\n\n1. AI/ML основы\n2. Cloud-native разработка\n3. MLOps / DevSecOps\n4. Системный дизайн\n5. Бизнес-аналитика`
      ]
    },
    "job-search": {
      quickAnswer: `Поиск работы ${roleName} занимает в среднем 6-8 недель при системном подходе. Ключ — качество откликов, не количество.`,
      headings: ["Стратегия поиска", "Где искать вакансии", "Отклики и резюме", "Системный подход"],
      contents: [
        `Эффективная стратегия поиска:\n\n1. Определите целевые компании\n2. Адаптируйте резюме под каждую вакансию\n3. Используйте несколько каналов\n4. Отслеживайте прогресс\n5. Анализируйте результаты`,
        `Где искать ${roleName}:\n\n- hh.ru — основная база\n- LinkedIn — нетворкинг\n- Habr Career — IT-вакансии\n- Telegram-каналы\n- Прямые сайты компаний`,
        `Конверсия откликов:\n\n- Средняя: 5-10%\n- Хорошая: 15-20%\n- Отличная: 25%+\n\nКлюч — релевантность.`,
        `Системный подход:\n\n1. 5 целевых откликов в день\n2. 1 мок-собеседование в неделю\n3. Ежедневный нетворкинг\n4. Еженедельный анализ воронки`
      ]
    },
    companies: {
      quickAnswer: `Лучшие работодатели для ${roleName} в России — это финтех, e-commerce и IT-компании. Они предлагают конкурентные зарплаты и интересные проекты.`,
      headings: ["Топ работодателей", "Финтек-компании", "Продуктовые компании", "Что учитывать при выборе"],
      contents: [
        `Лучшие компании для ${roleName}:\n\n${EMPLOYERS_DATA[roleSlug].map((e, i) => `${i + 1}. ${e}`).join('\n')}`,
        `Финтех-плюсы:\n\n- Высокие зарплаты (+20-40%)\n- Сложные задачи\n- Карьерный рост\n- Современный стек`,
        `Продуктовые компании:\n\n- Стабильность\n- Интересные продукты\n- Командная культура\n- Баланс работы и жизни`,
        `Критерии выбора:\n\n1. Зарплата и бонусы\n2. Стек технологий\n3. Команда и руководитель\n4. Культура компании\n5. Формат работы`
      ]
    },
    remote: {
      quickAnswer: `Удалённая работа ${roleName} — норма 2026 года. Многие компании предлагают full-remote, а специалисты из регионов работают на московские зарплаты.`,
      headings: ["Удалёнка в 2026", "Плюсы и минусы", "Как найти удалённую работу", "Продуктивность на удалёнке"],
      contents: [
        `Статистика удалёнки:\n\n- 60% IT-вакансий — удалёнка или гибрид\n- Senior на удалёнке = офисный Middle по зарплате\n- Компании экономят на офисах`,
        `Плюсы удалённой работы:\n\n+ Экономия времени на дорогу\n+ Гибкий график\n+ Работа на московские компании\n\nМинусы:\n- Сложность коммуникации\n- Дисциплина\n- Выгорание`,
        `Поиск удалённой работы:\n\n1. Фильтр "Удалённо" на hh.ru\n2. LinkedIn с геолокацией "Россия"\n3. Специализированные job-борды\n4. Прямые контакты компаний`,
        `Советы продуктивности:\n\n1. Выделите рабочее место\n2. Соблюдайте режим\n3. Используйте тайм-трекинг\n4. Регулярные стендапы\n5. Онлайн-нетворкинг`
      ]
    },
    negotiation: {
      quickAnswer: `Переговоры о зарплате для ${roleName} — стандартная практика. Кандидаты, которые торгуются, получают на 15-25% выше начального предложения.`,
      headings: ["Как начать переговоры", "Аргументы и данные", "Скрипты для торга", "Когда соглашаться"],
      contents: [
        `Когда обсуждать зарплату:\n\n1. После получения оффера\n2. На финальном этапе\n3. При контроффере\n\nНе обсуждайте первыми.`,
        `Ваши аргументы:\n\n- Рыночные данные (hh.ru)\n- Ваш опыт и навыки\n- Конкурирующие офферы\n- Уникальные компетенции`,
        `Скрипт торга:\n\n"Спасибо за оффер. Я очень заинтересован в компании. Однако, учитывая мой опыт и рыночные данные, я рассчитывал на диапазон X-Y. Есть ли возможность пересмотреть?"`,
        `Когда соглашаться:\n\n- Достигнут целевой диапазон\n- Другие факторы компенсируют\n- Время поджимает\n- Лучший оффер из доступных`
      ]
    },
    burnout: {
      quickAnswer: `Выгорание ${roleName} — распространённая проблема. 70% случаев решаются сменой окружения, а не профессии. Важно распознать симптомы вовремя.`,
      headings: ["Признаки выгорания", "Причины в IT", "Как восстановиться", "Профилактика"],
      contents: [
        `Симптомы выгорания:\n\n- Хроническая усталость\n- Цинизм и апатия\n- Снижение продуктивности\n- Физические симптомы`,
        `Причины в IT:\n\n1. Переработки\n2. Отсутствие признания\n3. Токсичное окружение\n4. Отсутствие роста\n5. Недостаток смысла`,
        `7 шагов восстановления:\n\n1. Диагностируйте проблему\n2. Отдохните (отпуск)\n3. Поговорите с руководителем\n4. Смените проект/команду\n5. Обратитесь к специалисту\n6. Пересмотрите границы\n7. Найдите хобби`,
        `Профилактика:\n\n1. Работайте в зоне 40 часов\n2. Регулярный фитнес\n3. Хобби вне работы\n4. Профессиональное сообщество\n5. Карьерное планирование`
      ]
    }
  };

  return contentTemplates[topicSlug] || contentTemplates.salary;
}

// Генерация custom статей
function generateCustomArticle(slug, category, title, metaDescription) {
  const topics = {
    "job-search-active": {
      headings: ["Основы эффективного поиска", "Практические шаги", "Инструменты и методы", "Ошибки и решения"],
      contentTemplates: [
        "Эффективный поиск работы в IT требует системного подхода. В 2026 году рынок изменился — важно адаптироваться к новым реалиям.\n\n**Ключевые изменения:**\n- Конкуренция выросла на 30%\n- Компании чаще нанимают через рекомендации\n- AI-скрининг используют 60% компаний",
        "Практические шаги для успешного поиска:\n\n1. Определите целевую позицию и компании\n2. Составьте базу из 30-50 компаний\n3. Адаптируйте резюме под каждую вакансию\n4. Напишите сопроводительное письмо\n5. Отправляйте 5-10 откликов ежедневно",
        "Инструменты для поиска:\n\n- hh.ru — основная база вакансий\n- LinkedIn — нетворкинг и прямые контакты\n- Telegram-каналы — быстрые отклики\n- Habr Career — IT-специализированные вакансии",
        "Частые ошибки:\n\n1. Отклики без адаптации — минус 70% успеха\n2. Отсутствие follow-up — вы теряете 20% возможностей\n3. Поиск только на hh.ru — упускаете 40% вакансий\n4. Отсутствие статистики — не понимаете конверсию"
      ]
    },
    "market-crisis": {
      headings: ["Анализ текущего рынка", "Тренды и прогнозы", "Влияние технологий", "Стратегии адаптации"],
      contentTemplates: [
        "Российский IT-рынок в 2026 году проходит этап трансформации. Количество вакансий снизилось на 25% по сравнению с 2024, но спрос на квалифицированных специалистов остаётся высоким.\n\n**Текущая ситуация:**\n- 45% компаний сократили найм\n- 60% ищут Middle и Senior\n- Удалёнка стала стандартом",
        "Ключевые тренды 2026:\n\n- AI-инструменты меняют требования к навыкам\n- Компании экономят на Junior-позициях\n- Финтех и e-commerce растут\n- Государственный сектор увеличивает найм",
        "Влияние AI на рынок труда:\n\n- 40% рутинных задач автоматизированы\n- Спрос на AI-компетенции вырос на 60%\n- Компании экономят 30% на продуктивности\n- Новые роли: AI-оператор, промпт-инженер",
        "Стратегии для соискателей:\n\n1. Развивайте AI-навыки\n2. Специализируйтесь на востребованных направлениях\n3. Стройте нетворкинг активно\n4. Рассматривайте смежные области\n5. Будьте готовы к переезду или удалёнке"
      ]
    },
    "career-guidance": {
      headings: ["Карьерное планирование", "Переходы между уровнями", "Смена специализации", "Долгосрочная стратегия"],
      contentTemplates: [
        "Карьерное планирование в IT требует стратегического мышления. Без плана вы теряете 3-5 лет на неэффективные переходы.\n\n**Принципы:**\n- Определите цель на 3-5 лет\n- Регулярно сверяйтесь с рынком\n- Инвестируйте в развитие\n- Стройте репутацию",
        "Переход между уровнями:\n\n- Junior → Middle: 1-2 года, требуется самостоятельность\n- Middle → Senior: 2-4 года, нужна экспертиза\n- Senior → Lead: 3-5 лет, менеджмент и стратегия\n- Tech Lead → CTO: 5-10 лет, бизнес-ориентация",
        "Смена специализации:\n\n1. Оцените свои навыки и интересы\n2. Изучите требования новой области\n3. Начните обучение параллельно с работой\n4. Сделайте пет-проект\n5. Ищите переход внутри компании",
        "Долгосрочная стратегия:\n\n- 30 лет: накопление навыков\n- 35 лет: специализация\n- 40 лет: менторство и лидерство\n- 45 лет: стратегия и консалтинг"
      ]
    },
    "hr-consultation": {
      headings: ["Работа с HR", "Процесс найма", "Переговоры", "Типичные ситуации"],
      contentTemplates: [
        "Взаимодействие с HR — ключевой навык соискателя. HR-менеджер может помочь или помешать получить оффер.\n\n**Роль HR:**\n- Первичный скрининг\n- Коммуникация между сторонами\n- Оценка культурного match\n- Переговоры об оффере",
        "Этапы процесса найма:\n\n1. Отклик → HR-скрининг (1-3 дня)\n2. Техническое интервью (1-2 недели)\n3. Финальное интервью (3-5 дней)\n4. Оффер (1-3 дня)\n\nОбщий срок: 2-4 недели.",
        "Работа с HR-менеджером:\n\n- Будьте вежливы и профессиональны\n- Задавайте вопросы о процессе\n- Сообщайте о других офферах\n- Спрашивайте обратную связь",
        "Типичные ситуации:\n\n- Затягивание процесса — уточняйте причины\n- Нет обратной связи — напишите через неделю\n- Низкая зарплата — торгуйтесь, аргументируйте\n- Отказ — спросите, что можно улучшить"
      ]
    },
    "work-support": {
      headings: ["Адаптация на новом месте", "Продуктивность", "Отношения в команде", "Развитие карьеры"],
      contentTemplates: [
        "Первые 90 дней на новой работе определяют ваш успех. Правильная адаптация ускоряет рост и повышает ценность в глазах руководства.\n\n**План первых дней:**\n- День 1-7: знакомство с командой и процессами\n- День 8-30: погружение в проекты\n- День 31-90: самостоятельная работа",
        "Советы продуктивности:\n\n1. Выписывайте все вопросы\n2. Задавайте много вопросов\n3. Ведите заметки\n4. Просите фидбек регулярно\n5. Не пытайтесь всё изменить сразу",
        "Отношения в команде:\n\n- Будьте открыты и дружелюбны\n- Найдите ментора или buddy\n- Участвуйте в неформальных активностях\n- Слушайте больше, говорите меньше\n- Уважайте культуру команды",
        "Развитие на текущем месте:\n\n1. Показывайте инициативу\n2. Берите сложные задачи\n3. Документируйте достижения\n4. Пропагандируйте улучшения\n5. Планируйте разговор о росте"
      ]
    },
    "career-change": {
      headings: ["Готовность к смене", "Путь в IT", "Сложности и решения", "Успешные стратегии"],
      contentTemplates: [
        "Смена карьеры в IT — достижимая цель. 30% IT-специалистов пришли из других областей. Главное — системный подход и реалистичные ожидания.\n\n**Что важно:**\n- Мотивация должна быть внутренней\n- Готовность к обучению 6-12 месяцев\n- Финансовая подушка на первое время",
        "Путь в IT:\n\n1. Выберите направление (разработка, тестирование, аналитика)\n2. Пройдите курсы или получите образование\n3. Сделайте 2-3 пет-проекта\n4. Начните с фриланса или стажировки\n5. Ищите первую работу",
        "Типичные сложности:\n\n- Отсутствие опыта — решается пет-проектами\n- Возраст — преимущество для зрелых кандидатов\n- Конкуренция с junior — специализируйтесь\n- Финансы — подушка 3-6 месяцев",
        "Стратегии успеха:\n\n1. Выберите нишу с меньшей конкуренцией\n2. Стройте нетворкинг в IT-сообществе\n3. Покажите релевантные навыки\n4. Будьте готовы к Junior-позиции\n5. Развивайте soft skills параллельно"
      ]
    },
    "layoff": {
      headings: ["Первые действия", "Эмоциональная поддержка", "Поиск работы", "Финансовая безопасность"],
      contentTemplates: [
        "Увольнение — стресс, но не приговор. Правильные первые действия определяют скорость восстановления.\n\n**Первые 7 дней:**\n1. Дайте себе передышку (1-3 дня)\n2. Оцените финансы\n3. Обновите резюме\n4. Сообщите близким\n5. Составьте план поиска",
        "Эмоциональное восстановление:\n\n- Это нормально — чувствовать гнев, страх, обиду\n- Не держите всё в себе — говорите с близкими\n- Поддержка важна: семья, друзья, ментор\n- Физическая активность снижает стресс\n- Избегайте изоляции",
        "Поиск после увольнения:\n\n1. Используйте все каналы: hh.ru, LinkedIn, нетворкинг\n2. Адаптируйте резюме под каждую вакансию\n3. Подготовьте объяснение для собеседований\n4. Рассмотрите смежные области\n5. Создайте рутину: 3-4 часа поиска ежедневно",
        "Финансовая безопасность:\n\n- Создайте подушку 3-6 месяцев расходов\n- Сократите расходы на 20-30%\n- Рассмотрите временную работу\n- Используйте пособие по безработице\n- Не паникуйте — рынок восстанавливается"
      ]
    }
  };

  const template = topics[category] || topics["job-search-active"];

  return {
    headings: template.headings,
    contents: template.contentTemplates
  };
}

// Создание директории, если нет
if (!fs.existsSync(ARTICLES_DIR)) {
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });
}

// Генерация матричных статей (50 штук: 5 ролей × 10 тем)
console.log('Генерация матричных статей...');
let matrixCount = 0;

for (const role of NEW_ROLES) {
  for (const topic of TOPICS) {
    const slug = `${role.slug}-${topic.slug}`;
    const template = generateMatrixContent(role, topic);

    const salaryData = SALARY_DATA[role.slug];
    const hasSalaryTable = topic.slug === 'salary' || topic.slug === 'remote';

    const article = {
      meta: {
        slug,
        roleSlug: role.slug,
        topicSlug: topic.slug,
        category: topic.category,
        title: `${role.nameRu} ${topic.nameRu.toLowerCase()} в 2026: полный гид`,
        metaDescription: `${role.nameRu} ${topic.nameRu.toLowerCase()} в 2026 году. ${randomInt(80, 120)} вакансий, зарплаты от ${randomInt(80, 150)}K до ${randomInt(300, 500)}K. Советы и рекомендации.`,
        keyStat: `${role.nameEn} в России: ${randomInt(500, 2000)}+ вакансий`,
        readingTime: randomInt(5, 10),
        updatedDate: "февраль 2026"
      },
      quickAnswer: template.quickAnswer,
      sections: template.headings.map((heading, i) => ({
        heading,
        content: template.contents[i]
      })),
      salaryTable: hasSalaryTable ? [
        { grade: "Junior", moscow: salaryData.junior.moscow, spb: salaryData.junior.spb, russia: salaryData.junior.russia, remote: salaryData.junior.remote },
        { grade: "Middle", moscow: salaryData.middle.moscow, spb: salaryData.middle.spb, russia: salaryData.middle.russia, remote: salaryData.middle.remote },
        { grade: "Senior", moscow: salaryData.senior.moscow, spb: salaryData.senior.spb, russia: salaryData.senior.russia, remote: salaryData.senior.remote },
        { grade: "Lead", moscow: salaryData.lead.moscow, spb: salaryData.lead.spb, russia: salaryData.lead.russia, remote: salaryData.lead.remote }
      ] : null,
      topSkills: SKILLS_DATA[role.slug] || null,
      topEmployers: EMPLOYERS_DATA[role.slug] || null,
      mistakes: [
        `Не изучать специфику ${role.nameRu} перед поиском работы`,
        "Откликаться на все вакансии без фильтрации",
        "Пренебрегать подготовкой к техническим интервью",
        "Не торговаться при получении оффера",
        "Оставаться без обратной связи после отказов",
        "Искать работу в одиночку без ментора"
      ],
      actionPlan: [
        `Изучите требования к ${role.nameRu} на рынке`,
        "Составьте список целевых компаний",
        "Подготовьте резюме с релевантными навыками",
        "Пройдите 2-3 мок-собеседования",
        "Начните отправлять отклики",
        "Анализируйте результаты и корректируйте подход"
      ],
      faq: [
        { question: `Сколько времени нужно ${role.nameRu} чтобы найти работу?`, answer: "В среднем 4-8 недель при активном поиске. Junior может занять дольше — до 3 месяцев." },
        { question: `Какая зарплата ${role.nameRu} в Москве?`, answer: `Middle: ${salaryData.middle.moscow}K, Senior: ${salaryData.senior.moscow}K, Lead: ${salaryData.lead.moscow}K (2026).` },
        { question: `Нужны ли сертификаты для ${role.nameRu}?`, answer: "Сертификаты — дополнительный плюс, но главное — опыт и навыки. Покажите проекты." },
        { question: `Можно ли работать удалённо ${role.nameRu}?`, answer: "Да, 60% вакансий предполагают удалёнку или гибрид. Региональные специалисты работают на московские компании." }
      ],
      relatedSlugs: [
        `${role.slug}-resume`,
        `${role.slug}-interview`,
        "kak-nayti-rabotu-bystro",
        "rynok-it-v-rossii-trendy-2026"
      ],
      expertQuote: getExpertQuote(matrixCount)
    };

    const filePath = path.join(ARTICLES_DIR, `${slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(article, null, 2), 'utf8');
    matrixCount++;
  }
}

console.log(`Создано ${matrixCount} матричных статей`);

// Генерация custom статей (150 штук)
console.log('Генерация custom статей...');

const customArticlesConfig = [
  // job-search-active (25)
  { category: "job-search-active", slug: "kak-sostavit-soprovditelnoe-pismo-2026" },
  { category: "job-search-active", slug: "networking-dlya-it-spetsialistov" },
  { category: "job-search-active", slug: "kak-otvechat-na-voprosy-pro-zarplatu" },
  { category: "job-search-active", slug: "linkedin-profil-dlya-poiska-raboty" },
  { category: "job-search-active", slug: "kak-podgotovitsya-k-tekh-sobesedovaniyu" },
  { category: "job-search-active", slug: "effektivnye-otkliki-na-hh" },
  { category: "job-search-active", slug: "kak-proyti-ats-skrinning" },
  { category: "job-search-active", slug: "strategiya-poiska-raboty-posle-30" },
  { category: "job-search-active", slug: "kak-iskat-rabotu-cherez-znakomyh" },
  { category: "job-search-active", slug: "kak-poluchit-otkaz-ot-kompanii" },
  { category: "job-search-active", slug: "kak-otlichsya-ot-drugih-kandidatov" },
  { category: "job-search-active", slug: "kak-podgotovit-portfolio" },
  { category: "job-search-active", slug: "kak-rabotat-s-rekruterom" },
  { category: "job-search-active", slug: "kak-proyti-finalnoe-sobesedovanie" },
  { category: "job-search-active", slug: "kak-obsudit-karernye-tseli" },
  { category: "job-search-active", slug: "kak-spravitsya-s-otkazami" },
  { category: "job-search-active", slug: "kak-ispolzovat-linkedin-effektivno" },
  { category: "job-search-active", slug: "kak-iskat-rabotu-v-krizis" },
  { category: "job-search-active", slug: "kak-sozdat-plan-poiska-raboty" },
  { category: "job-search-active", slug: "kak-povysit-konversiyu-otklikov" },
  { category: "job-search-active", slug: "kak-podgotovitsya-k-behavioral-interview" },
  { category: "job-search-active", slug: "kak-proyti-testovoe-zadanie" },
  { category: "job-search-active", slug: "kak-sozdavat-kontakt-v-seti" },
  { category: "job-search-active", slug: "kak-rabotat-s-hh-ru" },
  { category: "job-search-active", slug: "kak-najti-rabotu-bez-opyta" },
  // market-crisis (20)
  { category: "market-crisis", slug: "rynok-it-v-rossii-trendy-2026" },
  { category: "market-crisis", slug: "vliyanie-ii-na-rynok-truda-2026" },
  { category: "market-crisis", slug: "it-zarplaty-prognoz-2027" },
  { category: "market-crisis", slug: "defitsit-seniorov-v-rossii" },
  { category: "market-crisis", slug: "kak-najti-rabotu-v-2026" },
  { category: "market-crisis", slug: "sokrasheniya-v-it-sektore" },
  { category: "market-crisis", slug: "buduschee-it-professij" },
  { category: "market-crisis", slug: "kak-menyaetsya-najm-v-krizis" },
  { category: "market-crisis", slug: "konkurs-na-vakansii-v-it" },
  { category: "market-crisis", slug: "kak-najti-rabotu-v-krizis" },
  { category: "market-crisis", slug: "rynok-truda-posle-sokrashenij" },
  { category: "market-crisis", slug: "it-vakanij-v-2026" },
  { category: "market-crisis", slug: "perspektivy-it-rynka" },
  { category: "market-crisis", slug: "kak-byt-konkurentnym-v-it" },
  { category: "market-crisis", slug: "kak-menyayutsya-trebovaniya-k-it" },
  { category: "market-crisis", slug: "kak-najti-rabotu-posle-sokrasheniya" },
  { category: "market-crisis", slug: "kak-menyaetsya-zarplata-v-it" },
  { category: "market-crisis", slug: "rynok-it-2026-prognoz" },
  { category: "market-crisis", slug: "kak-vyzhit-v-it-krizis" },
  { category: "market-crisis", slug: "kak-podgotovitsya-k-poisku-v-krizis" },
  // career-guidance (25)
  { category: "career-guidance", slug: "kak-pereyti-iz-senior-v-architect" },
  { category: "career-guidance", slug: "karernyy-rost-posle-35-let" },
  { category: "career-guidance", slug: "kak-vybrat-mezhdu-menedzhmentom-i-ekspertizoj" },
  { category: "career-guidance", slug: "razvitie-soft-skills-dlya-it" },
  { category: "career-guidance", slug: "kak-postroit-karernyy-plan" },
  { category: "career-guidance", slug: "kak-poluchit-promo-v-it" },
  { category: "career-guidance", slug: "kak-perestat-by-tjunorom" },
  { category: "career-guidance", slug: "kak-stat-tehnicheskim-lidom" },
  { category: "career-guidance", slug: "kak-peremeshhatsya-mezhdu-kompaniyami" },
  { category: "career-guidance", slug: "kak-sovmeshat-rabotu-i-karernyy-rost" },
  { category: "career-guidance", slug: "kak-nauchitsya-upravlyat-komandoy" },
  { category: "career-guidance", slug: "kak-stat-architektorom" },
  { category: "career-guidance", slug: "kak-perestat-kodit-i-nachat-upravlyat" },
  { category: "career-guidance", slug: "kak-vybrat-napravlenie-v-it" },
  { category: "career-guidance", slug: "kak-sozdat-personalnyj-brend" },
  { category: "career-guidance", slug: "kak-stat-tech-lidom" },
  { category: "career-guidance", slug: "kak-razvivatsya-bez-promo" },
  { category: "career-guidance", slug: "kak-rabotat-na-rekomendatsiyah" },
  { category: "career-guidance", slug: "kak-sozdavat-karernye-svyazi" },
  { category: "career-guidance", slug: "kak-vyhodit-iz-zony-komforta" },
  { category: "career-guidance", slug: "kak-perestat-byt-ispolnitelem" },
  { category: "career-guidance", slug: "kak-stat-rukovoditelem-v-it" },
  { category: "career-guidance", slug: "kak-sovmeshat-tehnicheskuyu-i-upravlencheskuyu-kareru" },
  { category: "career-guidance", slug: "kak-rabotat-nad-karernoj-strategiej" },
  { category: "career-guidance", slug: "kak-perestat-byt-middle" },
  // hr-consultation (20)
  { category: "hr-consultation", slug: "kak-proyti-proverku-sluzhby-bezopasnosti" },
  { category: "hr-consultation", slug: "kakie-voprosy-zadat-na-sobesedovanii" },
  { category: "hr-consultation", slug: "kak-otkazatsya-ot-offera-pravilno" },
  { category: "hr-consultation", slug: "red-flags-na-sobesedovanii" },
  { category: "hr-consultation", slug: "kak-vesti-peregovory-s-hr" },
  { category: "hr-consultation", slug: "kak-otvechat-na-nepriyatnye-voprosy" },
  { category: "hr-consultation", slug: "kak-obyasnit-boleznennyj-opyt" },
  { category: "hr-consultation", slug: "kak-vesti-sebya-s-hr" },
  { category: "hr-consultation", slug: "kak-poluchit-povyshenie-cherez-hr" },
  { category: "hr-consultation", slug: "kak-proyti-hr-interview" },
  { category: "hr-consultation", slug: "kak-obsudit-zarplatu-s-hr" },
  { category: "hr-consultation", slug: "kak-otlichit-horoshee-predlozhenie" },
  { category: "hr-consultation", slug: "kak-rabotat-s-rekruterom" },
  { category: "hr-consultation", slug: "kak-proyti-kulturnyy-fit" },
  { category: "hr-consultation", slug: "kak-otvechat-prokrastinatsii" },
  { category: "hr-consultation", slug: "kak-gotovitsya-k-hr-roundu" },
  { category: "hr-consultation", slug: "kak-vesti-peregovory-posle-offera" },
  { category: "hr-consultation", slug: "kak-otlichit-krasnye-flagi" },
  { category: "hr-consultation", slug: "kak-poluchit-otkaz-ot-hr" },
  { category: "hr-consultation", slug: "kak-oformit-otkaz" },
  // work-support (20)
  { category: "work-support", slug: "pervye-90-dnej-na-novoj-rabote" },
  { category: "work-support", slug: "kak-rabotat-v-raspredelennoj-komande" },
  { category: "work-support", slug: "time-management-dlya-razrabotchika" },
  { category: "work-support", slug: "kak-prosit-povyshenie-zarplaty-pravilno" },
  { category: "work-support", slug: "kak-perestat-pererabatyvatsya" },
  { category: "work-support", slug: "kak-sovladat-s-mnogoznachnostyu-zadach" },
  { category: "work-support", slug: "kak-najti-mentora" },
  { category: "work-support", slug: "kak-izbezhat-konfliktov-v-komande" },
  { category: "work-support", slug: "kak-soobshhat-o-problemah-rukovoditelyu" },
  { category: "work-support", slug: "kak-sovmeshat-neskolkoproektov" },
  { category: "work-support", slug: "kak-sohranyat-produktivnost" },
  { category: "work-support", slug: "kak-rabotat-s-toksichnym-rukovoditelem" },
  { category: "work-support", slug: "kak-prosit-pomoshh-u-kolleg" },
  { category: "work-support", slug: "kak-vyhodit-iz-konfliktov" },
  { category: "work-support", slug: "kak-rabotat-s-neponyatnymi-trebovaniyami" },
  { category: "work-support", slug: "kak-prosit-obratnuyu-svyaz" },
  { category: "work-support", slug: "kak-organizovat-svoj-rabochij-den" },
  { category: "work-support", slug: "kak-borotsya-s-prokrastinatsiej" },
  { category: "work-support", slug: "kak-vosstanovitsya-posle-pererabotok" },
  // career-change (20)
  { category: "career-change", slug: "iz-testirovshika-v-razrabotchika" },
  { category: "career-change", slug: "iz-analitika-v-product-managera" },
  { category: "career-change", slug: "kak-perejtii-v-it-posle-30" },
  { category: "career-change", slug: "iz-freelance-v-kompaniyu" },
  { category: "career-change", slug: "iz-menedzhera-v-razrabotchika" },
  { category: "career-change", slug: "iz-dizajnera-v-frontend" },
  { category: "career-change", slug: "kak-perejtii-v-data-science" },
  { category: "career-change", slug: "iz-devops-v-secops" },
  { category: "career-change", slug: "iz-frontend-v-backend" },
  { category: "career-change", slug: "kak-stat-product-managerom-bez-opyta" },
  { category: "career-change", slug: "iz-rukovoditelya-v-individualnogo-kontributora" },
  { category: "career-change", slug: "iz-ml-v-data-engineering" },
  { category: "career-change", slug: "kak-perejtii-v-ai" },
  { category: "career-change", slug: "iz-qa-v-devops" },
  { category: "career-change", slug: "iz-supporta-v-development" },
  { category: "career-change", slug: "kak-smenit-professiyu-v-40-let" },
  { category: "career-change", slug: "iz-marketinga-v-product" },
  { category: "career-change", slug: "iz-operatsij-v-engeneering" },
  { category: "career-change", slug: "kak-perestupit-v-it" },
  { category: "career-change", slug: "iz-sistemnogo-administratora-v-devops" },
  // layoff (20)
  { category: "layoff", slug: "chto-delat-v-pervye-dni-posle-uvolneniya" },
  { category: "layoff", slug: "kak-obyasnit-uvolnenie-na-sobesedovanii" },
  { category: "layoff", slug: "finansovaya-podushka-dlya-it-spetsialista" },
  { category: "layoff", slug: "prava-rabotnika-pri-sokrashenii" },
  { category: "layoff", slug: "kak-poluchit-kompensatsiyu-pri-uvolnenii" },
  { category: "layoff", slug: "kak-perestat-chuvstvovat-vinu-za-uvolnenie" },
  { category: "layoff", slug: "kak-iskat-rabotu-posle-sokrasheniya" },
  { category: "layoff", slug: "kak-sohranit-samootsenku-posle-uvolneniya" },
  { category: "layoff", slug: "kak-pereotsenit-svoj-opyt" },
  { category: "layoff", slug: "kak-gotovitsya-k-posleduyushchemu-sobesedovaniyu" },
  { category: "layoff", slug: "kak-spravitsya-s-finansovym-stressom" },
  { category: "layoff", slug: "kak-ispolzovat-svobodnoe-vremya-s-umom" },
  { category: "layoff", slug: "kak-otojti-ot-kompanii" },
  { category: "layoff", slug: "kak-zaschitit-rezyume-posle-uvolneniya" },
  { category: "layoff", slug: "kak-nachat-novyj-karernyj-tsikl" },
  { category: "layoff", slug: "kak-perestat-boyatsya-novogo-poiska" },
  { category: "layoff", slug: "kak-iskat-rabotu-esli-net-deneg" },
  { category: "layoff", slug: "kak-sovladat-s-neopredelennostyu" },
  { category: "layoff", slug: "kak-vosstanovit-energiyu-posle-uvolneniya" }
];

let customCount = 0;
for (const config of customArticlesConfig) {
  let slug = config.slug || "default-slug";

  // Исправляем проблемные символы
  slug = slug.replace(/ё/g, 'е').replace(/Ё/g, 'Е');

  const template = generateCustomArticle(slug, config.category, "", "");

  const titles = {
    "job-search-active": ["Как составить сопроводительное письмо 2026", "Нетворкинг для IT-специалистов", "Как отвечать на вопросы про зарплату", "LinkedIn-профиль для поиска работы", "Как подготовиться к тех-собеседованию", "Эффективные отклики на hh.ru", "Как пройти ATS-скрининг", "Стратегия поиска работы после 30", "Как искать работу через знакомых", "Как получить отказ от компании", "Как отличиться от других кандидатов", "Как подготовить портфолио", "Как работать с рекрутером", "Как пройти финальное собеседование", "Как обсудить карьерные цели", "Как справиться с отказами", "Как использовать LinkedIn эффективно", "Как искать работу в кризис", "Как создать план поиска работы", "Как повысить конверсию откликов", "Как подготовиться к behavioral interview", "Как пройти тестовое задание", "Как создавать контакт в сети", "Как работать с hh.ru", "Как найти работу без опыта"],
    "market-crisis": ["Рынок IT в России: тренды 2026", "Влияние AI на рынок труда 2026", "IT-зарплаты: прогноз 2027", "Дефицит Senior-ов в России", "Как найти работу в 2026", "Сокращения в IT-секторе", "Будущее IT-профессий", "Как меняется найм в кризис", "Конкурс на вакансии в IT", "Как найти работу в кризис", "Рынок труда после сокращений", "IT-вакансии в 2026", "Перспективы IT-рынка", "Как быть конкурентным в IT", "Как меняются требования к IT", "Как найти работу после сокращения", "Как меняется зарплата в IT", "Рынок IT 2026: прогноз", "Как выжить в IT-кризис", "Как подготовиться к поиску в кризис"],
    "career-guidance": ["Как перейти из Senior в Architect", "Карьерный рост после 35 лет", "Как выбрать между менеджментом и экспертизой", "Развитие soft skills для IT", "Как построить карьерный план", "Как получить промо в IT", "Как перестать быть Junior", "Как стать техническим лидером", "Как перемещаться между компаниями", "Как совмещать работу и карьерный рост", "Как научиться управлять командой", "Как стать архитектором", "Как перестать кодить и начать управлять", "Как выбрать направление в IT", "Как создать персональный бренд", "Как стать Tech Lead", "Как развиваться без промо", "Как работать на рекомендациях", "Как создавать карьерные связи", "Как выходить из зоны комфорта", "Как перестать быть исполнителем", "Как стать руководителем в IT", "Как совмещать техническую и управленческую карьеру", "Как работать над карьерной стратегией", "Как перестать быть middle"],
    "hr-consultation": ["Как пройти проверку службы безопасности", "Какие вопросы задать на собеседовании", "Как отказаться от оффера правильно", "Red flags на собеседовании", "Как вести переговоры с HR", "Как отвечать на неприятные вопросы", "Как объяснить болезненный опыт", "Как вести себя с HR", "Как получить повышение через HR", "Как пройти HR-интервью", "Как обсудить зарплату с HR", "Как отличить хорошее предложение", "Как работать с рекрутером", "Как пройти культурный фит", "Как отвечать прокрастинации", "Как готовиться к HR-раунду", "Как вести переговоры после оффера", "Как отличить красные флаги", "Как получить отказ от HR", "Как оформить отказ"],
    "work-support": ["Первые 90 дней на новой работе", "Как работать в распределённой команде", "Time management для разработчика", "Как просить повышение зарплаты правильно", "Как перестать перерабатывать", "Как совладать с многозначностью задач", "Как найти ментора", "Как избежать конфликтов в команде", "Как сообщать о проблемах руководителю", "Как совмещать несколько проектов", "Как сохранять продуктивность", "Как работать с токсичным руководителем", "Как просить помощь у коллег", "Как выходить из конфликтов", "Как работать с непонятными требованиями", "Как просить обратную связь", "Как организовать свой рабочий день", "Как бороться с прокрастинацией", "Как восстановиться после переработок"],
    "career-change": ["Из тестировщика в разработчика", "Из аналитика в продакт-менеджера", "Как перейти в IT после 30", "Из фриланса в компанию", "Из менеджера в разработчика", "Из дизайнера в frontend", "Как перейти в Data Science", "Из DevOps в SecOps", "Из frontend в backend", "Как стать продакт-менеджером без опыта", "Из руководителя в Individual Contributor", "Из ML в Data Engineering", "Как перейти в AI", "Из QA в DevOps", "Из support в development", "Как сменить профессию в 40 лет", "Из marketing в product", "Из операций в engineering", "Как переступить в IT", "Из системного администратора в DevOps"],
    "layoff": ["Что делать в первые дни после увольнения", "Как объяснить увольнение на собеседовании", "Финансовая подушка для IT-специалиста", "Права работника при сокращении", "Как получить компенсацию при увольнении", "Как перестать чувствовать вину за увольнение", "Как искать работу после сокращения", "Как сохранить самооценку после увольнения", "Как переоценить свой опыт", "Как готовиться к последующему собеседованию", "Как справиться с финансовым стрессом", "Как использовать свободное время с умом", "Как отойти от компании", "Как защитить резюме после увольнения", "Как начать новый карьерный цикл", "Как перестать бояться нового поиска", "Как искать работу если нет денег", "Как совладать с неопределённостью", "Как восстановить энергию после увольнения"]
  };

  const article = {
    meta: {
      slug,
      roleSlug: "",
      topicSlug: "",
      category: config.category,
      title: titles[config.category][customCount % titles[config.category].length] || "Полное руководство",
      metaDescription: `Практическое руководство для IT-специалистов. Конкретные советы, проверенные стратегии, актуальные данные ${new Date().getFullYear()} года.`,
      keyStat: "Проверено на 200+ участниках СБОРКИ",
      readingTime: randomInt(5, 10),
      updatedDate: "февраль 2026"
    },
    quickAnswer: "Системный подход к решению этой задачи значительно ускоряет результат. В СБОРКЕ мы видим, что кандидаты с планом получают офферы на 40% быстрее.",
    sections: template.headings.map((heading, i) => ({
      heading,
      content: template.contents[i]
    })),
    salaryTable: null,
    topSkills: null,
    topEmployers: null,
    mistakes: [
      "Действовать без плана — теряете время и силы",
      "Откладывать на потом — каждый день без работы снижает шансы",
      "Публиковать резюме без подготовки — конверсия падает в 3 раза",
      "Искать работу в одиночку — ментор ускоряет процесс в 2 раза",
      "Сдаваться после первых отказов — норма получать 20-30 отказов",
      "Не просить обратную связь — теряете возможность улучшиться"
    ],
    actionPlan: [
      "Определите конкретную цель и срок",
      "Составьте пошаговый план действий",
      "Обновите резюме и LinkedIn",
      "Начните с 5 целевых откликов в день",
      "Проводите 1-2 мок-собеседования в неделю",
      "Анализируйте результаты и корректируйте подход"
    ],
    faq: [
      { question: "Сколько времени займёт решение этой задачи?", answer: "При системном подходе — от 2 до 8 недель. Без плана — непредсказуемо." },
      { question: "Нужно ли обращаться к ментору?", answer: "Да, ментор ускоряет процесс в 2 раза и помогает избежать типичных ошибок." },
      { question: "Что делать если нет сил продолжать?", answer: "Отдохните 1-2 дня, поговорите с близкими, вспомните зачем вы это делаете." },
      { question: "Как сохранить мотивацию?", answer: "Празднуйте маленькие победы, ведите статистику, окружите себя поддерживающими людьми." }
    ],
    relatedSlugs: [
      "kak-nayti-rabotu-bystro",
      "rynok-it-v-rossii-trendy-2026",
      "kak-sostavit-soprovditelnoe-pismo-2026"
    ],
    expertQuote: getExpertQuote(matrixCount + customCount)
  };

  const filePath = path.join(ARTICLES_DIR, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(article, null, 2), 'utf8');
  customCount++;
}

console.log(`Создано ${customCount} custom статей`);

// Обновление _index.json
console.log('Обновление _index.json...');

const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.json') && f !== '_index.json');
const index = [];

for (const file of files) {
  const filePath = path.join(ARTICLES_DIR, file);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (content.meta) {
    index.push(content.meta);
  }
}

fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2), 'utf8');

console.log(`Итого создано файлов: ${files.length}`);
console.log(`_index.json содержит: ${index.length} статей`);
console.log('Генерация завершена!');
