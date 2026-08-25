# Backend Architecture & Internal Logic

This document details the exact internal logic, modular feature architecture, and operation of the [`backend`](file:///c:/Users/Gabriel/Desktop/projects/backend) service.

---

## 💡 Core Philosophy: Direct JSON Data Store

The backend is built to be **extremely fast, zero-dependency, and lightweight**. Rather than requiring a heavy database server (like PostgreSQL or MongoDB) or an ORM layer (like Prisma), the backend uses a **File-Backed JSON Store** architecture (`JsonStoreService`).

```text
HTTP Request (Client)
        │
        ▼
   Express App (/api/v1)
        │
        ├── /health ─────────► Discovery & available collections
        ├── /weather ────────► Weather forecast module (weather/)
        ├── /placeholders ───► SVG vector image generator (placeholders/)
        ├── /text-analysis ──► Slugifier & reading time calculator (textAnalysis/)
        ├── /search ─────────► Spotlight multi-collection search (search/)
        ├── /random ─────────► Item roulette (random/)
        ├── /combos ─────────► Movie Night pairing generator (combos/)
        ├── /stats ──────────► Global analytics & dataset facets (analytics/)
        ├── /movies ─────────► Movies catalog CRUD (movies/)
        ├── /recipes ────────► Recipes catalog CRUD (recipes/)
        └── /:collection ────► Generic dynamic fallback for ANY dataset
                │
                ▼
        JsonStoreService (src/services/jsonStore.ts)
                │
                ▼
        Local Filesystem (data/<collection>/<collection>.json)
```

---

## 📂 Feature Module Architecture (`backend/src/routes/`)

Every domain route is cleanly encapsulated in its own folder following the **Route / Service / Types / Index** pattern:

```text
backend/src/routes/
├── analytics/         # 📊 /api/v1/stats & /api/v1/:collection/facets
├── combos/            # 🍿 /api/v1/combos/movie-night
├── genericCollection/ # 🌐 /api/v1/:collection (Dynamic fallback)
├── health/            # 🏥 /api/v1/health, /api/v1/collections & /api/v1 (Index)
├── movies/            # 🎬 /api/v1/movies
├── placeholders/      # 🖼️ /api/v1/placeholders/svg & /api/v1/placeholders/:w/:h
├── random/            # 🎲 /api/v1/random
├── recipes/           # 🍳 /api/v1/recipes
├── search/            # 🔍 /api/v1/search (Spotlight)
├── textAnalysis/      # ✍️ /api/v1/text-analysis/analyze & /slugify
└── weather/           # ⛅ /api/v1/weather & /api/v1/weather/forecast
```

Each folder contains:
1. `*.types.ts`: TypeScript contracts and interfaces.
2. `*.service.ts`: Pure business logic, calculations, algorithms, and generators (independent of Express).
3. `*.routes.ts`: Express Router handling HTTP input, calling the service, and returning responses.
4. `index.ts`: Module export hub.

---

## 🔍 How Each Layer Works

### 1. The Storage Engine (`src/services/jsonStore.ts`)
- **Reading Data**: Reads `data/<collection>/<collection>.json` on demand using Node.js `fs.readFileSync`. If a dataset does not exist, it returns an empty array `[]` safely without crashing.
- **Writing Data**: Uses `fs.writeFileSync` formatted with indentation (`JSON.stringify(items, null, 2)`). When a POST, PUT, or DELETE request is made, the JSON file on disk is immediately and synchronously updated.
- **Universal Deep Search**: The search function scans every field (strings, arrays like `tags` or `ingredients`, and numbers) in the items. Searching `"Nolan"`, `"Italian"`, or `"Sci-Fi"` matches across any attribute.
- **Dynamic Attribute Filtering**: Query parameters other than `page`, `limit`, and `q` are treated as property filters (e.g. `?genre=Sci-Fi` or `?category=Pasta`).
- **Pagination**: Slices the in-memory array using `(page - 1) * limit` and calculates `total` and `totalPages`.

### 2. Dynamic Auto-Discovery
Whenever a new folder and JSON file is created under `data/` (for example, `data/courses/courses.json`), the backend **automatically** serves it at `/api/v1/courses` with full CRUD, search, and pagination without writing a single line of backend code!

---

## 🛠 Adding New Datasets for Studies/Tests

To add a new dataset (e.g., `games`):
1. Create folder `backend/data/games/`
2. Create file `backend/data/games/games.json` with an array of objects having `id`, `name`, `description`, `image`, and any custom properties.
3. Access immediately:
   - `GET http://localhost:4000/api/v1/games`
   - `GET http://localhost:4000/api/v1/games/search?q=rpg`
   - `GET http://localhost:4000/api/v1/games/:id`
