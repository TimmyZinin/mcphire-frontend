import visualImage from "@/assets/visual-impulse.png";

const VisualSection = () => {
  return (
    <section className="py-section-sm md:py-section">
      <div className="section-container">
        <div className="relative">
          {/* Abstract illustration container */}
          <div className="aspect-[16/9] md:aspect-[21/9] bg-card flex items-center justify-center overflow-hidden">
            <img 
              src={visualImage} 
              alt="Абстрактная иллюстрация импульса к действию" 
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Caption */}
          <p className="mt-6 text-sm text-muted-foreground text-center max-w-md mx-auto">
            Иногда нужно не вдохновение, а импульс, чтобы собраться.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisualSection;
