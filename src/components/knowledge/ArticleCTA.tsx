interface ArticleCTAProps {
  slug: string;
  variant?: "inline" | "block";
}

const ArticleCTA = ({ slug, variant = "block" }: ArticleCTAProps) => {
  const utm = `?utm_source=knowledge&utm_medium=article&utm_campaign=${slug}`;
  const botLink = `https://t.me/Sborka_work_bot?start=knowledge${utm}`;

  if (variant === "inline") {
    return (
      <div className="my-8 p-6 bg-muted rounded-xl border border-border">
        <p className="text-base">
          Хотите разобрать вашу ситуацию с ментором?{" "}
          <a
            href={botLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[hsl(174,62%,35%)] underline underline-offset-4 hover:text-[hsl(174,62%,28%)]"
          >
            Бесплатная консультация в СБОРКЕ →
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="my-12 p-8 bg-foreground text-background rounded-xl text-center">
      <h3 className="text-xl md:text-2xl font-bold mb-3">
        Попробуйте СБОРКУ — 7 дней бесплатно
      </h3>
      <p className="text-background/70 mb-6 max-w-lg mx-auto">
        Менторы, мок-собеседования, разбор резюме, системный подход к поиску работы.
        Средний участник получает оффер за 6-8 недель.
      </p>
      <a
        href={botLink}
        target="_blank"
        rel="noopener noreferrer"
        className="cta-primary inline-block"
      >
        НАЧАТЬ БЕСПЛАТНО
      </a>
    </div>
  );
};

export default ArticleCTA;
