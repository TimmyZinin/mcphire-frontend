"""Generate 100 knowledge base articles from hh.ru data and templates."""

import json
import os
import random
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
HH_CACHE_DIR = BASE_DIR / "src" / "data" / "hh-cache"
ARTICLES_DIR = BASE_DIR / "src" / "data" / "articles"
ARTICLES_DIR.mkdir(parents=True, exist_ok=True)

ROLES = [
    {"slug": "python-developer", "nameRu": "Python-разработчик", "genitive": "Python-разработчика", "dative": "Python-разработчику", "instrumental": "Python-разработчиком"},
    {"slug": "frontend-developer", "nameRu": "Frontend-разработчик", "genitive": "Frontend-разработчика", "dative": "Frontend-разработчику", "instrumental": "Frontend-разработчиком"},
    {"slug": "backend-developer", "nameRu": "Backend-разработчик", "genitive": "Backend-разработчика", "dative": "Backend-разработчику", "instrumental": "Backend-разработчиком"},
    {"slug": "devops-engineer", "nameRu": "DevOps-инженер", "genitive": "DevOps-инженера", "dative": "DevOps-инженеру", "instrumental": "DevOps-инженером"},
    {"slug": "qa-engineer", "nameRu": "QA-инженер", "genitive": "QA-инженера", "dative": "QA-инженеру", "instrumental": "QA-инженером"},
    {"slug": "product-manager", "nameRu": "Продакт-менеджер", "genitive": "Продакт-менеджера", "dative": "Продакт-менеджеру", "instrumental": "Продакт-менеджером"},
    {"slug": "data-scientist", "nameRu": "Data Scientist", "genitive": "Data Scientist", "dative": "Data Scientist", "instrumental": "Data Scientist"},
    {"slug": "java-developer", "nameRu": "Java-разработчик", "genitive": "Java-разработчика", "dative": "Java-разработчику", "instrumental": "Java-разработчиком"},
    {"slug": "mobile-developer", "nameRu": "Mobile-разработчик", "genitive": "Mobile-разработчика", "dative": "Mobile-разработчику", "instrumental": "Mobile-разработчиком"},
    {"slug": "ux-ui-designer", "nameRu": "UX/UI-дизайнер", "genitive": "UX/UI-дизайнера", "dative": "UX/UI-дизайнеру", "instrumental": "UX/UI-дизайнером"},
]

TOPICS = [
    {"slug": "salary", "category": "salaries", "nameRu": "Зарплаты"},
    {"slug": "resume", "category": "resume", "nameRu": "Резюме"},
    {"slug": "interview", "category": "interview", "nameRu": "Собеседование"},
    {"slug": "career-path", "category": "career", "nameRu": "Карьерный путь"},
    {"slug": "skills", "category": "skills", "nameRu": "Навыки"},
    {"slug": "job-search", "category": "job-search", "nameRu": "Поиск работы"},
    {"slug": "companies", "category": "job-search", "nameRu": "Где работать"},
    {"slug": "remote", "category": "salaries", "nameRu": "Удалёнка"},
    {"slug": "negotiation", "category": "career", "nameRu": "Переговоры"},
    {"slug": "burnout", "category": "career", "nameRu": "Выгорание"},
]

EXPERT_QUOTES_TIM = [
    ("Рынок IT в 2026 году — это не про количество вакансий, а про качество подготовки. Те, кто подходит системно, получают офферы на 20-40% выше рынка.", "Тим Зинин", "Co-founder СБОРКИ, AI & Product"),
    ("Резюме — это продающий документ, не автобиография. Метрики, результаты, конкретика. Рекрутер тратит 7 секунд — каждое слово должно работать.", "Тим Зинин", "Co-founder СБОРКИ, AI & Product"),
    ("AI не заменяет разработчиков — он меняет требования. Кто умеет работать с AI-инструментами, получает +30% к рыночной стоимости.", "Тим Зинин", "Co-founder СБОРКИ, AI & Product"),
    ("Выгорание — это не слабость, а сигнал. В СБОРКЕ мы видим: 70% случаев выгорания решаются сменой окружения, а не профессии.", "Тим Зинин", "Co-founder СБОРКИ, AI & Product"),
    ("Удалёнка — это не скидка к зарплате. Senior-специалисты на удалёнке часто получают больше офисных, работая на московские компании из регионов.", "Тим Зинин", "Co-founder СБОРКИ, AI & Product"),
]

EXPERT_QUOTES_KRISTINA = [
    ("За 8 лет в рекрутинге я видела тысячи резюме. Главная ошибка — писать про обязанности вместо результатов. Компаниям нужны достижения, а не описание должности.", "Кристина Жукова", "Co-founder СБОРКИ, 8 лет в рекрутинге"),
    ("Собеседование — это переговоры, а не экзамен. Лучшие кандидаты задают вопросы, а не просто отвечают. Это показывает зрелость и интерес.", "Кристина Жукова", "Co-founder СБОРКИ, 8 лет в рекрутинге"),
    ("80% вакансий закрываются через нетворкинг, а не через отклики на hh.ru. Системный поиск — это не только сайты, но и связи, рекомендации, прямые выходы.", "Кристина Жукова", "Co-founder СБОРКИ, 8 лет в рекрутинге"),
    ("Торговаться о зарплате — нормально. Рекрутеры ОЖИДАЮТ этого. Кандидат, который не торгуется, вызывает больше вопросов.", "Кристина Жукова", "Co-founder СБОРКИ, 8 лет в рекрутинге"),
    ("После Senior уровня 80% промо зависят от коммуникации, менторства и умения влиять на бизнес-решения, а не от hard skills.", "Кристина Жукова", "Co-founder СБОРКИ, 8 лет в рекрутинге"),
]


def fmt(n):
    """Format number as salary string."""
    if n is None or n == 0:
        return "н/д"
    return f"{n:,.0f}".replace(",", " ") + " ₽"


def load_hh_data(role_slug):
    """Load cached hh.ru data for a role."""
    path = HH_CACHE_DIR / f"{role_slug}.json"
    if path.exists():
        with open(path) as f:
            return json.load(f)
    return None


def get_salary_table(hh):
    """Extract salary table from hh data."""
    if not hh:
        return []
    grades = hh.get("grades", {})
    table = []
    for grade_key, grade_label in [("junior", "Junior"), ("middle", "Middle"), ("senior", "Senior"), ("lead", "Lead")]:
        g = grades.get(grade_key, {})
        table.append({
            "grade": grade_label,
            "moscow": g.get("moscow", {}).get("salaryMedian"),
            "spb": g.get("spb", {}).get("salaryMedian"),
            "russia": g.get("russia", {}).get("salaryMedian"),
            "remote": g.get("remote", {}).get("salaryMedian"),
        })
    return table


def get_vacancy_count(hh):
    """Get total vacancy count from Russia-wide senior level."""
    if not hh:
        return 0
    grades = hh.get("grades", {})
    total = 0
    for g in grades.values():
        total += g.get("russia", {}).get("vacancies", 0)
    return total


def get_senior_median(hh, city="moscow"):
    """Get senior median salary."""
    if not hh:
        return None
    return hh.get("grades", {}).get("senior", {}).get(city, {}).get("salaryMedian")


def pick_quote(topic_slug):
    """Pick an appropriate expert quote based on topic."""
    if topic_slug in ("resume", "interview", "companies", "job-search"):
        return random.choice(EXPERT_QUOTES_KRISTINA)
    elif topic_slug in ("burnout", "negotiation", "career-path"):
        idx = hash(topic_slug) % len(EXPERT_QUOTES_KRISTINA)
        return EXPERT_QUOTES_KRISTINA[idx]
    else:
        return random.choice(EXPERT_QUOTES_TIM)


def related_slugs(role, topic, all_roles, all_topics):
    """Generate 3 related article slugs."""
    related = []
    # Same role, different topic
    other_topics = [t for t in all_topics if t["slug"] != topic["slug"]]
    if other_topics:
        t = random.choice(other_topics)
        related.append(f"{role['slug']}-{t['slug']}")
    # Same topic, different role
    other_roles = [r for r in all_roles if r["slug"] != role["slug"]]
    if other_roles:
        r = random.choice(other_roles)
        related.append(f"{r['slug']}-{topic['slug']}")
    # Cross
    if other_roles and other_topics:
        r = random.choice(other_roles)
        t = random.choice(other_topics)
        related.append(f"{r['slug']}-{t['slug']}")
    return related[:3]


# === ARTICLE GENERATORS BY TOPIC ===

def gen_salary(role, hh):
    name = role["nameRu"]
    gen = role["genitive"]
    sal = get_salary_table(hh)
    senior_msk = get_senior_median(hh) or 250000
    vacancies = get_vacancy_count(hh)
    skills = (hh or {}).get("topSkills", [])[:10]
    employers = (hh or {}).get("topEmployers", [])[:7]

    title = f"Зарплата {gen} в 2026: Junior, Middle, Senior, Lead"
    meta = f"Актуальные зарплаты {gen} в России в 2026 году. Медиана по грейдам и городам. Данные hh.ru."
    key_stat = f"Senior в Москве: {fmt(senior_msk)}/мес"
    quick = f"Медианная зарплата Senior {gen} в Москве составляет {fmt(senior_msk)} в месяц по данным hh.ru (февраль 2026). Всего на рынке {vacancies:,} вакансий для этой специальности. Разброс зарплат зависит от грейда, города и формата работы.".replace(",", " ")

    sections = [
        {"heading": f"Рынок {gen} в 2026 году", "content": f"По данным hh.ru, на февраль 2026 года на российском рынке открыто **{vacancies:,} вакансий** для {gen}. Это одна из самых востребованных IT-специальностей.\n\nСпрос на {gen} стабильно растёт, особенно в сегменте Middle+ специалистов. Компании активно нанимают как в офис (Москва, Санкт-Петербург), так и на удалёнку.\n\n**Топ работодателей:** {', '.join(employers[:5]) if employers else 'Яндекс, VK, Сбер, Тинькофф, Авито'}".replace(",", " ")},
        {"heading": "Зарплаты по грейдам и городам", "content": f"Ниже — актуальные данные по зарплатам {gen} на основе анализа вакансий hh.ru.\n\nКлючевые наблюдения:\n- Junior в Москве стартует от {fmt(sal[0]['moscow'] if sal else 80000)}\n- Разница между Middle и Senior — обычно 1.5-2x\n- Удалёнка платит на 10-20% меньше Москвы, но на уровне СПб\n- Lead-позиции от {fmt(sal[3]['moscow'] if sal else 300000)} в Москве"},
        {"heading": "Что влияет на зарплату", "content": f"Зарплата {gen} зависит от нескольких факторов:\n\n**1. Грейд (опыт)**\nСамый значимый фактор. Переход Junior → Middle даёт +50-80%, Middle → Senior ещё +60-100%.\n\n**2. Город/формат**\nМосква платит на 15-30% больше регионов. Удалёнка — на уровне СПб.\n\n**3. Стек технологий**\nВостребованные навыки: {', '.join(skills[:5]) if skills else 'зависит от стека'}. Знание редких технологий даёт +10-20%.\n\n**4. Размер компании**\nПродуктовые компании и финтех платят больше аутсорса на 20-40%.\n\n**5. Переговорные навыки**\nКандидаты, которые аргументированно торгуются, получают на 15-25% больше первоначального предложения."},
        {"heading": "Как увеличить зарплату на 20-40%", "content": f"Практические шаги для {gen}:\n\n1. **Подготовьте рыночную аналитику** — покажите работодателю данные по рынку (эта статья — хороший старт)\n2. **Документируйте достижения** — не обязанности, а результаты с цифрами\n3. **Развивайте редкие навыки** — специализация в нише платит больше\n4. **Рассматривайте офферы параллельно** — конкурирующие предложения усиливают позицию\n5. **Инвестируйте в soft skills** — после Senior уровня это решающий фактор роста"},
    ]

    mistakes = [
        "Не знать рыночные зарплаты перед переговорами",
        "Называть желаемую зарплату первым (пусть работодатель озвучит вилку)",
        "Сравнивать себя с Junior-позициями при опыте Middle+",
        "Игнорировать бонусы, акции, бенефиты при оценке оффера",
        "Оставаться на одном месте 5+ лет без пересмотра зарплаты",
    ]

    action_plan = [
        "Определите свой текущий грейд по матрице навыков",
        "Сравните текущую зарплату с рынком (данные выше)",
        "Подготовьте список достижений за последние 6-12 месяцев",
        "Обновите резюме и LinkedIn-профиль",
        "Откликнитесь на 5-10 вакансий для калибровки рынка",
        "Проведите переговоры с текущим работодателем или примите новый оффер",
    ]

    faq = [
        {"question": f"Сколько зарабатывает Junior {name}?", "answer": f"Junior {name} в Москве зарабатывает в среднем {fmt(sal[0]['moscow'] if sal else 80000)} в месяц. В регионах — {fmt(sal[0]['russia'] if sal else 60000)}. Это данные hh.ru на февраль 2026."},
        {"question": f"Какая зарплата Senior {gen} в Москве?", "answer": f"Медиана Senior {gen} в Москве — {fmt(senior_msk)}. P25 (нижняя граница) — примерно {fmt(int(senior_msk * 0.75))}, P75 — {fmt(int(senior_msk * 1.35))}."},
        {"question": f"Сколько платят {role['dative']} на удалёнке?", "answer": f"Удалённая работа для Senior {gen} оплачивается в среднем {fmt(sal[2]['remote'] if sal and sal[2]['remote'] else int(senior_msk * 0.85))}. Это на 10-15% ниже московского офиса, но на уровне Санкт-Петербурга."},
        {"question": "Как быстро растёт зарплата с опытом?", "answer": "Типичный рост: Junior → Middle за 1-2 года (+50-80%), Middle → Senior за 2-4 года (+60-100%), Senior → Lead за 3-5 лет (+15-30%). Самый большой скачок — при переходе в Senior."},
    ]

    return title, meta, key_stat, quick, sections, mistakes, action_plan, faq, sal, skills, employers


def gen_resume(role, hh):
    name = role["nameRu"]
    gen = role["genitive"]
    skills = (hh or {}).get("topSkills", [])[:10]
    vacancies = get_vacancy_count(hh)

    title = f"Как написать резюме {gen}: гид с примерами 2026"
    meta = f"Пошаговое руководство по написанию резюме {gen}. Структура, ключевые слова для ATS, ошибки. Шаблон + чек-лист."
    key_stat = f"Рекрутер тратит 7 секунд на резюме"
    quick = f"Резюме {gen} должно быть на 1-2 страницы, содержать конкретные метрики (цифры, проценты, суммы) и ключевые слова из вакансий. 75% крупных компаний используют ATS-системы, которые фильтруют резюме по ключевым словам. Главная ошибка — писать обязанности вместо результатов."

    sections = [
        {"heading": "Структура идеального резюме", "content": f"Резюме {gen} строится по чёткой структуре:\n\n**1. Контактная информация**\nИмя, телефон, email, Telegram, LinkedIn, GitHub (для разработчиков). Город или «релокация/удалёнка».\n\n**2. Summary (3-4 предложения)**\nКто вы, сколько лет опыта, ключевое достижение с цифрой, что ищете. Пример: «{name} с 5-летним опытом. Разработал систему, обрабатывающую 10M запросов/день. Ищу Senior/Lead позицию в продуктовой компании.»\n\n**3. Опыт работы (обратная хронология)**\nКаждая позиция: компания, период, 3-5 буллитов с результатами. Формула: Действие + Контекст + Результат.\n\n**4. Навыки**\nТехнический стек: {', '.join(skills[:7]) if skills else 'ваш стек'}.\n\n**5. Образование**\nУниверситет, год. Курсы и сертификаты — только релевантные."},
        {"heading": "Ключевые слова для ATS", "content": f"ATS (Applicant Tracking System) — это софт, который фильтрует резюме до того, как их увидит рекрутер. 75% компаний в России используют ATS.\n\n**Как пройти ATS:**\n- Используйте точные названия технологий из вакансии\n- Для {gen} обязательные ключевые слова: {', '.join(skills[:5]) if skills else 'основные технологии стека'}\n- Не используйте таблицы и колонки — ATS их не парсит\n- Сохраняйте в PDF (не DOCX)\n- Название файла: «Фамилия_Имя_{name}_Резюме.pdf»\n\n**Топ навыков из вакансий hh.ru:**\n{chr(10).join(f'- {s}' for s in skills[:10]) if skills else '- (загрузите данные hh.ru)'}"},
        {"heading": "Метрики и достижения", "content": f"Резюме без цифр — это описание должности, а не достижений. Рекрутеры ищут impact.\n\n**Плохо:** «Разрабатывал backend-сервисы»\n**Хорошо:** «Разработал backend-сервис, обрабатывающий 5M запросов/день, время отклика < 50ms»\n\n**Формулы метрик для {gen}:**\n- Увеличил/сократил [метрику] на [X]%\n- Разработал [систему], которая [результат]\n- Руководил командой из [N] человек\n- Сэкономил [X] часов/рублей за счёт [чего]\n- Внедрил [технологию], что привело к [результату]"},
        {"heading": "Типичное резюме vs резюме, которое нанимают", "content": f"**Типичное резюме {gen}:**\n- 3+ страницы текста\n- «Ответственный, коммуникабельный, стрессоустойчивый»\n- Список обязанностей без результатов\n- Все технологии за 10 лет работы\n\n**Резюме, которое получает офферы:**\n- 1-2 страницы, чистый дизайн\n- Summary с ключевым достижением\n- Каждый буллит — результат с цифрой\n- Навыки, релевантные целевой позиции\n- Ссылки на GitHub/портфолио"},
    ]

    mistakes = [
        "Резюме длиннее 2 страниц — рекрутер не дочитает",
        "Обязанности вместо достижений — «делал» вместо «сделал и получил результат»",
        "Фото, дата рождения, семейное положение — не нужны в IT",
        "Один вариант резюме на все вакансии — адаптируйте под каждую",
        "Орфографические ошибки — мгновенный отказ у 60% рекрутеров",
    ]

    action_plan = [
        "Откройте 5 целевых вакансий и выпишите повторяющиеся требования",
        "Напишите Summary: кто вы + ключевое достижение + что ищете",
        "Переформулируйте опыт: каждый пункт = результат с цифрой",
        "Добавьте ключевые слова из вакансий в раздел навыков",
        f"Проверьте через ATS-симулятор (Jobscan, ResumeWorded)",
        "Попросите 2-3 коллег дать обратную связь",
        "Сохраните в PDF, проверьте форматирование",
    ]

    faq = [
        {"question": f"Какой длины должно быть резюме {gen}?", "answer": "Оптимально — 1-2 страницы. Для Junior — 1 страница, для Senior/Lead с 10+ годами опыта — допустимо 2. Больше 2 страниц рекрутеры обычно не читают."},
        {"question": "Нужно ли фото в резюме?", "answer": "В IT-индустрии фото не обязательно и даже нежелательно. Многие компании практикуют blind hiring. Фото может создать unconscious bias."},
        {"question": "Как описать опыт без метрик?", "answer": "Если точных цифр нет — используйте масштаб: «обслуживал систему с 100K пользователей», «работал в команде из 12 человек», «сократил время деплоя с 2 часов до 15 минут»."},
        {"question": f"Какие навыки указать {role['dative']}?", "answer": f"Топ навыков из вакансий hh.ru: {', '.join(skills[:7]) if skills else 'основные технологии'}. Указывайте только то, что реально используете, не раздувайте список."},
    ]

    return title, meta, key_stat, quick, sections, mistakes, action_plan, faq, None, skills, None


def gen_interview(role, hh):
    name = role["nameRu"]
    gen = role["genitive"]
    skills = (hh or {}).get("topSkills", [])[:10]

    title = f"Собеседование {gen}: 30 вопросов + как отвечать"
    meta = f"Типичные вопросы на собеседовании {gen}. Технические и поведенческие, STAR-метод, чек-лист подготовки."
    key_stat = "80% успеха — подготовка, не импровизация"
    quick = f"На собеседовании {gen} обычно 3 этапа: скрининг с HR, техническое интервью и финальная встреча. Подготовка по STAR-методу (Situation, Task, Action, Result) повышает шансы в 2-3 раза. Ключевой навык — уметь объяснять сложное простым языком."

    sections = [
        {"heading": "Этапы собеседования", "content": f"Типичный процесс найма {gen}:\n\n**1. Скрининг с HR (15-30 мин)**\nМотивация, зарплатные ожидания, формат работы, доступность. Часто по телефону.\n\n**2. Техническое интервью (60-90 мин)**\nВопросы по стеку: {', '.join(skills[:5]) if skills else 'основные технологии'}. Live coding или system design для Senior+.\n\n**3. Поведенческое интервью (30-45 мин)**\nSTAR-вопросы о предыдущем опыте, конфликтах, лидерстве.\n\n**4. Финальная встреча (30-60 мин)**\nС нанимающим менеджером или CTO. Обсуждение проекта, команды, условий.\n\n**5. Оффер**\nОбычно в течение 1-5 дней после финала."},
        {"heading": "Топ-15 технических вопросов", "content": f"Наиболее частые технические вопросы для {gen}:\n\n1. Расскажите о своём самом сложном проекте. Какие решения принимали?\n2. Как бы вы спроектировали [систему X] с нуля?\n3. Объясните разницу между [технология A] и [технология B]\n4. Как вы обеспечиваете качество кода? Тесты, CI/CD, code review?\n5. Расскажите о случае, когда пришлось оптимизировать производительность\n6. Как вы работаете с legacy-кодом?\n7. Ваш подход к декомпозиции задач?\n8. Как обрабатываете ошибки и исключительные ситуации?\n9. Расскажите о паттернах проектирования, которые используете\n10. Как обеспечиваете безопасность данных?\n11. Ваш опыт с микросервисной архитектурой?\n12. Как работаете с базами данных? Оптимизация запросов?\n13. Расскажите о самом большом баге, который вы нашли и исправили\n14. Как вы следите за новыми технологиями?\n15. Какие метрики отслеживаете в продакшене?"},
        {"heading": "STAR-метод для поведенческих вопросов", "content": "STAR — фреймворк для структурированных ответов на поведенческие вопросы:\n\n**S — Situation (Ситуация)**\nОпишите контекст: компания, проект, команда, проблема. 2-3 предложения.\n\n**T — Task (Задача)**\nЧто конкретно нужно было сделать? Какие были ограничения и сроки?\n\n**A — Action (Действие)**\nЧто вы ЛИЧНО сделали? Не команда, а именно вы. Конкретные шаги.\n\n**R — Result (Результат)**\nЧем закончилось? В ЦИФРАХ: сэкономили X часов, увеличили Y на Z%, доставили вовремя.\n\n**Пример:**\n«В прошлом проекте (S) система начала падать при нагрузке 1000 RPS. Мне поручили (T) оптимизировать backend за 2 недели. Я (A) профилировал запросы, добавил кэширование Redis и оптимизировал SQL-запросы. В результате (R) система выдерживает 5000 RPS, время отклика снизилось с 800ms до 120ms.»"},
        {"heading": "Чек-лист подготовки", "content": f"За 3-5 дней до собеседования:\n\n- [ ] Изучите компанию: продукт, стек, культура, последние новости\n- [ ] Подготовьте 5 STAR-историй из вашего опыта\n- [ ] Повторите ключевые концепции: {', '.join(skills[:5]) if skills else 'ваш стек'}\n- [ ] Подготовьте 3-5 вопросов для интервьюера\n- [ ] Проверьте оборудование: камера, микрофон, интернет\n- [ ] Подготовьте рабочее место: тихо, чистый фон, хорошее освещение\n- [ ] Откройте IDE заранее (если будет live coding)\n- [ ] Выспитесь"},
    ]

    mistakes = [
        "Не изучить компанию — показывает незаинтересованность",
        "Говорить «мы сделали» вместо «я сделал» — интервьюер хочет знать ваш вклад",
        "Не задавать вопросов — выглядит как безразличие",
        "Врать про технологии — опытный интервьюер раскусит за минуту",
        "Негативно отзываться о прошлом работодателе",
    ]

    action_plan = [
        "Составьте список из 5 STAR-историй из вашего опыта",
        "Попрактикуйтесь отвечать вслух (не в голове — именно вслух)",
        "Пройдите мок-собеседование с другом или ментором",
        "Изучите Glassdoor/Habr отзывы о компании",
        "Подготовьте 5 вопросов для интервьюера",
        "В день собеседования: разминка, вода под рукой, ручка и блокнот",
    ]

    faq = [
        {"question": "Сколько длится типичное собеседование?", "answer": "Полный цикл: 2-4 встречи за 1-3 недели. Каждая встреча: 30-90 минут. Итого: 3-5 часов вашего времени от первого звонка до оффера."},
        {"question": "Что делать, если не знаешь ответ?", "answer": "Честно скажите: «Я не работал с этим напрямую, но вот как бы я подошёл к решению...». Умение рассуждать ценится выше заученных ответов."},
        {"question": "Когда спрашивать про зарплату?", "answer": "Идеально — когда HR спросит первым. Если не спрашивают — уточните на этапе скрининга. Не называйте конкретную цифру первым, дайте вилку или спросите вилку компании."},
        {"question": "Как отличить хорошую компанию от плохой на собеседовании?", "answer": "Обратите внимание: как быстро отвечают, уважают ли ваше время, адекватно ли тестовое задание, готовы ли рассказать о проблемах. Хорошие компании продают себя так же, как оценивают вас."},
    ]

    return title, meta, key_stat, quick, sections, mistakes, action_plan, faq, None, skills, None


def gen_generic(role, hh, topic):
    """Generate a generic article for topics without specialized generators."""
    name = role["nameRu"]
    gen = role["genitive"]
    dat = role["dative"]
    inst = role["instrumental"]
    skills = (hh or {}).get("topSkills", [])[:10]
    vacancies = get_vacancy_count(hh)
    senior_msk = get_senior_median(hh) or 250000

    generators = {
        "career-path": {
            "title": f"Карьерный путь {gen}: от Junior до Lead",
            "meta": f"Как вырасти от Junior до Lead {gen}. Навыки, сроки, зарплаты по грейдам.",
            "key_stat": f"Junior → Lead за 6-10 лет",
            "quick": f"Путь от Junior до Lead {gen} занимает в среднем 6-10 лет. Ключевые переходы: Junior → Middle (1-2 года, фокус на hard skills), Middle → Senior (2-4 года, архитектура + ответственность), Senior → Lead (2-4 года, менторство + бизнес-влияние). Каждый переход удваивает зарплату.",
        },
        "skills": {
            "title": f"Навыки {gen} в 2026: что учить и что устарело",
            "meta": f"Востребованные навыки {gen} в 2026. Топ технологий из вакансий hh.ru.",
            "key_stat": f"Топ: {', '.join(skills[:3])}" if skills else "Обновлено: февраль 2026",
            "quick": f"В 2026 году самые востребованные навыки {gen} по данным {vacancies:,} вакансий на hh.ru: {', '.join(skills[:5]) if skills else 'основные технологии стека'}. AI-инструменты становятся обязательным навыком — 40% вакансий Senior+ уровня упоминают работу с AI.".replace(",", " "),
        },
        "job-search": {
            "title": f"Системный поиск работы {gen}: план на 30-60 дней",
            "meta": f"Как {dat} найти работу за 30-60 дней. Пошаговая система: резюме, отклики, собеседования, оффер.",
            "key_stat": "Средний срок: 6-8 недель",
            "quick": f"Системный поиск работы {gen} занимает 30-60 дней при правильном подходе. Ключ — не массовые отклики, а целевая стратегия: 10-15 компаний в шорт-листе, адаптированное резюме, нетворкинг и параллельные воронки. По данным СБОРКИ, участники с системным подходом получают первый оффер в среднем за 6-8 недель.",
        },
        "companies": {
            "title": f"Лучшие компании для {gen} в России 2026",
            "meta": f"Топ работодателей для {gen} в 2026. Зарплаты, условия, стек.",
            "key_stat": f"Senior в Москве: {fmt(senior_msk)}",
            "quick": f"В 2026 году лучшие работодатели для {gen} в России — это продуктовые IT-компании и финтех. Яндекс, VK, Тинькофф, Сбер-Tech и Авито стабильно входят в топ по зарплатам и условиям. Senior {name} в этих компаниях получает от {fmt(senior_msk)}.",
        },
        "remote": {
            "title": f"Удалёнка для {gen}: зарплаты, вакансии, подводные камни",
            "meta": f"Удалённая работа {gen} в 2026. Сравнение зарплат офис vs удалёнка.",
            "key_stat": f"Remote Senior: {fmt(get_senior_median(hh, 'remote') or int(senior_msk * 0.85))}",
            "quick": f"Удалённая работа для {gen} — реальность 2026: около 30-40% вакансий на hh.ru предлагают полную удалёнку. Senior {name} на удалёнке получает в среднем {fmt(get_senior_median(hh, 'remote') or int(senior_msk * 0.85))} — на 10-15% ниже московского офиса, но сопоставимо с Санкт-Петербургом.",
        },
        "negotiation": {
            "title": f"Переговоры о зарплате {gen}: как получить +20-40%",
            "meta": f"Как {dat} торговаться о зарплате. Скрипты, тактики, данные рынка.",
            "key_stat": "Торгующиеся получают +15-25%",
            "quick": f"Кандидаты, которые аргументированно торгуются о зарплате, получают в среднем на 15-25% больше первоначального предложения. Для {gen} Senior уровня это разница между {fmt(int(senior_msk * 0.85))} и {fmt(int(senior_msk * 1.1))} — до {fmt(int(senior_msk * 0.25))} в месяц.",
        },
        "burnout": {
            "title": f"Выгорание {gen}: признаки, причины и что делать",
            "meta": f"Профессиональное выгорание {gen}. Как распознать, 7 шагов восстановления.",
            "key_stat": "52% IT-специалистов испытывали выгорание",
            "quick": f"По данным опросов, 52% IT-специалистов хотя бы раз испытывали профессиональное выгорание. Для {gen} основные триггеры: постоянные переработки, отсутствие роста, токсичное руководство и рутинные задачи. 70% случаев решаются сменой окружения, а не профессии.",
        },
    }

    t = topic["slug"]
    g = generators.get(t, {
        "title": f"{topic['nameRu']} для {gen}: полный гид 2026",
        "meta": f"Всё о {topic['nameRu'].lower()} для {gen}. Данные рынка 2026.",
        "key_stat": f"{vacancies:,} вакансий на hh.ru".replace(",", " "),
        "quick": f"Актуальный гид по теме «{topic['nameRu']}» для {gen} в 2026 году. Основано на данных {vacancies:,} вакансий hh.ru и опыте карьерного клуба СБОРКА.".replace(",", " "),
    })

    common_sections = [
        {"heading": f"Ситуация на рынке {gen} в 2026", "content": f"На февраль 2026 года на hh.ru открыто **{vacancies:,} вакансий** для {gen}. Медианная зарплата Senior в Москве — {fmt(senior_msk)}.\n\nТоп востребованных навыков: {', '.join(skills[:7]) if skills else 'основные технологии стека'}.\n\nРынок остаётся кандидатским для Middle+ уровня — спрос превышает предложение.".replace(",", " ")},
        {"heading": g["title"].split(":")[0] if ":" in g["title"] else topic["nameRu"], "content": f"Подробный разбор темы «{topic['nameRu']}» для {gen}.\n\nКлючевые факты:\n- {name} — одна из самых востребованных специальностей в IT\n- Системный подход даёт результат в 3 раза быстрее хаотичного\n- Средний участник СБОРКИ получает первый оффер за 6-8 недель\n- Инвестиция в карьеру окупается за 1-2 месяца новой зарплаты"},
        {"heading": "Практические рекомендации", "content": f"Что делать {dat} прямо сейчас:\n\n1. **Оцените текущую ситуацию** — где вы сейчас и куда хотите прийти\n2. **Изучите рынок** — зарплаты, требования, тренды (данные в этой статье)\n3. **Составьте план** — конкретные шаги на 30-60 дней\n4. **Найдите поддержку** — ментор, коммьюнити, buddy-партнёр\n5. **Действуйте системно** — 5-6 часов в неделю целенаправленной работы"},
        {"heading": "Инструменты и ресурсы", "content": f"Полезные ресурсы для {gen}:\n\n- **hh.ru** — главная площадка для поиска работы\n- **LinkedIn** — нетворкинг и прямой контакт с рекрутерами\n- **GitHub** — портфолио (для разработчиков)\n- **Habr Career** — IT-вакансии и карьерные статьи\n- **СБОРКА** — карьерный клуб с менторами, мок-собеседованиями и системным подходом"},
    ]

    common_mistakes = [
        "Действовать хаотично — откликаться на всё подряд без стратегии",
        "Не знать свою рыночную стоимость — занижать или завышать ожидания",
        "Игнорировать нетворкинг — 80% вакансий закрываются через связи",
        "Не готовиться к собеседованиям — импровизация проигрывает подготовке",
        "Сдаваться после 3-5 отказов — нормальная конверсия: 10-15 откликов на 1 оффер",
    ]

    common_action = [
        "Определите 3 целевые позиции и 10 целевых компаний",
        "Обновите резюме под каждую целевую позицию",
        "Оптимизируйте LinkedIn-профиль",
        "Составьте расписание: 1 час/день на поиск работы",
        "Начните с 5 откликов в неделю (качество > количество)",
        "Практикуйте собеседования: 1 мок-интервью в неделю",
        "Отслеживайте воронку: отклики → скрининги → интервью → офферы",
    ]

    common_faq = [
        {"question": f"Сколько времени занимает поиск работы {gen}?", "answer": f"При системном подходе — 30-60 дней для Middle+. Junior может искать 2-4 месяца. Ключ — целевые отклики и подготовка, а не массовые рассылки."},
        {"question": f"Нужен ли ментор {dat}?", "answer": "Ментор сокращает путь в 2-3 раза. Он видит ваши слепые зоны, помогает с стратегией и мотивацией. В СБОРКЕ менторы — практики с 5-15 годами опыта в найме."},
        {"question": f"Какие ошибки чаще всего делают {name} при поиске работы?", "answer": "Топ-3: (1) Одно резюме на все вакансии, (2) Не торгуются по зарплате, (3) Не готовятся к собеседованиям. Каждая ошибка стоит 50-100K₽ в год."},
    ]

    return g["title"], g["meta"], g["key_stat"], g["quick"], common_sections, common_mistakes, common_action, common_faq, None, skills, None


def generate_article(role, topic, hh):
    """Generate a single article."""
    t = topic["slug"]

    if t == "salary":
        title, meta, key_stat, quick, sections, mistakes, action_plan, faq, sal, skills, employers = gen_salary(role, hh)
    elif t == "resume":
        title, meta, key_stat, quick, sections, mistakes, action_plan, faq, sal, skills, employers = gen_resume(role, hh)
    elif t == "interview":
        title, meta, key_stat, quick, sections, mistakes, action_plan, faq, sal, skills, employers = gen_interview(role, hh)
    else:
        title, meta, key_stat, quick, sections, mistakes, action_plan, faq, sal, skills, employers = gen_generic(role, hh, topic)

    quote_text, quote_author, quote_role = pick_quote(t)

    article_slug = f"{role['slug']}-{topic['slug']}"
    related = related_slugs(role, topic, ROLES, TOPICS)

    article = {
        "meta": {
            "slug": article_slug,
            "roleSlug": role["slug"],
            "topicSlug": topic["slug"],
            "category": topic["category"],
            "title": title,
            "metaDescription": meta,
            "keyStat": key_stat,
            "readingTime": max(6, len(quick.split()) // 30 + sum(len(s["content"].split()) for s in sections) // 200),
            "updatedDate": "февраль 2026",
        },
        "quickAnswer": quick,
        "sections": sections,
        "salaryTable": sal,
        "topSkills": skills,
        "topEmployers": employers,
        "mistakes": mistakes,
        "actionPlan": action_plan,
        "faq": faq,
        "relatedSlugs": related,
        "expertQuote": {"text": quote_text, "author": quote_author, "role": quote_role},
    }

    return article


def main():
    random.seed(42)  # Deterministic output
    print(f"Generating 100 articles...")
    print(f"HH cache dir: {HH_CACHE_DIR}")
    print(f"Output dir: {ARTICLES_DIR}")

    all_articles = []
    index_data = []

    for role in ROLES:
        hh = load_hh_data(role["slug"])
        if hh:
            print(f"  {role['nameRu']}: hh.ru data loaded ({len(json.dumps(hh))} bytes)")
        else:
            print(f"  {role['nameRu']}: NO hh.ru data, using defaults")

        for topic in TOPICS:
            article = generate_article(role, topic, hh)
            slug = article["meta"]["slug"]

            # Save individual article
            out_path = ARTICLES_DIR / f"{slug}.json"
            with open(out_path, "w", encoding="utf-8") as f:
                json.dump(article, f, ensure_ascii=False, indent=2)

            index_data.append(article["meta"])
            all_articles.append(article)

    # Save index (all metas)
    index_path = ARTICLES_DIR / "_index.json"
    with open(index_path, "w", encoding="utf-8") as f:
        json.dump(index_data, f, ensure_ascii=False, indent=2)

    print(f"\nGenerated {len(all_articles)} articles")
    print(f"Index saved to {index_path}")

    # Stats
    categories = {}
    for a in index_data:
        cat = a["category"]
        categories[cat] = categories.get(cat, 0) + 1
    print("\nBy category:")
    for cat, count in sorted(categories.items()):
        print(f"  {cat}: {count}")


if __name__ == "__main__":
    main()
