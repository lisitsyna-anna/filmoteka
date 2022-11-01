import { getTrendingMovies, createMarkup } from './API/get-trending';
import { getSearchMovies } from './API/search-movies';
import { refs } from './refs';
const paginationBox = document.querySelector('.pagination-container')
paginationBox.addEventListener('click', handlerPagination)
let globalCurrentpage = 0;

/**
 * Create pagination
 * @param {Number} currentPage - current page for search
 * @param {Number} allPages  - all pages for search
 * @return {String} markup - markup for pagination
 */
export default function pagination(currentPage, allPages) {
    let markup = ''
    let beforeTwoPage = currentPage - 2;
    let beforePage = currentPage - 1;
    let afterPage = currentPage + 1;
    let afterTwoPage = currentPage + 2;
    globalCurrentpage = currentPage;

    if (currentPage > 1) {
        markup += `<li class="pagination-button">< Previous</li>`
    }
    if (currentPage > 1) {
        markup += `<li class="pagination-button">1</li>`
    }
    if (currentPage > 4) {
        markup += `<li class="pagination-button">...</li>`
    }
    if (currentPage > 3) {
        markup += `<li class="pagination-button">${beforeTwoPage}</li>`
    }
    if (currentPage > 2) {
        markup += `<li class="pagination-button">${beforePage}</li>`
    }
    markup += `<li class="pagination-button"><b class = "pagination--current">${currentPage}</b></li>`

    if (allPages - 1 > currentPage) {
        markup += `<li class="pagination-button">${afterPage}</li>`
    }

    if (allPages - 2 > currentPage) {
        markup += `<li class="pagination-button">${afterTwoPage}</li>`
    }


    if (allPages - 3 > currentPage) {
        markup += `<li class="dots">...</li>`
    }

    if (allPages > currentPage) {
        markup += `<li class="pagination-button">${allPages}</li>`
        markup += `<li class="pagination-button">Next ></li>`

    }

    paginationBox.innerHTML = markup;
}
function handlerPagination(evt) {
    const page = evt.target.textContent
    const searchValue = refs.formSearch.searchQuery.value;

    if (evt.target.nodeName !== 'LI') {
        return
    }


    if (evt.target.textContent === 'Next >') {
        globalCurrentPage = page;

        if (searchValue) {
            getSearchMovies(searchValue, (globalCurrentpage += 1)).then(data => {
                refs.galleryMovies.innerHTML = data.map(createMarkup);
            });
            return;
        }
        getTrendingMovies((globalCurrentpage += 1)).then(data => {
            refs.galleryMovies.innerHTML = data.map(createMarkup);
        });
        return;
    }

    if (evt.target.textContent === '< Previous') {
        globalCurrentPage = page;

        if (searchValue) {
            getSearchMovies(searchValue, (globalCurrentpage -= 1)).then(data => {
                refs.galleryMovies.innerHTML = data.map(createMarkup);
            });
            return;
        }
        getTrendingMovies((globalCurrentpage -= 1)).then(data => {
            refs.galleryMovies.innerHTML = data.map(createMarkup);
        });
        return;
    }

    if (evt.target.textContent === "...") {
        return
    }

    if (searchValue) {
        getSearchMovies(searchValue, page).then(data => {
            refs.galleryMovies.innerHTML = data.map(createMarkup);
        })
        return
    }
    getTrendingMovies(page, globalCurrentpage).then(data => {
        refs.galleryMovies.innerHTML = data.map(createMarkup);
    })
}
