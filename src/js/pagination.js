import { getTrendingMovies, createMarkup } from './API/get-trending';
import { getSearchMovies, renderMoviesGallery } from './API/search-movies';
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
        markup += `<li>&#129144;</li>`
    }
    if (currentPage > 1) {
        markup += `<li>1</li>`
    }
    if (currentPage > 4) {
        markup += `<li>...</li>`
    }
    if (currentPage > 3) {
        markup += `<li>${beforeTwoPage}</li>`
    }
    if (currentPage > 2) {
        markup += `<li>${beforePage}</li>`
    }
    markup += `<li><b class="pagination-button pagination--current" >${currentPage}</b></li>`

    if (allPages - 1 > currentPage) {
        markup += `<li>${afterPage}</li>`
    }

    if (allPages - 2 > currentPage) {
        markup += `<li>${afterTwoPage}</li>`
    }


    if (allPages - 3 > currentPage) {
        markup += `<li>...</li>`
    }

    if (allPages > currentPage) {
        markup += `<li>${allPages}</li>`
        markup += `<li>&#129146;<li>`
    }

    paginationBox.innerHTML = markup;
}
function handlerPagination(evt) {
    const page = evt.target.textContent
    const searchValue = refs.formSearch.searchQuery.value;

    if (evt.target.nodeName !== 'LI') {
        return
    }
    if (evt.target.textContent === "🡸") {
        if (searchValue) {
            getSearchMovies(searchValue, globalCurrentPage -= 1).then(data => {
                refs.galleryMovies.innerHTML = data.map(createMarkup);
            })
            return
        }
        getTrendingMovies(globalCurrentPage -= 1, globalCurrentpage).then(data => {
            refs.galleryMovies.innerHTML = data.map(createMarkup);
        })
        return;
    }
    if (evt.target.textContent === "🡺") {
        if (searchValue) {
            getSearchMovies(globalCurrentpage += 1, page).then(data => {
                refs.galleryMovies.innerHTML = data.map(createMarkup);
            })
            return
        }
        getTrendingMovies(globalCurrentPage += 1, globalCurrentpage).then(data => {
            refs.galleryMovies.innerHTML = data.map(createMarkup);
        })
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
