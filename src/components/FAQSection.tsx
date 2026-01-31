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
    <section className="section-dark border-t-4 border-border">
      <div className="section-container">
        <div className="space-y-10 max-w-3xl mx-auto">
          {/* Heading */}
          <h2 className="heading-lg text-center">
            FAQ
          </h2>
          
          {/* Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-4 border-border bg-card px-6"
              >
                <AccordionTrigger className="text-lg md:text-xl font-bold text-foreground hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-muted-foreground pb-6">
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
