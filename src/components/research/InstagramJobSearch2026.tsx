import { Link } from "react-router-dom";

const SborkaCTA = ({ variant = "default" }: { variant?: "default" | "compact" }) => (
  <div
    className={`rounded-2xl text-center ${
      variant === "compact"
        ? "bg-[#FFF3E6] p-6 my-8"
        : "bg-gradient-to-br from-[#2D6A4F] to-[#74A68D] p-10 my-12 text-white"
    }`}
  >
    {variant === "compact" ? (
      <>
        <p className="font-bold text-[#3D2C1E] mb-2">
          Хочешь систему, а не разрозненные советы?
        </p>
        <p className="text-sm text-[#6B5B4E] mb-4">
          СБОРКА — карьерный клуб с метриками, дедлайнами и поддержкой экспертов
        </p>
        <a
          href="https://t.me/Sborka_work_bot?start=research"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#C4573A] text-white font-bold text-sm px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity"
        >
          Попробовать бесплатно
        </a>
      </>
    ) : (
      <>
        <p className="text-lg font-bold mb-2">
          СБОРКА решает эти боли системно
        </p>
        <p className="text-sm opacity-90 mb-6 max-w-lg mx-auto">
          Резюме, собеседования, переговоры, AI-инструменты, поддержка комьюнити.
          Не коучинг — система с метриками и дедлайнами.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href="https://t.me/Sborka_work_bot?start=research"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#2D6A4F] font-bold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Начать в боте
          </a>
          <Link
            to="/"
            className="inline-block border-2 border-white/60 text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
          >
            Узнать о клубе
          </Link>
        </div>
      </>
    )}
  </div>
);

const hashtagData = [
  { label: "#удаленнаяработа", width: "100%", count: "1.8M", color: "from-[#E8735A] to-[#C4573A]" },
  { label: "#карьера", width: "54%", count: "982K", color: "from-[#74A68D] to-[#2D6A4F]" },
  { label: "#поискработы", width: "17%", count: "318K", color: "from-[#D4A853] to-[#B8922F]" },
  { label: "#резюме", width: "12%", count: "219K", color: "from-[#FFD6B0] to-[#E8735A]" },
  { label: "#удалённаяработа", width: "10%", count: "184K", color: "from-[#74A68D] to-[#2D6A4F]" },
  { label: "#собеседование", width: "6.5%", count: "120K", color: "from-[#E8735A] to-[#C4573A]" },
  { label: "#увольнение", width: "3.5%", count: "63K", color: "from-[#D4A853] to-[#B8922F]" },
  { label: "#карьерамечты", width: "1.8%", count: "33K", color: "from-[#FFD6B0] to-[#E8735A]" },
  { label: "#собеседованиенаанглийском", width: "0.5%", count: "8.4K", color: "from-[#74A68D] to-[#2D6A4F]" },
  { label: "#карьеравайти", width: "0.1%", count: "1.7K", color: "from-[#E8735A] to-[#C4573A]" },
];

const pains = [
  { text: "Ghosting — никто не отвечает на отклик", score: 9, width: "90%" },
  { text: "Страх перемен, синдром самозванца", score: 8, width: "80%" },
  { text: "Стресс на собеседованиях (5 этапов!)", score: 8, width: "80%" },
  { text: "Не знаю, что писать в резюме, ATS отсеивает", score: 7, width: "70%" },
  { text: "Тестовое задание = бесплатный труд", score: 7, width: "70%" },
  { text: "Не умею торговаться за зарплату", score: 7, width: "70%" },
  { text: "hh.ru перегружен, где ещё искать?", score: 6, width: "60%" },
];

const bloggers = [
  {
    name: "Анна Филина",
    handle: "@anna_filina_hrfeedback",
    desc: "«Ваш корпоративный проводник». Разборы резюме, подготовка к собеседованиям. Карусели с чек-листами.",
    stats: ["178K подписчиков", "831 пост", "2,500 лайков/пост"],
    emoji: "👩‍💼",
    gradient: "from-[#FFD6B0] to-[#E8735A]",
  },
  {
    name: "Ангелина Марди",
    handle: "@hr_angelina_mardi",
    desc: "HRBP Ленты. Вирусные Reels с ситуативными диалогами «HR vs кандидат». Рекорд — 45K лайков.",
    stats: ["11.8K подписчиков", "45K лайков (макс)", "Reels-first"],
    emoji: "🎬",
    gradient: "from-[#B7D7C8] to-[#74A68D]",
  },
  {
    name: "Белла Омерова",
    handle: "@bella.omerova",
    desc: "Карьерный коуч ACC ICF, ВШЭ. 9 лет в HR (30 стран, Coca-Cola, ПСБ, BIC).",
    stats: ["26.9K подписчиков", "2,030 постов", "365 лайков/пост"],
    emoji: "🌍",
    gradient: "from-[#F5E6C8] to-[#D4A853]",
  },
  {
    name: "Алёна @yaneponyala",
    handle: "@yaneponyala",
    desc: "«Поиск работы здорового человека». Gen Z tone. Гайды как лид-магниты — 1,829 комментов.",
    stats: ["10K подписчиков", "7,517 лайков (макс)", "541 комм/пост"],
    emoji: "💅",
    gradient: "from-[#FFD6B0] to-[#E8735A]",
  },
  {
    name: "Елена Решетникова",
    handle: "@elena_reshetnikova",
    desc: "10+ лет в HR, 3000+ часов практики. Рекорд: 1,411 комментов (соотношение 3.5:1).",
    stats: ["34.5K подписчиков", "1,017 постов", "1,411 комм. (макс)"],
    emoji: "🔍",
    gradient: "from-[#B7D7C8] to-[#74A68D]",
  },
];

const viralPosts = [
  {
    title: "Reel #1: Переговоры о зарплате",
    author: "@hr_angelina_mardi",
    quote: "«Не спешила соглашаться. Обосновала цифру ценностью, а не потребностями. Привела конкретные достижения и рыночные данные.»",
    metrics: [{ icon: "❤️", value: "45,671 лайков" }, { icon: "💬", value: "1,003 комментов" }],
  },
  {
    title: "Карусель: «Лучшие источники вакансий»",
    author: "@yaneponyala",
    quote: '«Отрываю от сердца… полный список лучших источников для поиска вакансий забирай по слову "гайд"!»',
    metrics: [{ icon: "❤️", value: "7,517 лайков" }, { icon: "💬", value: "1,829 комментов" }],
  },
  {
    title: "Карусель: «Почему не отвечают на резюме»",
    author: "@anna_filina_hrfeedback",
    quote: "«Вы отправляете десятки резюме, но никто не отвечает? Кажется, что все вакансии закрыты для вас?»",
    metrics: [{ icon: "❤️", value: "617 лайков" }, { icon: "💬", value: "22 коммента" }],
  },
];

const insights = [
  { num: 1, title: "AI для поиска работы — пустая ниша", desc: "На русском в Instagram никто не делает контент про AI-инструменты для соискателей. First mover advantage." },
  { num: 2, title: "Готовые скрипты = вирусность", desc: "Самый залетевший пост (45K лайков) — дословные фразы для переговоров. Люди хотят «что именно сказать»." },
  { num: 3, title: "Reels + карусели = единственная стратегия", desc: "Reels дают охват (5-10x). Карусели дают saves (10-15%). Без них в Instagram 2026 делать нечего." },
  { num: 4, title: "Страх > мотивация", desc: "Рынок перевернулся (-26% вакансий, +31% резюме). «Как адаптироваться» резонирует сильнее, чем «верь в себя»." },
  { num: 5, title: "Два голоса — уникальное преимущество", desc: "Ни один конкурент не даёт одновременно взгляд кандидата (tech) и HR. Формат «Рекрутер vs Кандидат» не занят." },
  { num: 6, title: "Комменты-гейты работают", desc: "Механика «пиши гайд и получи» даёт 500-1800 комментов. Алгоритм Instagram обожает комменты." },
  { num: 7, title: "Региональная аудитория недооценена", desc: "70% населения РФ не в Москве. Контент про удалёнку и региональный рынок — пустая ниша." },
];

const niches = [
  { badge: "пусто", title: "AI-инструменты для поиска работы", desc: "Ниша полностью свободна на русском. First mover advantage." },
  { badge: "слабо", title: "Системный подход (не разовые советы)", desc: "Все дают советы россыпью. Никто не строит СИСТЕМУ: 6-8 недель, трекер, спринты." },
  { badge: "пусто", title: "Психология отказов и ghosting", desc: "Инструментов работы с эмоциями при поиске работы не даёт никто." },
  { badge: "слабо", title: "Поиск работы после 35/40/45", desc: "Табу-тема. Большинство блогеров молодые. 40+ — огромная аудитория с острой болью." },
  { badge: "пусто", title: "Формат «клуб взаимоподдержки»", desc: "Все продают 1-на-1 консультации. Комьюнити-формат не представлен." },
  { badge: "слабо", title: "Не-IT профессии", desc: "Весь контент для айтишников. Маркетологи, финансисты, HR — игнорируются." },
];

const Divider = () => (
  <div className="h-0.5 max-w-[400px] mx-auto bg-gradient-to-r from-transparent via-[#FFD6B0] to-transparent" />
);

const InstagramJobSearch2026 = () => {
  return (
    <div className="bg-[#FFF8F2] text-[#3D2C1E]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#FFF3E6] via-[#FFD6B0] to-[#FBBF8A] py-16 md:py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute -top-1/2 -right-1/5 w-[600px] h-[600px] rounded-full bg-white/25 pointer-events-none" />
        <div className="relative z-10">
          <Link
            to="/knowledge"
            className="text-sm text-[#6B5B4E] hover:text-[#C4573A] transition-colors mb-6 inline-block"
          >
            ← Назад в Блог
          </Link>
          <div className="inline-block bg-[#C4573A] text-white text-xs font-bold tracking-widest uppercase px-5 py-1.5 rounded-full mb-6">
            Исследование СБОРКИ 2026
          </div>
          <h1
            className="text-3xl md:text-5xl font-extrabold leading-tight max-w-3xl mx-auto mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Как русскоязычные люди ищут работу в Instagram
          </h1>
          <p className="text-base md:text-lg text-[#6B5B4E] max-w-xl mx-auto mb-8">
            Анализ хэштегов, блогеров, вирусного контента и болей соискателей. Данные Instagram API, март 2026.
          </p>
          <div className="flex justify-center gap-6 md:gap-10 flex-wrap">
            {[
              { num: "120+", label: "аккаунтов найдено" },
              { num: "30", label: "хэштегов" },
              { num: "1.8M", label: "постов #удаленнаяработа" },
              { num: "45K", label: "лайков на вирусном Reel" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-[#C4573A]">{s.num}</div>
                <div className="text-xs md:text-sm text-[#6B5B4E] font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto px-6">
        {/* HASHTAGS */}
        <section className="py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Карта хэштегов
          </h2>
          <p className="text-[#6B5B4E] mb-10">Что обсуждают — топ тегов по количеству постов в Instagram</p>

          <div className="max-w-[700px] space-y-3">
            {hashtagData.map((h) => (
              <div key={h.label} className="flex items-center gap-3">
                <span className="min-w-[140px] md:min-w-[200px] text-right text-sm font-semibold truncate">
                  {h.label}
                </span>
                <div className="flex-1 h-8 bg-[#FFF3E6] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full flex items-center justify-end pr-3 text-xs font-bold text-white bg-gradient-to-r ${h.color}`}
                    style={{ width: h.width, minWidth: "40px" }}
                  >
                    {h.count}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[
              { icon: "📡", title: "Удалёнка > Карьера", desc: "#удаленнаяработа (1.8M) обгоняет #карьера (982K) почти в 2 раза.", bg: "bg-[#E8735A]/15" },
              { icon: "📍", title: "Локальный поиск жив", desc: "#резюмеалматы (24K), #карьерахабаровск (11K). Люди ищут работу ЛОКАЛЬНО.", bg: "bg-[#74A68D]/15" },
              { icon: "💔", title: "Увольнение — отдельная боль", desc: "#увольнение (63K) — самостоятельная болезненная тема, не просто этап.", bg: "bg-[#D4A853]/15" },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(61,44,30,0.08)] border border-[#D4A853]/15 hover:shadow-[0_8px_40px_rgba(61,44,30,0.14)] hover:-translate-y-1 transition-all">
                <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center text-3xl mb-4`}>{c.icon}</div>
                <h3 className="text-lg font-bold mb-2">{c.title}</h3>
                <p className="text-sm text-[#6B5B4E] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* PAINS */}
        <section className="py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Боли соискателей
          </h2>
          <p className="text-[#6B5B4E] mb-10">Воронка боли — от осознания до оффера. Баллы по 10-балльной шкале</p>

          <div className="max-w-[600px] mx-auto space-y-3">
            {pains.map((p) => (
              <div key={p.text} className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-[0_4px_24px_rgba(61,44,30,0.08)] border-l-[5px] border-[#74A68D] hover:translate-x-2 transition-transform">
                <span className="flex-1 text-sm font-semibold">{p.text}</span>
                <div className="w-[120px] h-2.5 bg-[#FFF3E6] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#74A68D] to-[#E8735A]" style={{ width: p.width }} />
                </div>
                <span className="text-sm font-extrabold text-[#C4573A] min-w-[36px] text-right">{p.score}/10</span>
              </div>
            ))}
          </div>

          {/* Quote banner */}
          <div className="bg-gradient-to-br from-[#2D6A4F] to-[#74A68D] rounded-3xl p-10 md:p-12 text-white text-center my-10">
            <blockquote
              className="text-lg md:text-xl font-bold leading-relaxed max-w-[700px] mx-auto mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              «Самое сложное в поиске работы — первый шаг. Не потому что лень. А потому что за ним стоит целый вагон
              внутренних переживаний, страха отказа и ощущения "я недостаточно хорош"»
            </blockquote>
            <cite className="text-sm opacity-80 not-italic">— @hr_angelina_mardi, карьерный блогер</cite>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "📉", title: "Рынок перевернулся", desc: "Вакансии упали на 26% (до 1.1 млн), а резюме выросли на 31% (до 7.2 млн).", stat: "-26% вакансий" },
              { icon: "🤖", title: "AI-тревожность", desc: "52% россиян считают, что AI повлияет на их профессию. Кто освоил AI — находят работу быстрее.", stat: "52% боятся" },
              { icon: "😶", title: "Зарплатный газлайтинг", desc: "40% вакансий без зарплаты. Кандидат проходит 3-4 этапа и узнаёт, что оффер ниже.", stat: "40% без зарплат" },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(61,44,30,0.08)] border border-[#D4A853]/15">
                <div className="text-3xl mb-4">{c.icon}</div>
                <h3 className="text-lg font-bold mb-2">{c.title}</h3>
                <p className="text-sm text-[#6B5B4E] leading-relaxed">{c.desc}</p>
                <div className="text-2xl font-black text-[#E8735A] mt-3">{c.stat}</div>
              </div>
            ))}
          </div>
        </section>

        <SborkaCTA />

        <Divider />

        {/* BLOGGERS */}
        <section className="py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Топовые карьерные блогеры
          </h2>
          <p className="text-[#6B5B4E] mb-10">Кто формирует повестку поиска работы в русском Instagram</p>

          <div className="space-y-5">
            {bloggers.map((b) => (
              <div key={b.handle} className="bg-white rounded-2xl p-6 md:p-7 shadow-[0_4px_24px_rgba(61,44,30,0.08)] border border-[#D4A853]/12 flex gap-5 items-start flex-col md:flex-row">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${b.gradient} flex items-center justify-center text-3xl shrink-0`}>
                  {b.emoji}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{b.name}</h4>
                  <span className="text-[#E8735A] text-sm font-semibold">{b.handle}</span>
                  <p className="text-[#6B5B4E] text-sm mt-1.5">{b.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {b.stats.map((s) => (
                      <span key={s} className="text-xs font-semibold bg-[#FFF3E6] px-2.5 py-1 rounded-lg">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* VIRAL CONTENT */}
        <section className="py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Что залетает — вирусный контент
          </h2>
          <p className="text-[#6B5B4E] mb-10">Формулы постов с максимальным engagement</p>

          <div className="space-y-6">
            {viralPosts.map((v) => (
              <div key={v.title} className="bg-gradient-to-br from-white to-[#FFF3E6] rounded-3xl p-8 md:p-10 shadow-[0_4px_24px_rgba(61,44,30,0.08)] border-2 border-[#FFD6B0] relative overflow-hidden">
                <div className="absolute top-5 right-6 text-5xl opacity-30">🔥</div>
                <h3 className="text-lg font-extrabold text-[#C4573A] mb-2 relative z-10">{v.title}</h3>
                <p className="text-sm text-[#6B5B4E] mb-3 relative z-10">{v.author}</p>
                <blockquote className="border-l-4 border-[#E8735A] pl-4 italic text-[#3D2C1E] my-4 relative z-10">{v.quote}</blockquote>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {v.metrics.map((m) => (
                    <span key={m.value} className="inline-flex items-center gap-1.5 bg-[#C4573A] text-white px-3.5 py-1.5 rounded-full text-sm font-bold">
                      {m.icon} {m.value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* FORMATS */}
        <section className="py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Какие форматы работают
          </h2>
          <p className="text-[#6B5B4E] mb-10">Engagement rate по типам контента в карьерной нише</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: "🎬", title: "Reels 15-30 сек", eng: "5-10x", note: "охват от подписчиков" },
              { emoji: "📑", title: "Карусели", eng: "10-15%", note: "saves от просмотров" },
              { emoji: "📱", title: "Stories", eng: "+20%", note: "reach с интерактивом" },
              { emoji: "🖼️", title: "Фото-посты", eng: "1-3%", note: "почти мёртвый формат" },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(61,44,30,0.08)] border border-[#74A68D]/20 text-center">
                <div className="text-4xl mb-3">{f.emoji}</div>
                <h4 className="font-bold text-sm mb-1">{f.title}</h4>
                <div className="text-2xl font-black text-[#2D6A4F]">{f.eng}</div>
                <div className="text-xs text-[#6B5B4E] mt-1">{f.note}</div>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold mt-10 mb-4">Механики вовлечения:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "💬", title: "«Пиши слово в комменты»", desc: "541-1,829 комментов. Гайды как лид-магниты." },
              { icon: "📊", title: "Конкретные цифры", desc: "«Зарплата 140-150 тыс», «26% снижение». Данные вызывают доверие." },
              { icon: "📝", title: "Кейсы клиентов", desc: "«Оффер за 3 недели». Social proof работает лучше советов." },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-7 shadow-[0_4px_24px_rgba(61,44,30,0.08)] border border-[#D4A853]/15">
                <h3 className="font-bold mb-2">{c.icon} {c.title}</h3>
                <p className="text-sm text-[#6B5B4E]">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <SborkaCTA variant="compact" />

        <Divider />

        {/* EMPTY NICHES */}
        <section className="py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Пустые ниши — возможности
          </h2>
          <p className="text-[#6B5B4E] mb-10">Темы, которые недостаточно покрыты в русском Instagram</p>

          <div className="space-y-3">
            {niches.map((n) => (
              <div key={n.title} className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-[0_4px_24px_rgba(61,44,30,0.08)]">
                <span className="bg-[#E8735A] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap">
                  {n.badge}
                </span>
                <div>
                  <h4 className="font-bold text-sm">{n.title}</h4>
                  <p className="text-xs text-[#6B5B4E] mt-0.5">{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* INSIGHTS */}
        <section className="py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            7 ключевых инсайтов
          </h2>
          <p className="text-[#6B5B4E] mb-10">Главные выводы исследования</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {insights.map((ins) => (
              <div key={ins.num} className="bg-white rounded-2xl p-7 shadow-[0_4px_24px_rgba(61,44,30,0.08)] border-t-4 border-[#D4A853]">
                <div className="w-9 h-9 rounded-full bg-[#D4A853] text-white flex items-center justify-center font-extrabold text-sm mb-3">
                  {ins.num}
                </div>
                <h4 className="font-bold mb-1.5">{ins.title}</h4>
                <p className="text-sm text-[#6B5B4E]">{ins.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <SborkaCTA />

        {/* Footer note */}
        <footer className="text-center py-10 text-sm text-[#6B5B4E]">
          <p>
            Исследование подготовлено для{" "}
            <Link to="/" className="text-[#E8735A] font-semibold hover:underline">СБОРКА</Link>{" "}
            — карьерный клуб для IT-специалистов
          </p>
          <p className="mt-1">Данные: Instagram API (HikerAPI) | Март 2026 | Автор: Тим Зинин</p>
        </footer>
      </div>
    </div>
  );
};

export default InstagramJobSearch2026;
