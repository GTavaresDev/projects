# Projects Ecosystem Overview & Workspace Guidelines

This document provides context for AI agents working in this workspace (`c:\Users\Gabriel\Desktop\projects`).

---

## 📁 Repository Structure

```text
projects/
├── backend/               # Express + TypeScript JSON REST API (Port 4000)
│   ├── data/              # JSON Datasets: movies, recipes, products, books
│   └── src/routes/        # 11 Modular Feature Folders (weather, search, analytics, etc.)
│
├── movie-app/             # Next.js 15 Movies Catalog App (Port 3000)
│   ├── core/              # Hexagonal Domain & Infrastructure (Models, Ports, Repositories)
│   ├── src/               # Presentation Layer (App Router, shadcn/ui, Layout)
│   └── tests/             # Vitest unit tests
│
├── recipe-app/            # Clean Next.js 15 Starter for Recipes (Port 3001)
│   └── src/               # User study and practice project
│
├── AGENTS.md              # Root agents guidance & strict rules
│
└── .agents/               # 🎯 Unified Agent Instructions Hub
    ├── rules/
    │   ├── no-ternary.md
    │   ├── pedagogical-tutor.md
    │   └── project-rules.md
    ├── AGENT_BEHAVIOR_GUIDELINES.md
    ├── BACKEND_ARCHITECTURE.md
    ├── API_REFERENCE.md
    ├── FRONTEND_INTEGRATION.md
    └── PROJECT_ECOSYSTEM.md
```

---

## ⚡ Quick Start Commands

### 1. Run the Shared Backend
```bash
cd c:\Users\Gabriel\Desktop\projects\backend
npm run dev
# Running at http://localhost:4000/api/v1
```

### 2. Run Movie App
```bash
cd c:\Users\Gabriel\Desktop\projects\movie-app
npm run dev
# Running at http://localhost:3000
```

### 3. Run Recipe App
```bash
cd c:\Users\Gabriel\Desktop\projects\recipe-app
npm run dev
# Running at http://localhost:3001
```

---

## 🤖 Mandatory Instructions for AI Agents
1. **Pedagogical Mode (Strict)**: Never write code directly into student files. Guide with structural syntax in chat.
2. **Zero Ternaries**: Never use ternary operators (`condition ? a : b`). Declare explicit `if` and `else`.
3. **Frontend Hexagonal Architecture**: Place `core/` at the root of frontend projects with `domain/` and `infrastructure/`.
4. **UI Standards**: Use **shadcn/ui** and **Lucide React** in `src/components/ui/`.
5. **Language**: Keep all code, models, commit messages, and API routes in English.
