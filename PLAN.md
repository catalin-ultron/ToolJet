# ToolJet extraction plan

## Goal
Extract reusable parts of the frontend UI layer first, then continue in phases through shared shells, integration forms, and higher-coupling builder surfaces.

## Phase 1: Frontend UI layer
- [x] Audit `frontend/src/_ui` and `frontend/src/components/ui`
- [x] Identify duplication, dependency patterns, and blockers
- [x] Decide first extraction target: create a new package for modern UI primitives only
- [ ] Create package scaffold under `packages/ui` or `frontend/packages/ui`
- [ ] Move first-pass primitives from `frontend/src/components/ui` into the new package
- [ ] Add explicit package entrypoints and local dependency helpers
- [ ] Repoint a small set of frontend imports to the new package
- [ ] Verify frontend builds with extracted package

## Decision log
1. Do not start with legacy `frontend/src/_ui`.
2. Start with modern primitives from `frontend/src/components/ui`.
3. First batch should be Button, Input, Checkbox, TextArea and shared helpers only.
4. Leave app-specific wrappers and mixed SCSS components in place for later phases.

## Known blockers
- Styling is split between legacy SCSS and newer Tailwind token classes.
- Some modern components still import legacy icons from `_ui/Icon`.
- There is no clean barrel export pattern today, so the new package needs one.
