# Workspace Project Rules

## Architecture Rules
1. Every repository in this workspace is independent.
2. The `backend` provides the shared JSON REST API on port `4000`.
3. Frontends consume data exclusively via HTTP (`NEXT_PUBLIC_API_URL`).
4. To add new study datasets, create `backend/data/<name>/<name>.json`.
5. Keep all code, API routes, models, and comments in English.
