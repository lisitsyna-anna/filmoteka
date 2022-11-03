import { refs } from './refs';
import {
  KEY_WATCHED_MOVIES,
  KEY_QUEUE_MOVIES,
  loadFromLocalStorage,
} from './local-storage';
import {
  createMarkupWhenLocalStorageEmpty,
  createMarkupWatchedMovies,
} from './watched-library';
import { renderTrailerBtn } from './API/get-movie-trailer';

export const paginationBox = document.querySelector(
  '.pagination-library-container'
);

paginationBox.addEventListener('click', handlerPagination);

let globalCurrentpage = 0;
/**
 * Create pagination
 * @param {Number} currentPage - current page for search
 * @param {Number} allPages  - all pages for search
 * @return {String} markup - markup for pagination
 */
let allPages = 1;
export default function pagination(allQueueMovies, currentPage) {
  if (window.innerWidth >= 1280) {
    allPages = Math.ceil(allQueueMovies / 9);
  }
  if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    allPages = Math.ceil(allQueueMovies / 8);
  }
  if (window.innerWidth < 768) {
    allPages = Math.ceil(allQueueMovies / 4);
  }

  let markup = '';
  let beforeTwoPage = currentPage - 2;
  let beforePage = currentPage - 1;
  let afterPage = currentPage + 1;
  let afterTwoPage = currentPage + 2;
  globalCurrentpage = currentPage;

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

let currentPage = 1;

function handlerPagination(evt) {
  if (evt.target.nodeName !== 'LI') {
    return;
  }
  if (evt.target.textContent === '...') {
    return;
  }

  if (evt.target.textContent === 'Next >' && currentPage < allPages) {
    currentPage += 1;
  } else if (evt.target.textContent === '< Previous' && currentPage !== 1) {
    currentPage -= 1;
  } else {
    currentPage = Number(evt.target.textContent);
  }
  const page = currentPage;

  let localMovies;
  if (refs.btnLibraryQueue.classList.contains('library__btn--active')) {
    localMovies = loadFromLocalStorage(KEY_QUEUE_MOVIES);
  } else {
    localMovies = loadFromLocalStorage(KEY_WATCHED_MOVIES);
  }

  pagination(Object.keys(localMovies).length, page);

  if (!localMovies || !Object.keys(localMovies).length) {
    const markupNothing = createMarkupWhenLocalStorageEmpty();
    refs.libraryGallery.innerHTML = markupNothing;
    paginationBox.innerHTML = '';
  } else {
    const moviesArray = Object.values(localMovies);
    let moviesToRender = [];

    if (window.innerWidth >= 1280) {
      moviesToRender = moviesArray.slice(
        Number(page - 1) * 9,
        Number(page) * 9
      );
    }
    if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      moviesToRender = moviesArray.slice(
        Number(page - 1) * 8,
        Number(page) * 8
      );
    }
    if (window.innerWidth < 768) {
      moviesToRender = moviesArray.slice(
        Number(page - 1) * 4,
        Number(page) * 4
      );
    }

    const markup = moviesToRender.map(createMarkupWatchedMovies).join('');
    if (refs.libraryGallery) {
      refs.libraryGallery.innerHTML = markup;

      const selector = document.querySelectorAll('.watch-trailer-btn-gallery');

      selector.forEach(element => {
        renderTrailerBtn(element.dataset.id, element);
      });
    }
  }
}

/*function handlerPagination(evt) {
    if (evt.target.nodeName !== 'LI') {
        return;
    }
    if (evt.target.textContent === '...') {
        return;
    }

    const page = Number(evt.target.textContent);

    let localWatchedMovies = loadFromLocalStorage(KEY_WATCHED_MOVIES);
    pagination(Object.keys(localWatchedMovies).length, page);

    if (!localWatchedMovies || !Object.keys(localWatchedMovies).length) {
        const markupNothing = createMarkupWhenLocalStorageEmpty();
        refs.libraryGallery.innerHTML = markupNothing;
    } else {
        console.log(Number(page - 1) * 9);
        console.log(Number(page) * 9);

        const moviesArray = Object.values(localWatchedMovies);
        let moviesToRender = [];
        console.log('PaginationStorage', moviesToRender);
        if (window.innerWidth >= 1280) {
            moviesToRender = moviesArray.slice(
                Number(page - 1) * 9,
                Number(page) * 9
            );
        }
        if (window.innerWidth >= 768 && window.innerWidth < 1280) {
            moviesToRender = moviesArray.slice(
                Number(page - 1) * 8,
                Number(page) * 8
            );

        }
        if (window.innerWidth < 768) {
            moviesToRender = moviesArray.slice(
                Number(page - 1) * 4,
                Number(page) * 4
            );
        }
        console.log(moviesToRender);

        const markup = moviesToRender.map(createMarkupWatchedMovies).join('');
        if (refs.libraryGallery) {
            refs.libraryGallery.innerHTML = markup;

            const selector = document.querySelectorAll('.watch-trailer-btn-gallery');

            selector.forEach(element => {
                renderTrailerBtn(element.dataset.id, element);
            });
        }
    }
}*/
