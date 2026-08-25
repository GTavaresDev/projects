# API Endpoints Reference

Base URL: `http://localhost:4000/api/v1`

---

## 📂 Active Feature Modules

The backend is organized cleanly around **Movies**, **Books**, and **City Distance / Word Comparison**:

- `movies/` ──────────► `/api/v1/movies` & `/api/v1/movies/search?q=:term` (CRUD with Zod)
- `books/` ───────────► `/api/v1/books` & `/api/v1/books/search?q=:term` (CRUD with Zod)
- `search/` ──────────► `/api/v1/search?q=:term` (Spotlight search across movies & books)
- `cityDistance/` ────► `/api/v1/city-distance` & `/api/v1/city-distance/word-compare`
- `health/` ──────────► `/api/v1/health`, `/api/v1/collections` & `/api/v1` (Discovery)
- `genericCollection/` ► `/api/v1/:collection` (dynamic fallback for any `data/<collection>/`)

---

## 🎬 1. Movies API (`/api/v1/movies`)

- `GET /api/v1/movies?page=1&limit=9` — Paginated movies list.
- `GET /api/v1/movies/search?q=Inception` — Search movies.
- `GET /api/v1/movies/:id` — Get single movie.
- `POST /api/v1/movies` — Create movie.
- `PUT /api/v1/movies/:id` — Update movie.
- `DELETE /api/v1/movies/:id` — Delete movie.

---

## 📚 2. Books API (`/api/v1/books`)

- `GET /api/v1/books?page=1&limit=9` — Paginated books list.
- `GET /api/v1/books/search?q=Clean` — Search books by author, title or tag.
- `GET /api/v1/books/:id` — Get single book by ID.
- `POST /api/v1/books` — Create new book.
- `PUT /api/v1/books/:id` — Update book.
- `DELETE /api/v1/books/:id` — Delete book.

---

## 🌍 3. City Distance & Word Comparison (`/api/v1/city-distance`)

### Calculate Distance & Travel Times:
- `GET /api/v1/city-distance?origin=Sao+Paulo&destination=Curitiba`
  - Calculates straight-line distance in Km, Miles, and Nautical Miles.
  - Returns estimated travel time by Airplane, Car, Bicycle, and Walking.
  - Returns word trivia with shared letters between city names.

### Word Comparison & Anagrams:
- `GET /api/v1/city-distance/word-compare?word1=algoritmo&word2=logaritmo`
  - Calculates common letters, shared vowels, shared consonants.
  - Anagram verification (`isAnagram: true/false`).
  - Similarity percentage score.

---

## 🔍 4. Spotlight Universal Search (`/api/v1/search`)

- `GET /api/v1/search?q=Nolan` — Searches across all active datasets simultaneously.

---

## 🏥 5. Health & Discovery

- `GET /api/v1/health` — System status and active collections (`movies`, `books`).
- `GET /api/v1/collections` — Summary of all available datasets.
