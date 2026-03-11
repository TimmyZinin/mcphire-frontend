// City and Category mappings for SEO pages

export const cityMap: Record<string, string> = {
  "moscow": "Москва",
  "spb": "Санкт-Петербург",
  "novosibirsk": "Новосибирск",
  "ekaterinburg": "Екатеринбург",
  "kazan": "Казань",
  "remote": "Удалённо"
};

/** Prepositional case for city names ("в чём? где?") */
export const cityPrepositional: Record<string, string> = {
  "Москва": "Москве",
  "Санкт-Петербург": "Санкт-Петербурге",
  "Новосибирск": "Новосибирске",
  "Екатеринбург": "Екатеринбурге",
  "Казань": "Казани",
  "Удалённо": "удалёнке",
};

export const categoryMap: Record<string, { name: string; keywords: string[] }> = {
  "frontend": { name: "Frontend-разработка", keywords: ["Frontend", "React", "Vue", "Angular", "JavaScript", "TypeScript", "HTML", "CSS"] },
  "backend": { name: "Backend-разработка", keywords: ["Backend", "Python", "Java", "Go", "Node.js", "Django", "Spring", "FastAPI"] },
  "devops": { name: "DevOps и Infrastructure", keywords: ["DevOps", "Kubernetes", "Docker", "Terraform", "AWS", "CI/CD", "SRE"] },
  "qa": { name: "Тестирование (QA)", keywords: ["QA", "Testing", "Selenium", "Playwright", "Manual Testing"] },
  "pm": { name: "Product Management", keywords: ["Product Manager", "Product Management", "Agile", "Scrum"] },
  "data": { name: "Data Science и ML", keywords: ["Data", "ML", "Machine Learning", "PyTorch", "NLP", "Spark", "Analytics"] },
  "mobile": { name: "Мобильная разработка", keywords: ["iOS", "Android", "Swift", "Kotlin", "Flutter", "React Native"] },
  "design": { name: "Дизайн (UX/UI)", keywords: ["Design", "Figma", "UX", "UI", "Prototyping"] },
  "security": { name: "Информационная безопасность", keywords: ["Security", "Penetration", "SIEM", "Network Security"] },
  "management": { name: "IT-менеджмент", keywords: ["Team Management", "Engineering Leadership", "Tech Lead", "System Design"] }
};

// Helper function to filter jobs by city
export const filterJobsByCity = (jobs: any[], citySlug: string, cityName: string): any[] => {
  // For "remote" we filter jobs with format "Удалённо"
  if (citySlug === "remote") {
    return jobs.filter((job) => job.format === "Удалённо");
  }
  // For other cities, filter by exact city name match
  return jobs.filter((job) => job.city === cityName);
};

// Helper function to filter jobs by category
export const filterJobsByCategory = (jobs: any[], category: { keywords: string[] }): any[] => {
  return jobs.filter((job) => {
    // Check if title contains any keyword
    const titleMatch = category.keywords.some((keyword) =>
      job.title.toLowerCase().includes(keyword.toLowerCase())
    );
    // Check if any skill contains any keyword
    const skillMatch = job.skills.some((skill: string) =>
      category.keywords.some((keyword) =>
        skill.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    return titleMatch || skillMatch;
  });
};
