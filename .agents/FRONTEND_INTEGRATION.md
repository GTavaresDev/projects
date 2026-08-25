# Frontend Integration Guide for Agents & Developers

This guide provides instructions on how to build, integrate, and configure frontend applications consuming the shared `backend` API.

---

## 🏛️ 1. Hexagonal Architecture Standard (`core/` at Root)

Every frontend application in this workspace adopts **Hexagonal Architecture (Ports & Adapters)**:

```text
app-name/
├── core/                                # 🎯 Domain & Infrastructure (At Root)
│   ├── domain/
│   │   ├── models/                      # Pure data models and entities
│   │   │   ├── recipe.ts
│   │   │   └── index.ts
│   │   └── ports/                       # Port interfaces / Contracts
│   │       ├── recipe.repository.ts
│   │       └── index.ts
│   │
│   ├── infrastructure/
│   │   ├── http/
│   │   │   └── api-client.ts            # Base HTTP request wrapper & ApiError
│   │   └── repositories/
│   │       └── http-recipe.repository.ts# Concrete adapter implementing RecipeRepository
│   └── index.ts                         # Hub export (@/core)
│
├── src/                                 # 🎨 Presentation Layer (React / Next.js)
│   ├── app/
│   │   ├── recipes/
│   │   │   ├── _components/             # Private colocated components for /recipes
│   │   │   │   ├── RecipeCard.tsx
│   │   │   │   └── RecipeSkeleton.tsx
│   │   │   ├── [id]/page.tsx
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── search/page.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/                          # shadcn/ui Design System (Button, Card, Badge, etc.)
│   │   └── layout/                      # Header, Footer
│   └── lib/
│       └── utils.ts                     # cn() helper (clsx + tailwind-merge)
│
├── tests/                               # Vitest unit tests for repository adapters
└── tsconfig.json                        # Paths: "@/core/*" -> "./core/*" and "@/*" -> "./src/*"
```

---

## 🔌 2. Defining Ports and Adapters

### Port Contract (`core/domain/ports/recipe.repository.ts`):
```typescript
import { Recipe, PaginatedRecipeResponse } from '../models/recipe';

export interface RecipeRepository {
  getRecipes(page?: number, limit?: number): Promise<PaginatedRecipeResponse>;
  getRecipeById(id: string): Promise<Recipe | null>;
  searchRecipes(query: string, page?: number, limit?: number): Promise<PaginatedRecipeResponse>;
}
```

### Concrete Adapter (`core/infrastructure/repositories/http-recipe.repository.ts`):
```typescript
import { RecipeRepository } from '../../domain/ports/recipe.repository';
import { Recipe, PaginatedRecipeResponse, SingleRecipeResponse } from '../../domain/models/recipe';
import { request, ApiError } from '../http/api-client';

export class HttpRecipeRepository implements RecipeRepository {
  async getRecipes(page = 1, limit = 9): Promise<PaginatedRecipeResponse> {
    return request<PaginatedRecipeResponse>(`/recipes?page=${page}&limit=${limit}`);
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    try {
      const response = await request<SingleRecipeResponse>(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 404) {
        return null;
      }
      throw error;
    }
  }

  async searchRecipes(query: string, page = 1, limit = 9): Promise<PaginatedRecipeResponse> {
    return request<PaginatedRecipeResponse>(
      `/recipes/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
  }
}

export const recipeRepository = new HttpRecipeRepository();
```

---

## 🎨 3. UI Guidelines (shadcn/ui + Lucide + Private Folders)

1. **Design System**: Use standard **shadcn/ui** components (`Button`, `Card`, `Badge`, `Input`, `Skeleton`, `Separator`, `Pagination`) in `src/components/ui/`.
2. **Icons**: Use **Lucide React** (`lucide-react`) for all UI icons.
3. **Colocation with Private Folders**:
   - Route-specific components must be placed in `src/app/<route>/_components/` (e.g. `src/app/recipes/_components/RecipeCard.tsx`).
4. **Zero Ternaries Rule**:
   - Never use ternary operators (`condition ? a : b`). Always declare `if` and `else` explicitly.
