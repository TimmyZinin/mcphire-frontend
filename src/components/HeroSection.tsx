import { useEffect, useRef, useState } from "react";

const LEVEL_COLORS = ['#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF6B6B'];
const LEVEL_NAMES = ['Подготовка', 'Резюме', 'Рассылка', 'Аутрич', 'Собесы', 'ОФФЕР'];

const CELEBRATION_EMOJIS = ['🎉', '🔥', '💥', '⭐', '✨', '🏆', '🥳', '💪'];

type Phase = 'running' | 'celebrating';

const HeroSection = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>('running');
  const [celebrationParticles, setCelebrationParticles] = useState<
    { emoji: string; x: number; y: number; id: number }[]
  >([]);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const phaseRef = useRef<Phase>('running');
  const particleIdRef = useRef(0);

  const currentLevel = phase === 'celebrating'
    ? LEVEL_COLORS.length - 1
    : Math.min(Math.floor(progress / (100 / LEVEL_COLORS.length)), LEVEL_COLORS.length - 1);

  useEffect(() => {
    const RUN_MS = 7000;
    const CELEBRATE_MS = 2000;
    const cycleStartRef = { current: 0 };
    const celebrateStartRef = { current: 0 };

    const animate = (timestamp: number) => {
      if (!cycleStartRef.current) cycleStartRef.current = timestamp;

      const elapsed = timestamp - cycleStartRef.current;

      if (phaseRef.current === 'running') {
        if (elapsed >= RUN_MS) {
          // Transition to celebration
          phaseRef.current = 'celebrating';
          celebrateStartRef.current = timestamp;
          setPhase('celebrating');
          setProgress(100);

          const particles = [];
          for (let i = 0; i < 12; i++) {
            particles.push({
              emoji: CELEBRATION_EMOJIS[Math.floor(Math.random() * CELEBRATION_EMOJIS.length)],
              x: 85 + (Math.random() - 0.5) * 30,
              y: Math.random() * 100,
              id: particleIdRef.current++,
            });
          }
          setCelebrationParticles(particles);
        } else {
          setProgress((elapsed / RUN_MS) * 100);
        }
      } else {
        // Celebrating
        if (timestamp - celebrateStartRef.current >= CELEBRATE_MS) {
          // Reset to running — start fresh from 0
          phaseRef.current = 'running';
          cycleStartRef.current = timestamp;
          setPhase('running');
          setProgress(0);
          setCelebrationParticles([]);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const currentColor = LEVEL_COLORS[currentLevel];

  return (
    <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="w-full max-w-4xl mx-auto px-6 md:px-8 relative z-10 text-center">
        <div className="space-y-10">
          {/* Pre-title */}
          <p className="text-lg md:text-xl text-muted-foreground uppercase tracking-wider">
            Клуб карьерной дисциплины
          </p>

          {/* Logo/Title */}
          <h1 className="heading-hero text-foreground">
            СБОРКА
          </h1>

          {/* Marathon tagline */}
          <p className="text-lg md:text-xl lg:text-2xl font-medium text-foreground max-w-2xl mx-auto">
            Марафон к офферу — вместе.
          </p>

          {/* Animated marathon track */}
          <div className="max-w-2xl mx-auto pt-4" data-testid="hero-progress">
            {/* Runner lane — above the track */}
            <div className="relative h-14 mb-1">
              {/* Runner or celebration */}
              {phase === 'running' ? (
                <div
                  className="absolute bottom-0 pointer-events-none"
                  style={{
                    left: `${Math.min(progress, 96)}%`,
                    transform: 'translateX(-50%)',
                    transition: 'left 0.05s linear',
                  }}
                >
                  <span
                    style={{
                      fontSize: 36,
                      lineHeight: 1,
                      display: 'inline-block',
                      animation: 'runner-bounce 0.35s ease-in-out infinite',
                    }}
                  >
                    🏃
                  </span>
                </div>
              ) : (
                /* Celebration — trophy at finish + emoji explosion */
                <div
                  className="absolute bottom-0 pointer-events-none"
                  style={{
                    left: '96%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 36,
                      lineHeight: 1,
                      display: 'inline-block',
                      animation: 'celebrate-pop 0.6s ease-out both',
                    }}
                  >
                    🏆
                  </span>
                </div>
              )}

              {/* Celebration particles */}
              {celebrationParticles.map((p) => (
                <div
                  key={p.id}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    animation: 'particle-fly 1.8s ease-out forwards',
                  }}
                >
                  <span style={{ fontSize: 20 }}>{p.emoji}</span>
                </div>
              ))}

              {/* Finish line — checkered flag */}
              <div className="absolute bottom-0 right-0 pointer-events-none opacity-70">
                <svg width="20" height="36" viewBox="0 0 20 36" fill="none">
                  <rect x="1" y="0" width="2" height="36" fill="#FF6B6B" rx="1" />
                  <rect x="3" y="1" width="5" height="5" fill="#FF6B6B" />
                  <rect x="8" y="1" width="5" height="5" fill="white" stroke="#eee" strokeWidth="0.5" />
                  <rect x="3" y="6" width="5" height="5" fill="white" stroke="#eee" strokeWidth="0.5" />
                  <rect x="8" y="6" width="5" height="5" fill="#FF6B6B" />
                  <rect x="3" y="11" width="5" height="5" fill="#FF6B6B" />
                  <rect x="8" y="11" width="5" height="5" fill="white" stroke="#eee" strokeWidth="0.5" />
                </svg>
              </div>
            </div>

            {/* Track bar */}
            <div className="relative">
              <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                {LEVEL_COLORS.map((color, i) => (
                  <div
                    key={i}
                    className="h-full"
                    style={{
                      width: `${100 / LEVEL_COLORS.length}%`,
                      backgroundColor: color,
                      opacity: i <= currentLevel ? 0.85 : 0.15,
                      transition: 'opacity 0.4s ease',
                    }}
                  />
                ))}
              </div>

              {/* Sprint dividers */}
              {LEVEL_COLORS.slice(1).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 h-3 w-0.5"
                  style={{
                    left: `${((i + 1) * 100) / LEVEL_COLORS.length}%`,
                    backgroundColor: 'white',
                    opacity: 0.5,
                  }}
                />
              ))}

              {/* Glow trail */}
              {phase === 'running' && (
                <div
                  className="absolute top-0 h-3 rounded-full pointer-events-none"
                  style={{
                    left: `${Math.max(progress - 6, 0)}%`,
                    width: '6%',
                    background: `linear-gradient(90deg, transparent, ${currentColor}50)`,
                    filter: 'blur(3px)',
                    transition: 'left 0.05s linear',
                  }}
                />
              )}

              {/* Celebration glow — full track lights up */}
              {phase === 'celebrating' && (
                <div
                  className="absolute top-0 h-3 rounded-full pointer-events-none"
                  style={{
                    left: 0,
                    width: '100%',
                    background: 'linear-gradient(90deg, #4ECDC440, #45B7D140, #96CEB440, #FFEAA740, #DDA0DD40, #FF6B6B40)',
                    animation: 'track-glow 0.5s ease-in-out infinite alternate',
                  }}
                />
              )}
            </div>

            {/* Level names — below track */}
            <div className="flex justify-between mt-3 px-0">
              {LEVEL_NAMES.map((name, i) => (
                <div
                  key={name}
                  className="flex flex-col items-center"
                  style={{ width: `${100 / LEVEL_COLORS.length}%` }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full mb-1 transition-all duration-300"
                    style={{
                      backgroundColor: LEVEL_COLORS[i],
                      opacity: i <= currentLevel ? 1 : 0.25,
                      transform: i === currentLevel ? 'scale(2)' : 'scale(1)',
                    }}
                  />
                  <span
                    className="text-[9px] md:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap"
                    style={{
                      color: i <= currentLevel ? LEVEL_COLORS[i] : 'hsl(0 0% 72%)',
                      fontWeight: i === currentLevel ? 900 : 700,
                    }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Definition block — optimized for AI citation */}
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            СБОРКА — подписочный карьерный клуб для специалистов Middle, Senior и Lead. Внутри: менторы с опытом 8+ лет в рекрутинге, мок-собеседования, разбор резюме, командные соревнования по поиску работы. Подписка от 4 900 руб./мес. Средний участник получает оффер за 6-8 недель.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <a
              href="#pricing"
              className="cta-primary-nrc"
              data-testid="hero-cta"
            >
              СМОТРЕТЬ ТАРИФЫ
            </a>

            <a
              href="https://t.me/Sborka_work_bot?start=webinar3_site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#4ECDC4] text-[#4ECDC4] font-bold text-base uppercase tracking-tight hover:bg-[#4ECDC4] hover:text-background transition-colors rounded-lg"
            >
              Открытый вебинар →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
