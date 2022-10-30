import { refs } from './refs';
import { IMAGE_URL } from './API/api-params';
import { loadFromLocalStorage } from './local-storage';

const KEY_QUEUE_MOVIES = 'queueMovies';
const queueGallery = refs.libraryGallery;

if (refs.btnLibraryQueue) {
  refs.btnLibraryQueue.addEventListener('click', onOpenQueueLibrary);
}

export function onOpenQueueLibrary(e) {
  e.preventDefault();
  queueGallery.innerHTML = '';

  let localQueueMovies = loadFromLocalStorage(KEY_QUEUE_MOVIES);
  let markup = '';

  if (localQueueMovies) {
    const queueMovies = Object.values(localQueueMovies);

    for (const movie of queueMovies) {
      const { id, posterPath, title, releaseDate, genres } = movie;

      console.log(genres);
      const renderGenres = getGenres(genres);
      console.log('renderGenres', renderGenres);

      markup += `<li class="frame" data-id="${id}">
        <img
          data-id="${id}"
          src="${IMAGE_URL + posterPath}"
          alt="${title}"
          class="frame__poster"
          loading="lazy"
        />
        <p class="frame__title">${title}</p>
        <p class="frame__genres">${renderGenres}</p>
        <p class="frame__year">${new Date(releaseDate).getFullYear()}</p>
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
