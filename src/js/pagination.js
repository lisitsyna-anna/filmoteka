import { getTrendingMovies, createMarkup } from './API/get-trending';
import { getSearchMovies } from './API/search-movies';
import { refs } from './refs';
const paginationBox = document.querySelector('.pagination-library-container');
paginationBox.addEventListener('click', handlerPagination);
let globalCurrentpage = 0;

import { renderBtn } from './API/get-movie-trailer';

/**
 * Create pagination
 * @param {Number} currentPage - current page for search
 * @param {Number} allPages  - all pages for search
 * @return {String} markup - markup for pagination
 */
export default function pagination(currentPage, allPages) {
  let markup = '';
  let beforeTwoPage = currentPage - 2;
  let beforePage = currentPage - 1;
  let afterPage = currentPage + 1;
  let afterTwoPage = currentPage + 2;
  globalCurrentpage = currentPage;

  const storagePage = JSON.stringify(currentPage);
  localStorage.setItem('page', storagePage);

  if (currentPage > 1) {
    markup += `<li class="pagination-button-arrow-left">< Previous</li>`;
  }
  if (currentPage > 1) {
    markup += `<li class="pagination-button">1</li>`;
  }
  if (currentPage > 4) {
    markup += `<li class="pagination-button">...</li>`;
  }
  if (currentPage > 3) {
    markup += `<li class="pagination-button">${beforeTwoPage}</li>`;
  }
  if (currentPage > 2) {
    markup += `<li class="pagination-button">${beforePage}</li>`;
  }
  markup += `<li class="pagination-button"><b class = "pagination--current">${currentPage}</b></li>`;

  if (allPages - 1 > currentPage) {
    markup += `<li class="pagination-button">${afterPage}</li>`;
  }

  if (allPages - 2 > currentPage) {
    markup += `<li class="pagination-button">${afterTwoPage}</li>`;
  }

  if (allPages - 3 > currentPage) {
    markup += `<li class="dots">...</li>`;
  }

  if (allPages > currentPage) {
    markup += `<li class="pagination-button">${allPages}</li>`;
    markup += `<li class="pagination-button-arrow">Next ></li>`;
  }

  paginationBox.innerHTML = markup;
}
function handlerPagination(evt) {
  const page = evt.target.textContent;
  const searchValue = refs.formSearch.searchQuery.value;
  const storageValue = JSON.stringify(searchValue);
  localStorage.setItem('searchValue', storageValue);

  if (evt.target.nodeName !== 'LI') {
    return;
  }

  if (evt.target.textContent === 'Next >') {
    //console.log('page', page);
    //console.log(globalCurrentPage);
    //globalCurrentPage = page;
    //console.log('after', globalCurrentPage);

    if (searchValue) {
      getSearchMovies(searchValue, (globalCurrentpage += 1)).then(data => {
        refs.galleryMovies.innerHTML = data.map(createMarkup).join('');
        renderBtn();
      });
      return;
    }
    getTrendingMovies((globalCurrentpage += 1)).then(data => {
      refs.galleryMovies.innerHTML = data.map(createMarkup).join('');
      renderBtn();
    });
    return;
  }

  if (evt.target.textContent === '< Previous') {
    if (searchValue) {
      getSearchMovies(searchValue, (globalCurrentpage -= 1)).then(data => {
        refs.galleryMovies.innerHTML = data.map(createMarkup).join('');
        renderBtn();
      });
      return;
    }
    getTrendingMovies((globalCurrentpage -= 1)).then(data => {
      refs.galleryMovies.innerHTML = data.map(createMarkup).join('');
      renderBtn();
    });
    return;
  }

  if (evt.target.textContent === '...') {
    return;
  }

  if (searchValue) {
    getSearchMovies(searchValue, page).then(data => {
      refs.galleryMovies.innerHTML = data.map(createMarkup).join('');
      renderBtn();
    });
    return;
  }
  getTrendingMovies(page, globalCurrentpage).then(data => {
    refs.galleryMovies.innerHTML = data.map(createMarkup).join('');
    renderBtn();
  });
}
