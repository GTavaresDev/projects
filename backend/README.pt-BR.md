# Catalog API (`backend`)

[![CI](https://github.com/example/backend/actions/workflows/ci.yml/badge.svg)](https://github.com/example/backend/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)

> **Versões de Idioma / Language Versions:**  
> 🇧🇷 [Português](README.pt-BR.md) | 🇺🇸 [English](README.md)

API REST modular e de alta performance organizada em módulos de funcionalidades dedicados: API de Clima, Gerador de Imagens Placeholder, Analisador de Texto e Slugs, Busca Spotlight Universal, Roleta Aleatória, Recomendador de Combos, Analytics em Tempo Real e Datasets Dinâmicos.

---

## 📂 Arquitetura Modular de Rotas

```text
backend/src/routes/
├── health.ts          # GET /api/v1/health & /api/v1/collections & /api/v1 (índice)
├── weather.ts         # GET /api/v1/weather & /api/v1/weather/forecast
├── placeholders.ts    # GET /api/v1/placeholders/svg & /api/v1/placeholders/:w/:h
├── textAnalysis.ts    # POST /api/v1/text-analysis/analyze & GET /api/v1/text-analysis/slugify
├── search.ts          # GET /api/v1/search?q=:termo (Spotlight Universal)
├── random.ts          # GET /api/v1/random (Roleta)
├── combos.ts          # GET /api/v1/combos/movie-night
├── analytics.ts       # GET /api/v1/stats & GET /api/v1/:collection/facets
├── movies.ts          # CRUD Completo de Filmes
├── recipes.ts         # CRUD Completo de Receitas
└── genericCollection.ts # CRUD Genérico para qualquer dataset em data/
```

---

## 🚀 Catálogo Completo de APIs & Exemplos de Resposta

URL Base: `http://localhost:4000/api/v1`

---

### 1. ⛅ API Dedicada de Clima (`/api/v1/weather`)

#### `GET /api/v1/weather?city=Curitiba`
* **Descrição**: Retorna o clima atual por hora, índice UV e qualidade do ar.
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
* **Descrição**: Retorna a previsão do tempo para 5 dias com máximas, mínimas e chance de chuva.

---

### 2. 🖼️ API Dedicada de Placeholders SVG (`/api/v1/placeholders`)

#### `GET /api/v1/placeholders/svg?width=600&height=400&text=Banner&bg=1e1b4b&color=818cf8`
#### `GET /api/v1/placeholders/400/300?text=Card`
* **Descrição**: Retorna uma imagem vetorial SVG gerada na hora para renderizar diretamente na tag `<img src="..." />`.

---

### 3. ✍️ API Dedicada de Análise de Texto & Slugs (`/api/v1/text-analysis`)

#### `POST /api/v1/text-analysis/analyze`
* **Payload**: `{ "text": "Construindo Aplicações Fullstack com Next.js 15" }`
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

#### `GET /api/v1/text-analysis/slugify?text=Next.js+15+App+Router`
* **Descrição**: Converte qualquer texto em um slug amigável para URLs.

---

### 4. 🔍 Busca Universal & Spotlight (`/api/v1/search`)

#### `GET /api/v1/search?q=Nolan&limit=5`
* **Descrição**: Busca global em **todas** as coleções simultaneamente (`movies`, `recipes`, `products`, `books`).

---

### 5. 🎲 Itens Aleatórios & Recomendações (`/api/v1/random`, `/api/v1/combos`)

#### `GET /api/v1/random`
* **Descrição**: Roleta que sorteia um item de qualquer categoria.

#### `GET /api/v1/combos/movie-night?genre=Sci-Fi`
* **Descrição**: Combina algoritmicamente um filme com uma receita gourmet para noites de cinema.

---

### 6. 📊 Analytics, Métricas & Facetas (`/api/v1/stats`, `/api/v1/:collection/facets`)

#### `GET /api/v1/stats`
* **Descrição**: Estatísticas agregadas em tempo real em todos os datasets.

#### `GET /api/v1/movies/facets` & `GET /api/v1/recipes/facets`
* **Descrição**: Extrai todos os gêneros, categorias e faixas com contagens para filtros laterais.

---

### 7. 📁 Datasets Principais & Coleções Dinâmicas

Disponíveis em `/movies`, `/recipes`, `/products`, `/books`, e qualquer pasta criada em `data/<nome>/`:

| Método | Endpoint | Parâmetros de Query | Descrição |
|---|---|---|---|
| `GET` | `/api/v1/:collection` | `page=1`, `limit=10`, `genre=Sci-Fi` | Listagem paginada com filtros |
| `GET` | `/api/v1/:collection/search` | `q=termo`, `page=1`, `limit=10` | Busca universal na coleção |
| `GET` | `/api/v1/:collection/:id` | — | Obter item único por ID |
| `POST` | `/api/v1/:collection` | Body: `{ name, description, image, ... }` | Criar novo item |
| `PUT` | `/api/v1/:collection/:id` | Body: `{ ...campos }` | Atualizar item |
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
