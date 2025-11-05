
const API_KEY = 'YOUR_OMDB_API_KEY_HERE'; 

const DEFAULT_QUERY = 'Avengers'; 
const RESULTS_PER_PAGE = 10; 


const searchInput = document.getElementById('search');
const moviesGrid = document.getElementById('movies');
const statusEl = document.getElementById('status');
const loadingEl = document.getElementById('loading');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNumberEl = document.getElementById('pageNumber');

let currentQuery = DEFAULT_QUERY;
let currentPage = 1;
let totalResults = 0;


function showLoading(show = true) {
  loadingEl.style.display = show ? 'flex' : 'none';
  loadingEl.setAttribute('aria-hidden', show ? 'false' : 'true');
}
function showStatus(message = '') {
  statusEl.textContent = message;
}


function debounce(fn, delay = 500) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}


function throttle(fn, limit = 800) {
  let inThrottle = false;
  return function (...args) {
    if (inThrottle) return;
    fn.apply(this, args);
    inThrottle = true;
    setTimeout(() => { inThrottle = false; }, limit);
  };
}

/* ---------- API call ---------- */
async function fetchMovies(query, page = 1) {
  if (!API_KEY || API_KEY === 'YOUR_OMDB_API_KEY_HERE') {
    throw new Error('Please set your OMDb API key inside script.js (API_KEY). Get one at https://www.omdbapi.com/');
  }

  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network response not ok');
  const data = await res.json();
  return data;
}

/* ---------- Render functions ---------- */
function renderMoviesList(list) {
  moviesGrid.innerHTML = '';
  if (!list || list.length === 0) {
    moviesGrid.innerHTML = '';
    return;
  }
  list.forEach((m) => {
    const posterSrc = m.Poster && m.Poster !== 'N/A' ? m.Poster : placeholderPoster(m.Title);
    const card = document.createElement('article');
    card.className = 'movie-card';
    card.innerHTML = `
      <img class="poster" src="${posterSrc}" alt="Poster: ${escapeHtml(m.Title)}" loading="lazy" />
      <div class="movie-info">
        <h3 class="movie-title">${escapeHtml(m.Title)}</h3>
        <div class="movie-meta">${escapeHtml(m.Year)} • ${escapeHtml(m.Type || '')}</div>
        <div class="movie-overview">IMDb ID: ${escapeHtml(m.imdbID)}</div>
      </div>
    `;
    moviesGrid.appendChild(card);
  });
}

function placeholderPoster(title) {
  // simple SVG data URL placeholder with movie title initial
  const text = encodeURIComponent(title || 'Movie');
  return `https://via.placeholder.com/300x450?text=${text}`;
}

function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/[&<>"']/g, (s) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[s]);
}

/* ---------- Main data flow ---------- */
async function loadAndRender(query = DEFAULT_QUERY, page = 1) {
  currentQuery = query.trim() || DEFAULT_QUERY;
  currentPage = page;

  pageNumberEl.textContent = `Page ${currentPage}`;

  showStatus('');
  showLoading(true);
  try {
    const data = await fetchMovies(currentQuery, currentPage);

    if (data.Response === 'True' && data.Search) {
      renderMoviesList(data.Search);
      totalResults = parseInt(data.totalResults || '0', 10);
      const lastPage = Math.ceil(totalResults / RESULTS_PER_PAGE);
      showStatus(`${totalResults} results${totalResults > 0 ? ` — showing page ${currentPage} of ${lastPage}` : ''}`);
      prevBtn.disabled = currentPage <= 1;
      nextBtn.disabled = currentPage >= lastPage;
    } else {
      // no results or error
      renderMoviesList([]);
      totalResults = 0;
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      showStatus(data.Error || 'No movies found for your search.');
    }
  } catch (err) {
    renderMoviesList([]);
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    showStatus('An error occurred: ' + err.message);
  } finally {
    showLoading(false);
  }
}

/* ---------- Event handlers ---------- */
const debouncedSearch = debounce((e) => {
  const value = e.target.value;
  currentPage = 1;
  loadAndRender(value || DEFAULT_QUERY, currentPage);
}, 500);

searchInput.addEventListener('input', debouncedSearch);

/* Pagination with throttle */
const throttledPrev = throttle(() => {
  if (currentPage > 1) {
    currentPage -= 1;
    loadAndRender(currentQuery, currentPage);
  }
}, 900);

const throttledNext = throttle(() => {
  // allow next only if we have more pages (we determine last page from totalResults)
  const lastPage = Math.ceil((totalResults || 0) / RESULTS_PER_PAGE) || Infinity;
  if (currentPage < lastPage) {
    currentPage += 1;
    loadAndRender(currentQuery, currentPage);
  }
}, 900);

prevBtn.addEventListener('click', throttledPrev);
nextBtn.addEventListener('click', throttledNext);

/* Keyboard: Enter in search should immediately run search (no debounce) */
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    // immediate search
    loadAndRender(searchInput.value || DEFAULT_QUERY, 1);
  }
});

/* On load, show initial set */
document.addEventListener('DOMContentLoaded', () => {
  loadAndRender(DEFAULT_QUERY, 1);
});
