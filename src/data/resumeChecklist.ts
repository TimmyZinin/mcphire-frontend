export interface ChecklistItem {
  id: string;
  category: "structure" | "experience" | "skills" | "formatting";
  label: string;
  tip: string;
  weight: number;
}

export const resumeChecklist: ChecklistItem[] = [
  // Structure - 5 items
  {
    id: "structure-1",
    category: "structure",
    label: "Есть контактные данные (email + телефон + Telegram)",
    tip: "Рекрутеру нужны минимум 2 способа связаться. Telegram — самый быстрый канал связи.",
    weight: 5,
  },
  {
    id: "structure-2",
    category: "structure",
    label: "Указана должность в заголовке резюме",
    tip: "Напиши: «Python Developer» или «Frontend-разработчик», а не «Специалист» или «Ищу работу».",
    weight: 5,
  },
  {
    id: "structure-3",
    category: "structure",
    label: "Есть краткое резюме (summary) 2-3 предложения",
    tip: "Рекрутер тратит 7 секунд на первое сканирование. Сразу напиши кто ты и что делаешь.",
    weight: 5,
  },
  {
    id: "structure-4",
    category: "structure",
    label: "Опыт работы структурирован: компания, должность, период",
    tip: "Формат: «Название компании | Должность | Период работы». Хронология — от нового к старому.",
    weight: 5,
  },
  {
    id: "structure-5",
    category: "structure",
    label: "Есть ссылка на LinkedIn-профиль",
    tip: "LinkedIn — основная площадка для рекрутеров. Ссылка обязательна для IT-специалистов.",
    weight: 5,
  },

  // Experience - 5 items
  {
    id: "experience-1",
    category: "experience",
    label: "Достижения описаны в цифрах (%, $, сроки)",
    tip: "«Разработал» → «Разработал систему, которая сократила время обработки на 40%». Цифры — язык рекрутера.",
    weight: 5,
  },
  {
    id: "experience-2",
    category: "experience",
    label: "Описан опыт от 3 последних мест работы",
    tip: "Для Junior — весь опыт. Для Senior — последние 3-5 лет. Детализируй только релевантные проекты.",
    weight: 5,
  },
  {
    id: "experience-3",
    category: "experience",
    label: "Указаны технологии в каждом месте работы",
    tip: "После каждой должности добавь: «Стек: Python, FastAPI, PostgreSQL, Docker».",
    weight: 5,
  },
  {
    id: "experience-4",
    category: "experience",
    label: "Есть описание командной работы",
    tip: "IT-компании ценят умение работать в команде. Опиши: размер команды, свою роль, взаимодействие.",
    weight: 5,
  },
  {
    id: "experience-5",
    category: "experience",
    label: "Нет «очевидных» обязанностей",
    tip: "«Писал код» — плохо. «Разработал API для микросервисной архитектуры» — хорошо.",
    weight: 5,
  },

  // Skills - 5 items
  {
    id: "skills-1",
    category: "skills",
    label: "Указан стек технологий с версиями",
    tip: "Python 3.11 лучше, чем просто «Python». PostgreSQL 15 лучше, чем просто «SQL».",
    weight: 5,
  },
  {
    id: "skills-2",
    category: "skills",
    label: "Разделены hard skills и soft skills",
    tip: "Hard: Python, Docker, AWS. Soft: Agile, управление командой 5 человек.",
    weight: 5,
  },
  {
    id: "skills-3",
    category: "skills",
    label: "Указаны инструменты и методологии",
    tip: "Git, Jira, Figma, CI/CD, Agile, Scrum — всё это ценно для рекрутера.",
    weight: 5,
  },
  {
    id: "skills-4",
    category: "skills",
    label: "Есть английский язык с уровнем",
    tip: "B2 (Upper-Intermediate) или конкретные баллы IELTS/TOEFL. Не пиши просто «English».",
    weight: 5,
  },
  {
    id: "skills-5",
    category: "skills",
    label: "Указаны релевантные сертификаты",
    tip: "AWS Certified, Google Cloud, PMP — реальные сертификаты повышают доверие.",
    weight: 5,
  },

  // Formatting - 5 items
  {
    id: "formatting-1",
    category: "formatting",
    label: "Резюме помещается на 1-2 страницы",
    tip: "Идеально: 1 страница для Junior/Middle, 2 для Senior/Lead. Лишние страницы не читают.",
    weight: 5,
  },
  {
    id: "formatting-2",
    category: "formatting",
    label: "Используется единый стиль оформления",
    tip: "Один шрифт, один размер заголовков, одинаковые отступы. Консистентность — признак профессионализма.",
    weight: 5,
  },
  {
    id: "formatting-3",
    category: "formatting",
    label: "Нет орфографических и грамматических ошибок",
    tip: "Ошибки = невнимательность. Проверь резюме 3 раза или попроси другого человека проверить.",
    weight: 5,
  },
  {
    id: "formatting-4",
    category: "formatting",
    label: "Файл названо правильно",
    tip: "Иван_Иванов_Python_Developer_2026.pdf — правильно. resume_final_v3.doc — неправильно.",
    weight: 5,
  },
  {
    id: "formatting-5",
    category: "formatting",
    label: "Есть ссылка на портфолио или GitHub",
    tip: "GitHub-профиль с реальными проектами — главный аргумент для IT-рекрутера.",
    weight: 5,
  },
];

export const categories = [
  { id: "structure", name: "Структура", color: "bg-blue-500" },
  { id: "experience", name: "Опыт", color: "bg-green-500" },
  { id: "skills", name: "Навыки", color: "bg-purple-500" },
  { id: "formatting", name: "Оформление", color: "bg-orange-500" },
] as const;
