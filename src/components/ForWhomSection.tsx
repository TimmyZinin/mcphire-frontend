import bgForWhom from "@/assets/bg-for-whom.jpg";

const ForWhomSection = () => {
  const forWhom = [
    "middle и senior специалистам",
    "руководителям",
    "тем, кто застрял между этапами",
    "тем, кто устал искать вслепую",
    "тем, кто готов работать",
  ];

  const notFor = [
    "если хочешь, чтобы работу нашли за тебя",
    "если ищешь волшебную кнопку",
    "если не готов менять подход",
    "если удобнее жаловаться, чем действовать",
  ];

  return (
    <section className="section-dark border-t-4 border-accent relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${bgForWhom})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-l from-background via-background/90 to-background/80" />
      
      <div className="section-container relative z-10">
        <div className="space-y-16">
          {/* For whom */}
          <div className="space-y-8">
            <h2 className="heading-lg">
              Кому{" "}
              <span className="text-primary">подойдёт</span>
            </h2>
            
            <ul className="space-y-4">
              {forWhom.map((item, index) => (
                <li key={index} className="list-acid text-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Not for */}
          <div className="space-y-8">
            <h3 className="heading-md text-destructive">
              Кому не сюда
            </h3>
            
            <ul className="space-y-4">
              {notFor.map((item, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-4 text-lg md:text-xl text-muted-foreground"
                >
                  <span className="text-destructive font-bold flex-shrink-0">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWhomSection;
