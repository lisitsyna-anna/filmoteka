import { refs } from './refs';

export function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    refs.wrapperBtnUP.style.display = 'block';
  } else {
    refs.wrapperBtnUP.style.display = 'none';
  }
}
refs.btnUp.addEventListener('click', event => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
