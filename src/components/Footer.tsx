import logoSborka from "@/assets/logo-sborka.png";

const Footer = () => {
  return (
    <footer className="bg-muted py-12 relative overflow-hidden">
      {/* Halftone pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle, hsl(0 0% 100% / 0.1) 1px, transparent 1px)',
        backgroundSize: '4px 4px'
      }} />
      
      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="max-w-[200px]">
            <img 
              src={logoSborka} 
              alt="СБОРКА" 
              className="w-full h-auto"
            />
          </div>
          
          {/* Links */}
          <div className="flex flex-col md:flex-row items-center gap-6 text-muted-foreground">
            <a 
              href="https://t.me/sborka_club" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors font-bold uppercase tracking-wider"
            >
              Telegram
            </a>
            <span className="hidden md:inline text-secondary">★</span>
            <span className="text-sm">
              © 2025 СБОРКА. Когда нужно собраться.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
