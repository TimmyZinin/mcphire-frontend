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
    <section className="section-dark border-t-4 border-primary">
      <div className="section-container">
        <div className="space-y-12">
          {/* Heading */}
          <h2 className="heading-lg text-foreground">
            Что внутри
          </h2>
          
          {/* Formats grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {formats.map((format, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 bg-card border-4 border-primary/20 p-4 md:p-6 hover:border-primary transition-colors"
              >
                <span className="text-2xl text-primary">→</span>
                <span className="text-lg md:text-xl text-foreground font-medium">
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
