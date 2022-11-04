import axios from 'axios';
import genresList from './genres-list';
import { refs } from '../refs';
import { KEY_API } from './api-params';
import { IMAGE_URL } from './api-params';
import { getGenres } from './get-genres';
import pagination from '../pagination';

import { renderBtn } from '../API/get-movie-trailer';

const TRENDING_PATH = '/trending/movie/day';
let page = 1;

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

// HTTP - запрос на трендовые фильмы - за день
export async function getTrendingMovies(page) {
  try {
    const { data } = await axios.get(
      `${TRENDING_PATH}?api_key=${KEY_API}&page=${page}`
    );
    pagination(data.page, data.total_pages);
    return data.results;
  } catch (error) {
    console.log('Something wrong with API', error.message);
  }
}

// Функция для создания карточки фильма:
export function createMarkup({
  id,
  title,
  poster_path: posterPath,
  genre_ids: genreIds,
  release_date: releaseDate,
  vote_average: voteAverage,
}) {
  // Получаем жанры для рендера
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
          <div class="frame__info" data-id=${id}>
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
}

// Функция, которая вставялет полученные данные на страницу
export async function renderTrendingMovies() {
  let firstPage = 1;
  try {
    let moviesList = await getTrendingMovies(firstPage);
    moviesList = moviesList.filter(movie => movie.adult === false);

    const markup = [...moviesList].map(createMarkup).join('');

    refs.galleryMovies.insertAdjacentHTML('beforeend', markup);

    // render trailer btn

    renderBtn();
  } catch (error) {
    console.log('Something wrong with API', error.message);
  }
}

renderTrendingMovies();
