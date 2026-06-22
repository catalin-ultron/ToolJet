# Phase 1 UI extraction

## New isolated path
`frontend/packages/ui`

## What moved into the isolated package
- `src/button/Button.jsx`
- `src/input/Input.jsx`
- `src/checkbox/Checkbox.jsx`
- `src/textarea/Textarea.jsx`
- `src/label/Label.jsx`
- `src/utils/cn.js`
- `src/utils/Loader.jsx`

## What changed during extraction
- Replaced app-relative imports with local package-relative imports
- Removed dependency on legacy `frontend/src/_ui/Icon`
- Standardized icon rendering on `lucide-react`
- Added a single package barrel at `src/index.js`

## What stays in the main frontend for now
- Legacy `_ui` components
- App-specific wrappers and dashboard shells
- Complex dropdowns, file uploaders, navigation, and sidebars
- Components that still depend on ToolJet app stores or old icon system

## Rules for phase 2+
1. Only move components that can live without `frontend/src/_ui`
2. Copy shared helper code into the package before changing imports
3. Migrate consumers in small slices
4. Do not delete original frontend components until replacement coverage is proven
5. Extract theme tokens separately as their own layer

## Immediate follow-up
- Add resolver support so frontend can import `@tooljet/ui`
- Repoint 1 to 3 low-risk screens or forms
- Extract Select, Switch, Tooltip, Card next
