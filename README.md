# SPECBUSTERS
// a Kiro Crew baseline for dev teams — spec in, ship out

**Who you gonna call? Seven specialists, one pipeline, humans on every gate.**

Specbusters is a ready-to-adopt Kiro Crew: seven highly specialized agents that take a feature from spec to deploy under a strict review and security standard (LODESTAR). Fork it, fill the placeholders, run the setup runbook, and your team has a working crew on day one.

## The Crew
| Agent | Role | Lane |
|---|---|---|
| Egon Speckler | Architect | Turns requirements into specs, designs and ADRs |
| Ray Buildantz | Builder | Implements against the approved spec |
| Winston Readmore | Reviewer | Code review on a different model family from the builder |
| Peter Threatkman | AppSec | Threat models, SAST, secrets and dependency checks |
| Janine Containitz | Platform | Containers, IaC and environment hygiene |
| Louis Keymaster | Deployer | Gated release; deploys stay manual and approved by a person |
| Slim3r Utils | Ad hoc | Odd jobs, cleanup and glue scripts |

## How it works
1. **Spec**: the architect drafts and a person approves.
2. **Build**: the builder implements and opens a merge request.
3. **Review + AppSec**: independent review and security gates.
4. **Platform check**: container, IaC and SBOM scans.
5. **Deploy**: a person presses the button. Always.

## Guardrails
- Human-in-the-loop on every merge and deploy
- Builder and reviewer run on different model families
- Pipeline: gitleaks · semgrep · trivy · checkov · SBOM · trace-check
- Gate tests T0–T15; `verify_baseline.py --strict` must pass

## Maturity path
`birth → crawl → walk → run`: start with spec and review only, and widen autonomy as gate tests stay green.

## Get started
1. Fork the repo
2. Fill `<PLACEHOLDERS>` and pin tool versions in `pins.md`
3. Follow `SETUP-RUNBOOK.md`, steps 0–10
4. Run the weekly check

## Status
🟢 Baseline v0.x · 🟡 Dashboard in progress · 🔒 Public release pending

---

## Dashboard (this repo)

Static command dashboard for the crew — dark containment theme, zero backend,
built on the static-spa v1.TW engine. Open `index.html` in a browser to
preview (no server needed). Pages: **Capabilities** (the pitch — mission
domains for geoservers, GEOINT, and space recon) · **Crew** (seven profile
cards) · **Gates** (T0–T15 board) · **Containment** (Phase-1 denials, Louis's
seven verbs, install integrity, PM rules) · **Pipeline** (stage gauntlet +
how-it-works) · **Operations** (dev-range rails, mission queue, PM, release
checks).

Everything editable lives in `js/data.js` — gate statuses, stage markers,
and queue states are marked `STATUS:`. Theme tokens: `css/style.css`.
