export interface Job {
  id: string;
  title: string;
  company: string;
  city: string;
  salaryFrom: number;
  salaryTo: number;
  currency: string;
  skills: string[];
  description: string;
  postedAt: string;
  source: string;
}

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Яндекс",
    city: "Москва",
    salaryFrom: 350000,
    salaryTo: 500000,
    currency: "₽",
    skills: ["React", "TypeScript", "GraphQL", "Node.js"],
    description: "Разработка и развитие внутренних сервисов Яндекса",
    postedAt: "2026-02-26",
    source: "hh.ru"
  },
  {
    id: "2",
    title: "Backend Developer (Python)",
    company: "МТС",
    city: "Москва",
    salaryFrom: 250000,
    salaryTo: 400000,
    currency: "₽",
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    description: "Разработка микросервисов для облачных продуктов МТС",
    postedAt: "2026-02-25",
    source: "hh.ru"
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "Тинькофф",
    city: "Удалённо",
    salaryFrom: 300000,
    salaryTo: 450000,
    currency: "₽",
    skills: ["Kubernetes", "Docker", "AWS", "Terraform"],
    description: "Поддержка и развитие инфраструктуры банка",
    postedAt: "2026-02-24",
    source: "Habr Career"
  },
  {
    id: "4",
    title: "Product Manager",
    company: "Сбер",
    city: "Москва",
    salaryFrom: 280000,
    salaryTo: 420000,
    currency: "₽",
    skills: ["Product Management", "SQL", "Agile", "A/B Testing"],
    description: "Управление продуктом в экосистеме Сбера",
    postedAt: "2026-02-23",
    source: "hh.ru"
  },
  {
    id: "5",
    title: "Data Analyst",
    company: "Билайн",
    city: "Санкт-Петербург",
    salaryFrom: 180000,
    salaryTo: 280000,
    currency: "₽",
    skills: ["Python", "SQL", "Tableau", "Power BI"],
    description: "Аналитика данных для бизнес-подразделения",
    postedAt: "2026-02-22",
    source: "hh.ru"
  },
  {
    id: "6",
    title: "QA Lead",
    company: "Авито",
    city: "Москва",
    salaryFrom: 250000,
    salaryTo: 380000,
    currency: "₽",
    skills: ["Selenium", "Python", "CI/CD", "Test Planning"],
    description: "Руководство QA-командой и автоматизация тестирования",
    postedAt: "2026-02-21",
    source: "Habr Career"
  },
  {
    id: "7",
    title: "iOS Developer",
    company: "VK",
    city: "Санкт-Петербург",
    salaryFrom: 280000,
    salaryTo: 420000,
    currency: "₽",
    skills: ["Swift", "SwiftUI", "UIKit", "Core Data"],
    description: "Разработка iOS-приложений ВКонтакте",
    postedAt: "2026-02-20",
    source: "hh.ru"
  },
  {
    id: "8",
    title: "ML Engineer",
    company: "Сбер",
    city: "Москва",
    salaryFrom: 320000,
    salaryTo: 500000,
    currency: "₽",
    skills: ["PyTorch", "Python", "TensorFlow", "MLOps"],
    description: "Разработка и внедрение ML-моделей",
    postedAt: "2026-02-19",
    source: "hh.ru"
  },
  {
    id: "9",
    title: "Golang Developer",
    company: "2GIS",
    city: "Новосибирск",
    salaryFrom: 220000,
    salaryTo: 350000,
    currency: "₽",
    skills: ["Go", "PostgreSQL", "Redis", "gRPC"],
    description: "Разработка высоконагруженных сервисов",
    postedAt: "2026-02-18",
    source: "Habr Career"
  },
  {
    id: "10",
    title: "Tech Lead",
    company: "Яндекс",
    city: "Москва",
    salaryFrom: 400000,
    salaryTo: 550000,
    currency: "₽",
    skills: ["System Design", "Team Management", "Python", "Kubernetes"],
    description: "Техническое руководство командой разработки",
    postedAt: "2026-02-17",
    source: "hh.ru"
  }
];
