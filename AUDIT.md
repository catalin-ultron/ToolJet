# ToolJet Build & Deploy Audit Report

**Repo**: NexityNetwork/ToolJet (forked under `$OWNER`)
**Branch**: `feat/clone-audit-and-deploy`
**Date**: 2025-01-09
**Auditor**: Ultron

## Executive Summary

ToolJet CE cloned, audited, partially built, and frontend deployed. Server compiles but cannot start without PostgreSQL + Redis. This is expected for a full-stack low-code platform.

---

## What Works

| Component | Status | Evidence |
|---|---|---|
| **Repository clone** | OK | Forked from NexityNetwork/ToolJet, cloned to /work/ToolJet |
| **Feature branch** | OK | `feat/clone-audit-and-deploy` created and pushed |
| **Plugins build** | OK | All 54 plugins compile to `dist/server.js`; prerequisite for frontend |
| **Frontend deps install** | OK | `npm install` in `frontend/` completed (19,000+ packages) |
| **Frontend static build** | OK | Webpack compiled to `frontend/build/index.html` + assets |
| **Server deps install** | OK | `npm install` in `server/` completed |
| **Server TypeScript compile** | OK | `nest build` produces `server/dist/` output |
| **Frontend deployment** | OK | Live at https://tooljet.apps.51ultron.com |

---

## Fixes Applied

1. **`frontend/package.json`**: Moved `webpack-bundle-analyzer` from `dependencies` to `devDependencies`
   - *Why*: `NODE_ENV=production` build failed because this package requires `chalk` which was unavailable in production installs
   - *Impact*: Frontend now builds cleanly in CI/deployment environments

2. **`frontend/webpack.config.js`**: Set `SERVE_CLIENT=false` and `ASSETS_PATH` for static export
   - *Why*: ToolJet defaults to `SERVE_CLIENT=true` which expects the server to serve the frontend
   - *Impact*: Frontend builds as a standalone SPA that can be served from any static host

---

## What's Stubbed / Limited

| Component | Limitation |
|---|---|
| **Frontend** | Static SPA only; all API calls fail because there's no backend running. App renders React shell but cannot authenticate, fetch apps, or run queries |
| **Server** | Compiles but cannot start (see blockers below) |
| **Plugins** | Built but not registered at runtime because server is down |
| **Database** | No Supabase project created yet; could be wired as PostgreSQL replacement |

---

## Blockers

| # | Blocker | Severity | Workaround |
|---|---|---|---|
| 1 | **No PostgreSQL**: Server requires PostgreSQL 13+; Docker unavailable in sandbox | CRITICAL | Could create Supabase project via Management API; schema migration would need `typeorm migration:run` |
| 2 | **No Redis**: Server requires Redis 6.2+ for BullMQ job queues | CRITICAL | No workaround in sandbox; required for background jobs |
| 3 | **No SMTP**: Email features need `SMTP_DOMAIN` + `SMTP_PORT` | MEDIUM | Brevo integration could provide this |
| 4 | **No MinIO/S3**: File storage needs `S3_BUCKET` + credentials | LOW | Can be stubbed for basic usage |

---

## Deployment Artifacts

| Artifact | Location | Access |
|---|---|---|
| Frontend static build | `frontend/build/` | Live: https://tooljet.apps.51ultron.com |
| Server compiled output | `server/dist/` | Not deployed (needs runtime DB) |
| Plugin builds | `plugins/*/dist/` | Prerequisite only |

---

## Recommended Next Steps

1. **Create Supabase project** via Management API with PostgreSQL
2. **Run TypeORM migrations** to initialize ToolJet schema
3. **Stub Redis** with an in-memory store or disable BullMQ if not needed
4. **Re-deploy server** as a Cloudflare Worker or traditional Node.js service
5. **Wire frontend** to the live backend URL instead of `TOOLJET_SERVER_URL=undefined`
