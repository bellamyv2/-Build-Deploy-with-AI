const API_BASE = "https://api.deezer.com";
const trackGrid = document.querySelector("#track-grid");
const searchInput = document.querySelector("#search-input");
const statusMessage = document.querySelector("#status-message");
const sectionTitle = document.querySelector("#section-title");
const sectionKicker = document.querySelector("#section-kicker");
const currentView = document.querySelector("#current-view");
const welcome = document.querySelector("#welcome");
const audio = document.querySelector("#audio-player");
const progress = document.querySelector("#progress");
const elapsedTime = document.querySelector("#elapsed-time");
const playButton = document.querySelector("#toggle-play");
const favoriteButton = document.querySelector("#player-favorite");
const favoriteCount = document.querySelector("#favorite-count");
const nowCover = document.querySelector("#now-cover");
const nowTitle = document.querySelector("#now-title");
const nowArtist = document.querySelector("#now-artist");
const favoritesKey = "bellamy-favorites";

let currentTracks = [];
let activeTrackIndex = -1;
let isFavoritesView = false;
let searchTimer;
let requestNumber = 0;

function readFavoriteTracks() {
  try {
    const parsed = JSON.parse(localStorage.getItem(favoritesKey) || "[]");
    const savedTracks = Array.isArray(parsed)
      ? parsed.filter((track) => track && Number.isInteger(track.id) && typeof track.title === "string")
      : [];
    return new Map(savedTracks.map((track) => [track.id, track]));
  } catch (error) {
    console.error("Unable to read saved favorites.", error);
    return new Map();
  }
}

const favoriteTracks = readFavoriteTracks();
const favorites = new Set(favoriteTracks.keys());

function saveFavorites() {
  try {
    localStorage.setItem(favoritesKey, JSON.stringify([...favoriteTracks.values()]));
  } catch (error) {
    console.error("Unable to save favorites.", error);
    setStatus("Your browser couldn't save favorites. Check its storage settings.");
  }
}

function deezerJsonp(path, params = {}) {
  return new Promise((resolve, reject) => {
    const callbackName = `__bellamyDeezer${Date.now()}${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const url = new URL(path, API_BASE);
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
    url.searchParams.set("output", "jsonp");
    url.searchParams.set("callback", callbackName);

    const timeout = window.setTimeout(() => finish(new Error("Deezer took too long to respond.")), 12000);

    function finish(error, data) {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
      if (error) reject(error);
      else if (data?.error) reject(new Error(data.error.message || "Deezer couldn't complete this request."));
      else resolve(data);
    }

    window[callbackName] = (data) => finish(null, data);
    script.onerror = () => finish(new Error("Couldn't reach Deezer. Check your connection and try again."));
    script.src = url.toString();
    document.head.append(script);
  });
}

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("is-error", isError);
  statusMessage.hidden = false;
}

function renderFavoritesCount() {
  favoriteCount.textContent = String(favorites.size);
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const wholeSeconds = Math.floor(seconds);
  return `${Math.floor(wholeSeconds / 60)}:${String(wholeSeconds % 60).padStart(2, "0")}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function renderTracks(tracks) {
  const playable = tracks.filter((track) => track && track.id && track.preview);
  currentTracks = playable;
  trackGrid.replaceChildren();
  statusMessage.hidden = playable.length > 0;

  if (!playable.length) {
    setStatus(isFavoritesView
      ? "No favorites yet. Save a song with the heart button and it will show up here."
      : "No tracks found. Try another search.");
    return;
  }

  trackGrid.innerHTML = playable.map((track, index) => {
    const saved = favorites.has(track.id);
    const cover = track.album?.cover_medium || track.album?.cover || "";
    return `
      <article class="track-card" style="--card-index:${index}">
        <div class="cover-wrap">
          <img class="track-cover" src="${escapeHtml(cover)}" alt="${escapeHtml(`${track.album?.title || track.title} album cover`)}" loading="lazy" />
          <button class="cover-play" type="button" data-play="${index}" aria-label="Play ${escapeHtml(track.title)} preview">▶</button>
          <button class="track-favorite${saved ? " is-saved" : ""}" type="button" data-favorite="${track.id}" aria-label="${saved ? "Remove" : "Add"} ${escapeHtml(track.title)} ${saved ? "from" : "to"} favorites" aria-pressed="${saved}">${saved ? "♥" : "♡"}</button>
          <span class="cover-index">${String(index + 1).padStart(2, "0")}</span>
        </div>
        <div class="track-info">
          <button class="track-name" type="button" data-play="${index}">${escapeHtml(track.title)}</button>
          <span class="track-artist">${escapeHtml(track.artist?.name || "Unknown artist")}</span>
          <div class="track-card-bottom"><span>${escapeHtml(track.album?.title || "Single")}</span><span>${formatTime(track.duration)}</span></div>
        </div>
      </article>`;
  }).join("");
}

async function loadChart() {
  const request = ++requestNumber;
  isFavoritesView = false;
  welcome.hidden = false;
  sectionTitle.innerHTML = "The daily mix<span>.</span>";
  sectionKicker.innerHTML = "<span></span> A LITTLE OF EVERYTHING";
  currentView.textContent = "DISCOVER";
  setStatus("Finding your soundtrack...");
  try {
    const result = await deezerJsonp("/chart/0/tracks", { limit: "12" });
    if (request !== requestNumber) return;
    renderTracks(result.data || []);
  } catch (error) {
    if (request !== requestNumber) return;
    console.error("Deezer chart request failed.", error);
    trackGrid.replaceChildren();
    setStatus(`${error.message} You can retry in a moment.`, true);
  }
}

async function searchTracks(query) {
  const request = ++requestNumber;
  const cleanQuery = query.trim();
  isFavoritesView = false;
  welcome.hidden = true;
  sectionTitle.innerHTML = "Search results<span>.</span>";
  sectionKicker.innerHTML = "<span></span> FIND YOUR NEXT FAVORITE";
  currentView.textContent = "SEARCH";
  if (!cleanQuery) {
    loadChart();
    return;
  }
  setStatus(`Searching Deezer for “${cleanQuery}”...`);
  try {
    const result = await deezerJsonp("/search", { q: cleanQuery, limit: "12" });
    if (request !== requestNumber) return;
    renderTracks(result.data || []);
  } catch (error) {
    if (request !== requestNumber) return;
    console.error("Deezer search failed.", error);
    trackGrid.replaceChildren();
    setStatus(`${error.message} Check your connection and try again.`, true);
  }
}

function showFavorites() {
  requestNumber++;
  isFavoritesView = true;
  welcome.hidden = true;
  currentView.textContent = "FAVORITES";
  sectionTitle.innerHTML = "Your favorites<span>.</span>";
  sectionKicker.innerHTML = "<span></span> SAVED FOR LATER";
  const savedTracks = [...favorites].map((id) => favoriteTracks.get(id)).filter(Boolean);
  if (savedTracks.length) {
    renderTracks(savedTracks);
    return;
  }
  trackGrid.replaceChildren();
  setStatus(favorites.size
    ? "Favorites from another session aren't loaded yet. Search for a track to save it again."
    : "No favorites yet. Save a song with the heart button and it will show up here.");
}

function updatePlayer() {
  const track = currentTracks[activeTrackIndex];
  if (!track) return;
  nowTitle.textContent = track.title;
  nowArtist.textContent = track.artist?.name || "Unknown artist";
  const cover = track.album?.cover_small || track.album?.cover_medium || "";
  nowCover.innerHTML = cover ? `<img src="${escapeHtml(cover)}" alt="" />` : "<span>♪</span>";
  playButton.disabled = false;
  progress.disabled = false;
  favoriteButton.disabled = false;
  favoriteButton.textContent = favorites.has(track.id) ? "♥" : "♡";
  favoriteButton.classList.toggle("is-saved", favorites.has(track.id));
  favoriteButton.setAttribute("aria-pressed", String(favorites.has(track.id)));
  favoriteButton.setAttribute("aria-label", `${favorites.has(track.id) ? "Remove" : "Add"} ${track.title} ${favorites.has(track.id) ? "from" : "to"} favorites`);
}

async function playTrack(index) {
  const track = currentTracks[index];
  if (!track?.preview) {
    setStatus("A preview isn't available for this track.", true);
    return;
  }
  if (activeTrackIndex === index && !audio.paused) {
    audio.pause();
    return;
  }
  activeTrackIndex = index;
  updatePlayer();
  audio.src = track.preview;
  audio.currentTime = 0;
  try {
    await audio.play();
  } catch (error) {
    console.error("Audio preview could not be played.", error);
    setStatus("This preview couldn't be played. Try another track.", true);
  }
}

function toggleFavorite(trackId) {
  const id = Number(trackId);
  if (favorites.has(id)) {
    favorites.delete(id);
    favoriteTracks.delete(id);
  } else {
    const track = currentTracks.find((item) => item.id === id);
    if (!track) return;
    favorites.add(id);
    favoriteTracks.set(id, track);
  }
  saveFavorites();
  renderFavoritesCount();
  if (isFavoritesView) {
    showFavorites();
  } else {
    renderTracks(currentTracks);
  }
  updatePlayer();
}

document.querySelector(".side-nav").addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (!button) return;
  document.querySelectorAll(".side-link").forEach((item) => {
    item.classList.toggle("is-active", item === button);
  });
  if (button.dataset.view === "favorites") {
    showFavorites();
  } else if (button.dataset.view === "search") {
    searchInput.focus();
  } else {
    searchInput.value = "";
    loadChart();
  }
});

searchInput.addEventListener("input", () => {
  window.clearTimeout(searchTimer);
  searchTimer = window.setTimeout(() => searchTracks(searchInput.value), 350);
});

trackGrid.addEventListener("click", (event) => {
  const favorite = event.target.closest("[data-favorite]");
  if (favorite) {
    toggleFavorite(favorite.dataset.favorite);
    return;
  }
  const play = event.target.closest("[data-play]");
  if (play) playTrack(Number(play.dataset.play));
});

favoriteButton.addEventListener("click", () => {
  const track = currentTracks[activeTrackIndex];
  if (track) toggleFavorite(track.id);
});

document.querySelector("#play-chart").addEventListener("click", () => {
  if (currentTracks.length) playTrack(0);
  else loadChart();
});
document.querySelector("#refresh-button").addEventListener("click", loadChart);
document.querySelector("#previous-button").addEventListener("click", () => {
  if (currentTracks.length) playTrack((activeTrackIndex - 1 + currentTracks.length) % currentTracks.length);
});
document.querySelector("#next-button").addEventListener("click", () => {
  if (currentTracks.length) playTrack((activeTrackIndex + 1) % currentTracks.length);
});
playButton.addEventListener("click", () => {
  if (activeTrackIndex < 0) return;
  if (audio.paused) audio.play().catch((error) => console.error("Audio preview could not be resumed.", error));
  else audio.pause();
});

audio.addEventListener("play", () => {
  playButton.textContent = "Ⅱ";
  playButton.setAttribute("aria-label", "Pause preview");
});
audio.addEventListener("pause", () => {
  playButton.textContent = "▶";
  playButton.setAttribute("aria-label", "Play preview");
});
audio.addEventListener("timeupdate", () => {
  progress.value = String(Math.min(audio.currentTime, 30));
  elapsedTime.textContent = formatTime(audio.currentTime);
});
audio.addEventListener("ended", () => {
  progress.value = "0";
  elapsedTime.textContent = "0:00";
});
audio.addEventListener("error", () => {
  if (audio.src) setStatus("Deezer couldn't load this preview. Try another track.", true);
});
progress.addEventListener("input", () => {
  if (Number.isFinite(audio.duration)) audio.currentTime = Number(progress.value);
});
document.querySelector("#volume").addEventListener("input", (event) => {
  audio.volume = Number(event.target.value);
  document.querySelector("#mute-button").setAttribute("aria-label", audio.volume === 0 ? "Unmute audio" : "Mute audio");
});
document.querySelector("#mute-button").addEventListener("click", (event) => {
  audio.muted = !audio.muted;
  event.currentTarget.setAttribute("aria-label", audio.muted ? "Unmute audio" : "Mute audio");
  event.currentTarget.classList.toggle("is-muted", audio.muted);
});

audio.volume = 0.8;
favoriteButton.disabled = true;
renderFavoritesCount();
loadChart();
