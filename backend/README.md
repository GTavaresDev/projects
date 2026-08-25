# Catalog API (`backend`)

[![CI](https://github.com/example/backend/actions/workflows/ci.yml/badge.svg)](https://github.com/example/backend/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)

> **Language Versions / Versões de Idioma:**  
> 🇺🇸 [English README](README.md) | 🇧🇷 [README em Português](README.pt-BR.md)

High-performance, lightweight REST API serving rich datasets (Movies, Recipes, Products, Books) with dynamic auto-discovery, universal search, real-time analytics, recommendations, and developer utilities.

---

## 🚀 Complete API Catalog & Response Examples

Base URL: `http://localhost:4000/api/v1`

---

### 1. 🏥 System & Auto-Discovery

#### `GET /api/v1/health`
* **Description**: Returns API health, service uptime, version, and list of auto-discovered datasets.
* **Response**:
```json
{
  "status": "OK",
  "timestamp": "2026-08-25T13:20:00.000Z",
  "service": "backend",
  "version": "1.2.0",
  "availableCollections": ["books", "movies", "products", "recipes"]
}
```

#### `GET /api/v1/collections`
* **Description**: Metadata summary of all active datasets and their fields.
* **Response**:
```json
{
  "data": [
    {
      "name": "movies",
      "endpoint": "/api/v1/movies",
      "totalItems": 15,
      "sampleFields": ["id", "name", "description", "image", "genre", "year", "rating", "duration", "director", "tags"]
    },
    {
      "name": "recipes",
      "endpoint": "/api/v1/recipes",
      "totalItems": 15,
      "sampleFields": ["id", "name", "description", "image", "category", "prepTime", "cookTime", "servings", "ingredients"]
    }
  ]
}
```

---

### 2. 🔍 Universal Search & Spotlight

#### `GET /api/v1/search?q=:term&limit=5`
* **Description**: Universal spotlight search (Command Palette / Cmd+K) across **all** collections simultaneously.
* **Example**: `GET /api/v1/search?q=Nolan`
* **Response**:
```json
{
  "data": {
    "query": "Nolan",
    "totalMatches": 4,
    "results": {
      "movies": [
        {
          "id": "movie-001",
          "name": "Inception",
          "director": "Christopher Nolan",
          "genre": "Sci-Fi",
          "rating": 8.8
        },
        {
          "id": "movie-002",
          "name": "Interstellar",
          "director": "Christopher Nolan",
          "genre": "Sci-Fi",
          "rating": 8.7
        }
      ]
    }
  }
}
```

---

### 3. 🎲 Random & Smart Combinations

#### `GET /api/v1/random` / `GET /api/v1/:collection/random`
* **Description**: Returns a random item from any collection or a specific dataset. Perfect for Tinder-like swipe apps or decision spinners.
* **Response**:
```json
{
  "data": {
    "collection": "recipes",
    "item": {
      "id": "recipe-001",
      "name": "Classic Italian Carbonara",
      "category": "Pasta",
      "difficulty": "Medium",
      "image": "https://..."
    }
  }
}
```

#### `GET /api/v1/combos/movie-night?genre=Sci-Fi`
* **Description**: Intelligently pairs a random movie with a complementary gourmet recipe and preparation tips for movie night apps.
* **Response**:
```json
{
  "data": {
    "title": "The Ultimate Sci-Fi & Comfort Food Evening",
    "theme": "Sci-Fi",
    "movie": {
      "id": "movie-001",
      "name": "Inception",
      "genre": "Sci-Fi",
      "rating": 8.8
    },
    "recipe": {
      "id": "recipe-003",
      "name": "Gourmet Beef Smash Burger",
      "category": "Burgers",
      "prepTime": "15 min"
    },
    "tip": "Start cooking the Gourmet Beef Smash Burger (15 min prep) before pressing play on Inception!"
  }
}
```

---

### 4. 📊 Analytics, Metrics & Dynamic Facets

#### `GET /api/v1/stats`
* **Description**: Real-time aggregated statistics across all datasets (averages, item counts, top tags, server uptime). Ideal for chart dashboards.
* **Response**:
```json
{
  "data": {
    "totalCollections": 4,
    "totalItems": 40,
    "collections": {
      "movies": {
        "totalItems": 15,
        "averageRating": 8.61,
        "topTags": [
          { "tag": "Sci-Fi", "count": 5 },
          { "tag": "Action", "count": 4 }
        ]
      },
      "recipes": {
        "totalItems": 15,
        "averageRating": null,
        "topTags": [
          { "tag": "Italian", "count": 3 },
          { "tag": "Comfort Food", "count": 3 }
        ]
      }
    },
    "serverUptimeSeconds": 420
  }
}
```

#### `GET /api/v1/:collection/facets` (e.g. `/api/v1/movies/facets`, `/api/v1/recipes/facets`)
* **Description**: Generates dynamic facets (unique categories, genres, difficulties, min/max ranges) with item counts for building sidebar filter menus.
* **Response**:
```json
{
  "data": {
    "collection": "movies",
    "totalItems": 15,
    "facets": {
      "genres": {
        "Sci-Fi": 5,
        "Action": 2,
        "Drama": 2,
        "Crime": 1,
        "Animation": 2,
        "Thriller": 1,
        "Comedy": 1,
        "Biography": 1
      },
      "ratingRange": { "min": 8.0, "max": 9.0 },
      "yearRange": { "min": 1994, "max": 2024 }
    }
  }
}
```

---

### 5. 🛠️ Dynamic Developer Utilities

#### `GET /api/v1/utils/placeholder.svg`
* **Parameters**: `width`, `height`, `text`, `bg` (hex without #), `color` (hex without #)
* **Example**: `<img src="http://localhost:4000/api/v1/utils/placeholder.svg?width=600&height=400&text=Custom+Banner&bg=4338ca&color=ffffff" />`
* **Returns**: Raw SVG Vector Image.

#### `POST /api/v1/utils/analyze-text`
* **Payload**: `{ "text": "Building Fullstack Apps with Next.js 15" }`
* **Response**:
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

#### `GET /api/v1/utils/weather?city=Sao+Paulo`
* **Description**: Deterministic hourly weather simulation for dashboard navbar widgets.
* **Response**:
```json
{
  "data": {
    "city": "Sao Paulo",
    "temperatureC": 24,
    "temperatureF": 75,
    "feelsLikeC": 26,
    "condition": "Partly Cloudy",
    "icon": "⛅",
    "humidity": 55,
    "windSpeedKmH": 12,
    "updatedAt": "2026-08-25T13:20:00.000Z"
  }
}
```

---

### 6. 📁 Core Datasets & Dynamic Collections

All datasets (`/movies`, `/recipes`, `/products`, `/books`, and any folder under `data/<name>/`) support:

| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/v1/:collection` | `page=1`, `limit=10`, `genre=Sci-Fi`, `category=Pasta` | Paginated list with attribute filtering |
| `GET` | `/api/v1/:collection/search` | `q=term`, `page=1`, `limit=10` | Universal deep search in collection |
| `GET` | `/api/v1/:collection/:id` | — | Get single item by ID |
| `POST` | `/api/v1/:collection` | Body: `{ name, description, image, ... }` | Create new item |
| `PUT` | `/api/v1/:collection/:id` | Body: `{ ...fieldsToUpdate }` | Update item |
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
