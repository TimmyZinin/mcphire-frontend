import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Сколько времени нужно?",
      answer: "В среднем 3–5 часов в неделю.",
    },
    {
      question: "Это курс?",
      answer: "Нет. Это рабочая среда.",
    },
    {
      question: "Как быстро будет результат?",
      answer: "Зависит от уровня и рынка. Наша задача — сократить путь.",
    },
    {
      question: "Можно ли выйти?",
      answer: "Да. Подписка управляется через Tribute.",
    },
  ];

  return (
    <section className="section-white">
      <div className="section-container">
        <div className="space-y-8 max-w-2xl">
          {/* Heading */}
          <h2 className="heading-xl">
            FAQ
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
