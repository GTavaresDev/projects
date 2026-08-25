# Movie App (`movie-app`)

[![CI](https://github.com/example/movie-app/actions/workflows/ci.yml/badge.svg)](https://github.com/example/movie-app/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-15.x-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

> **Language Versions / Versões de Idioma:**  
> 🇺🇸 [English README](README.md) | 🇧🇷 [README em Português](README.pt-BR.md)

Modern, fully responsive **Next.js 15 App Router** frontend for exploring movie catalogs. It interacts exclusively with the shared backend API (`backend`) via REST endpoints without direct database access.

---

## 🎨 UI & Design Highlights

- **Glassmorphism Aesthetics**: Modern dark cinematic theme with sleek blur panels and smooth micro-interactions.
- **Responsive Layouts**: Designed for mobile, tablet, and desktop viewports.
- **Dynamic Image Optimization**: High-performance image rendering with loading skeletons.
- **Empty & Error States**: Graceful fallback UI for missing data and server connectivity failures.
- **Search & Pagination**: Interactive search bar with instant URL query state and paginated navigation.

---

## 📁 Architecture & Structure

```text
movie-app/
├── app/
│   ├── layout.tsx                 # Root layout with Header, Footer, and font providers
│   ├── page.tsx                   # Landing page featuring hero banner & top movies
│   ├── movies/
│   │   ├── page.tsx               # Paginated movie catalog
│   │   └── [id]/
│   │       └── page.tsx           # High-res movie detail page
│   ├── search/
│   │   └── page.tsx               # Search results page
│   ├── loading.tsx                # Skeleton loading indicator
│   ├── error.tsx                  # Error boundary
│   └── not-found.tsx              # 404 page
│
├── components/
│   ├── layout/                    # Header and Footer components
│   ├── movies/                    # MovieCard, MovieSkeleton, MovieGrid
│   └── ui/                        # Reusable Pagination, EmptyState, ErrorState
│
├── lib/
│   ├── api/                       # Shared API client consuming backend
│   ├── types/                     # TypeScript definitions (Movie, Pagination, ApiError)
│   └── utils/                     # cn utility helper
│
├── tests/                         # Vitest unit test suite
├── .env.example
└── README.md
```

---

## ⚙️ Environment Configuration

Set up environment variables by copying `.env.example`:

```bash
cp .env.example .env
```

| Variable              | Description               | Default                        |
| --------------------- | ------------------------- | ------------------------------ |
| `NEXT_PUBLIC_API_URL` | Catalog API base endpoint | `http://localhost:4000/api/v1` |

---

## 🧪 Installation & Running

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run tests**:

   ```bash
   npm run test
   ```

3. **Start local development server**:

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000` in your browser.
