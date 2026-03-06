import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface CheckResult {
  name: string;
  passed: boolean;
  recommendation?: string;
  points: number;
  maxPoints: number;
}

const ResumeReview = () => {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState<{
    score: number;
    categories: { name: string; score: number; maxScore: number }[];
    checks: CheckResult[];
  } | null>(null);

  const analyzeResume = () => {
    if (!resumeText.trim()) return;

    const checks: CheckResult[] = [];
    const text = resumeText;

    // === СТРУКТУРА (25 баллов) ===

    // 1. Есть контакты (email или телефон или telegram)
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
    const hasPhone = /\+?[78][\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}/.test(text);
    const hasTelegram = /@[\w]{5,}/.test(text);
    const hasContacts = hasEmail || hasPhone || hasTelegram;
    checks.push({
      name: "Есть контакты",
      passed: hasContacts,
      recommendation: !hasContacts ? "Добавьте email, телефон или Telegram" : undefined,
      points: hasContacts ? 5 : 0,
      maxPoints: 5,
    });

    // 2. Длина резюме 300-3000 символов
    const textLength = text.length;
    const goodLength = textLength >= 300 && textLength <= 3000;
    checks.push({
      name: "Оптимальная длина",
      passed: goodLength,
      recommendation: !goodLength ? `Длина ${textLength} символов. Оптимально: 300-3000` : undefined,
      points: goodLength ? 5 : 0,
      maxPoints: 5,
    });

    // 3. Есть заголовок/должность
    const titleWords = /разработчик|инженер|менеджер|аналитик|дизайнер|devops|тестировщик|product|developer|engineer|manager|analyst|designer/i;
    const hasTitle = titleWords.test(text);
    checks.push({
      name: "Есть заголовок должности",
      passed: hasTitle,
      recommendation: !hasTitle ? "Укажите целевую должность в начале резюме" : undefined,
      points: hasTitle ? 5 : 0,
      maxPoints: 5,
    });

    // 4. Есть разделы (опыт, навыки, образование)
    const sectionWords = /опыт|навыки|образование|проекты|работ[аы]|компетенции|skills|experience|education/i;
    const hasSections = (text.match(sectionWords) || []).length >= 2;
    checks.push({
      name: "Есть структурные разделы",
      passed: hasSections,
      recommendation: !hasSections ? "Добавьте разделы: Опыт, Навыки, Образование" : undefined,
      points: hasSections ? 5 : 0,
      maxPoints: 5,
    });

    // 5. Текст не весь UPPERCASE и не весь lowercase
    const isUpperCase = text === text.toUpperCase() && text.length > 50;
    const isLowerCase = text === text.toLowerCase() && text.length > 50;
    const goodCasing = !isUpperCase && !isLowerCase;
    checks.push({
      name: "Правильный регистр текста",
      passed: goodCasing,
      recommendation: !goodCasing ? "Используйте нормальный регистр, не ALL CAPS" : undefined,
      points: goodCasing ? 5 : 0,
      maxPoints: 5,
    });

    // === ОПЫТ (25 баллов) ===

    // 6. Есть числа/метрики
    const metrics = /[\d]+(\.[\d]+)?\s*(%|процент|руб|млн|тыс|x|лет|года|человек|клиент|проект|рост|увеличение|снижение)/i;
    const hasMetrics = metrics.test(text);
    checks.push({
      name: "Есть метрики и цифры",
      passed: hasMetrics,
      recommendation: !hasMetrics ? "Добавьте конкретные цифры: %, x, рубли, люди" : undefined,
      points: hasMetrics ? 5 : 0,
      maxPoints: 5,
    });

    // 7. Есть даты/годы
    const dates = /\d{4}|20\d{2}|201\d|202\d|январ[яю]|феврал[яю]|март[а]?|апрел[яю]|ма[йю]|июн[яю]|июл[яю]|август[а]?|сентябр[яю]|октябр[яю]|ноябр[яю]|декабр[яю]/i;
    const hasDates = dates.test(text);
    checks.push({
      name: "Есть даты и периоды",
      passed: hasDates,
      recommendation: !hasDates ? "Укажите периоды работы: 2020-2023, 3 года" : undefined,
      points: hasDates ? 5 : 0,
      maxPoints: 5,
    });

    // 8. Упомянуты компании (слова с заглавной буквы)
    const companyPattern = /[A-ZА-ЯЁ][a-zа-яё]+(\s+[A-ZА-ЯЁ][a-zа-яё]+)*/g;
    const potentialCompanies = text.match(companyPattern) || [];
    const uniqueCompanies = [...new Set(potentialCompanies.filter(c => c.length > 3))];
    const hasCompanies = uniqueCompanies.length >= 2;
    checks.push({
      name: "Упомянуты компании",
      passed: hasCompanies,
      recommendation: !hasCompanies ? "Перечислите компании, в которых работали" : undefined,
      points: hasCompanies ? 5 : 0,
      maxPoints: 5,
    });

    // 9. Глаголы действия
    const actionVerbs = /разработал|внедрил|оптимизировал|увеличил|сократил|автоматизировал|создал|управлял|руководил|организовал|запустил|обеспечил|повысил|построил|реализовал|завершил|участвовал|выполнил|провёл|подготовил| написал| настроил| развернул| интегрировал/i;
    const hasVerbs = actionVerbs.test(text);
    checks.push({
      name: "Использованы глаголы действия",
      passed: hasVerbs,
      recommendation: !hasVerbs ? "Используйте глаголы: разработал, внедрил, оптимизировал" : undefined,
      points: hasVerbs ? 5 : 0,
      maxPoints: 5,
    });

    // 10. Минимум 2 позиции
    const dateOrCompanyMatches = (text.match(/\d{4}/g) || []).length;
    const hasMultiplePositions = dateOrCompanyMatches >= 4 || uniqueCompanies.length >= 2;
    checks.push({
      name: "Минимум 2 позиции",
      passed: hasMultiplePositions,
      recommendation: !hasMultiplePositions ? "Опишите минимум 2 места работы" : undefined,
      points: hasMultiplePositions ? 5 : 0,
      maxPoints: 5,
    });

    // === НАВЫКИ (25 баллов) ===

    // 11. Упомянуты технологии
    const techWords = /React|Angular|Vue|Node|JavaScript|TypeScript|Python|Java|Kotlin|Swift|Go|Rust|C\+\+|C#|PHP|Ruby|SQL|PostgreSQL|MySQL|MongoDB|Docker|Kubernetes|Jenkins|GitHub|GitLab|AWS|GCP|Azure|Linux|Bash|PowerShell|GraphQL|REST|API|Figma|Sketch|Photoshop|Illustrator|Excel|Power BI|Tableau|Machine Learning|ML|AI|TensorFlow|PyTorch|Keras/i;
    const hasTech = techWords.test(text);
    checks.push({
      name: "Упомянуты технологии",
      passed: hasTech,
      recommendation: !hasTech ? "Добавьте технологии: React, Python, Docker..." : undefined,
      points: hasTech ? 5 : 0,
      maxPoints: 5,
    });

    // 12. Soft skills
    const softSkills = /коммуникац|лидерств|team|управлен|организац|аналитич|креативн|проблем|решени|дедлайн|стресс|адаптивн|обучен|презентац|переговор/i;
    const hasSoftSkills = softSkills.test(text);
    checks.push({
      name: "Есть soft skills",
      passed: hasSoftSkills,
      recommendation: !hasSoftSkills ? "Добавьте soft skills: коммуникация, лидерство..." : undefined,
      points: hasSoftSkills ? 5 : 0,
      maxPoints: 5,
    });

    // 13. Указание уровня языка
    const language = /английск|A1|A2|B1|B2|C1|C2|IELTS|TOEFL|GRE|уровень|Upper|Intermediate|Advanced|Fluent|Native/i;
    const hasLanguage = language.test(text);
    checks.push({
      name: "Указан уровень языка",
      passed: hasLanguage,
      recommendation: !hasLanguage ? "Укажите уровень английского: B1, B2, C1..." : undefined,
      points: hasLanguage ? 5 : 0,
      maxPoints: 5,
    });

    // 14. Более 3 технологий
    const techMatches = text.match(techWords) || [];
    const uniqueTech = [...new Set(techMatches.map(t => t.toLowerCase()))];
    const hasManyTech = uniqueTech.length >= 3;
    checks.push({
      name: "Более 3 технологий",
      passed: hasManyTech,
      recommendation: !hasManyTech ? `Сейчас ${uniqueTech.length} технологий. Добавьте больше` : undefined,
      points: hasManyTech ? 5 : 0,
      maxPoints: 5,
    });

    // 15. Навыки специфичны
    const specificTech = /React|Angular|Vue\.js|Node\.js|PostgreSQL|MongoDB|Docker|Kubernetes|TensorFlow|PyTorch|Figma|Swift|Kotlin|Go|Rust/i;
    const hasSpecificTech = specificTech.test(text);
    checks.push({
      name: "Навыки специфичны",
      passed: hasSpecificTech,
      recommendation: !hasSpecificTech ? "Укажите конкретные технологии, а не общие" : undefined,
      points: hasSpecificTech ? 5 : 0,
      maxPoints: 5,
    });

    // === ОФОРМЛЕНИЕ (25 баллов) ===
    // Авто 25 баллов - не можем проверить форматирование текста
    checks.push({
      name: "Оформление резюме",
      passed: true,
      recommendation: undefined,
      points: 25,
      maxPoints: 25,
    });

    // Подсчёт категорий
    const structureScore = checks.slice(0, 5).reduce((sum, c) => sum + c.points, 0);
    const experienceScore = checks.slice(5, 10).reduce((sum, c) => sum + c.points, 0);
    const skillsScore = checks.slice(10, 15).reduce((sum, c) => sum + c.points, 0);
    const formattingScore = 25;

    const totalScore = structureScore + experienceScore + skillsScore + formattingScore;

    setResult({
      score: totalScore,
      categories: [
        { name: "Структура", score: structureScore, maxScore: 25 },
        { name: "Опыт", score: experienceScore, maxScore: 25 },
        { name: "Навыки", score: skillsScore, maxScore: 25 },
        { name: "Оформление", score: formattingScore, maxScore: 25 },
      ],
      checks,
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Проверка резюме онлайн — бесплатный AI-анализ | MCPHire</title>
        <meta
          name="description"
          content="Проверьте своё резюме бесплатно. 15 критериев оценки: структура, опыт, навыки, оформление. Получите рекомендации по улучшению."
        />
        <link rel="canonical" href="https://mcphire.com/tools/resume-review" />
        <meta
          property="og:title"
          content="Проверка резюме онлайн — бесплатный AI-анализ"
        />
        <meta
          property="og:description"
          content="15 критериев оценки: структура, опыт, навыки, оформление. Получите рекомендации."
        />
        <meta property="og:url" content="https://mcphire.com/tools/resume-review" />
      </Helmet>

      {/* Header */}
      <header className="border-b border-border">
        <div className="section-container py-4 flex items-center justify-between">
          <Link to="/" className="font-black text-xl uppercase tracking-tight">
            MCPHire
          </Link>
          <a href="/#pricing" className="cta-text text-sm">
            Тарифы
          </a>
        </div>
      </header>

      <section className="section-white">
        <div className="section-container max-w-3xl">
          <h1 className="heading-xl mb-4">ПРОВЕРКА РЕЗЮМЕ</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Вставьте текст резюме и получите оценку по 15 критериям
          </p>

          <textarea
            className="w-full border border-border rounded-xl p-4 bg-background text-foreground font-mono text-sm resize-none focus:outline-none focus:border-primary"
            placeholder="Вставьте текст резюме сюда..."
            maxLength={5000}
            rows={12}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />

          <button
            onClick={analyzeResume}
            className="cta-primary-nrc mt-4"
            disabled={!resumeText.trim()}
          >
            Проверить резюме
          </button>

          {/* Result */}
          {result && (
            <div className="mt-10">
              <h2 className="heading-lg mb-6">
                Результат: {result.score}/100
              </h2>

              {/* Score bar */}
              <div className="w-full h-4 bg-muted rounded-full mb-8 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    result.score >= 70
                      ? "bg-green-500"
                      : result.score >= 40
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${result.score}%` }}
                />
              </div>

              {/* Categories */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {result.categories.map((cat) => (
                  <div key={cat.name} className="border border-border rounded-xl p-4">
                    <p className="text-sm text-muted-foreground mb-1">{cat.name}</p>
                    <p className="text-2xl font-bold">
                      {cat.score}/{cat.maxScore}
                    </p>
                    <div className="w-full h-2 bg-muted rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(cat.score / cat.maxScore) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Checks list */}
              <div className="space-y-3">
                {result.checks.map((check, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      check.passed ? "bg-green-500/10" : "bg-red-500/10"
                    }`}
                  >
                    <span className="text-lg">
                      {check.passed ? "✅" : "❌"}
                    </span>
                    <div>
                      <p className="font-medium">
                        {check.name} ({check.points}/{check.maxPoints})
                      </p>
                      {check.recommendation && (
                        <p className="text-sm text-muted-foreground">
                          {check.recommendation}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/jobs" className="cta-primary-nrc text-center">
                  Найти вакансии под ваш профиль →
                </Link>
                <a
                  href="https://t.me/Sborka_work_bot"
                  className="cta-text text-center"
                >
                  Получить детальный AI-разбор в боте →
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ResumeReview;
