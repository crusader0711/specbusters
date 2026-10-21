# 0001. Keep the static site at the repository root

- **Status:** Accepted
- **Date:** 2026-10-21

## Context
Repo template v1.0 places primary source in `src/`. GitHub Pages for this repo is configured to serve the root of `main`.

## Decision
Keep `index.html`, `css/`, `js/`, `assets/` (and `.nojekyll` where present) at the repo root and treat them as the language-idiomatic `src/` equivalent. `make build` copies them to `dist/site/`.

## Consequences
Pages keeps working with no settings change. If the site ever moves (for example to `docs/` or a Pages build workflow), supersede this ADR.
