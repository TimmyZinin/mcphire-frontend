import formatsLaptop from "@/assets/formats-laptop.jpg";
import formatsHands from "@/assets/formats-hands.jpg";
import formatsWorkspace from "@/assets/formats-workspace.jpg";

const FormatsSection = () => {
  const formats = [
    {
      name: "Прожарка резюме",
      description: "Честный разбор. Узнаешь, что на самом деле видят рекрутеры.",
      lead: "ведёт Кристина",
    },
    {
      name: "Hot seat разборы",
      description: "Твоя ситуация — в центре внимания группы. Получаешь конкретные решения.",
      lead: null,
    },
    {
      name: "LinkedIn-сессии",
      description: "Профиль, который работает на тебя 24/7.",
      lead: "ведёт Тим",
    },
    {
      name: "Симуляции интервью",
      description: "Практика сложных вопросов. Обратная связь от экспертов.",
      lead: null,
    },
    {
      name: "AI-инструменты",
      description: "Автоматизация рутины. Больше откликов за меньшее время.",
      lead: "ведёт Тим",
    },
  ];

  const infrastructure = [
    "2 групповые сессии в неделю с экспертами",
    "Закрытый чат участников (только действующие соискатели)",
    "Записи всех сессий с таймкодами",
    "База знаний: шаблоны, скрипты, чек-листы",
  ];

  const images = [formatsLaptop, formatsHands, formatsWorkspace];

  return (
    <section className="section-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 pointer-events-none opacity-15">
        <svg width="350" height="350" viewBox="0 0 350 350">
          <circle cx="175" cy="175" r="160" fill="none" stroke="#DFFF00" strokeWidth="2" />
          <circle cx="175" cy="175" r="120" fill="none" stroke="#DFFF00" strokeWidth="2" />
          <circle cx="175" cy="175" r="80" fill="none" stroke="#DFFF00" strokeWidth="2" />
          <circle cx="175" cy="175" r="40" fill="#DFFF00" opacity="0.2" />
        </svg>
      </div>
      
      <div className="section-container relative z-10">
        <div className="space-y-12">
          {/* Heading with images */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h2 className="heading-xl glitch-hover">
                ЧТО ВНУТРИ<br />
                СИСТЕМЫ
              </h2>
              <p className="text-muted-foreground text-lg">
                Инструменты, которые превращают хаотичный поиск в системную работу.
              </p>
            </div>
            
            {/* Image grid */}
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, index) => (
                <div 
                  key={index} 
                  className="aspect-square overflow-hidden border-2 border-foreground"
                >
                  <img 
                    src={img} 
                    alt="Рабочая атмосфера" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Formats grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formats.map((format, index) => (
              <div 
                key={index}
                className="border-2 border-foreground p-6 space-y-2 hover:bg-primary transition-colors"
              >
                <h3 className="font-black uppercase text-lg">
                  {format.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {format.description}
                </p>
                {format.lead && (
                  <p className="text-xs font-bold uppercase text-primary-foreground bg-foreground inline-block px-2 py-1">
                    {format.lead}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Infrastructure list */}
          <div className="space-y-4">
            <h3 className="heading-md glitch-hover">Инфраструктура</h3>
            <ul className="space-y-3">
              {infrastructure.map((item, index) => (
                <li key={index} className="list-arrow">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Summary */}
          <p className="text-xl md:text-2xl font-bold pt-4 border-t-2 border-foreground">
            Всё, что нужно для системного поиска — в одном месте.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FormatsSection;
