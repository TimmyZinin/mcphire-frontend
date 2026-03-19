const TopBanner = ({ utmSource = "top_banner" }: { utmSource?: string }) => (
  <div className="bg-[#4ECDC4]/10 border-b border-[#4ECDC4]/20">
    <div className="max-w-[1280px] mx-auto px-8 py-3 flex items-center justify-between gap-4 flex-wrap">
      <p className="text-sm">
        <span className="font-semibold">MCPHire</span>
        <span className="text-muted-foreground"> — карьерный клуб с менторами и мок-собеседованиями. Средний участник получает оффер за 6-8 недель.</span>
      </p>
      <a
        href={`https://mcphire.com?utm_source=mcphire&utm_medium=top_banner&utm_campaign=${utmSource}`}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 inline-flex items-center px-4 py-1.5 rounded-full bg-[#4ECDC4] text-white text-xs font-semibold hover:bg-[#45B7D1] transition-colors"
      >
        Узнать о клубе →
      </a>
    </div>
  </div>
);

export default TopBanner;
