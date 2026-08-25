# API Endpoints Reference

Base URL: `http://localhost:4000/api/v1`

---

## 🧭 1. System & Discovery

### Health Check
- `GET /api/v1/health`
- Returns server status, version, uptime, and currently loaded datasets.

### Collections Overview & Metadatas
- `GET /api/v1/collections`
- Lists available collections, item counts, and property keys.

---

## 🔍 2. Spotlight, Roulette & AI-style Combos

### Global Universal Search (Spotlight / Cmd+K)
- `GET /api/v1/search?q=Nolan&limit=5`
- Searches simultaneously across **all** collections (`movies`, `recipes`, `products`, `books`) and returns results grouped by dataset.

### Random Item / Roulette ("Feeling Lucky")
- `GET /api/v1/random` (across all datasets)
- `GET /api/v1/:collection/random` (e.g. `GET /api/v1/movies/random`)
- Returns a single random element. Perfect for swipe apps or decision spinners.

### Movie Night Combo Generator
- `GET /api/v1/combos/movie-night` (optional `?genre=Sci-Fi`)
- Intelligently pairs a random movie with a matching gourmet recipe and preparation tip.

---

## 📊 3. Analytics, Metrics & Dynamic Facets

### Global Data Analytics
- `GET /api/v1/stats`
- Computes overall metrics: total items, average ratings, and top tags per collection.

### Dynamic Collection Facets (for Sidebar Filters)
- `GET /api/v1/:collection/facets` (e.g. `GET /api/v1/movies/facets`, `GET /api/v1/recipes/facets`)
- Extracts distinct categories, genres, difficulty levels, tag distributions, and min/max ranges for ratings, prices, and years.

---

## 🛠️ 4. Dynamic Developer & UI Utilities

### SVG Placeholder Generator
- `GET /api/v1/utils/placeholder.svg?width=800&height=400&text=My+Card&bg=1e1b4b&color=818cf8`
- Generates dynamic SVGs directly into `<img src="..." />` tags with custom dimensions, text, and hex colors.

### Text Analysis & Slugifier
- `POST /api/v1/utils/analyze-text`
- Payload: `{ "text": "Next.js & React 19 Development" }`
- Returns word count, character count, estimated reading time, and clean URL slug.

### Dynamic Weather Simulation
- `GET /api/v1/utils/weather?city=Sao+Paulo`
- Returns deterministic hourly simulated weather (temperature, condition, icon, humidity, wind) for UI dashboard widgets.

---

## 📁 5. Standard Dataset Endpoints

Available datasets: `/movies`, `/recipes`, `/products`, `/books`, and any folder under `backend/data/<name>/`.

| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/v1/:collection` | `page=1`, `limit=10`, `genre=Sci-Fi`, `category=Pasta` | Paginated listing with attribute filters |
| `GET` | `/api/v1/:collection/search` | `q=query`, `page=1`, `limit=10` | Universal deep search |
| `GET` | `/api/v1/:collection/:id` | — | Get single item by ID |
| `POST` | `/api/v1/:collection` | — | Create new item |
| `PUT` | `/api/v1/:collection/:id` | — | Update item |
| `DELETE` | `/api/v1/:collection/:id` | — | Delete item |
