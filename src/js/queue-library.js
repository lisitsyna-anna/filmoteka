import { refs } from './refs';
import { IMAGE_URL } from './API/api-params';
import { loadFromLocalStorage } from './local-storage';
import { createMarkupWhenLocalStorageEmpty } from './watched-library';
import { NOTHING_IMG } from './watched-library';

const KEY_QUEUE_MOVIES = 'queueMovies';
const queueGallery = refs.libraryGallery;

if (refs.btnLibraryQueue) {
  refs.btnLibraryQueue.addEventListener('click', onOpenQueueLibrary);
}

export function onOpenQueueLibrary(e) {
  queueGallery.innerHTML = '';

  refs.btnLibraryQueue.classList.add('library__btn--active');
  refs.btnLibraryWatched.classList.remove('library__btn--active');

  let localQueueMovies = loadFromLocalStorage(KEY_QUEUE_MOVIES);
  let markup = '';

  if (!localQueueMovies || !Object.keys(localQueueMovies).length) {
    const markupNothing = createMarkupWhenLocalStorageEmpty();
    refs.libraryContainer.innerHTML = markupNothing;
    console.log('РЕНДЕР ОШИБКИ - ПУСТОЙ ЛОКАЛ СТОРАДЖ');
  }
  if (localQueueMovies) {
    const queueMovies = Object.values(localQueueMovies);

    for (const movie of queueMovies) {
      const { id, posterPath, title, releaseDate, genres, voteAverage } = movie;

      const renderGenres = getGenres(genres);

      markup += `<li class="frame" data-id="${id}">
      <img
        data-id="${id}"
        src="${IMAGE_URL + posterPath}"
        alt="${title}"
        class="frame__poster"
        loading="lazy"
      />
      <div class="frame__info">
        <p class="frame__title">${title}</p>
        <p class="frame__genres">${renderGenres}</p>
        <p class="frame__year">${new Date(releaseDate).getFullYear()}</p>
        <p class="frame__raiting">${voteAverage.toFixed(1)}</p>
      </div>
      </li>`;
    }
  }

  return queueGallery.insertAdjacentHTML('beforeend', markup);
}

function getGenres(genres) {
  let genresMovie = genres.map(genre => genre.name);
  genresMovie.length > 2
    ? genresMovie.splice(2, genresMovie.length - 1, 'Other')
    : genresMovie;

  return genresMovie.join(', ');
}
