# Catalog API (`backend`)

[![CI](https://github.com/example/backend/actions/workflows/ci.yml/badge.svg)](https://github.com/example/backend/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)

> **Language Versions / Versões de Idioma:**  
> 🇺🇸 [English README](README.md) | 🇧🇷 [README em Português](README.pt-BR.md)

High-performance, lightweight REST API organized into clean, dedicated feature modules: Weather forecast, Placeholder image generator, Text analyzer & slugifier, Spotlight search, Random item roulette, Movie Night combo recommendations, Real-time stats, and Dynamic datasets.

---

## 📂 Modular Architecture

```text
backend/src/routes/
├── health.ts          # GET /api/v1/health & /api/v1/collections & /api/v1 (index)
├── weather.ts         # GET /api/v1/weather & /api/v1/weather/forecast
├── placeholders.ts    # GET /api/v1/placeholders/svg & /api/v1/placeholders/:w/:h
├── textAnalysis.ts    # POST /api/v1/text-analysis/analyze & GET /api/v1/text-analysis/slugify
├── search.ts          # GET /api/v1/search?q=:term (Universal Spotlight)
├── random.ts          # GET /api/v1/random (Roulette)
├── combos.ts          # GET /api/v1/combos/movie-night
├── analytics.ts       # GET /api/v1/stats & GET /api/v1/:collection/facets
├── movies.ts          # Full CRUD for Movies
├── recipes.ts         # Full CRUD for Recipes
└── genericCollection.ts # Fallback CRUD for any dataset in data/
```

---

## 🚀 Complete API Catalog & Response Examples

Base URL: `http://localhost:4000/api/v1`

---

### 1. ⛅ Dedicated Weather API (`/api/v1/weather`)

#### `GET /api/v1/weather?city=Curitiba`
* **Description**: Returns current hourly weather, UV index, and air quality.
```json
{
  "data": {
    "city": "Curitiba",
    "temperatureC": 22,
    "temperatureF": 72,
    "feelsLikeC": 24,
    "condition": "Partly Cloudy",
    "icon": "⛅",
    "humidity": 55,
    "windSpeedKmH": 14,
    "uvIndex": 6,
    "airQuality": "Good",
    "updatedAt": "2026-08-25T13:57:00.000Z"
  }
}
```

#### `GET /api/v1/weather/forecast?city=Curitiba&days=5`
* **Description**: Returns 5-day weather forecast with daily highs, lows, and rain probability.

---

### 2. 🖼️ Dedicated Placeholders API (`/api/v1/placeholders`)

#### `GET /api/v1/placeholders/svg?width=600&height=400&text=Custom+Banner&bg=1e1b4b&color=818cf8`
#### `GET /api/v1/placeholders/400/300?text=Card+Preview`
* **Description**: Returns a dynamic, customizable vector SVG image directly into `<img src="..." />` tags.

---

### 3. ✍️ Dedicated Text Analysis & Slug API (`/api/v1/text-analysis`)

#### `POST /api/v1/text-analysis/analyze`
* **Payload**: `{ "text": "Building Fullstack Apps with Next.js 15" }`
```json
{
  "data": {
    "originalText": "Building Fullstack Apps with Next.js 15",
    "slug": "building-fullstack-apps-with-next-js-15",
    "wordCount": 6,
    "charCount": 39,
    "readingTimeMinutes": 0.03,
    "estimatedReadingTime": "< 1 min read"
  }
}
```

#### `GET /api/v1/text-analysis/slugify?text=Next.js+15+App+Router`
* **Description**: Converts any string into an SEO-friendly URL slug.

---

### 4. 🔍 Universal Search & Spotlight (`/api/v1/search`)

#### `GET /api/v1/search?q=Nolan&limit=5`
* **Description**: Universal spotlight search (Cmd+K) across **all** collections simultaneously.

---

### 5. 🎲 Random & Smart Combinations (`/api/v1/random`, `/api/v1/combos`)

#### `GET /api/v1/random`
* **Description**: Roulette generator picking a random item from any collection.

#### `GET /api/v1/combos/movie-night?genre=Sci-Fi`
* **Description**: Pairs a random movie with a matching gourmet recipe and preparation tips.

---

### 6. 📊 Analytics, Metrics & Dynamic Facets (`/api/v1/stats`, `/api/v1/:collection/facets`)

#### `GET /api/v1/stats`
* **Description**: Real-time aggregated statistics across all datasets (totals, averages, top tags, uptime).

#### `GET /api/v1/movies/facets` & `GET /api/v1/recipes/facets`
* **Description**: Extracts distinct genres, categories, and min/max ranges for building sidebar filter menus.

---

### 7. 📁 Core Datasets & Dynamic Collections

Available at `/movies`, `/recipes`, `/products`, `/books`, and any folder under `data/<name>/`:

| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/v1/:collection` | `page=1`, `limit=10`, `genre=Sci-Fi` | Paginated list with attribute filtering |
| `GET` | `/api/v1/:collection/search` | `q=term`, `page=1`, `limit=10` | Universal deep search in collection |
| `GET` | `/api/v1/:collection/:id` | — | Get single item by ID |
| `POST` | `/api/v1/:collection` | Body: `{ name, description, image, ... }` | Create new item |
| `PUT` | `/api/v1/:collection/:id` | Body: `{ ...fields }` | Update item |
| `DELETE` | `/api/v1/:collection/:id` | — | Delete item |

---

## 🧪 Installation & Running

```bash
# Install dependencies
npm install

# Run test suite
npm run test

# Start development server on port 4000
npm run dev
```
