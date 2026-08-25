# Projects Ecosystem Overview & Workspace Guidelines

This document provides context for AI agents working in this workspace (`c:\Users\Gabriel\Desktop\projects`).

---

## 📁 Repository Structure

```text
projects/
├── backend/               # Express + TypeScript JSON REST API (Port 4000)
│   ├── data/              # JSON Datasets: movies, recipes, products, books
│   └── src/               # Application logic
│
├── movie-app/             # Next.js 15 Movies Catalog App (Port 3000)
│   ├── app/               # App Router pages & detail views
│   └── components/        # UI components
│
├── recipe-app/            # Clean Next.js 15 Starter for Recipes (Port 3001)
│   └── app/               # Ready for custom recipe implementation
│
├── agent-instructions/    # Central documentation folder for AI agents
│   ├── BACKEND_ARCHITECTURE.md
│   ├── API_REFERENCE.md
│   ├── FRONTEND_INTEGRATION.md
│   └── PROJECT_ECOSYSTEM.md
│
└── AGENTS.md              # Root agents guidance file
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

## 🤖 Instructions for AI Agents
1. **Separation of Concerns**: Treat every repository as an independent project.
2. **Language**: Keep all code, models, commit messages, and API routes in English.
3. **Adding New Frontend Projects**:
   - Assign the next available local port (`3002`, `3003`, etc.).
   - Configure `NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1`.
   - Never import files across repository boundaries using relative paths (e.g. `../backend/data`).
4. **Adding New Datasets**:
   - Simply create `backend/data/<dataset>/<dataset>.json` with an array of objects.
   - It will immediately be available via API at `/api/v1/<dataset>`.
