// import start page
// import search
// import gallery and input

import { renderTrendingMovies } from '../js/API/get-trending';
import { galleryMovies, formSearch } from '../js/refs';
import { movieSearcher } from '../js/API/search-movies';

const refs = {
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

refs.paginationRef.addEventListener('click', onPaginationClick);

let currentPage = 1;

let btns = document.querySelectorAll('.pagination-button');

refs.prevDotsRef.hidden = true;
refs.leftArrowRef.hidden = true;
refs.firstPageRef.hidden = true;

function onPaginationClick(event) {
  if (event.target.tagName === 'BUTTON') {
    if (Number(event.target.textContent)) {
      currentPage = Number(event.target.textContent);
    }

    refs.prevDotsRef.hidden = true;
    refs.afterDotsRef.hidden = true;

    if (event.target.classList.contains('pagination-button')) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      event.target.classList.add('pagination--current');
    }

    if (event.target.classList.contains('arrow-right') && currentPage < 1000) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      refs.btn1Ref.classList.add('pagination--current');
      refs.btn1Ref.textContent = Number(refs.btn1Ref.textContent) + 5;
      refs.btn2Ref.textContent = Number(refs.btn2Ref.textContent) + 5;
      refs.btn3Ref.textContent = Number(refs.btn3Ref.textContent) + 5;
      refs.btn4Ref.textContent = Number(refs.btn4Ref.textContent) + 5;
      refs.btn5Ref.textContent = Number(refs.btn5Ref.textContent) + 5;
      currentPage = refs.btn1Ref.textContent;
    }

    if (event.target.classList.contains('arrow-left') && currentPage >= 5) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      refs.btn1Ref.textContent = Number(refs.btn1Ref.textContent) - 5;
      refs.btn2Ref.textContent = Number(refs.btn2Ref.textContent) - 5;
      refs.btn3Ref.textContent = Number(refs.btn3Ref.textContent) - 5;
      refs.btn4Ref.textContent = Number(refs.btn4Ref.textContent) - 5;
      refs.btn5Ref.textContent = Number(refs.btn5Ref.textContent) - 5;
      refs.btn5Ref.classList.add('pagination--current');
      currentPage = refs.btn5Ref.textContent;
    }

    if (event.target.classList.contains('first-button')) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      refs.btn1Ref.textContent = 1;
      refs.btn2Ref.textContent = 2;
      refs.btn3Ref.textContent = 3;
      refs.btn4Ref.textContent = 4;
      refs.btn5Ref.textContent = 5;
      refs.btn1Ref.classList.add('pagination--current');
      currentPage = refs.btn1Ref.textContent;
      refs.leftArrowRef.hidden = true;
      refs.prevDotsRef.hidden = true;
      refs.firstPageRef.hidden = true;
    }

    if (event.target.classList.contains('last-button')) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      refs.btn1Ref.textContent = Number(refs.lastPageRef.textContent) - 4;
      refs.btn2Ref.textContent = Number(refs.lastPageRef.textContent) - 3;
      refs.btn3Ref.textContent = Number(refs.lastPageRef.textContent) - 2;
      refs.btn4Ref.textContent = Number(refs.lastPageRef.textContent) - 1;
      refs.btn5Ref.textContent = refs.lastPageRef.textContent;
      refs.btn5Ref.classList.add('pagination--current');
      currentPage = refs.btn5Ref.textContent;
      refs.rightArrowRef.hidden = true;
      refs.afterDotsRef.hidden = true;
      refs.lastPageRef.hidden = true;
    }

    if (Number(currentPage) > 5) {
      refs.leftArrowRef.hidden = false;
      refs.prevDotsRef.hidden = false;
      refs.firstPageRef.hidden = false;
    } else {
      refs.leftArrowRef.hidden = true;
      refs.prevDotsRef.hidden = true;
      refs.firstPageRef.hidden = true;
    }

    if (Number(currentPage) < 996) {
      refs.rightArrowRef.hidden = false;
      refs.afterDotsRef.hidden = false;
      refs.lastPageRef.hidden = false;
    }

    galleryMovies.innerHTML = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (formSearch.value !== '') {
      movieSearcher(formSearch.value, currentPage);
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
