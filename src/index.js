import { spinnerPlay, spinnerStop } from './js/loader';
import { renderTrendingMovies } from './js/API/get-trending';

import { renderModalMovie } from './js/API/get-movie-info';

import { onFormSubmit } from './js/gallery';
import { openModalTeam } from './js/open-modal-team';

///Запуск спінера при завантаженні
spinnerPlay();
window.addEventListener('load', spinnerStop);
///Закінчення спінера при завантаженні
