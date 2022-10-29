// ИНПУТ name="searchQuery" !!!

import { refs } from './refs';
import { clearGallery } from './supportFunctions';
import { getSearchMovies, renderMoviesGallery } from './API/search-movies';

let page = 1;

refs.formSearch.addEventListener('submit', onFormSubmit);

export async function onFormSubmit(e) {
  e.preventDefault();

  clearGallery(refs.galleryMovies);

  page = 1;

  searchResult = e.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();

  if (searchResult !== '') {
    try {
      const markupPictures = await getSearchMovies(searchResult, page);

      if (markupPictures.length !== 0) {
        renderMoviesGallery(markupPictures, refs.galleryMovies);
      } else {
        clearGallery(refs.galleryMovies);
        alert('error');
      }
    } catch (error) {
      clearGallery(refs.galleryMovies);
      alert('error');
    }
  } else {
    clearGallery(refs.galleryMovies);
    alert('error');
  }
}
