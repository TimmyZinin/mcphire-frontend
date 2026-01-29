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
    <section className="section-secondary relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${bgFormats})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/90" />
      
      <div className="section-container relative z-10">
        <div className="space-y-12">
          {/* Heading */}
          <h2 className="heading-lg text-secondary-foreground">
            Что внутри
          </h2>
          
          {/* Formats grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {formats.map((format, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 bg-background/10 p-4 md:p-6 backdrop-blur-sm"
              >
                <span className="text-2xl text-secondary-foreground">→</span>
                <span className="text-lg md:text-xl text-secondary-foreground font-medium">
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
