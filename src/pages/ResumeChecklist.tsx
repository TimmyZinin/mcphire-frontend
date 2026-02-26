import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Check } from "lucide-react";
import { resumeChecklist, categories, type ChecklistItem } from "@/data/resumeChecklist";

const ResumeChecklist = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const score = useMemo(() => {
    return resumeChecklist.reduce((acc, item) => {
      return checkedItems.has(item.id) ? acc + item.weight : acc;
    }, 0);
  }, [checkedItems]);

  const getScoreColor = () => {
    if (score < 40) return "text-red-500";
    if (score < 70) return "text-yellow-500";
    return "text-green-500";
  };

  const getScoreMessage = () => {
    if (score < 40) return "Нужна доработка";
    if (score < 70) return "Неплохо, но можно лучше";
    return "Отличное резюме!";
  };

  const getCategoryProgress = (categoryId: string) => {
    const categoryItems = resumeChecklist.filter((item) => item.category === categoryId);
    const checked = categoryItems.filter((item) => checkedItems.has(item.id)).length;
    return { checked, total: categoryItems.length };
  };

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Чеклист резюме IT-специалиста: 20 пунктов | СБОРКА</title>
        <meta
          name="description"
          content="Проверь своё резюме по 20 критериям рекрутеров. Бесплатный чеклист для IT-специалистов."
        />
      </Helmet>

      {/* Header */}
      <header className="border-b border-border">
        <div className="section-container py-4 flex items-center justify-between">
          <Link to="/" className="font-black text-xl uppercase tracking-tight">
            СБОРКА
          </Link>
          <a href="/#pricing" className="cta-text text-sm">
            Тарифы
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="section-white">
        <div className="section-container">
          <h1 className="heading-xl mb-4">ЧЕКЛИСТ РЕЗЮМЕ</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Проверь своё резюме по 20 критериям рекрутеров. Бесплатно.
          </p>

          {/* Score Display */}
          <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 md:p-8 mb-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-muted"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={`${(score / 100) * 352} 352`}
                    strokeLinecap="round"
                    className={getScoreColor()}
                  />
                </svg>
                <span className={`absolute text-4xl font-black ${getScoreColor()}`}>
                  {score}
                </span>
              </div>
              <div className="text-center md:text-left">
                <p className={`text-2xl font-bold ${getScoreColor()}`}>
                  {getScoreMessage()}
                </p>
                <p className="text-muted-foreground mt-2">
                  {checkedItems.size} из 20 пунктов выполнено
                </p>
              </div>
            </div>
          </div>

          {/* Checklist Categories */}
          <div className="space-y-8">
            {categories.map((category) => {
              const categoryItems = resumeChecklist.filter(
                (item) => item.category === category.id
              );
              const progress = getCategoryProgress(category.id);

              return (
                <div key={category.id} className="rounded-2xl border border-border overflow-hidden">
                  {/* Category Header */}
                  <div className={`${category.color} px-6 py-4`}>
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold text-lg text-white">{category.name}</h2>
                      <span className="text-white/80 text-sm">
                        {progress.checked}/{progress.total}
                      </span>
                    </div>
                  </div>

                  {/* Category Items */}
                  <div className="p-4 space-y-3">
                    {categoryItems.map((item) => (
                      <div
                        key={item.id}
                        className={`rounded-lg border p-4 transition-all ${
                          checkedItems.has(item.id)
                            ? "border-primary/30 bg-primary/5"
                            : "border-border hover:border-primary/20"
                        }`}
                      >
                        <label className="flex items-start gap-3 cursor-pointer">
                          <div
                            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                              checkedItems.has(item.id)
                                ? "bg-primary border-primary"
                                : "border-muted-foreground/30"
                            }`}
                            onClick={() => toggleItem(item.id)}
                          >
                            {checkedItems.has(item.id) && (
                              <Check className="w-4 h-4 text-primary-foreground" />
                            )}
                          </div>
                          <div className="flex-1" onClick={() => toggleItem(item.id)}>
                            <p
                              className={`font-medium ${
                                checkedItems.has(item.id)
                                  ? "text-foreground"
                                  : "text-foreground"
                              }`}
                            >
                              {item.label}
                            </p>
                            {!checkedItems.has(item.id) && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.tip}
                              </p>
                            )}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-lg mb-4">Хочешь профессиональную проверку?</p>
            <a
              href="https://t.me/Sborka_work_bot"
              className="cta-primary-nrc inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Написать в бот
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8 border-t border-foreground">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-muted-foreground">
            <div>
              <Link to="/" className="font-bold text-foreground hover:text-muted-foreground transition-colors">
                СБОРКА
              </Link>
              <p>Клуб карьерной дисциплины</p>
            </div>
            <Link to="/" className="cta-text text-sm">
              На главную
            </Link>
            <p>&copy; СБОРКА 2026</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default ResumeChecklist;
