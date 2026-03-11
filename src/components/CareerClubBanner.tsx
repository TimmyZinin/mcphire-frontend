interface CareerClubBannerProps {
  variant?: "inline" | "block";
  utmSource?: string;
}

const CareerClubBanner = ({ variant = "inline", utmSource = "banner" }: CareerClubBannerProps) => {
  const href = `https://sborka.work?utm_source=mcphire&utm_medium=banner&utm_campaign=${utmSource}`;

  if (variant === "inline") {
    return (
      <div className="my-6 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0 mt-0.5">🏃</span>
          <div>
            <p className="font-bold text-sm mb-0.5">
              Ищете работу? Подготовьтесь к собеседованиям
            </p>
            <p className="text-sm text-muted-foreground">
              СБОРКА — карьерный клуб с менторами, мок-собесами и разбором резюме. Средний участник получает оффер за 6-8 недель.
            </p>
          </div>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center px-5 py-2.5 rounded-full bg-[#4ECDC4] text-white text-sm font-semibold hover:bg-[#45B7D1] transition-colors whitespace-nowrap"
        >
          Узнать о клубе →
        </a>
      </div>
    );
  }

  return (
    <section className="my-8">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="bg-gradient-to-br from-[hsl(174,62%,40%)] to-[hsl(174,62%,28%)] text-white rounded-2xl p-8 md:p-10 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
            Получите оффер за 6-8 недель
          </h3>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            СБОРКА — клуб карьерной дисциплины. Менторы с опытом 8+ лет, мок-собеседования, разбор резюме. Подписка от 4 900 ₽/мес.
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-white text-[hsl(174,62%,30%)] font-bold rounded-full hover:bg-white/90 transition-colors"
          >
            Перейти на sborka.work →
          </a>
        </div>
      </div>
    </section>
  );
};

export default CareerClubBanner;
