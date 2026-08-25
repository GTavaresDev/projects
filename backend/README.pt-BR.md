# Catalog API (`backend`)

[![CI](https://github.com/example/backend/actions/workflows/ci.yml/badge.svg)](https://github.com/example/backend/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)

> **Versões de Idioma / Language Versions:**  
> 🇧🇷 [Português](README.pt-BR.md) | 🇺🇸 [English](README.md)

API REST leve e de alta performance que serve conjuntos de dados ricos (Filmes, Receitas, Produtos, Livros) com auto-descoberta dinâmica, busca universal, analytics em tempo real, gerador de recomendações e utilitários para desenvolvimento.

---

## 🚀 Catálogo Completo de APIs & Exemplos de Resposta

URL Base: `http://localhost:4000/api/v1`

---

### 1. 🏥 Sistema & Auto-Descoberta

#### `GET /api/v1/health`
* **Descrição**: Retorna o status da API, tempo de atividade (*uptime*), versão e a lista de coleções descobertas no disco.
* **Exemplo de Resposta**:
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
* **Descrição**: Resumo com metadados de todas as coleções ativas, total de itens e campos disponíveis.
* **Exemplo de Resposta**:
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

### 2. 🔍 Busca Universal & Spotlight

#### `GET /api/v1/search?q=:termo&limit=5`
* **Descrição**: Busca global estilo Spotlight / Command Palette (`Cmd + K`) em **todas** as coleções ao mesmo tempo.
* **Exemplo**: `GET /api/v1/search?q=Nolan`
* **Exemplo de Resposta**:
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

### 3. 🎲 Itens Aleatórios & Recomendações

#### `GET /api/v1/random` / `GET /api/v1/:collection/random`
* **Descrição**: Retorna um item aleatório de qualquer coleção ou de um dataset específico. Ideal para apps com swipe estilo Tinder ou roletas de decisão.
* **Exemplo de Resposta**:
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
* **Descrição**: Combina algoritmicamente um filme com uma receita gourmet e traz dicas de preparo para noites de cinema.
* **Exemplo de Resposta**:
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

### 4. 📊 Estatísticas, Métricas & Facetas Dinâmicas

#### `GET /api/v1/stats`
* **Descrição**: Estatísticas calculadas em tempo real (médias de avaliação, contagem de itens, tags mais frequentes e uptime). Ideal para dashboards com gráficos.
* **Exemplo de Resposta**:
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

#### `GET /api/v1/:collection/facets` (ex: `/api/v1/movies/facets`, `/api/v1/recipes/facets`)
* **Descrição**: Gera facetas dinâmicas (categorias, gêneros, dificuldades, faixas de preço/ano/nota) com contagem de itens para montar menus laterais de filtros.
* **Exemplo de Resposta**:
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

### 5. 🛠️ Utilitários Dinâmicos para Desenvolvedores

#### `GET /api/v1/utils/placeholder.svg`
* **Parâmetros**: `width`, `height`, `text`, `bg` (hex sem #), `color` (hex sem #)
* **Exemplo**: `<img src="http://localhost:4000/api/v1/utils/placeholder.svg?width=600&height=400&text=Banner+Customizado&bg=4338ca&color=ffffff" />`
* **Retorno**: Imagem vetorial SVG pronta para renderizar no HTML.

#### `POST /api/v1/utils/analyze-text`
* **Payload**: `{ "text": "Construindo Aplicações Fullstack com Next.js 15" }`
* **Exemplo de Resposta**:
```json
{
  "data": {
    "originalText": "Construindo Aplicações Fullstack com Next.js 15",
    "slug": "construindo-aplicacoes-fullstack-com-next-js-15",
    "wordCount": 6,
    "charCount": 47,
    "readingTimeMinutes": 0.03,
    "estimatedReadingTime": "< 1 min read"
  }
}
```

#### `GET /api/v1/utils/weather?city=Sao+Paulo`
* **Descrição**: Simulação climática horária determinística para widgets de clima na navbar.
* **Exemplo de Resposta**:
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

### 6. 📁 Datasets Principais & Coleções Dinâmicas

Todas as coleções (`/movies`, `/recipes`, `/products`, `/books`, e qualquer pasta criada em `data/<nome>/`) suportam:

| Método | Endpoint | Parâmetros de Query | Descrição |
|---|---|---|---|
| `GET` | `/api/v1/:collection` | `page=1`, `limit=10`, `genre=Sci-Fi`, `category=Pasta` | Listagem paginada com filtros por atributos |
| `GET` | `/api/v1/:collection/search` | `q=termo`, `page=1`, `limit=10` | Busca universal dentro da coleção |
| `GET` | `/api/v1/:collection/:id` | — | Obter item único por ID |
| `POST` | `/api/v1/:collection` | Body: `{ name, description, image, ... }` | Criar novo item |
| `PUT` | `/api/v1/:collection/:id` | Body: `{ ...camposAtualizados }` | Atualizar item |
| `DELETE` | `/api/v1/:collection/:id` | — | Excluir item |

---

## 🧪 Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar testes automatizados
npm run test

# Iniciar servidor em desenvolvimento na porta 4000
npm run dev
```
