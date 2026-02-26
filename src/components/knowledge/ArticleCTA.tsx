interface ArticleCTAProps {
  slug: string;
  variant?: "inline" | "block";
}

const ArticleCTA = ({ slug, variant = "block" }: ArticleCTAProps) => {
  const utm = `?utm_source=knowledge&utm_medium=article&utm_campaign=${slug}`;
  const botLink = `https://t.me/Sborka_work_bot?start=knowledge${utm}`;

  if (variant === "inline") {
    return (
      <div className="my-8 p-6 bg-[hsl(174,62%,96%)] border border-[hsl(174,62%,80%)] rounded-xl">
        <p className="text-base">
          Хотите разобрать вашу ситуацию с ментором?{" "}
          <a
            href={botLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[hsl(174,62%,30%)] underline underline-offset-4 hover:text-[hsl(174,62%,22%)]"
          >
            Разобрать с ментором в СБОРКЕ →
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="my-12 p-8 bg-gradient-to-br from-[hsl(174,62%,40%)] to-[hsl(174,62%,28%)] text-white rounded-xl text-center ring-1 ring-white/20">
      <h3 className="text-2xl font-black mb-3">
        Получи оффер за 6-8 недель
      </h3>
      <p className="text-white/80 mb-6 max-w-lg mx-auto">
        Менторы, мок-собеседования, разбор резюме, системный подход к поиску работы.
        Подписка от 4 900 руб./мес.
      </p>
      <a
        href={botLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-3 bg-white text-[hsl(174,62%,30%)] font-bold rounded-lg hover:bg-white/90 transition-colors"
      >
        УЗНАТЬ ПОДРОБНЕЕ
      </a>
    </div>
  );
};

export default ArticleCTA;
