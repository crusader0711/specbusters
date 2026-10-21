# Examples

## Add a page
Append an entry to the page list in `js/data.js` with a unique `route` (e.g. `/notes`) and a renderer type that `js/app.js` already supports, then preview with `python3 -m http.server 8000` and visit `#/notes`.

## Change the accent color
Edit the TOKENS block at the top of `css/style.css`; every component reads from those variables.
