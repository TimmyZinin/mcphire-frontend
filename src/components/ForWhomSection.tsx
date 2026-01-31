import { X } from "lucide-react";

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
    <section className="section-white">
      <div className="section-container">
        <div className="space-y-12">
          {/* For whom */}
          <div className="space-y-6">
            <h2 className="heading-xl">
              ПОДОЙДЁТ
            </h2>
            
            <ul className="space-y-3">
              {forWhom.map((item, index) => (
                <li key={index} className="list-arrow list-arrow-green">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Not for */}
          <div className="space-y-6">
            <h3 className="heading-lg text-foreground">
              НЕ СЮДА
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
