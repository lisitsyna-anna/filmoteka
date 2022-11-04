import axios from 'axios';
import genresList from './genres-list';
import { getGenres } from './get-genres';
import { IMAGE_URL } from './api-params';
import { KEY_API } from './api-params';
import pagination from '../pagination';
import { renderTrailerBtn } from '../API/get-movie-trailer';

const SEARCH_PATH = '/search/movie';
const language = 'en-US';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

async function getSearchMovies(name, page) {
  const { data } = await axios.get(
    `${SEARCH_PATH}?api_key=${KEY_API}&query=${name}&page=${page}&language=${language}`
  );
  pagination(data.page, data.total_pages);
  return data.results;
}

function renderMoviesGallery(movies, currentGallery) {
  const markup = movies
    .map(movie => {
      const {
        id,
        poster_path: posterPath,
        original_title: title,
        release_date: releaseDate,
        genre_ids: genreIds,
        vote_average: voteAverage,
      } = movie;

      const genres = getGenres(genresList, genreIds);

      return `<li class="frame" data-id="${id}">
         <div class="frame__wrap">
            <p class="frame__raiting">${
              voteAverage.toFixed(1) ? voteAverage.toFixed(1) : '---'
            }</p>
           <button type="button" aria-label="watch the trailer" class="watch-trailer-btn-gallery is-hidden" data-id=${id} >Watch the trailer</button>
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
          <div class="frame__info " data-id=${id}>
            <p class="frame__title" data-id=${id}>${
        title ? title : 'Title coming soon'
      }</p>
            <p class="frame__genres" data-id=${id}>${
        genres ? genres : '---'
      }</p>
            <p class="frame__year" data-id=${id}>${
        new Date(releaseDate).getFullYear()
          ? new Date(releaseDate).getFullYear()
          : '---'
      }</p>
         
          </div>
          </li>`;
    })
    .join('');

  currentGallery.insertAdjacentHTML('beforeend', markup);

  const selector = document.querySelectorAll('.watch-trailer-btn-gallery');
  selector.forEach(element => {
    renderTrailerBtn(element.dataset.id, element);
  });
}

export { getSearchMovies, renderMoviesGallery };
