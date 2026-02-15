# Промпты для генерации фото СБОРКИ

Генерировать в Gemini (nanobanan) или Claude Work.
Формат: 16:9, минимум 1024px, тёплые тона, лёгкая десатурация (NRC-стиль).

---

## 1. hero_group.png — Группа на улице летом
**Где:** HeroSection (главная фотография)

```
Photo of a diverse group of 5 young Russian-looking professionals (ages 25-35, mix of men and women) sitting together at an outdoor summer cafe terrace. Laptops and coffee cups on the table. They are laughing and high-fiving, casual-smart clothing (t-shirts, light shirts, no ties). Warm natural sunlight, green trees in background. Bokeh background. Warm color grading, slightly desaturated NRC style. 16:9 aspect ratio, photorealistic.
```

---

## 2. park_buddy.png — Buddy-пара в парке
**Где:** WhatIsSection (замена buddy_pair.png)

```
Photo of two Russian-looking young professionals (one man, one woman, age 28-35) sitting on a park bench with laptops in summer. Green park with trees and sunlight. They are looking at one screen together, smiling and discussing. Casual clothing (jeans, light sweaters). Warm afternoon light. Coffee to-go cups nearby. Photorealistic, warm tones, NRC-style color grading. 16:9.
```

---

## 3. street_focus.png — Человек на улице за работой
**Где:** TypicalWeekSection (замена focus.png)

```
Photo of a focused Russian-looking young man (age 30) sitting at an outdoor cafe table with headphones and a MacBook. Summer street scene in a Russian city — cobblestone, old buildings. He is concentrated, working on his laptop. Iced coffee on the table. Golden hour warm light. Photorealistic, warm tones, slightly desaturated. 16:9.
```

---

## 4. celebration_offer.png — Празднование оффера
**Где:** ResultsSection (замена offer.png)

```
Photo of a happy Russian-looking young woman (age 28) standing outside, holding her phone up showing a message. Her friends (2-3 people) are hugging her and celebrating behind her. Summer day, trees and sunshine. She is wearing a light dress, beaming with joy. Confetti or sparkles optional. Warm, vibrant colors. Photorealistic. 16:9.
```

---

## 5. team_session.png — Групповая сессия
**Где:** HowItWorksSection (новое фото)

```
Photo of a small group of 4 Russian-looking professionals (ages 25-40, mixed gender) in a bright coworking space with large windows. One person is presenting on a whiteboard while others take notes on laptops. Casual clothing. Natural light from windows, plants visible. Warm, supportive atmosphere. Photorealistic, NRC-style warm color grading. 16:9.
```

---

## 6. corgi_walk.png — Человек с корги кардиган
**Где:** AboutSection или Footer (позитивный акцент)

```
Photo of a smiling Russian-looking young woman (age 30) walking with a black-and-white Cardigan Welsh Corgi in a sunny summer park. She is wearing casual clothes (jeans, white t-shirt) and has a laptop bag over her shoulder. The corgi is looking up at her happily. Green grass, trees, warm sunlight. Photorealistic, warm NRC-style color grading. 16:9.
```

---

## 7. coffee_chat.png — Неформальное общение
**Где:** GamificationSection (поддержка команды)

```
Photo of three Russian-looking young professionals (ages 25-35) having an animated conversation at a cozy coffee shop. One is gesturing enthusiastically, others are laughing. Laptops closed on the table, coffee cups in hands. Warm indoor lighting, exposed brick walls. Casual-smart clothing. Photorealistic, warm tones. 16:9.
```

---

## 8. rooftop_work.png — Работа на крыше / террасе
**Где:** FormatsSection (разнообразие локаций)

```
Photo of a Russian-looking young man (age 32) working on a laptop on a rooftop terrace with a city view. Summer evening, golden hour light. He is smiling while looking at his screen. A cup of tea and notebook beside him. Casual clothing. City skyline in the soft background. Photorealistic, warm color grading. 16:9.
```

---

## Инструкции по использованию

1. Сгенерировать все 8 изображений
2. Сохранить в `/Users/timofeyzinin/sborka/public/images/`
3. Обновить `src` в компонентах:
   - HeroSection → hero_group.png
   - WhatIsSection → park_buddy.png
   - TypicalWeekSection → street_focus.png
   - ResultsSection → celebration_offer.png
   - FoundersSection/other → team_session.png
   - Footer/About → corgi_walk.png
   - GamificationSection → coffee_chat.png
   - FormatsSection → rooftop_work.png
