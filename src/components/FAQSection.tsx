import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Что такое MCPHire?",
      answer: "MCPHire — это подписочный карьерный клуб для специалистов уровня Middle, Senior и Lead. Внутри: групповые сессии с менторами, разбор резюме, мок-собеседования, переговоры о зарплате и командные соревнования по поиску работы. Всё в Telegram, живые сессии.",
    },
    {
      question: "Сколько стоит подписка на MCPHire?",
      answer: "Три тарифа: СТАРТ 4 900 руб/мес (групповые сессии + соревнование), ПРОРЫВ 9 900 руб/мес (+ разбор резюме + мок-собеседования), VIP 15 900 руб/мес (+ персональный ментор).",
    },
    {
      question: "Сколько времени нужно уделять?",
      answer: "5-6 часов в неделю: 2 групповые сессии + командное соревнование + самостоятельная работа. Это минимум для реального результата.",
    },
    {
      question: "Это онлайн-курс?",
      answer: "Нет. Это живая рабочая среда с регулярными сессиями, командным соревнованием и обратной связью от экспертов. Никаких записанных видео «посмотри когда-нибудь».",
    },
    {
      question: "Как быстро будет результат?",
      answer: "Средний участник получает первый оффер за 6-8 недель. Зависит от уровня, рынка и того, насколько системно ты работаешь.",
    },
    {
      question: "Чем MCPHire отличается от курсов по трудоустройству?",
      answer: "Курсы дают записанные лекции. MCPHire — это живая среда: ты работаешь с менторами в реальном времени, получаешь обратную связь на своё резюме и проходишь мок-собеседования. Плюс командное соревнование, которое не даёт расслабиться.",
    },
    {
      question: "Кто менторы в MCPHire?",
      answer: "Кристина Жукова — 8 лет в рекрутинге, работала с IT-компаниями от стартапов до корпораций. Тим Зинин — специалист по AI и продуктовому развитию. Плюс приглашённые эксперты из индустрии.",
    },
    {
      question: "Как проходят вебинары?",
      answer: "Вебинары проходят в Zoom, обычно по вечерам (18:00-19:30 МСК). Темы: как устроен найм, разбор резюме, подготовка к собеседованиям, переговоры о зарплате. Участие бесплатное, регистрация через Telegram-бот @Sborka_work_bot.",
    },
    {
      question: "Подходит ли MCPHire для смены профессии?",
      answer: "Да. Многие участники приходят именно за этим. Менторы помогают оценить текущие навыки, составить план перехода и подготовить резюме под новую роль.",
    },
    {
      question: "Можно ли попробовать перед покупкой?",
      answer: "Да. Мы проводим бесплатные открытые вебинары, где можно познакомиться с менторами и задать вопросы. Регистрация через Telegram-бот @Sborka_work_bot.",
    },
    {
      question: "Есть ли гарантия трудоустройства?",
      answer: "Гарантию трудоустройства мы не даём — это было бы нечестно, потому что результат зависит от рынка и твоих усилий. Но мы даём систему, инструменты и экспертную поддержку. Средний результат — оффер за 6-8 недель при регулярной работе.",
    },
    {
      question: "А если не получится?",
      answer: "Мы работаем с тобой системно и даём все инструменты. Средний участник получает оффер за 6-8 недель при регулярной работе.",
    },
    {
      question: "Можно ли отменить подписку?",
      answer: "Да, в любой момент. Никаких контрактов или скрытых условий.",
    },
    {
      question: "Подойдёт ли мне, если я junior?",
      answer: "MCPHire заточена под middle+ специалистов и руководителей. Для junior система может быть слишком интенсивной.",
    },
  ];

  return (
    <section className="section-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute right-0 top-1/4 translate-x-1/2 pointer-events-none opacity-10">
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="140" fill="none" stroke="#4ECDC4" strokeWidth="2" />
          <circle cx="150" cy="150" r="100" fill="none" stroke="#4ECDC4" strokeWidth="2" />
          <circle cx="150" cy="150" r="60" fill="none" stroke="#4ECDC4" strokeWidth="2" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="space-y-8 max-w-2xl">
          {/* Heading */}
          <h2 className="heading-xl glitch-hover">
            ВОПРОСЫ
          </h2>

          {/* Accordion */}
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-2 border-foreground px-6 bg-background"
              >
                <AccordionTrigger className="text-lg font-bold hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
