import { getNextWebinar } from "../data/webinarSchedule";

const WebinarCTABanner = () => {
  const next = getNextWebinar();

  return (
    <div className="bg-primary/5 border-y border-primary/20 py-6 md:py-8">
      <div className="max-w-4xl mx-auto px-6 md:px-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <p className="text-base md:text-lg font-bold text-foreground text-center sm:text-left">
          Ближайший вебинар — {next.formattedFull}
        </p>
        <a
          href="https://t.me/Sborka_work_bot?start=webinar_site"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-tight hover:bg-foreground hover:text-background transition-colors rounded-lg whitespace-nowrap"
        >
          Записаться бесплатно →
        </a>
      </div>
    </div>
  );
};

export default WebinarCTABanner;
