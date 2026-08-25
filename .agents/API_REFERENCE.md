# API Endpoints Reference

Base URL: `http://localhost:4000/api/v1`

---

## 📂 Modular Route Architecture

The backend routes are organized into dedicated feature modules:

- `weather.ts` ────────► `/api/v1/weather` & `/api/v1/weather/forecast`
- `placeholders.ts` ────► `/api/v1/placeholders/svg` & `/api/v1/placeholders/:w/:h`
- `textAnalysis.ts` ────► `/api/v1/text-analysis/analyze` & `/api/v1/text-analysis/slugify`
- `search.ts` ──────────► `/api/v1/search?q=:term` (Spotlight across all collections)
- `random.ts` ──────────► `/api/v1/random` (Roulette across all collections)
- `combos.ts` ──────────► `/api/v1/combos/movie-night` (Smart pairings)
- `analytics.ts` ───────► `/api/v1/stats` & `/api/v1/:collection/facets`
- `health.ts` ──────────► `/api/v1/health` & `/api/v1/collections`
- `movies.ts` ──────────► `/api/v1/movies`
- `recipes.ts` ─────────► `/api/v1/recipes`
- `genericCollection.ts` ► `/api/v1/:collection` (dynamic fallback for any `data/<collection>/`)

---

## ⛅ 1. Weather API (`/api/v1/weather`)

- `GET /api/v1/weather?city=Curitiba` — Current weather, UV index, air quality.
- `GET /api/v1/weather/forecast?city=Curitiba&days=5` — 5-day forecast.

---

## 🖼️ 2. Placeholders API (`/api/v1/placeholders`)

- `GET /api/v1/placeholders/svg?width=600&height=400&text=Title&bg=1e1b4b&color=818cf8`
- `GET /api/v1/placeholders/:width/:height` — Shortcut route.

---

## ✍️ 3. Text Analysis API (`/api/v1/text-analysis`)

- `POST /api/v1/text-analysis/analyze` — Word count, reading time, slug generation.
- `GET /api/v1/text-analysis/slugify?text=My+Post` — Slug generator.

---

## 🔍 4. Spotlight & Recommendations

- `GET /api/v1/search?q=term&limit=5` — Spotlight search across all datasets.
- `GET /api/v1/random` — Random item picker.
- `GET /api/v1/combos/movie-night` — Movie + Recipe pairing.

---

## 📊 5. Analytics & Facets

- `GET /api/v1/stats` — Global metrics and top tags.
- `GET /api/v1/:collection/facets` — Dynamic facets for sidebar filters.

---

## 📁 6. Standard & Dynamic Collections

- `GET /api/v1/:collection?page=1&limit=10`
- `GET /api/v1/:collection/search?q=term`
- `GET /api/v1/:collection/:id`
- `POST /api/v1/:collection`
- `PUT /api/v1/:collection/:id`
- `DELETE /api/v1/:collection/:id`
