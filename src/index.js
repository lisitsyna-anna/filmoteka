import { spinnerPlay, spinnerStop } from './js/spinner';
import { renderTrendingMovies } from './js/API/get-trending';

import { renderModalMovie } from './js/API/get-movie-info';

import { onFormSubmit } from './js/gallery';
import { openModalTeam } from './js/open-modal-team';

import './js/switch-bg-theme';

import { scrollFunction } from './js/button-up';
import { refs } from './js/refs';

import Cookies from 'js-cookie';

import { createMarkupCookies, COOKIE_NAME, expires } from './js/cookies';

import { onCliсkBtnWatchGallery } from './js/API/get-movie-trailer';

// import { onOpenQueueLibrary } from './js/queue-library';

// import { onOpenWatchedLibrary } from './js/watched-library';

// import { loadWatchedMoviesFromLocalStorage } from './js/watched-library';
// import { onLibraryGallery } from './js/open-modal-library';

///Запуск спінера при завантаженні
spinnerPlay();
window.addEventListener('load', function (e) {
  spinnerStop();
});
///Закінчення спінера при завантаженні

///Запуск кнопки вверх при скролі
window.addEventListener('scroll', scrollFunction);

refs.galleryMovies.addEventListener('click', onCliсkBtnWatchGallery);

if (!Cookies.get(COOKIE_NAME)) {
  document
    .querySelector('body')
    .insertAdjacentHTML('beforeend', createMarkupCookies());

  const cookieAlert = document.querySelector('.js-cookies');

  const cookieBtn = document.querySelector('.js-cookies-accept');

  setTimeout(() => cookieAlert.classList.add('is-shown'), 1000);

  cookieBtn.addEventListener('click', onAcceptBtnClick);

  function onAcceptBtnClick(e) {
    cookieAlert.classList.remove('is-shown');
    setTimeout(() => cookieAlert.remove(), 1000);
    Cookies.set(COOKIE_NAME, true, { expires: expires });
  }
}
