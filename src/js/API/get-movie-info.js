import axios from 'axios';
import { refs } from '../refs';
import { KEY_API } from './api-params';
import { renderTrailerBtn } from '../API/get-movie-trailer';

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
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
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
  // const isFilmCardElem = e.target.classList.contains('frame');
  // if (!isFilmCardElem) {
  //   return;
  // }

  if (e.target.nodeName !== 'LI' && e.target.nodeName !== 'IMG') {
    return;
  }
  // create
  const idMovie = Number(e.target.dataset.id);
  const response = await getMovieById(idMovie);

  selectedMovie = createMovieObj(response);

  const markup = createMarkupModal(response);
  refs.modal.innerHTML = markup;

  const selector = document.querySelector('.watch-trailer-btn');
  renderTrailerBtn(idMovie, selector);

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

function onModalBtnsClick(e) {
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
    overview: response.popularity,
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
  // if (modalGenres.length > 2) {
  //   modalGenres.slice(0, 2).join(', ') + ', Other';
  // }

  return `
        <img class="img-modal" src="https://image.tmdb.org/t/p/w500${posterPath}" alt="${title}" data-id=${id} />
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
            <button type="button" class="button-watched__modal js-add-watched">
                ${textBtnWatched}
            </button>
            <button type="button" class="button-queue__modal js-add-queue">${textBtnQueue}</button>
            </div>
             <button type="button" class="watch-trailer-btn is-hidden " data-id=${id} >Переглянути трейлер</button>
        </div>

          
        `;
}

function offCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.modalBackdrop.classList.remove('show-modal');
  refs.modalContainer.removeEventListener('click', onModalBtnsClick);
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    offCloseModal();
  }
}

function onEscKeyPress(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    offCloseModal();
  }
  refs.modalContainer.removeEventListener('click', onModalBtnsClick);
}
