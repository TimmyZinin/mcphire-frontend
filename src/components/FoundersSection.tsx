const FoundersSection = () => {
  const founders = [
    {
      name: "Тим Зинин",
      role: "Сооснователь",
      // Placeholder - заменить на реальное фото
      image: null,
    },
    {
      name: "Кристина Жукова",
      role: "Сооснователь",
      // Placeholder - заменить на реальное фото
      image: null,
    },
  ];

  return (
    <section className="py-section-sm md:py-section">
      <div className="section-container">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8 md:mb-12">
          Основатели
        </h2>
        
        <div className="grid grid-cols-2 gap-6 md:gap-12 max-w-xl mx-auto">
          {founders.map((founder) => (
            <div key={founder.name} className="text-center">
              {/* Avatar placeholder */}
              <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                {founder.image ? (
                  <img 
                    src={founder.image} 
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl md:text-4xl font-semibold text-muted-foreground">
                    {founder.name.charAt(0)}
                  </span>
                )}
              </div>
              
              <h3 className="font-medium text-foreground tracking-tight">
                {founder.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {founder.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
