# Projects Ecosystem Overview & Workspace Guidelines

This document provides context for AI agents working in this workspace (`c:\Users\Gabriel\Desktop\projects`).

---

## 📁 Repository Structure

```text
projects/
├── backend/               # Express + TypeScript JSON REST API (Port 4000)
│   ├── data/              # JSON Datasets: movies, books
│   └── src/routes/        # Modular Feature Folders (movies, books, search, cityDistance, health)
│
├── movie-app/             # Next.js 15 Movies Catalog App (Port 3000)
│   ├── core/              # Hexagonal Domain & Infrastructure
│   ├── src/               # Presentation Layer (App Router, shadcn/ui, Layout)
│   └── tests/             # Vitest unit tests
│
├── city-app/              # Next.js 15 City Distance & Word Analyzer App (Port 3002)
│   ├── core/              # Hexagonal Domain & Infrastructure
│   ├── src/               # Dashboard & Lexical Comparison Pages
│   └── tests/             # Vitest unit tests
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

### 3. Run City App
```bash
cd c:\Users\Gabriel\Desktop\projects\city-app
npm run dev
# Running at http://localhost:3002
```
