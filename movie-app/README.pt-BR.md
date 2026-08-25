# Movie App (`movie-app`)

[![CI](https://github.com/example/movie-app/actions/workflows/ci.yml/badge.svg)](https://github.com/example/movie-app/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-15.x-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

> **Versões de Idioma / Language Versions:**  
> 🇧🇷 [Português](README.pt-BR.md) | 🇺🇸 [English](README.md)

Frontend moderno e responsivo desenvolvido em **Next.js 15 (App Router)** para exploração de catálogos de filmes. Consome dados exclusivamente da API backend compartilhada (`backend`) via endpoints REST, sem acesso direto a banco de dados.

---

## 🎨 Destaques de Design e Interface

- **Estética Glassmorphism**: Tema cinematográfico escuro com painéis translúcidos e micro-interações suaves.
- **Layout Responsivo**: Otimizado para dispositivos móveis, tablets e desktops.
- **Otimização de Imagens**: Carregamento otimizado com skeletons de carregamento.
- **Tratamento de Estados Vazios e Erros**: Interfaces amigáveis em caso de falha de conexão ou busca sem resultados.
- **Busca e Paginação**: Barra de busca interativa com gerenciamento de estado via URL e navegação paginada.

---

## 📁 Estrutura do Projeto

```text
movie-app/
├── app/
│   ├── layout.tsx                 # Layout raiz com Header, Footer e estilos globais
│   ├── page.tsx                   # Página inicial com banner e filmes em destaque
│   ├── movies/
│   │   ├── page.tsx               # Catálogo completo com paginação
│   │   └── [id]/
│   │       └── page.tsx           # Página de detalhes do filme
│   ├── search/
│   │   └── page.tsx               # Página de resultados de busca
│   ├── loading.tsx                # Indicador de carregamento skeleton
│   ├── error.tsx                  # Tratamento global de erros
│   └── not-found.tsx              # Página 404
│
├── components/
│   ├── layout/                    # Componentes Header e Footer
│   ├── movies/                    # MovieCard, MovieSkeleton, MovieGrid
│   └── ui/                        # Componentes reutilizáveis (Pagination, EmptyState, ErrorState)
│
├── lib/
│   ├── api/                       # Cliente de API consumindo backend
│   ├── types/                     # Definições TypeScript (Movie, Pagination, ApiError)
│   └── utils/                     # Utilitários como cn
│
├── tests/                         # Suíte de testes unitários com Vitest
├── .env.example
└── README.md
```

---

## ⚙️ Configuração do Ambiente

Crie o arquivo `.env` copiando a partir de `.env.example`:

```bash
cp .env.example .env
```

| Variável | Descrição | Padrão |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base da API do catálogo | `http://localhost:4000/api/v1` |

---

## 🧪 Instalação e Execução

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Executar testes**:
   ```bash
   npm run test
   ```

3. **Iniciar servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

   Acesse `http://localhost:3000` no seu navegador.
