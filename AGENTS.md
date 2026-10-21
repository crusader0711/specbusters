# AGENTS.md — Specbusters

**Tier: T1 (public / released)** · Repo template v1.0 · This is the primary agent instruction file; `CLAUDE.md` and `GEMINI.md` only point here.

## What this repo is
Static command dashboard for Specbusters, a persistent spec-driven Kiro Crew baseline: seven specialist agents, gated pipeline, humans on every critical gate. Static site served by GitHub Pages from the root of `main`.

## Layout
- `index.html`, `css/`, `js/`, `assets/`, `.nojekyll` — **the site** (language-idiomatic `src/`). Keep them at the repo root; moving them breaks GitHub Pages.
- `js/data.js` — all content. `js/app.js` — hash router + renderers. `js/custom.js` — theme helpers. `css/style.css` — tokens.
- `config/` — site metadata (`default.yaml`, `schema.json`); not read at runtime.
- `docs/` — architecture, ADRs (`docs/decisions/`), runbooks (`docs/runbooks/`).
- `scripts/` — implementations behind `make`. `hooks/` — git hooks. `tests/` — smoke tests. `examples/` — usage notes.

## Commands (all verified)
```bash
make setup     # git hooks
make lint      # node --check js/*.js, JSON/Python parse, shellcheck
make test      # python3 tests/unit/test_site_refs.py
make build     # dist/site + dist/specbusters-<version>.tar.gz
make release   # RELEASE_MANIFEST.json + SHA256SUMS (generated, never hand-edit)
python3 -m http.server 8000   # local preview
```

## Conventions
- Conventional Commits; short-lived `feat/` `fix/` branches; PRs into `main`; squash-merge by a human.
- Add a line under `[Unreleased]` in `CHANGELOG.md` for every user-visible change.
- New images: pre-optimized JPG in `assets/`, metadata stripped (`exiftool -all=` or equivalent).

## Guardrails
- **Never merge, change repo visibility, or change Pages settings.** A human does that.
- Public repo: no personal names, employers, emails, private hostnames, home-network details, client or project code names, credentials.
- No backend, no telemetry, no new third-party scripts without updating `ATTRIBUTION.md` and `PRIVACY.md`.
- Do not hand-edit `RELEASE_MANIFEST.json` or `SHA256SUMS`.
