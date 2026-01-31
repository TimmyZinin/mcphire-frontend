import { Check, X } from "lucide-react";

const ForWhomSection = () => {
  const forWhom = [
    "Middle и Senior специалистам в активном поиске",
    "Руководителям и менеджерам",
    "Тем, кто устал от отказов и молчания",
    "Тем, кто готов работать над своей стратегией",
    "Тем, кто хочет закончить поиск за 2 месяца",
  ];

  const notFor = [
    "Ищешь волшебную таблетку — мимо",
    "Хочешь отсидеться и ничего не делать — мимо",
    "Ждёшь, что за тебя всё сделают — мимо",
    "Не готов слышать честную обратную связь — мимо",
  ];

  return (
    <section className="section-white relative overflow-hidden">
      {/* Decorative circles pattern */}
      <div className="absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2 pointer-events-none opacity-20">
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="140" fill="none" stroke="#DFFF00" strokeWidth="2" />
          <circle cx="150" cy="150" r="110" fill="none" stroke="#DFFF00" strokeWidth="2" />
          <circle cx="150" cy="150" r="80" fill="none" stroke="#DFFF00" strokeWidth="2" />
          <circle cx="150" cy="150" r="50" fill="none" stroke="#DFFF00" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="section-container relative z-10">
        <div className="space-y-12">
          {/* For whom */}
          <div className="space-y-6">
            <h2 className="heading-xl glitch-hover">
              ДЛЯ КОГО
            </h2>
            
            <ul className="space-y-4">
              {forWhom.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-base md:text-lg">
                  <Check className="w-6 h-6 mt-0.5 flex-shrink-0 text-primary" strokeWidth={3} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Not for */}
          <div className="space-y-6">
            <h3 className="heading-lg text-foreground glitch-hover">
              СБОРКА — НЕ ДЛЯ ВСЕХ
            </h3>
            
            <ul className="space-y-3">
              {notFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-base md:text-lg text-muted-foreground">
                  <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-muted-foreground/60" strokeWidth={2.5} />
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
