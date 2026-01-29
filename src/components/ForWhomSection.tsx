const ForWhomSection = () => {
  const items = [
    "Если завис",
    "Если устал от инфобизнеса",
    "Если нужно собраться и действовать",
    "Если важна ясность, а не эмоции",
  ];

  return (
    <section className="py-section-sm md:py-section">
      <div className="section-container">
        <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-10">
          Для кого
        </h2>
        
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li 
              key={index}
              className="flex items-center text-lg md:text-xl text-foreground"
            >
              <span className="list-marker" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ForWhomSection;
