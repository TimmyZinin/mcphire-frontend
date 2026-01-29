import bgFormats from "@/assets/bg-formats.jpg";

const FormatsSection = () => {
  const formats = [
    "Открытые и закрытые вебинары",
    "Q&A-сессии с HR и маркетологом",
    "Разборы резюме и интервью",
    "Мастермайнды и групповые обсуждения",
    "Практические задания",
    "Чат без токсичности и инфо-шума",
  ];

  return (
    <section className="section-dark relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${bgFormats})` }}
      />
      
      {/* Decorative stars */}
      <div className="absolute top-20 right-20 text-secondary text-4xl animate-float">★</div>
      <div className="absolute bottom-20 left-20 text-accent text-3xl animate-float" style={{ animationDelay: '1s' }}>★</div>
      
      <div className="section-container relative z-10">
        <div className="space-y-12">
          {/* Heading */}
          <h2 className="heading-lg text-secondary">
            Что внутри
          </h2>
          
          {/* Formats grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {formats.map((format, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 bg-foreground p-4 md:p-6 comic-panel"
                style={{ transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)` }}
              >
                <span className="text-2xl text-primary">→</span>
                <span className="text-lg md:text-xl text-background font-medium">
                  {format}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormatsSection;
