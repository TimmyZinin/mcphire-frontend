const ForWhomSection = () => {
  const forWhom = [
    "Middle / Senior специалисты",
    "Руководители и тимлиды",
    "Люди в поиске работы",
    "Люди в карьерном тупике",
    "Те, кто устал от мотивационных курсов",
  ];

  const notFor = [
    "тем, кто ждёт «волшебную кнопку»",
    "тем, кто хочет быстрых обещаний",
    "тем, кто не готов работать",
  ];

  return (
    <section className="section-dark border-t-4 border-accent">
      <div className="section-container">
        <div className="space-y-16">
          {/* For whom */}
          <div className="space-y-8">
            <h2 className="heading-lg">
              Кому подойдёт{" "}
              <span className="text-primary">Сборка</span>
            </h2>
            
            <ul className="space-y-4">
              {forWhom.map((item, index) => (
                <li key={index} className="list-acid">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Not for */}
          <div className="space-y-8">
            <h3 className="heading-md text-destructive">
              Не подойдёт
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
