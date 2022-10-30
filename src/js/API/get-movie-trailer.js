import axios from 'axios';
import { KEY_API } from './api-params';

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

// // функція отримання даних про трейлер
async function getTrailers(movieId) {
  const results = await fetchMovieTrailer(movieId);
  const officialTrailer = results.find(trailer => trailer.official === true);

  return officialTrailer;
}

// // функція рендеру кнопок

export async function renderTrailerBtn(movieId, selector) {
  const officialTrailer = await getTrailers(movieId);
  console.log('officialTrailer', officialTrailer);
  if (!officialTrailer) {
    return;
  }
  selector.classList.remove('is-hidden');
}

// /-------------------------------------/

const cardRef = document.querySelector('.modal__content');
console.log(cardRef);
cardRef.addEventListener('click', onCliсkBtnWatch);

export async function onCliсkBtnWatch(event) {
  try {
    if (event.target.nodeName !== 'BUTTON') {
      return;
    }

    const filmId = event.target.dataset.id;

    const results = await fetchMovieTrailer(filmId);

    const youtubeKey = results[0].key;

    renderTrailer(youtubeKey);
    showTrailerWindow();
    closeOnEscClick();
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

// // функція створення розмітки

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

const showTrailerWindow = () => {
  backdropTrailer.classList.remove('is-hidden');

  document.addEventListener('keydown', closeOnEscClick);

  //   refs.modalBackdrop.classList.add('is-hidden');
};

const backdropTrailer = document.querySelector('.backdrop-trailer');

const closeTrailer = () => {
  trailerPlayerRef.innerHTML = '';
  backdropTrailer.classList.add('is-hidden');
  document.removeEventListener('keydown', closeOnEscClick);
};

const closeOnBackdropClick = e => {
  if (!e.target === e.currentTarget) return;
  closeTrailer();
};

backdropTrailer.addEventListener('click', closeOnBackdropClick);

const closeOnEscClick = e => {
  if (e.code === 'Escape') {
    closeTrailer();
  }
};
