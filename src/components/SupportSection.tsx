import illustrationSupport from "@/assets/illustration-support.jpg";

const SupportSection = () => {
  const points = [
    "опора",
    "структура",
    "рабочее состояние",
  ];

  return (
    <section className="section-dark border-t-4 border-primary">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-12">
            {/* Heading */}
            <h2 className="heading-lg">
              Когда нужно собраться —{" "}
              <span className="text-primary">это нормально</span>
            </h2>
            
            {/* Text */}
            <div className="space-y-4">
              <p className="text-xl md:text-2xl text-muted-foreground">
                Ты не обязан быть сильным всё время.
              </p>
              <p className="text-xl md:text-2xl text-foreground font-bold">
                Но ты можешь собраться.
              </p>
            </div>
            
            {/* Points */}
            <div className="flex flex-col md:flex-row gap-6">
              {points.map((point, index) => (
                <div 
                  key={index}
                  className="bg-card border-4 border-primary px-8 py-4"
                >
                  <span className="text-xl md:text-2xl text-foreground font-bold uppercase tracking-wider">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Illustration */}
          <div className="relative">
            <img 
              src={illustrationSupport} 
              alt="Поддержка группы"
              className="w-full h-auto border-4 border-primary"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
