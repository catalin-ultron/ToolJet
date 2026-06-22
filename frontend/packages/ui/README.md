# @tooljet/ui

Isolated frontend UI package extracted from ToolJet for reuse in a larger project.

## Phase 1 scope
- Button
- Input
- Checkbox
- Textarea
- Label
- Shared helpers needed by those primitives

## Principles
- Keep the package isolated from `frontend/src/_ui`
- Keep imports local within the package
- Prefer modern `frontend/src/components/ui` primitives
- Do not move app-specific wrappers in phase 1

## Current constraints
- Styling still depends on ToolJet Tailwind tokens and CSS variables
- Some consumers in the app still import the original frontend paths
- Legacy icon usage has been removed from the extracted slice by using Lucide icons only

## Next steps
1. Add this package to frontend workspace resolution
2. Point a first set of screens and forms at `@tooljet/ui`
3. Extract more primitives and shared theme tokens
4. Remove duplicate legacy implementations after migration stabilizes
