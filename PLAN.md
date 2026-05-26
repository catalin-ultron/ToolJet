# ToolJet Audit, Build & Deploy Plan

## Goal
Clone, audit, build, and deploy the ToolJet low-code platform frontend. Report honest blockers; do not stall on any single issue.

## Status Checklist
- [x] Clone repo from NexityNetwork/ToolJet
- [x] Create `.env` with dummy values (GOOGLE_MAPS_API_KEY, TOOLJET_DB_*)
- [x] Install root dependencies (`npm install`)
- [ ] Install frontend dependencies (`npm --prefix frontend install --production=false`)
- [ ] Install plugins dependencies (`npm --prefix plugins install`)
- [ ] Build plugins (`npm run build:plugins:prod`)
- [ ] Build frontend (`npm run build:frontend`)
- [ ] Install server dependencies (optional / if needed for full stack)
- [ ] Build server (optional)
- [ ] Audit & fix any build errors
- [ ] Deploy static frontend build via `deploy_wfp`
- [ ] Verify deployed UI renders correctly
- [ ] Report blockers / what’s stubbed

## Build Sequence
ToolJet root package.json defines:
1. `build:plugins:prod`
2. `build:frontend`
3. `build:server`
Frontend output: `./build/` (webpack + copy assets).

## Key Constraints
- Node 22.15.1 / npm 10.9.2
- Frontend depends on `@tooljet/plugins` symlinked at `../plugins`
- Backend requires Postgres, Redis, etc. — full stack likely blocked, deploy frontend-only as feasible
- /work is ephemeral — commit + push after every step
