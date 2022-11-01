import { IMAGE_URL } from './API/api-params';
import {
  KEY_QUEUE_MOVIES,
  KEY_WATCHED_MOVIES,
  loadFromLocalStorage,
} from './local-storage';
import { refs } from './refs';

export const NOTHING_IMG =
  'https://cdn.pixabay.com/photo/2021/10/25/00/00/mike-wazowski-6739521_640.png';

if (refs.btnLibraryWatched) {
  refs.btnLibraryWatched.addEventListener('click', onOpenWatchedLibrary);
}

export function onOpenWatchedLibrary() {
  if (refs.btnLibraryWatched) {
    refs.btnLibraryWatched.classList.add('library__btn--active');
    refs.btnLibraryQueue.classList.remove('library__btn--active');
  }

  const moviesFromLocalStorage = loadFromLocalStorage(KEY_WATCHED_MOVIES);

  if (!moviesFromLocalStorage || !Object.keys(moviesFromLocalStorage).length) {
    const markupNothing = createMarkupWhenLocalStorageEmpty();

    refs.libraryGallery.innerHTML = markupNothing;
  } else {
    const moviesToRender = Object.values(moviesFromLocalStorage);
    const markup = moviesToRender.map(createMarkupWatchedMovies).join('');

    if (refs.libraryGallery) {
      refs.libraryGallery.innerHTML = markup;
    }
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
          <img
            data-id="${id}"
            src="${IMAGE_URL + posterPath}"
            alt="${title}"
            class="frame__poster"
            loading="lazy"
          />
          <div class="frame__info">
            <p class="frame__title">${title}</p>
            <p class="frame__genres">${genresForRender}</p>
            <p class="frame__year">${new Date(releaseDate).getFullYear()}</p>
            <p class="frame__raiting">${voteAverage.toFixed(1)}</p>
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

    if (refs.libraryGallery) {
      refs.libraryGallery.innerHTML = markupNothing;
    }
  } else {
    const moviesToRender = Object.values(moviesFromLocalStorage);
    const markup = moviesToRender.map(createMarkupWatchedMovies).join('');
    if (refs.libraryGallery) {
      refs.libraryGallery.innerHTML = markup;
    }
  }
}

export function loadQueueMoviesFromLocalStorage() {
  const queueFromLocalStorage = loadFromLocalStorage(KEY_QUEUE_MOVIES);

  if (!queueFromLocalStorage || !Object.keys(queueFromLocalStorage).length) {
    const markupNothing = createMarkupWhenLocalStorageEmpty();

    if (refs.libraryGallery) {
      refs.libraryGallery.innerHTML = markupNothing;
    }
  } else {
    const moviesToRender = Object.values(queueFromLocalStorage);
    const markup = moviesToRender.map(createMarkupWatchedMovies).join('');
    if (refs.libraryGallery) {
      refs.libraryGallery.innerHTML = markup;
    }
  }
}
