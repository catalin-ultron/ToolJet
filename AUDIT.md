# ToolJet Audit Report

## Overview
- **Repository**: https://github.com/NexityNetwork/ToolJet
- **Version**: 1.18.0
- **Type**: Open-source low-code framework for internal tools
- **Architecture**: Full-stack monorepo (Frontend SPA + Backend API + Plugin SDK)

## Stack Analysis

### Frontend
- React 18.2 + Webpack 5 + Babel
- Tailwind CSS + Bootstrap 5 hybrid
- Radix UI primitives + Tabler icons + Lucide icons
- CodeMirror 6, Plotly, ReactFlow, Yjs (collaboration)
- Build: `webpack --mode=production` → static `build/` directory
- Dev server: `webpack serve --port 8082`

### Backend
- NestJS 11 (TypeScript)
- TypeORM 0.3.x with PostgreSQL
- Redis via BullMQ + ioredis
- Temporal.io for workflows
- Isolated-vm for sandboxed code execution
- WebSockets via @nestjs/platform-ws
- Many enterprise integrations (SSO, SAML, SCIM, LDAP)

### Plugins
- 50+ plugin packages (airtable, bigquery, dynamodb, graphql, mongodb, etc.)
- Some plugins wrap native database drivers (oracledb, mssql, pg, mysql)
- Build order: plugins → frontend → server

## Deployment Feasibility

### Workers for Platforms (Static)
- Frontend SPA CAN be built to static and deployed to WFP.
- Backend CANNOT run on WFP (requires Node.js server, DB, Redis, Temporal).
- Without backend, the UI will load but be non-functional (no auth, no data, no API).

### Known Risks
1. **Node version mismatch**: repo requires 22.15.1, container has 22.13.0
2. **Native dependencies**: bcrypt, isolated-vm, database drivers may fail to compile
3. **Plugin build**: 50+ packages to build before frontend can compile
4. **.env requirements**: frontend may need API_BASE_URL or similar at build time

## Strategy
1. Build plugins (stub/minimal if native deps fail)
2. Build frontend to static output
3. Deploy the built shell to WFP
4. Report honestly: UI loads, backend required for functionality
