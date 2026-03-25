import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Partners = () => {
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Партнёрская программа СБОРКА — 20% комиссии | MCPHire</title>
        <meta name="description" content="Зарабатывай 20% комиссии на 6 месяцев за каждого приведённого участника СБОРКА. Партнёрская программа карьерного клуба." />
        <link rel="canonical" href="https://mcphire.com/partners" />
        <meta property="og:title" content="Партнёрская программа СБОРКА — 20% комиссии" />
        <meta property="og:description" content="Зарабатывай 20% комиссии за каждого приведённого участника." />
        <meta property="og:url" content="https://mcphire.com/partners" />
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

      {/* Hero */}
      <section className="section-white">
        <div className="section-container">
          <span className="chip mb-6 inline-block">Партнёрская программа</span>
          <h1 className="heading-xl mb-6">
            ЗАРАБАТЫВАЙ,<br />РЕКОМЕНДУЯ СБОРКУ
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
            Рекомендуй СБОРКУ друзьям, коллегам и подписчикам.
            Получай 20% с каждой оплаты в течение 6 месяцев.
          </p>
          <a
            href="https://t.me/Sborka_partners_bot"
            className="cta-primary-nrc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Стать партнёром
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="section-white">
        <div className="section-container">
          <h2 className="heading-lg mb-10">Как это работает</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Получи ссылку",
                desc: "Напиши боту @Sborka_partners_bot. Бот автоматически выдаст персональную партнёрскую ссылку.",
              },
              {
                step: "02",
                title: "Делись ссылкой",
                desc: "Отправляй ссылку друзьям, публикуй в соцсетях, добавляй в описание профиля. Каждый переход отслеживается.",
              },
              {
                step: "03",
                title: "Получай комиссию",
                desc: "Когда приглашённый оплачивает подписку через Tribute, тебе начисляется 20% от суммы. Выплаты автоматически через Tribute.",
              },
            ].map((item) => (
              <div key={item.step} className="border border-border rounded-2xl p-6">
                <span
                  className="text-5xl font-black tracking-tighter block mb-4"
                  style={{ color: "hsl(174, 62%, 55%)" }}
                >
                  {item.step}
                </span>
                <h3 className="font-bold text-lg uppercase tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission details */}
      <section className="section-black">
        <div className="section-container">
          <h2 className="heading-lg mb-10">Условия</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="heading-md mb-6" style={{ color: "hsl(174, 62%, 55%)" }}>
                Партнёр получает
              </h3>
              <ul className="space-y-4">
                <li className="list-arrow list-arrow-green text-white">
                  <span>
                    <strong>20% комиссии</strong> с каждой оплаты приглашённого
                  </span>
                </li>
                <li className="list-arrow list-arrow-green text-white">
                  <span>
                    Комиссия начисляется <strong>6 месяцев</strong> с момента первой оплаты друга
                  </span>
                </li>
                <li className="list-arrow list-arrow-green text-white">
                  <span>
                    Выплаты <strong>2 раза в месяц</strong> через Tribute (10-го и 25-го)
                  </span>
                </li>
                <li className="list-arrow list-arrow-green text-white">
                  <span>
                    Минимальная сумма вывода: <strong>3 000 руб.</strong>
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <div className="border border-white/20 rounded-xl p-5">
                <p className="text-sm text-white/60 uppercase tracking-wide font-bold mb-3">
                  Сколько можно заработать
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/80">1 друг на СТАРТ (4 900 р)</span>
                    <span className="font-bold">980 р/мес</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">1 друг на ПРОРЫВ (9 900 р)</span>
                    <span className="font-bold">1 980 р/мес</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">1 друг на VIP (15 900 р)</span>
                    <span className="font-bold">3 180 р/мес</span>
                  </div>
                  <hr className="border-white/20 my-2" />
                  <div className="flex justify-between">
                    <span className="text-white/80">5 друзей на ПРОРЫВ</span>
                    <span className="font-bold" style={{ color: "hsl(174, 62%, 55%)" }}>
                      9 900 р/мес
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-white">
        <div className="section-container">
          <h2 className="heading-lg mb-10">Частые вопросы</h2>
          <div className="space-y-6 max-w-3xl">
            {[
              {
                q: "Кто может стать партнёром?",
                a: "Любой человек. Рекрутеры, HR, карьерные консультанты, блогеры, друзья наших участников. Быть подписчиком СБОРКА не обязательно.",
              },
              {
                q: "Как отслеживаются рефералы?",
                a: "Каждый партнёр получает уникальную ссылку вида t.me/Sborka_work_bot?start=ref_XXXXX. Когда человек переходит по ней и оплачивает подписку, система автоматически привязывает его к вам.",
              },
              {
                q: "Как происходят выплаты?",
                a: "Комиссия начисляется автоматически через Tribute. Выплаты 2 раза в месяц: 10-го и 25-го числа. Минимальная сумма для вывода: 3 000 руб. Для получения выплат нужна регистрация в Tribute и верификация.",
              },
              {
                q: "Сколько длится партнёрство?",
                a: "Комиссия с каждого приглашённого начисляется в течение 6 месяцев с момента его первой оплаты. Количество приглашённых не ограничено.",
              },
              {
                q: "Нужно ли платить за участие?",
                a: "Нет. Партнёрская программа полностью бесплатна.",
              },
            ].map((item, i) => (
              <div key={i} className="border-b border-border pb-5">
                <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-black">
        <div className="section-container text-center">
          <h2 className="heading-xl mb-6">НАЧНИ СЕЙЧАС</h2>
          <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Получи партнёрскую ссылку за 30 секунд. Без регистрации, без анкет.
          </p>
          <a
            href="https://t.me/Sborka_partners_bot"
            className="cta-primary-nrc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Написать боту
          </a>
        </div>
      </section>

      {/* Offer/Terms */}
      <section className="bg-muted py-12">
        <div className="section-container">
          <h2 className="font-bold text-sm uppercase tracking-wide text-muted-foreground mb-4">
            Условия партнёрской программы (оферта)
          </h2>
          <div className="text-xs text-muted-foreground space-y-3 max-w-3xl leading-relaxed">
            <p>
              1. Организатор партнёрской программы: ИП/самозанятый Зинин Тимофей Владимирович.
              Продукт: подписка на клуб карьерной дисциплины СБОРКА (sborka.work).
            </p>
            <p>
              2. Партнёром может стать любое дееспособное лицо старше 18 лет. Регистрация
              в программе осуществляется через бота @Sborka_partners_bot в Telegram.
            </p>
            <p>
              3. Партнёр получает уникальную реферальную ссылку и делится ею со своей аудиторией.
              За каждого пользователя, перешедшего по ссылке и оплатившего подписку на СБОРКА,
              партнёру начисляется вознаграждение в размере 20% от суммы оплаты.
            </p>
            <p>
              4. Вознаграждение начисляется в течение 6 (шести) календарных месяцев
              с даты первой оплаты приглашённого пользователя. По истечении этого срока
              начисление вознаграждения за данного пользователя прекращается.
            </p>
            <p>
              5. Выплата вознаграждения осуществляется через платформу Tribute
              (tribute.tg). Выплаты производятся дважды в месяц: 10-го и 25-го числа.
              Минимальная сумма для вывода средств составляет 3 000 рублей. Для получения
              выплат партнёр обязан пройти верификацию в Tribute.
            </p>
            <p>
              6. Партнёр обязуется не использовать спам, обман, введение в заблуждение
              и иные недобросовестные методы продвижения. Организатор вправе заблокировать
              партнёра и аннулировать начисленное вознаграждение в случае нарушения данного условия.
            </p>
            <p>
              7. Организатор вправе изменить условия программы, уведомив партнёров
              не менее чем за 14 календарных дней через Telegram-бота. Ранее начисленное
              и невыплаченное вознаграждение сохраняется.
            </p>
            <p>
              8. Партнёр несёт ответственность за правильность и актуальность данных,
              указанных при регистрации в Tribute. Организатор не несёт ответственности
              за задержки выплат, вызванные некорректными данными партнёра.
            </p>
            <p>
              9. Регистрация в партнёрской программе означает полное согласие
              с настоящими условиями.
            </p>
            <p className="pt-2 italic">
              Дата публикации: 19 февраля 2026 г. Последнее обновление: 19 февраля 2026 г.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8 border-t border-foreground">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-muted-foreground">
            <div>
              <Link to="/" className="font-bold text-foreground hover:text-muted-foreground transition-colors">
                MCPHire
              </Link>
              <p>AI-платформа для поиска IT-работы</p>
            </div>
            <Link to="/" className="cta-text text-sm">
              На главную
            </Link>
            <p>
              &copy; MCPHire 2026
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Partners;
