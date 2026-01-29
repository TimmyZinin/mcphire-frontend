import popartImage from "@/assets/sborka-popart.png";

const VisualSection = () => {
  return (
    <section className="py-section-sm md:py-section">
      <div className="section-container">
        <div className="relative">
          {/* Pop-art illustration container */}
          <div className="aspect-[16/9] md:aspect-[21/9] bg-card flex items-center justify-center overflow-hidden rounded-sm">
            <img 
              src={popartImage} 
              alt="СБОРКА - поп-арт иллюстрация" 
              className="w-full h-full object-cover"
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
