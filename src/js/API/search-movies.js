import axios from 'axios';
import genresList from './genres-list';
import { getGenres } from './get-genres';
import { IMAGE_URL } from './api-params';
import { KEY_API } from './api-params';
import pagination from '../pagination';

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
          <div class="frame__info">
            <p class="frame__title">${title ? title : 'Title coming soon'}</p>
            <p class="frame__genres">${
              genres ? genres : 'Genres coming soon'
            }</p>
            <p class="frame__year">${
              new Date(releaseDate).getFullYear()
                ? new Date(releaseDate).getFullYear()
                : 'Date...'
            }</p>
            <p class="frame__raiting">${
              voteAverage ? voteAverage.toFixed(1) : '...'
            }</p>
          </div>
          </li>`;
    })
    .join('');

  return currentGallery.insertAdjacentHTML('beforeend', markup);
}

export { getSearchMovies, renderMoviesGallery };
