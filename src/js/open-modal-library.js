import {
  KEY_WATCHED_MOVIES,
  KEY_QUEUE_MOVIES,
  loadFromLocalStorage,
  checkLocalStorageWatchedMovies,
  checkLocalStorageQueueMovies,
} from './local-storage';
import { renderBtn } from './API/get-movie-trailer';
import {
  onEscKeyPress,
  onBackdropClick,
  offCloseModal,
} from './API/get-movie-info';
import { IMAGE_URL } from './API/api-params';

import { refs } from './refs';

refs.libraryGallery.addEventListener('click', onLibraryGallery);

let idMovie;
let currentMovie;

export function onLibraryGallery(e) {
  idMovie = Number(e.target.dataset.id);
  const film = e.target.closest('.frame');
  if (!film || e.target.classList.contains('watch-trailer-btn-gallery')) {
    return;
  }

  let markup = '';

  const watchedMoviesFromLocalStorage =
    loadFromLocalStorage(KEY_WATCHED_MOVIES);
  const queueMoviesFromLocalStorage = loadFromLocalStorage(KEY_QUEUE_MOVIES);

  if (watchedMoviesFromLocalStorage[idMovie]) {
    currentMovie = watchedMoviesFromLocalStorage[idMovie];

    markup = createMarkupModal(watchedMoviesFromLocalStorage[idMovie]);
  } else if (queueMoviesFromLocalStorage[idMovie]) {
    currentMovie = queueMoviesFromLocalStorage[idMovie];
    markup = createMarkupModal(queueMoviesFromLocalStorage[idMovie]);
  }
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
    refs.modalContainer.addEventListener('click', onModalLibraryBtnsClick);
  }
}

function onModalLibraryBtnsClick(e) {
  if (e.target.classList.contains('js-add-watched')) {
    checkLocalStorageWatchedMovies(e.target, currentMovie);
  } else if (e.target.classList.contains('js-add-queue')) {
    checkLocalStorageQueueMovies(e.target, currentMovie);
  }
}

export function createMarkupModal({
  voteAverage,
  voteCount,
  genres,
  title,
  posterPath,
  originalName,
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
                <th>${title ? title : originalName}</th>
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
