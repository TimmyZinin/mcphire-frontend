import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
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
      question: "А если не получится?",
      answer: "Мы работаем с тобой системно и даём все инструменты. Средний участник получает оффер за 6-8 недель при регулярной работе.",
    },
    {
      question: "Можно ли отменить подписку?",
      answer: "Да, в любой момент. Никаких контрактов или скрытых условий.",
    },
    {
      question: "Подойдёт ли мне, если я junior?",
      answer: "СБОРКА заточена под middle+ специалистов и руководителей. Для junior система может быть слишком интенсивной.",
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
