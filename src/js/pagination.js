// import start page
// import search
// import gallery and input

import { renderTrendingMovies } from './API/get-trending';
import { movieSearcher } from './API/search-movies';
import { refs } from './refs';

const refsPag = {
    btn1Ref: document.querySelector('[data-index="1"]'),
    btn2Ref: document.querySelector('[data-index="2"]'),
    btn3Ref: document.querySelector('[data-index="3"]'),
    btn4Ref: document.querySelector('[data-index="4"]'),
    btn5Ref: document.querySelector('[data-index="5"]'),
    firstPageRef: document.querySelector('.first-button'),
    lastPageRef: document.querySelector('.last-button'),
    paginationRef: document.querySelector('.pagination-container'),
    rightArrowRef: document.querySelector('.arrow-right'),
    leftArrowRef: document.querySelector('.arrow-left'),
    prevDotsRef: document.querySelector('#previous'),
    afterDotsRef: document.querySelector('#after'),
};

refsPag.paginationRef.addEventListener('click', onPaginationClick);

let currentPage = 1;

let btns = document.querySelectorAll('.pagination-button');

refsPag.prevDotsRef.hidden = true;
refsPag.leftArrowRef.hidden = true;
refsPag.firstPageRef.hidden = true;

function onPaginationClick(event) {
    if (event.target.tagName === 'BUTTON') {
        if (Number(event.target.textContent)) {
            currentPage = Number(event.target.textContent);
        }

        refsPag.prevDotsRef.hidden = true;
        refsPag.afterDotsRef.hidden = true;

        if (event.target.classList.contains('pagination-button')) {
            btns.forEach(el => el.classList.remove('pagination--current'));
            event.target.classList.add('pagination--current');
        }

        if (event.target.classList.contains('arrow-right') && currentPage < 1000) {
            btns.forEach(el => el.classList.remove('pagination--current'));
            refsPag.btn1Ref.classList.add('pagination--current');
            refsPag.btn1Ref.textContent = Number(refsPag.btn1Ref.textContent) + 5;
            refsPag.btn2Ref.textContent = Number(refsPag.btn2Ref.textContent) + 5;
            refsPag.btn3Ref.textContent = Number(refsPag.btn3Ref.textContent) + 5;
            refsPag.btn4Ref.textContent = Number(refsPag.btn4Ref.textContent) + 5;
            refsPag.btn5Ref.textContent = Number(refsPag.btn5Ref.textContent) + 5;
            currentPage = refsPag.btn1Ref.textContent;
        }

        if (event.target.classList.contains('arrow-left') && currentPage >= 5) {
            btns.forEach(el => el.classList.remove('pagination--current'));
            refsPag.btn1Ref.textContent = Number(refsPag.btn1Ref.textContent) - 5;
            refsPag.btn2Ref.textContent = Number(refsPag.btn2Ref.textContent) - 5;
            refsPag.btn3Ref.textContent = Number(refsPag.btn3Ref.textContent) - 5;
            refsPag.btn4Ref.textContent = Number(refsPag.btn4Ref.textContent) - 5;
            refsPag.btn5Ref.textContent = Number(refsPag.btn5Ref.textContent) - 5;
            refsPag.btn5Ref.classList.add('pagination--current');
            currentPage = refsPag.btn5Ref.textContent;
        }

        if (event.target.classList.contains('first-button')) {
            btns.forEach(el => el.classList.remove('pagination--current'));
            refsPag.btn1Ref.textContent = 1;
            refsPag.btn2Ref.textContent = 2;
            refsPag.btn3Ref.textContent = 3;
            refsPag.btn4Ref.textContent = 4;
            refsPag.btn5Ref.textContent = 5;
            refsPag.btn1Ref.classList.add('pagination--current');
            currentPage = refsPag.btn1Ref.textContent;
            refsPag.leftArrowRef.hidden = true;
            refsPag.prevDotsRef.hidden = true;
            refsPag.firstPageRef.hidden = true;
        }

        if (event.target.classList.contains('last-button')) {
            btns.forEach(el => el.classList.remove('pagination--current'));
            refsPag.btn1Ref.textContent = Number(refsPag.lastPageRef.textContent) - 4;
            refsPag.btn2Ref.textContent = Number(refsPag.lastPageRef.textContent) - 3;
            refsPag.btn3Ref.textContent = Number(refsPag.lastPageRef.textContent) - 2;
            refsPag.btn4Ref.textContent = Number(refsPag.lastPageRef.textContent) - 1;
            refsPag.btn5Ref.textContent = refsPag.lastPageRef.textContent;
            refsPag.btn5Ref.classList.add('pagination--current');
            currentPage = refsPag.btn5Ref.textContent;
            refsPag.rightArrowRef.hidden = true;
            refsPag.afterDotsRef.hidden = true;
            refsPag.lastPageRef.hidden = true;
        }

        if (Number(currentPage) > 5) {
            refsPag.leftArrowRef.hidden = false;
            refsPag.prevDotsRef.hidden = false;
            refsPag.firstPageRef.hidden = false;
        } else {
            refsPag.leftArrowRef.hidden = true;
            refsPag.prevDotsRef.hidden = true;
            refsPag.firstPageRef.hidden = true;
        }

        if (Number(currentPage) < 996) {
            refsPag.rightArrowRef.hidden = false;
            refsPag.afterDotsRef.hidden = false;
            refsPag.lastPageRef.hidden = false;
        }

        refs.galleryMovies.innerHTML = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (refs.formSearch.value !== '') {
            movieSearcher(refs.formSearch.value, currentPage);
        } else {
            renderTrendingMovies();
        }
    }
}

let pageSize = 9;

function defineResultsPerPage() {
    if (window.innerWidth >= 1024) {
        pageSize = 9;
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        pageSize = 8;
    } else if (window.innerWidth < 768) {
        pageSize = 4;
    }
    return pageSize;
}

export { currentPage, defineResultsPerPage };
