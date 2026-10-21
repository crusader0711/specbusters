# Architecture — Specbusters

## System boundary
A static site. Inputs: files in this repo. Output: HTML/CSS/JS/images served by GitHub Pages. No server, database, API or user data.

## Block diagram
```
 js/data.js ──(content)──┐
 css/style.css ──(theme)─┼─► index.html ──► js/app.js (hash router) ──► rendered page
 assets/*.jpg ──(images)─┘                    js/custom.js (helpers)
 Tailwind CDN + Google Fonts (external, runtime)
```

## Data flow
1. Browser loads `index.html`, which pulls styles, fonts and the three scripts.
2. `app.js` reads `location.hash`, picks the matching entry from the page list, and renders from `data.js`.
3. Navigation changes the hash; no network calls are made by the app itself.

## Deployment
GitHub Pages serves the root of `main` (`.nojekyll` disables Jekyll processing). `make build` produces the same file set in `dist/site/` for release packaging.
