# CityGeo & Word Analyzer (`city-app`)

Modern Next.js 15 web application built on **Hexagonal Architecture (Ports & Adapters)** consuming the [`backend`](file:///c:/Users/Gabriel/Desktop/projects/backend) `/api/v1/city-distance` endpoint.

---

## 🏛️ Architecture

```text
city-app/
├── core/                                # 🎯 Hexagonal Core (Root level)
│   ├── domain/
│   │   ├── models/cityDistance.ts       # Domain Types & Models
│   │   └── ports/cityDistance.repository.ts # Repository Port Interface
│   └── infrastructure/
│       ├── http/api-client.ts           # Type-safe API client
│       └── repositories/http-city-distance.repository.ts # Concrete Adapter
│
├── src/                                 # 🎨 Presentation Layer
│   ├── app/
│   │   ├── page.tsx                     # City Distance & Travel Time Dashboard
│   │   ├── compare/page.tsx             # Lexical & Anagram Analyzer
│   │   └── error.tsx                    # Friendly error boundary
│   └── components/
│       ├── ui/                          # shadcn/ui Design System
│       └── layout/                      # Header, Footer
│
└── tests/                               # Vitest Unit Tests
```

---

## ⚡ Quick Start

```bash
cd c:\Users\Gabriel\Desktop\projects\city-app
npm run dev
# Running at http://localhost:3002
```
