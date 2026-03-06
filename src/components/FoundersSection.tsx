import timPhoto from "@/assets/tim-zinin.jpeg";
import kristinaPhoto from "@/assets/kristina-zhukova.jpeg";

const FoundersSection = () => {
  const founders = [
    {
      name: "Тим Зинин",
      role: "Маркетинг и стратегия",
      description: "20+ лет в маркетинге. Помог 500+ специалистам найти работу через LinkedIn и AI-инструменты.",
      image: timPhoto,
    },
    {
      name: "Кристина Жукова",
      role: "HR и карьера",
      description: "15+ лет в HR. Знает, как думают рекрутеры и что на самом деле смотрят в резюме.",
      image: kristinaPhoto,
    },
  ];

  return (
    <section className="section-white relative overflow-hidden">
      {/* Decorative circles — NRC palette */}
      <div className="absolute left-0 bottom-1/4 -translate-x-1/2 pointer-events-none opacity-10">
        <svg width="200" height="200" viewBox="0 0 200 200" className="animate-float-slow">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#4ECDC4" strokeWidth="2" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="#45B7D1" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="space-y-8">
          <h2 className="heading-xl">
            КТО ВЕДЁТ<br />
            MCPHire
          </h2>

          <p className="text-muted-foreground text-lg">
            Практики, которые сами прошли через сложный поиск работы.
          </p>

          {/* Founders grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {founders.map((founder, index) => (
              <div key={index} className="space-y-4">
                {/* Photo — rounded with shadow */}
                <div className="aspect-square overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={founder.image}
                    alt={`${founder.name} — ${founder.role}, основатель карьерного клуба MCPHire`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-black uppercase">
                    {founder.name}
                  </h3>
                  <p className="font-bold uppercase text-sm" style={{ color: '#4ECDC4' }}>
                    {founder.role}
                  </p>
                  <p className="text-muted-foreground text-lg">
                    {founder.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xl md:text-2xl font-bold pt-4">
            Не теоретики. Практики, которые знают рынок изнутри.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
