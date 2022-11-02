import { refs } from './refs';

import { loadFromLocalStorage } from './local-storage';
import {
  createMarkupWhenLocalStorageEmpty,
  createMarkupWatchedMovies,
} from './watched-library';

import { renderBtn } from './API/get-movie-trailer';

const KEY_QUEUE_MOVIES = 'queueMovies';

if (refs.btnLibraryQueue) {
  refs.btnLibraryQueue.addEventListener('click', onOpenQueueLibrary);
}

export function onOpenQueueLibrary(e) {
  refs.btnLibraryQueue.classList.add('library__btn--active');
  refs.btnLibraryWatched.classList.remove('library__btn--active');

  let localQueueMovies = loadFromLocalStorage(KEY_QUEUE_MOVIES);

  if (!localQueueMovies || !Object.keys(localQueueMovies).length) {
    const markupNothing = createMarkupWhenLocalStorageEmpty();
    refs.libraryGallery.innerHTML = markupNothing;
  } else {
    const moviesToRender = Object.values(localQueueMovies);
    const markup = moviesToRender.map(createMarkupWatchedMovies).join('');

    if (refs.libraryGallery) {
      refs.libraryGallery.innerHTML = markup;

      renderBtn();
    }
  }
}
