import formatsLaptop from "@/assets/formats-laptop.jpg";
import formatsHands from "@/assets/formats-hands.jpg";
import formatsWorkspace from "@/assets/formats-workspace.jpg";

const FormatsSection = () => {
  const formats = [
    {
      name: "Прожарка резюме",
      description: "Жёсткий разбор. Без комплиментов.",
      lead: "ведёт Кристина",
    },
    {
      name: "Hot seat разборы",
      description: "Твоя ситуация — в центре внимания группы.",
      lead: null,
    },
    {
      name: "LinkedIn-сессии",
      description: "Профиль, который работает на тебя.",
      lead: "ведёт Тим",
    },
    {
      name: "Карьерный трекинг",
      description: "Ежедневная отчётность. Публично.",
      lead: null,
    },
    {
      name: "AI-инструменты",
      description: "Автоматизация рутины поиска.",
      lead: "ведёт Тим",
    },
  ];

  const infrastructure = [
    "групповые рабочие сессии 2 раза в неделю",
    "закрытый чат без мусора",
    "записи всех сессий",
    "сильное профессиональное окружение",
  ];

  const images = [formatsLaptop, formatsHands, formatsWorkspace];

  return (
    <section className="section-white">
      <div className="section-container">
        <div className="space-y-12">
          {/* Heading with images */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h2 className="heading-xl glitch-hover">
                ЧТО ВНУТРИ<br />
                КЛУБА
              </h2>
              <p className="text-muted-foreground text-lg">
                Рабочая среда, где люди действуют вместе.
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
            <h3 className="heading-md">Инфраструктура</h3>
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
            Это не курс. Это инфраструктура для тех, кто готов работать.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FormatsSection;
