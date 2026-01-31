const FormatsSection = () => {
  const formats = [
    "стратегические вебинары",
    "групповые рабочие сессии",
    "разборы резюме",
    "подготовка к интервью",
    "практические задания",
    "трекинг",
    "закрытый чат без мусора",
    "сильное профессиональное окружение",
  ];

  return (
    <section className="section-white">
      <div className="section-container">
        <div className="space-y-8">
          {/* Heading */}
          <h2 className="heading-xl">
            ЧТО ВНУТРИ<br />
            КЛУБА
          </h2>
          
          {/* Formats list */}
          <ul className="space-y-3">
            {formats.map((format, index) => (
              <li key={index} className="list-arrow">
                {format}
              </li>
            ))}
          </ul>
          
          {/* Summary */}
          <p className="text-xl md:text-2xl font-bold pt-4">
            Это инфраструктура поиска работы.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FormatsSection;
