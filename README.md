# Bellamy — Music for the Moment

Bellamy is a responsive music discovery app. Browse Deezer's current chart, search for tracks and artists, save favorites in your browser, and play 30-second previews.

## Project spec

- **Goal:** Help listeners discover a song and preview it quickly.
- **Audience:** Music fans who want a no-sign-in way to explore tracks.
- **Core features:** Deezer chart and search, track artwork and artist details, 30-second audio previews, playback controls, and browser-saved favorites.
- **Stack:** Semantic HTML, CSS, and vanilla JavaScript; Deezer's public API; no build step or API key.
- **Limitations:** Full-length streaming and Deezer account features are not included. The public API and preview availability depend on Deezer and an internet connection.

## Run locally

Open `index.html` in a browser, or serve the folder with any static file server. For example:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy

The GitHub Actions workflow publishes this static site to GitHub Pages whenever changes are pushed to `main`. In the repository settings, enable **Pages** with **GitHub Actions** as the build and deployment source. The workflow run will provide the published URL.

## Data and privacy

- Track details, charts, and preview audio are provided by Deezer.
- Favorites are stored in browser `localStorage` and are specific to that browser and device.
- Deezer must allow its JSONP API endpoints to be reached from your network; no account or API key is used.
