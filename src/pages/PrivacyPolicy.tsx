import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Политика конфиденциальности | MCPHire</title>
        <meta name="description" content="Политика конфиденциальности карьерного клуба MCPHire. Обработка персональных данных в соответствии с ФЗ-152." />
        <link rel="canonical" href="https://mcphire.com/privacy" />
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
        <div className="section-container">
          <h1 className="heading-xl mb-8">Политика конфиденциальности</h1>

          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <p className="text-base">
              Настоящая политика конфиденциальности (далее — «Политика») действует в отношении всей информации,
              которую сайт mcphire.com (далее — «Сайт») может получить о пользователе во время использования Сайта.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">1. Общие положения</h2>
            <p>
              1.1. Оператором персональных данных является ИП Зинин Тимофей Владимирович, далее — «Оператор».
            </p>
            <p>
              1.2. Настоящая Политика определяет порядок обработки персональных данных и меры по обеспечению
              их безопасности.
            </p>
            <p>
              1.3. Используя Сайт, пользователь соглашается с условиями настоящей Политики.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">2. Какие данные мы собираем</h2>
            <p>
              2.1. Мы собираем следующие персональные данные:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Имя пользователя (при регистрации в боте)</li>
              <li>Адрес электронной почты (при оформлении подписки)</li>
              <li>Telegram username (при взаимодействии с ботом @Sborka_work_bot)</li>
              <li>Данные об использовании сайта (аналитика Umami, без cookies)</li>
            </ul>
            <p>
              2.2. Мы не собираем специальные категории персональных данных (биометческие, данные о здоровье и т.д.).
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">3. Цели обработки данных</h2>
            <p>
              3.1. Мы используем персональные данные для следующих целей:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Оказание услуг по подписке на карьерный клуб MCPHire</li>
              <li>Обратная связь с пользователями</li>
              <li>Информирование о новых материалах и мероприятиях</li>
              <li>Аналитика посещаемости Сайта (через Umami)</li>
              <li>Улучшение качества услуг</li>
            </ul>

            <h2 className="text-xl font-bold text-foreground mt-8">4. Хранение и защита данных</h2>
            <p>
              4.1. Персональные данные хранятся на защищённых серверах в Российской Федерации.
            </p>
            <p>
              4.2. Мы применяем соответствующие технические и организационные меры для защиты данных от
              несанкционированного доступа, изменения, раскрытия или уничтожения.
            </p>
            <p>
              4.3. Срок хранения персональных данных — в течение всего периода использования Сайта и 3 года после
              прекращения использования.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">5. Права пользователя</h2>
            <p>
              Пользователь имеет право:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Получить доступ к своим персональным данным</li>
              <li>Исправить неточные данные</li>
              <li>Удалить свои персональные данные</li>
              <li>Отозвать согласие на обработку данных</li>
              <li>Подать жалобу в Роскомнадзор</li>
            </ul>

            <h2 className="text-xl font-bold text-foreground mt-8">6. Аналитика</h2>
            <p>
              6.1. Сайт использует Umami — open-source систему аналитики, которая не использует cookies
              и не собирает персональные данные посетителей.
            </p>
            <p>
              6.2. Аналитика работает в анонимном режиме и соответствует требованиям GDPR и ФЗ-152.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">7. Изменения политики</h2>
            <p>
              7.1. Мы оставляем за собой право изменять настоящую Политику в любое время.
            </p>
            <p>
              7.2. Изменения вступают в силу с момента их размещения на Сайте.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">8. Контакты</h2>
            <p>
              По всем вопросам, связанным с обработкой персональных данных, обращайтесь:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Telegram: @Sborka_work_bot</li>
              <li>Канал: <a href="https://t.me/public_sborka" className="text-primary hover:underline">@public_sborka</a></li>
            </ul>

            <p className="mt-8 text-sm">
              Дата публикации: 19 февраля 2026 г.
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
              <p>Клуб карьерной дисциплины</p>
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

export default PrivacyPolicy;
