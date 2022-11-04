import axios from 'axios';
import { refs } from '../refs';
import { KEY_API, IMAGE_URL } from './api-params';
import { renderBtn } from '../API/get-movie-trailer';
import {
  loadWatchedMoviesFromLocalStorage,
  loadQueueMoviesFromLocalStorage,
} from '../watched-library';

import {
  KEY_QUEUE_MOVIES,
  KEY_WATCHED_MOVIES,
  loadFromLocalStorage,
  saveToLocalStorage,
  checkLocalStorageQueueMovies,
  checkLocalStorageWatchedMovies,
} from '../local-storage';

export let selectedMovie;

// API
async function getMovieById(id) {
  try {
    const { data } = await axios.get(
      `/movie/${id}?api_key=${KEY_API}&language=en-US`
    );
    return data;
  } catch (error) {
    console.log('Something wrong with API', error.message);
  }
}

if (refs.galleryMovies) {
  refs.galleryMovies.addEventListener('click', openModal);
}

async function openModal(e) {
  const film = e.target.closest('.frame');
  if (!film || e.target.classList.contains('watch-trailer-btn-gallery')) {
    return;
  }
  // create
  const idMovie = Number(e.target.dataset.id);
  const response = await getMovieById(idMovie);

  selectedMovie = createMovieObj(response);

  const markup = createMarkupModal(response);
  refs.modal.innerHTML = markup;
  refs.body.classList.add('no-scroll');

  // render trailer
  renderBtn();

  // close
  window.addEventListener('keydown', onEscKeyPress);
  refs.modalBackdrop.classList.add('show-modal');
  refs.modalBackdrop.addEventListener('click', onBackdropClick);
  refs.closeModalBtn.addEventListener('click', offCloseModal);

  //Вешаем событие на buttons:
  if (refs.modalBackdrop.classList.contains('show-modal')) {
    refs.modalContainer.addEventListener('click', onModalBtnsClick);
  }
}

export function onModalBtnsClick(e) {
  if (e.target.classList.contains('js-add-watched')) {
    checkLocalStorageWatchedMovies(e.target, selectedMovie);
  } else if (e.target.classList.contains('js-add-queue')) {
    checkLocalStorageQueueMovies(e.target, selectedMovie);
  }
}

function createMovieObj(response) {
  return {
    id: response.id,
    title: response.title,
    genres: response.genres,
    posterPath: response.poster_path,
    releaseDate: response.release_date,
    voteAverage: response.vote_average,
    voteCount: response.vote_count,
    popularity: response.popularity,
    overview: response.overview,
    originalName: response.original_name,
  };
}

function createMarkupModal({
  vote_average: voteAverage,
  vote_count: voteCount,
  genres,
  original_title: originalTitle,
  title,
  poster_path: posterPath,
  original_name: originalName,
  popularity,
  overview,
  id,
}) {
  // Проверка есть ли такой обьект в локал сторадж?
  const watchedMoviesLocalStorage = loadFromLocalStorage(KEY_WATCHED_MOVIES);
  const queueMoviesLocalStorage = loadFromLocalStorage(KEY_QUEUE_MOVIES);

  let textBtnWatched = 'ADD TO WATCHED';
  let textBtnQueue = 'ADD TO QUEUE';

  if (watchedMoviesLocalStorage && watchedMoviesLocalStorage[id]) {
    textBtnWatched = 'REMOVE FROM WATCHED';
  }

  if (queueMoviesLocalStorage && queueMoviesLocalStorage[id]) {
    textBtnQueue = 'REMOVE FROM QUEUE';
  }

  const modalGenres = genres.map(genre => genre.name);

  return `
        <img class="img-modal"    src="${
          posterPath
            ? IMAGE_URL + posterPath
            : 'https://ik.imagekit.io/tc8jxffbcvf/default-movie-portrait_EmJUj9Tda5wa.jpg?tr=fo-auto,di-'
        }" alt="${title}" data-id=${id} />
        <div class="container-modal">
          <b class="title-modal">${title}</b>
          <table class="table">
            <tr class="table-separator">
              <th class="table__text">Vote / Votes</th>
              <th><span class="vote-average">${voteAverage.toFixed(
                1
              )}</span> / <span class="vote-count">${voteCount}</span></th>
            </tr>
            <tr class="table-separator">
              <th class="table__text">Popularity</th>
              <th>${popularity.toFixed(1)}</th>
            </tr>
            <tr class="table-separator">
              <th class="table__text">Original Title</th>
              <th>${originalTitle ? originalTitle : originalName}</th>
            </tr>
            <tr class="table-separator">
              <th class="table__text">Genre</th>
              <th>${modalGenres}</th>
            </tr>
          </table>
          <b class="title-about__modal">ABOUT</b>
          <p class="about-text__modal about-scrollbar">${overview}
          </p>
          <div class="buttons-modal">
            <button aria-label="add or remove from watched" type="button" class="button-watched__modal js-add-watched">
                ${textBtnWatched}
            </button>
            <button type="button" aria-label="add or remove from queue" class="button-queue__modal js-add-queue">${textBtnQueue}</button>
            </div>
             <button type="button" aria-label="watch the trailer" class="watch-trailer-btn-gallery is-hidden " data-id=${id} >Watch the trailer</button>
        </div>
        `;
}

export function offCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.modalBackdrop.classList.remove('show-modal');
  refs.modalContainer.removeEventListener('click', onModalBtnsClick);
  refs.body.classList.remove('no-scroll');

  if (refs.btnLibraryQueue) {
    if (refs.btnLibraryQueue.classList.contains('library__btn--active')) {
      loadQueueMoviesFromLocalStorage();
    } else {
      loadWatchedMoviesFromLocalStorage();
    }
  }
}

export function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    offCloseModal();
  }
}

export function onEscKeyPress(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    offCloseModal();
  }
  refs.modalContainer.removeEventListener('click', onModalBtnsClick);
}
