# Frontend Integration Guide for Agents & Developers

This guide provides instructions on how to build, integrate, and configure frontend applications consuming the shared `backend` API.

---

## 🔗 Connection Principles

1. **Pure REST Consumption**: Frontend applications must **never** read backend JSON files directly or attempt direct file-system access across repositories.
2. **Environment Variable**: Always configure the base endpoint in `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
   ```
3. **Port Assignment Standards**:
   - `4000`: `backend` (API service)
   - `3000`: `movie-app`
   - `3001`: `recipe-app`
   - `3002+`: Any new study/frontend app

---

## 🛠 Recommended Client Fetch Pattern (Next.js / React)

### 1. TypeScript Types
```typescript
export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  category?: string;
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  difficulty?: string;
  calories?: number;
  ingredients?: string[];
  tags?: string[];
}
```

### 2. API Client Helper (`lib/api.ts`)
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export async function getRecipes(page = 1, limit = 9, category?: string) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (category) params.append('category', category);

  const res = await fetch(`${API_URL}/recipes?${params.toString()}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
}

export async function searchRecipes(query: string, page = 1, limit = 9) {
  const res = await fetch(`${API_URL}/recipes/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to search recipes');
  return res.json();
}

export async function getRecipeById(id: string) {
  const res = await fetch(`${API_URL}/recipes/${id}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch recipe');
  const body = await res.json();
  return body.data;
}
```

---

## 🎨 UI Best Practices for Next.js Frontends

- **Use App Router**: Build pages under `app/`.
- **Loading Skeletons**: Use `app/loading.tsx` with pulse animation cards while data is fetched.
- **Error Boundaries**: Create `app/error.tsx` displaying friendly messages if `backend` is not reachable on port 4000.
- **Images**: Use Next.js `<Image unoptimized />` or configure `remotePatterns` in `next.config.mjs` for Unsplash image rendering.
