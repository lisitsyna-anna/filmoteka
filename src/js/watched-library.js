import { IMAGE_URL } from './API/api-params';
import {
  KEY_QUEUE_MOVIES,
  KEY_WATCHED_MOVIES,
  loadFromLocalStorage,
} from './local-storage';
import { refs } from './refs';
import { renderBtn } from './API/get-movie-trailer';
import pagination from './paginationLocalStorage';
import { paginationBox } from './paginationLocalStorage';

export const NOTHING_IMG =
  'https://cdn.pixabay.com/photo/2021/10/25/00/00/mike-wazowski-6739521_640.png';

if (refs.btnLibraryWatched) {
  refs.btnLibraryWatched.addEventListener('click', onOpenWatchedLibrary);
}

export function onOpenWatchedLibrary() {
  refs.btnLibraryWatched.classList.add('library__btn--active');
  refs.btnLibraryQueue.classList.remove('library__btn--active');
  const paginationBox = document.querySelector('.pagination-library-container');
  const moviesFromLocalStorage = loadFromLocalStorage(KEY_WATCHED_MOVIES);

  if (!moviesFromLocalStorage || !Object.keys(moviesFromLocalStorage).length) {
    console.log(paginationBox);
    const markupNothing = createMarkupWhenLocalStorageEmpty();
    paginationBox.innerHTML = '';
    refs.libraryGallery.innerHTML = markupNothing;
  } else {
    pagination(Object.keys(moviesFromLocalStorage).length, 1);
    const moviesArray = Object.values(moviesFromLocalStorage);
    let moviesToRender = '';
    if (window.innerWidth >= 1280) {
      moviesToRender = moviesArray.slice(0, 9);
    }
    if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      moviesToRender = moviesArray.slice(0, 8);
    }
    if (window.innerWidth < 768) {
      moviesToRender = moviesArray.slice(0, 4);
    }
    const markup = moviesToRender.map(createMarkupWatchedMovies).join('');

    refs.libraryGallery.innerHTML = markup;

    renderBtn();
  }
}

export function createMarkupWatchedMovies({
  id,
  title,
  posterPath,
  releaseDate,
  genres,
  voteAverage,
}) {
  const genresForRender = concatGenres(genres.map(genre => genre.name));

  return `<li class="frame" data-id="${id}">
         <div class="frame__wrap">
            <p class="frame__raiting">${
              voteAverage.toFixed(1) ? voteAverage.toFixed(1) : '---'
            }</p>
           <button type="button" class="watch-trailer-btn-gallery is-hidden" data-id=${id} >Watch the trailer</button>
          <img
            data-id="${id}"
            src="${
              posterPath
                ? IMAGE_URL + posterPath
                : 'https://ik.imagekit.io/tc8jxffbcvf/default-movie-portrait_EmJUj9Tda5wa.jpg?tr=fo-auto,di-'
            }"
            alt="${title ? title : 'Title coming soon'}"
            class="frame__poster"
            loading="lazy"
          />
            </div>

          <div class="frame__info" data-id=${id}>
            <p class="frame__title" data-id=${id}>${
    title ? title : 'Title coming soon'
  }</p>
            <p class="frame__genres" data-id=${id}>${
    genresForRender ? genresForRender : '---'
  }</p>
            <p class="frame__year" data-id=${id}>${
    new Date(releaseDate).getFullYear()
      ? new Date(releaseDate).getFullYear()
      : '---'
  }</p>
         
          </div>
          </li>`;
}

export function concatGenres(arrOfGenresName) {
  return arrOfGenresName.reduce((acc, genre, index, arr) => {
    if (arr.length > 2) {
      acc = `${arr[0]}, ${arr[1]}, Others`;
    } else {
      acc = arr.join(', ');
    }

    return acc;
  }, '');
}

export function createMarkupWhenLocalStorageEmpty() {
  return `
  <li class="container-nothing">
    <img 
        width="260" 
        height="340"
        class="container-nothing__img"
        src="${NOTHING_IMG}"
        alt="mike"
        loading="lazy"
    />
    <div class="container-nothing__content">
        <h2 class="container-nothing__title">Ouhh... it's empty in here!</h2>
        <p class="container-nothing__text">
        <a class="container-nothing__link" href="./index.html">Go back</a> and
        add your favorite movies.
        </p>
    </div>
</li>
    `;
}

export function loadWatchedMoviesFromLocalStorage() {
  const moviesFromLocalStorage = loadFromLocalStorage(KEY_WATCHED_MOVIES);

  if (!moviesFromLocalStorage || !Object.keys(moviesFromLocalStorage).length) {
    const markupNothing = createMarkupWhenLocalStorageEmpty();
    paginationBox.innerHTML = '';
    refs.libraryGallery.innerHTML = markupNothing;
  } else {
    /*const moviesToRender = Object.values(moviesFromLocalStorage);
    const markup = moviesToRender.map(createMarkupWatchedMovies).join('');

    refs.libraryGallery.innerHTML = markup;
    renderBtn();*/
    onOpenWatchedLibrary();
  }
}

export function loadQueueMoviesFromLocalStorage() {
  const queueFromLocalStorage = loadFromLocalStorage(KEY_QUEUE_MOVIES);

  if (!queueFromLocalStorage || !Object.keys(queueFromLocalStorage).length) {
    const markupNothing = createMarkupWhenLocalStorageEmpty();

    refs.libraryGallery.innerHTML = markupNothing;
    paginationBox.innerHTML = '';
  } else {
    const moviesToRender = Object.values(queueFromLocalStorage);
    const markup = moviesToRender.map(createMarkupWatchedMovies).join('');
    if (refs.libraryGallery) {
      refs.libraryGallery.innerHTML = markup;

      renderBtn();
    }
  }
}
