# Bellamy — Movie Explorer

Bellamy is a small, responsive movie-discovery app for finding a good film for movie night. Browse a curated collection, search by title or director, filter by genre, sort the results, and save picks to a watchlist that stays in your browser.

## Project spec

- **Goal:** Make a calm, visual place to discover and shortlist films.
- **Audience:** Anyone looking for a film recommendation without signing in.
- **Core features:** Curated movie cards, genre filters, live search, sorting, movie-detail dialogs, and a locally saved watchlist.
- **Stack:** Semantic HTML, CSS, and vanilla JavaScript. No build step, account, or API key.
- **Data:** A small curated sample is bundled in `app.js`; movie poster images are served from TMDB's public image CDN.

## Run locally

Open `index.html` in a browser, or serve the folder with any static file server. For example:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy

The included GitHub Actions workflow publishes this static site to GitHub Pages whenever changes are pushed to `main`. In the repository settings, enable **Pages** with **GitHub Actions** as the build and deployment source. The workflow run will provide the published URL.

## Notes

- The watchlist uses browser `localStorage`; it is specific to the current browser and device.
- Google Fonts and movie posters load from external services and need an internet connection. App functionality does not depend on an API.
