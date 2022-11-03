import Cookies from 'js-cookie';

export const COOKIE_NAME = 'cookie';
export const expires = new Date(new Date().getTime() + 15 * 60 * 1000);

export function createMarkupCookies() {
  return `<div class="cookies js-cookies">
  <div class="cookies__header">
    <h3 class="cookies__title">Cookies Policy</h3>
  </div>
  <div class="cookies__body">
    <p class="cookies__text">
      We use cookies for improving user experience, analytics and marketing.
      <a class="cookies__link" href="#">Privacy Policy</a>
    </p>
    <button class=" cookies__btn js-cookies-accept">Accept!</button>
  </div>
</div>`;
}
