import { spinnerPlay, spinnerStop } from './js/loader';
import { renderTrendingMovies } from './js/API/get-trending';
import { onFormSubmit } from './js/gallery';

///Запуск спінера при завантаженні
spinnerPlay();
window.addEventListener('load', spinnerStop);
///Закінчення спінера при завантаженні
