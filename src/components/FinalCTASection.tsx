const FinalCTASection = () => {
  return (
    <section className="section-black relative overflow-hidden">
      {/* Decorative circles - NRC palette */}
      <div className="absolute right-0 top-1/4 translate-x-1/2 pointer-events-none opacity-15">
        <svg width="400" height="400" viewBox="0 0 400 400" className="animate-float-slow">
          <circle cx="200" cy="200" r="180" fill="none" stroke="#4ECDC4" strokeWidth="2" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="#45B7D1" strokeWidth="2" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="#96CEB4" strokeWidth="2" />
        </svg>
      </div>

      <div className="absolute left-0 bottom-0 -translate-x-1/3 translate-y-1/3 pointer-events-none opacity-10">
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="120" fill="none" stroke="#4ECDC4" strokeWidth="3" />
          <circle cx="150" cy="150" r="60" fill="#4ECDC4" opacity="0.2" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-xl md:text-2xl text-background/60">
              Каждый день — шанс приблизиться к офферу.
            </p>
            <h2 className="heading-xl text-background">
              А МОЖНО НАЧАТЬ<br />
              МАРАФОН.
            </h2>
          </div>

          {/* Corgi walk photo — positive vibes */}
          <div className="overflow-hidden rounded-2xl shadow-xl max-w-md">
            <img
              src="/images/stride_v3.webp"
              alt="Уверенная девушка шагает навстречу рассвету — твой ход"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>

          <p className="text-xl md:text-2xl text-background/80 max-w-2xl">
            Не скорость, а постоянство. MCPHire окупается с первой зарплаты.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#pricing"
              className="cta-primary-nrc"
            >
              Начать марафон
            </a>
            {/* Hidden until referral program is enabled
            <a
              href="https://t.me/Sborka_work_bot?start=ref_trial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-5 border-2 border-background text-background font-black text-lg md:text-xl uppercase tracking-tight hover:bg-background hover:text-foreground transition-colors rounded-lg"
            >
              7 дней бесплатно
            </a>
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
