import axios from 'axios';
import { refs } from '../refs';
import { KEY_API } from './api-params';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

// API
async function getMovieById(id) {
  try {
    const { data } = await axios.get(
      `/movie/${id}?api_key=${KEY_API}&language=en-US`
    );
    return data;
  } catch (error) {
    console.log('Something wrong with API', error.message);
  }
}

refs.galleryMovies.addEventListener('click', openModal);

async function openModal(e) {
  if (e.target.nodeName !== 'LI' && e.target.nodeName !== 'IMG') {
    return;
  }
  // create
  const idMovie = Number(e.target.dataset.id);
  const response = await getMovieById(idMovie);
  selectedMovie = createMovieObj(response);
  const markup = createMarkupModal(response);
  //   refs.modal.insertAdjacentHTML('beforeend', markup);
  refs.modal.innerHTML = markup;

  // close
  window.addEventListener('keydown', onEscKeyPress);
  refs.modalBackdrop.classList.add('show-modal');
  refs.modalBackdrop.addEventListener('click', onBackdropClick);
  refs.closeModalBtn.addEventListener('click', offCloseModal);
}

export let selectedMovie;

function createMovieObj(response) {
  return {
    id: response.id,
    title: response.title,
    genres: response.genres,
    posterPath: response.poster_path,
    releaseDate: response.release_date,
  };
}

function createMarkupModal({
  vote_average,
  vote_count,
  genres,
  original_title,
  title,
  poster_path,
  original_name,
  popularity,
  overview,
  id,
}) {
  const modalGenres =
    genres
      .map(genre => genre.name)
      .slice(0, 2)
      .join(', ') + ', Other';

  return `<img class="img-modal" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" data-id=${id} />
        <div class="container-modal">
          <b class="title-modal">${title}</b>
          <table class="table">
            <tr class="table-separator">
              <th class="table__text">Vote / Votes</th>
              <th><span class="vote-average">${vote_average}</span> / <span class="vote-count">${vote_count}</span></th>
            </tr>
            <tr class="table-separator">
              <th class="table__text">Popularity</th>
              <th>${popularity}</th>
            </tr>
            <tr class="table-separator">
              <th class="table__text">Original Title</th>
              <th>${original_title ? original_title : original_name}</th>
            </tr>
            <tr class="table-separator">
              <th class="table__text">Genre</th>
              <th>${modalGenres}</th>
            </tr>
          </table>
          <b class="title-about__modal">ABOUT</b>
          <p class="about-text__modal about-scrollbar">${overview}
          </p>
        </div>
      </div>
    </div>`;
}

function offCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.modalBackdrop.classList.remove('show-modal');
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    offCloseModal();
  }
}

function onEscKeyPress(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    offCloseModal();
  }
}
