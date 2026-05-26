# ToolJet Clone + Audit + Deploy Plan

## Goal
Clone NexityNetwork/ToolJet, audit buildability, fix issues, deploy what is feasible, report blockers honestly.

## Architecture
- **Frontend**: React 18, Webpack 5, Tailwind, Sass → builds to `frontend/build/`
- **Server**: NestJS + TypeORM + PostgreSQL + Redis + BullMQ
- **Plugins**: Custom plugin system (builds first)
- **Database**: PostgreSQL 13 + PostgREST + Redis 6.2

## Build Order
1. plugins
2. frontend
3. server

## Steps
- [x] Fork + clone repo
- [x] Create feature branch `feat/clone-audit-and-deploy`
- [ ] Audit: frontend build standalone feasibility
- [ ] Audit: server build standalone feasibility
- [ ] Audit: DB availability / stub strategy
- [ ] Attempt plugin build
- [ ] Attempt frontend build (prod static)
- [ ] Attempt server build
- [ ] Fix any build issues encountered
- [ ] Deploy feasible artifacts to Workers for Platforms
- [ ] Report status: what-works / stubbed / blocked

## Blockers Log
- TBD
