interface ArticleCTAProps {
  slug: string;
  variant?: "inline" | "block";
}

const WEBINAR_LINK = "https://t.me/Sborka_work_bot?start=webinar4_site";
const WEBINAR_DATE = "2 марта";

const ArticleCTA = ({ slug, variant = "block" }: ArticleCTAProps) => {
  const href = `${WEBINAR_LINK}&utm_source=knowledge&utm_campaign=${slug}`;

  if (variant === "inline") {
    return (
      <div className="my-8 p-6 bg-[hsl(174,62%,96%)] border border-[hsl(174,62%,80%)] rounded-xl">
        <p className="text-base">
          Хотите подготовиться к собеседованиям с ментором?{" "}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[hsl(174,62%,30%)] underline underline-offset-4 hover:text-[hsl(174,62%,22%)]"
          >
            Запишитесь на открытый урок {WEBINAR_DATE} →
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="my-12 p-8 bg-gradient-to-br from-[hsl(174,62%,40%)] to-[hsl(174,62%,28%)] text-white rounded-xl text-center ring-1 ring-white/20">
      <h3 className="text-2xl font-black mb-3">
        Получите оффер за 6-8 недель
      </h3>
      <p className="text-white/80 mb-6 max-w-lg mx-auto">
        Менторы, мок-собеседования, разбор резюме, системный подход к поиску работы.
        Подписка от 4 900 руб./мес.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-3 bg-white text-[hsl(174,62%,30%)] font-bold rounded-lg hover:bg-white/90 transition-colors"
      >
        Записаться на урок {WEBINAR_DATE} →
      </a>
    </div>
  );
};

export default ArticleCTA;
