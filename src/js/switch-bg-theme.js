const themeSwitcherBtn = document.querySelector('.theme-switcher');

if (localStorage.getItem('dark-theme')) {
  document.querySelector('body').classList.add('dark-theme');
  document
    .querySelector('.theme-switcher__thumb')
    .classList.add('theme-switcher__thumb--after');
}

themeSwitcherBtn.addEventListener('click', onThemeSwitcherBtnClick);

function onThemeSwitcherBtnClick() {
  const themeBtn = document.querySelector('.theme-switcher__thumb');
  themeBtn.classList.toggle('.theme-switcher__thumb');
  themeBtn.classList.toggle('theme-switcher__thumb--after');
  document.querySelector('body').classList.toggle('dark-theme');
  if (localStorage.getItem('dark-theme')) {
    localStorage.removeItem('dark-theme');
  } else {
    localStorage.setItem('dark-theme', 'true');
  }
}
