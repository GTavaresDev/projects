# Backend Architecture & Internal Logic

This document details the exact internal logic, architecture, and operation of the [`backend`](file:///c:/Users/Gabriel/Desktop/projects/backend) service.

---

## 💡 Core Philosophy: Direct JSON Data Store

The backend is built to be **extremely fast, zero-dependency, and lightweight**. Rather than requiring a heavy database server (like PostgreSQL or MongoDB) or an ORM layer (like Prisma), the backend uses a **File-Backed JSON Store** architecture (`JsonStoreService`).

```text
HTTP Request (Client)
        │
        ▼
   Express App (/api/v1)
        │
        ├── /health ─────────► Returns API status & available collections
        ├── /collections ────► Returns summary of all datasets
        ├── /movies ─────────► Movie endpoints
        ├── /recipes ────────► Recipe endpoints
        └── /:collection ────► Generic dynamic handler for ANY dataset
                │
                ▼
        JsonStoreService (src/services/jsonStore.ts)
                │
                ▼
        Local Filesystem (data/<collection>/<collection>.json)
```

---

## 🔍 How Each Layer Works

### 1. The Storage Engine (`src/services/jsonStore.ts`)
- **Reading Data**: Reads `data/<collection>/<collection>.json` on demand using Node.js `fs.readFileSync`. If a dataset does not exist, it returns an empty array `[]` safely without crashing.
- **Writing Data**: Uses `fs.writeFileSync` formatted with indentation (`JSON.stringify(items, null, 2)`). When a POST, PUT, or DELETE request is made, the JSON file on disk is immediately and synchronously updated.
- **Universal Deep Search**: The search function scans every field (strings, arrays like `tags` or `ingredients`, and numbers) in the items. Searching `"Nolan"`, `"Italian"`, or `"Sci-Fi"` matches across any attribute.
- **Dynamic Attribute Filtering**: Query parameters other than `page`, `limit`, and `q` are treated as property filters (e.g. `?genre=Sci-Fi` or `?category=Pasta`).
- **Pagination**: Slices the in-memory array using `(page - 1) * limit` and calculates `total` and `totalPages`.

### 2. The HTTP Routing Layer (`src/routes/`)
- `genericCollection.ts`: Provides a reusable router for any collection name.
- `health.ts`: Exposes `/api/v1/health` and `/api/v1/collections` which auto-discovers all subfolders inside `data/`.
- `movies.ts` & `recipes.ts`: Pre-configured routes for standard catalogs.

### 3. Dynamic Auto-Discovery
Whenever a new folder and JSON file is created under `data/` (for example, `data/courses/courses.json`), the backend **automatically** serves it at `/api/v1/courses` with full CRUD, search, and pagination without writing a single line of backend code!

---

## 📊 Standard API Response Contracts

### Success List / Search Response:
```json
{
  "data": [
    {
      "id": "movie-001",
      "name": "Inception",
      "description": "A thief who steals corporate secrets...",
      "image": "https://...",
      "genre": "Sci-Fi",
      "rating": 8.8
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "totalPages": 2
  }
}
```

### Success Single Item Response:
```json
{
  "data": {
    "id": "movie-001",
    "name": "Inception",
    "description": "...",
    "image": "https://..."
  }
}
```

### Error Response:
```json
{
  "error": {
    "code": "MOVIE_NOT_FOUND",
    "message": "Item not found in movies"
  }
}
```

---

## 🛠 Adding New Datasets for Studies/Tests

To add a new dataset (e.g., `games`):
1. Create folder `backend/data/games/`
2. Create file `backend/data/games/games.json` with an array of objects having `id`, `name`, `description`, `image`, and any custom properties.
3. Access immediately:
   - `GET http://localhost:4000/api/v1/games`
   - `GET http://localhost:4000/api/v1/games/search?q=rpg`
   - `GET http://localhost:4000/api/v1/games/:id`
