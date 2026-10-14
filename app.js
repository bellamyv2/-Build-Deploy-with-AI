const movies = [
  {
    id: "dune-part-two",
    title: "Dune: Part Two",
    year: 2024,
    rating: 8.5,
    runtime: "2h 46m",
    genres: ["Sci-Fi", "Adventure"],
    tag: "Bellamy pick",
    director: "Denis Villeneuve",
    poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    overview:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
  },
  {
    id: "past-lives",
    title: "Past Lives",
    year: 2023,
    rating: 7.9,
    runtime: "1h 46m",
    genres: ["Drama", "Romance"],
    tag: "A quiet favorite",
    director: "Celine Song",
    poster: "https://image.tmdb.org/t/p/w500/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg",
    overview:
      "Two deeply connected childhood friends are wrested apart after one family's emigration from South Korea. Years later, they reconnect for one fateful week.",
  },
  {
    id: "spider-verse",
    title: "Across the Spider-Verse",
    year: 2023,
    rating: 8.6,
    runtime: "2h 20m",
    genres: ["Animation", "Adventure"],
    tag: "A visual feast",
    director: "Joaquim Dos Santos",
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    overview:
      "Miles Morales catapults across the multiverse, where he encounters a team of Spider-People charged with protecting its existence.",
  },
  {
    id: "poor-things",
    title: "Poor Things",
    year: 2023,
    rating: 7.8,
    runtime: "2h 21m",
    genres: ["Drama", "Sci-Fi"],
    tag: "Wonderfully weird",
    director: "Yorgos Lanthimos",
    poster: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    overview:
      "The incredible tale and fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant Dr. Godwin Baxter.",
  },
  {
    id: "everything-everywhere",
    title: "Everything Everywhere All at Once",
    year: 2022,
    rating: 7.8,
    runtime: "2h 20m",
    genres: ["Sci-Fi", "Adventure"],
    tag: "Big-hearted chaos",
    director: "Daniel Kwan & Daniel Scheinert",
    poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    overview:
      "An exhausted Chinese American woman gets swept up in an insane adventure where she alone can save the world by exploring other universes.",
  },
  {
    id: "barbie",
    title: "Barbie",
    year: 2023,
    rating: 7.0,
    runtime: "1h 54m",
    genres: ["Comedy", "Adventure"],
    tag: "Pink, with a point",
    director: "Greta Gerwig",
    poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    overview:
      "Barbie and Ken are having the time of their lives in the colorful, seemingly perfect world of Barbie Land—until a trip to the real world changes everything.",
  },
  {
    id: "the-batman",
    title: "The Batman",
    year: 2022,
    rating: 7.7,
    runtime: "2h 56m",
    genres: ["Drama", "Adventure"],
    tag: "After dark",
    director: "Matt Reeves",
    poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    overview:
      "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
  },
  {
    id: "interstellar",
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
    runtime: "2h 49m",
    genres: ["Sci-Fi", "Drama"],
    tag: "Worth the rewatch",
    director: "Christopher Nolan",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    overview:
      "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.",
  },
  {
    id: "wonka",
    title: "Wonka",
    year: 2023,
    rating: 7.1,
    runtime: "1h 56m",
    genres: ["Comedy", "Adventure"],
    tag: "Pure imagination",
    director: "Paul King",
    poster: "https://image.tmdb.org/t/p/w500/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
    overview:
      "With a head full of dreams, young chocolatier Willy Wonka manages to change the world, one delectable bite at a time.",
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    year: 2023,
    rating: 8.1,
    runtime: "3h 00m",
    genres: ["Drama"],
    tag: "A monumental story",
    director: "Christopher Nolan",
    poster: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
    overview:
      "The story of J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
  },
  {
    id: "little-women",
    title: "Little Women",
    year: 2019,
    rating: 7.9,
    runtime: "2h 15m",
    genres: ["Drama", "Romance"],
    tag: "A warm-hearted classic",
    director: "Greta Gerwig",
    poster: "https://image.tmdb.org/t/p/w500/yn5ihODtZ7ofn8pDYfxCmxh8AXI.jpg",
    overview:
      "Four sisters come of age in America in the aftermath of the Civil War, each determined to live life on her own terms.",
  },
  {
    id: "knives-out",
    title: "Knives Out",
    year: 2019,
    rating: 7.8,
    runtime: "2h 11m",
    genres: ["Comedy", "Drama"],
    tag: "Cleverly crafted",
    director: "Rian Johnson",
    poster: "https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
    overview:
      "A detective investigates the death of a patriarch at a family gathering where everyone is a suspect.",
  },
];

const storageKey = "frame-watchlist";
const grid = document.querySelector("#movie-grid-content");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const filters = document.querySelector("#genre-filters");
const resultsLabel = document.querySelector("#results-label");
const clearFiltersButton = document.querySelector("#clear-filters");
const emptyState = document.querySelector("#empty-state");
const watchlistCount = document.querySelector("#watchlist-count");
const dialog = document.querySelector("#movie-dialog");
const dialogContent = document.querySelector("#dialog-content");
const dialogClose = document.querySelector("#dialog-close");

let activeGenre = "All";
let showingWatchlist = false;

function loadWatchlist() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return new Set(Array.isArray(saved) ? saved.filter((id) => typeof id === "string") : []);
  } catch (error) {
    console.error("Unable to load the saved watchlist.", error);
    return new Set();
  }
}

let watchlist = loadWatchlist();

function saveWatchlist() {
  try {
    localStorage.setItem(storageKey, JSON.stringify([...watchlist]));
  } catch (error) {
    console.error("Unable to save the watchlist.", error);
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function getVisibleMovies() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleMovies = movies.filter((movie) => {
    const matchesGenre = activeGenre === "All" || movie.genres.includes(activeGenre);
    const matchesQuery =
      !query ||
      `${movie.title} ${movie.year} ${movie.genres.join(" ")} ${movie.director}`
        .toLowerCase()
        .includes(query);
    const matchesWatchlist = !showingWatchlist || watchlist.has(movie.id);
    return matchesGenre && matchesQuery && matchesWatchlist;
  });

  switch (sortSelect.value) {
    case "rating":
      visibleMovies = [...visibleMovies].sort((a, b) => b.rating - a.rating);
      break;
    case "year":
      visibleMovies = [...visibleMovies].sort((a, b) => b.year - a.year);
      break;
    case "title":
      visibleMovies = [...visibleMovies].sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break;
  }
  return visibleMovies;
}

function updateWatchlistCount() {
  watchlistCount.textContent = String(watchlist.size);
}

function renderMovies() {
  const visibleMovies = getVisibleMovies();
  const searchTerm = searchInput.value.trim();
  const filtersAreActive = activeGenre !== "All" || Boolean(searchTerm) || showingWatchlist;
  resultsLabel.textContent = showingWatchlist
    ? `Your watchlist · ${visibleMovies.length} ${visibleMovies.length === 1 ? "film" : "films"}`
    : filtersAreActive
      ? `${visibleMovies.length} ${visibleMovies.length === 1 ? "film" : "films"} found`
      : `Showing all ${movies.length} films`;
  clearFiltersButton.hidden = !filtersAreActive;
  grid.hidden = visibleMovies.length === 0;
  emptyState.hidden = visibleMovies.length > 0;
  grid.innerHTML = visibleMovies
    .map((movie) => {
      const saved = watchlist.has(movie.id);
      const genreLabel = movie.genres.join(" · ");
      return `
        <article class="movie-card">
          <div class="poster-wrap">
            <img class="movie-poster" src="${escapeHtml(movie.poster)}" alt="${escapeHtml(`${movie.title} poster`)}" loading="lazy" />
            <div class="poster-topline">
              <span class="card-tag">${escapeHtml(movie.tag)}</span>
              <button class="save-button${saved ? " is-saved" : ""}" type="button" data-save="${escapeHtml(movie.id)}" aria-label="${saved ? "Remove" : "Add"} ${escapeHtml(movie.title)} ${saved ? "from" : "to"} watchlist" aria-pressed="${saved}">${saved ? "♥" : "♡"}</button>
            </div>
            <div class="poster-rating"><span class="rating-star" aria-hidden="true">★</span>${movie.rating.toFixed(1)}</div>
          </div>
          <div class="movie-info">
            <div class="movie-meta"><span>${movie.year}</span><span class="movie-meta-dot"></span><span>${escapeHtml(movie.runtime)}</span></div>
            <button class="movie-title" type="button" data-details="${escapeHtml(movie.id)}">${escapeHtml(movie.title)}</button>
            <div class="movie-card-genres">${escapeHtml(genreLabel)}</div>
          </div>
        </article>`;
    })
    .join("");
  updateWatchlistCount();
}

function toggleWatchlist(id) {
  if (watchlist.has(id)) {
    watchlist.delete(id);
  } else {
    watchlist.add(id);
  }
  saveWatchlist();
  renderMovies();
  if (dialog.open && dialog.dataset.movieId === id) {
    openMovieDetails(id);
  }
}

function openMovieDetails(id) {
  const movie = movies.find((item) => item.id === id);
  if (!movie) return;
  const saved = watchlist.has(movie.id);
  dialog.dataset.movieId = movie.id;
  dialogContent.innerHTML = `
    <img class="dialog-poster" src="${escapeHtml(movie.poster)}" alt="${escapeHtml(`${movie.title} poster`)}" />
    <div class="dialog-copy">
      <p class="eyebrow"><span class="eyebrow-line"></span> ${escapeHtml(movie.tag)}</p>
      <h2 id="dialog-title">${escapeHtml(movie.title)}</h2>
      <div class="dialog-meta">
        <span>${movie.year}</span><span>${escapeHtml(movie.runtime)}</span>
        <span><span class="rating-star" aria-hidden="true">★</span>${movie.rating.toFixed(1)}</span>
        <span>${escapeHtml(movie.genres.join(" · "))}</span>
      </div>
      <p class="dialog-overview">${escapeHtml(movie.overview)}</p>
      <p class="dialog-meta">Directed by ${escapeHtml(movie.director)}</p>
      <button class="hero-cta dialog-save" type="button" data-save="${escapeHtml(movie.id)}" aria-pressed="${saved}">
        <span aria-hidden="true">${saved ? "♥" : "♡"}</span> ${saved ? "In your watchlist" : "Add to watchlist"}
      </button>
    </div>`;
  if (!dialog.open) dialog.showModal();
}

function clearFilters() {
  activeGenre = "All";
  showingWatchlist = false;
  searchInput.value = "";
  filters.querySelectorAll("[data-genre]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.genre === "All");
  });
  document.querySelectorAll("[data-nav-filter]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.navFilter === "all");
  });
  renderMovies();
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-genre]");
  if (!button) return;
  activeGenre = button.dataset.genre;
  showingWatchlist = false;
  filters.querySelectorAll("[data-genre]").forEach((filter) => {
    filter.classList.toggle("is-selected", filter === button);
  });
  document.querySelectorAll("[data-nav-filter]").forEach((link) => link.classList.remove("is-active"));
  document.querySelector(".main-nav .nav-link:not([data-nav-filter])").classList.add("is-active");
  renderMovies();
});

searchInput.addEventListener("input", renderMovies);
sortSelect.addEventListener("change", renderMovies);
clearFiltersButton.addEventListener("click", clearFilters);
document.querySelector("#empty-reset").addEventListener("click", clearFilters);

document.querySelectorAll("[data-nav-filter]").forEach((link) => {
  link.addEventListener("click", () => {
    showingWatchlist = link.dataset.navFilter === "watchlist";
    activeGenre = "All";
    filters.querySelectorAll("[data-genre]").forEach((button) => {
      button.classList.toggle("is-selected", button.dataset.genre === "All");
    });
    document.querySelectorAll("[data-nav-filter]").forEach((item) => {
      item.classList.toggle("is-active", item === link);
    });
    document.querySelector(".main-nav .nav-link:not([data-nav-filter])").classList.toggle("is-active", !showingWatchlist);
    renderMovies();
  });
});

grid.addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-save]");
  if (saveButton) {
    toggleWatchlist(saveButton.dataset.save);
    return;
  }
  const detailsButton = event.target.closest("[data-details]");
  if (detailsButton) openMovieDetails(detailsButton.dataset.details);
});

dialogContent.addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-save]");
  if (saveButton) toggleWatchlist(saveButton.dataset.save);
});

dialogClose.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

renderMovies();
