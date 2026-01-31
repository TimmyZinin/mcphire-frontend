import { useEffect, useState } from "react";

const StickyHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show header after scrolling 100px
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-foreground transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-foreground">
          СБОРКА
        </a>

        {/* CTA Button */}
        <a
          href="https://t.me/sborka_club"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-tight hover:bg-foreground hover:text-background transition-colors"
        >
          ВСТУПИТЬ
        </a>
      </div>
    </header>
  );
};

export default StickyHeader;
