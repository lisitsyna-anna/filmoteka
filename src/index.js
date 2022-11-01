import { spinnerPlay, spinnerStop } from './js/loader';
import { renderTrendingMovies } from './js/API/get-trending';

import { renderModalMovie } from './js/API/get-movie-info';

import { onFormSubmit } from './js/gallery';
import { openModalTeam } from './js/open-modal-team';

import './js/switch-bg-theme';

import { scrollFunction } from './js/button-up';

import { onCliсkBtnWatch } from './js/API/get-movie-trailer';

import { onOpenQueueLibrary } from './js/queue-library';

import { onOpenWatchedLibrary } from './js/watched-library';

import { loadWatchedMoviesFromLocalStorage } from './js/watched-library';
import { onLibraryGallery } from './js/open-modal-library';

///Запуск спінера при завантаженні
spinnerPlay();
window.addEventListener('load', function (e) {
  spinnerStop();
});
///Закінчення спінера при завантаженні

///Запуск кнопки вверх при скролі
window.addEventListener('scroll', scrollFunction);

// При завантаженні сторінки My library рендериться картки з локал сторадж watchedMovies
window.addEventListener('load', loadWatchedMoviesFromLocalStorage);
