import axios from 'axios';
import { KEY_API } from './api-params';
import { refs } from '../refs';

// функція HTTP запиту
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = {
  api_key: KEY_API,
};

const trailerPlayerRef = document.querySelector('.modal-trailer');

async function fetchMovieTrailer(movieId) {
  try {
    const res = await axios.get(`/movie/${movieId}/videos`);
    return res.data.results;
  } catch (e) {
    return console.error(e);
  }
}

// функція отримання даних про трейлер
async function getTrailers(movieId) {
  const results = await fetchMovieTrailer(movieId);
  const officialTrailer = results.find(trailer => trailer.official === true);

  return officialTrailer;
}

// функція рендеру кнопоки для модалки
export async function renderTrailerBtn(movieId, selector) {
  const officialTrailer = await getTrailers(movieId);
  if (!officialTrailer) {
    return;
  }
  selector.classList.remove('is-hidden');
}

const cardRef = document.querySelector('.modal__content');

cardRef.addEventListener('click', onCliсkBtnWatchGallery);

// виклик трейлера на галерею
export async function onCliсkBtnWatchGallery(event) {
  try {
    if (event.target.classList.contains('watch-trailer-btn-gallery')) {
      const filmId = event.target.dataset.id;
      const results = await fetchMovieTrailer(filmId);
      const youtubeKey = results[0].key;
      renderTrailer(youtubeKey);
      showTrailerWindow();
      closeOnEscClick(event);
    }
  } catch (error) {
    console.log(error);
  }
}

// функція додавання розмітки в DOM
function renderTrailer(youtubeKey) {
  const markup = templateTrailer(youtubeKey);
  const trailerPlayerRef = document.querySelector('.modal-trailer');
  trailerPlayerRef.innerHTML = markup;
}

// функція створення розмітки
function templateTrailer(youtubeKey) {
  return `
    <iframe
    class="youtube-video"
    src="https://www.youtube.com/embed/${youtubeKey}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
`;
}

export function showTrailerWindow() {
  backdropTrailer.classList.remove('is-hidden');

  document.addEventListener('keydown', closeOnEscClick);
}

const backdropTrailer = document.querySelector('.backdrop-trailer');

export function closeTrailer() {
  trailerPlayerRef.innerHTML = '';

  backdropTrailer.classList.add('is-hidden');

  document.removeEventListener('keydown', closeOnEscClick);
}

export function closeOnBackdropClick(e) {
  if (!e.target === e.currentTarget) return;
  closeTrailer();
}

backdropTrailer.addEventListener('click', closeOnBackdropClick);

export function closeOnEscClick(e) {
  if (e.code === 'Escape') {
    closeTrailer();
  }
}

export function renderBtn() {
  const selector = document.querySelectorAll('.watch-trailer-btn-gallery');
  selector.forEach(element => {
    renderTrailerBtn(element.dataset.id, element);
  });
}
