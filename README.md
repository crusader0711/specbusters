# Specbusters

![tier: T1 public](https://img.shields.io/badge/tier-T1%20public-2ea44f) ![license: MIT](https://img.shields.io/badge/license-MIT-blue) [![ci](https://github.com/crusader0711/specbusters/actions/workflows/ci.yml/badge.svg)](https://github.com/crusader0711/specbusters/actions/workflows/ci.yml)

## Overview

// a Kiro Crew baseline for dev teams — spec in, ship out

**Who you gonna call? Seven specialists, one pipeline, humans on every gate.**

Specbusters is a persistent, ready-to-adopt Kiro Crew: seven highly specialized agents that take a feature from spec to deploy under a strict review and security standard (LODESTAR). Fork it, fill the placeholders, run the setup runbook, and your team has a working crew on day one.

**Live site:** https://crusader0711.github.io/specbusters/

## Quickstart

```bash
git clone https://github.com/crusader0711/specbusters.git && cd specbusters
make setup          # install git hooks (gitleaks pre-commit if available)
python3 -m http.server 8000   # then open http://localhost:8000
```

Or just open `index.html` in a browser; the site has no backend.

## Architecture

A zero-backend, hash-routed single-page app. `index.html` loads `css/style.css`, Tailwind (CDN) and three scripts:
`js/data.js` (all content), `js/app.js` (router + page renderers) and `js/custom.js` (theme helpers).
GitHub Pages serves the repo root of `main`, so the root site files are this repo's `src/` equivalent.
Details: [docs/architecture.md](docs/architecture.md).

## Usage

Pages: Capabilities, Crew, Gates, Containment, Pipeline, Operations. Edit content in `js/data.js`, theme tokens in `css/style.css`, images in `assets/`.

### Why a persistent crew
Work carries across sessions with context that survives restarts. Heartbeats keep agent status visible, scheduled jobs run recurring checks, and the crew reacts to CI/CD events by routing work to the right lane. Humans still sign every merge and press every deploy.

### The Crew
| Agent | Role | Lane |
|---|---|---|
| Egon Speckler | Architect | Turns requirements into specs, designs and ADRs |
| Ray Buildantz | Builder | Implements against the approved spec |
| Winston Readmore | Reviewer | Code review on a different model family from the builder |
| Peter Threatkman | AppSec | Threat models, SAST, secrets and dependency checks |
| Janine Containitz | Platform | Containers, IaC and environment hygiene |
| Louis Keymaster | Deployer | Gated release; deploys stay manual and approved by a person |
| Slim3r Utils | Ad hoc | Odd jobs, cleanup and glue scripts |

### How it works
1. **Spec**: the architect drafts and a person approves.
2. **Build**: the builder implements and opens a merge request.
3. **Review + AppSec**: independent review and security gates.
4. **Platform check**: container, IaC and SBOM scans.
5. **Deploy**: a person presses the button. Always.

### Guardrails
- Human-in-the-loop on every merge and deploy
- Builder and reviewer run on different model families
- Pipeline: gitleaks · semgrep · trivy · checkov · SBOM · trace-check
- Gate tests T0–T15; `verify_baseline.py --strict` must pass

### Maturity path
`birth → crawl → walk → run`: start with spec and review only, and widen autonomy as gate tests stay green.

### Get started
1. Fork the repo
2. Fill `<PLACEHOLDERS>` and pin tool versions in `pins.md`
3. Follow `SETUP-RUNBOOK.md`, steps 0–10
4. Run the weekly check

### Status
🟢 Baseline v0.x · 🟡 Dashboard in progress · 🔒 Public release pending


### Dashboard (this repo)

Static command dashboard for the crew — dark containment theme, zero backend,
built on the static-spa v1.TW engine. Open `index.html` in a browser to
preview (no server needed). Pages: **Capabilities** (the pitch — mission
domains for geoservers and GEOINT) · **Crew** (seven profile
cards) · **Gates** (T0–T15 board) · **Containment** (Phase-1 denials, Louis's
seven verbs, install integrity, PM rules) · **Pipeline** (stage gauntlet +
how-it-works) · **Operations** (dev-range rails, mission queue, PM, release
checks).

Everything editable lives in `js/data.js` — gate statuses, stage markers,
and queue states are marked `STATUS:`. Theme tokens: `css/style.css`.

## Development

| Command | What it does |
|---|---|
| `make help` | List targets |
| `make setup` | Install git hooks |
| `make lint` | `node --check` on JS, JSON/Python parse, shellcheck |
| `make test` | Site smoke tests (`tests/unit/test_site_refs.py`) |
| `make build` | Copy the site into `dist/site/` + tarball |
| `make release` | Build, then write `RELEASE_MANIFEST.json` + `SHA256SUMS` |
| `make clean` | Remove `dist/` and caches |

See [CONTRIBUTING.md](CONTRIBUTING.md), [AGENTS.md](AGENTS.md) and [WIKI.md](WIKI.md).

## License

[MIT](LICENSE). See also [ATTRIBUTION.md](ATTRIBUTION.md), [SECURITY.md](SECURITY.md), [PRIVACY.md](PRIVACY.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
