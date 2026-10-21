# Runbook: edit and publish the site

1. Branch from `main`: `git switch -c feat/<slug>`.
2. Edit `js/data.js` (content), `css/style.css` (theme) or add images to `assets/` (strip metadata first).
3. Preview: `python3 -m http.server 8000` and open http://localhost:8000.
4. `make lint test`; add a `CHANGELOG.md` line under `[Unreleased]`.
5. Open a PR. CI runs `make lint test`. A human merges; GitHub Pages republishes `main` within a few minutes.

## Recovery
- Blank page: open the browser console; a syntax error in `js/data.js` is the usual cause (`make lint` catches it).
- Old version showing: hard refresh; Pages caches for ~10 minutes.
- Bad release: revert the merge commit on `main`; Pages redeploys the previous state.
