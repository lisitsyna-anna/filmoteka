import * as basicLightbox from 'basiclightbox';
import irene from '../images/team/irene.jpg';
import olha from '../images/team/olha.jpg';
import anna from '../images/team/anna.jpg';
import bohdan from '../images/team/bohdan.jpg';
import mykola from '../images/team/mykola.jpg';
import volodymyr from '../images/team/volodymyr.jpg';
import yuliia from '../images/team/yuliia.jpg';
import nelia from '../images/team/nelia.jpg';
import sofiia from '../images/team/sofiia.jpg';

import { refs } from './refs';
// console.log(refs.link);

const objects = [
  {
    name: 'Iryna Makovoz',
    photo: irene,
    role: 'Team Lead',
    git: 'https://github.com/IreneCreadora',
  },
  {
    name: 'Olha Zamlynska',
    photo: olha,
    role: 'Scrum master',
    git: 'https://github.com/olhazamlynska',
  },
  {
    name: 'Anna lisitsyna',
    photo: anna,
    role: 'Main developer',
    git: 'https://github.com/lisitsyna-anna',
  },
  {
    name: 'Bohdan Orlovskyi',
    photo: bohdan,
    role: 'Developer',
    git: 'https://github.com/Bohdan100',
  },
  {
    name: 'Yuliia Tymchuk',
    photo: yuliia,
    role: 'Developer',
    git: 'https://github.com/yuliia-tymchuk',
  },
  {
    name: 'Volodymyr Tymoshchuk',
    photo: volodymyr,
    role: 'Developer',
    git: 'https://github.com/Vobzilla',
  },
  {
    name: 'Sofiia Korostenska',
    photo: sofiia,
    role: 'Developer',
    git: 'https://github.com/SofiiaKorost',
  },
  {
    name: 'Mykola Zaikovskyi',
    photo: mykola,
    role: 'Developer',
    git: 'https://github.com/mykola1982',
  },
  {
    name: 'Nelia Bochenkova ',
    photo: nelia,
    role: 'Developer',
    git: 'https://github.com/Nelia95',
  },
];

const markup = ` <div class="modal__container">
  <button class="modal__close" type="button" aria-label="close modal">
    <div class="modal__close-first"></div>
    <div class="modal__close-second"></div>
  </button>
  <div class="modal-wrap team">
    <div class="team__wrap">
      <h1 class="team__title">Dream Team</h1>
      <ul class="team__list">
        <li class="team__item">
          <img
            src="${irene}"
            alt="Iryna Makovoz"
            class="team__item-img"
         
          />
          <div class="team__item-data">
          <p class="team__item-name">Iryna Makovoz</p>
          <p class="team__item-role">Team Lead</p>
          <div class="team__item-wrap">
            <a
              href="https://github.com/IreneCreadora"
              target="_blank"
              title="Link to Git Hub"
            >
              <img
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png"
                alt=""
                class="team__item-icon"
              />
            </a>
            
          </div>
          </div>
        </li>
        <li class="team__item">
          <img
            src="${olha}"
            alt="Olha Zamlynska"
            class="team__item-img"
          />
          <div class="team__item-data">
          <p class="team__item-name">Olha Zamlynska</p>
          <p class="team__item-role">Scrum</p>
          <div class="team__item-wrap">
            <a
              href="https://github.com/olhazamlynska"
              target="_blank"
              title="Link to Git Hub"
            >
              <img
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png"
                alt=""
                class="team__item-icon"
              />
            </a>
            
          </div>
          </div>
        </li>
        <li class="team__item">
          <img
            src="${anna}"
            alt="Anna lisitsyna"
            class="team__item-img"
          />
          <div class="team__item-data">
          <p class="team__item-name">Anna lisitsyna</p>
          <p class="team__item-role">Main developer</p>
          <div class="team__item-wrap">
            <a href="https://github.com/lisitsyna-ann" target="_blank"  title="Link to Git Hub">
              <img
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png"
                alt=""
                class="team__item-icon"
              />
            </a>
          </div>
          </div>
        </li>
        <li class="team__item">
          <img
            src="${bohdan}"
            alt="Bohdan Orlovskyi"
            class="team__item-img"
          />
          <div class="team__item-data">
          <p class="team__item-name">Bohdan Orlovskyi</p>
          <p class="team__item-role">Developer</p>
          <div class="team__item-wrap">
            <a href="https://github.com/Bohdan100" target="_blank"  title="Link to Git Hub">
              <img
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png"
                alt=""
                class="team__item-icon"
              />
            </a>
          </div>
          </div>
        </li>
        <li class="team__item">
          <img
            src="${nelia}"
            alt="Nelia Bochenkova"
            class="team__item-img"
          />
          <div class="team__item-data">
          <p class="team__item-name">Nelia Bochenkova</p>
          <p class="team__item-role">Developer</p>
          <div class="team__item-wrap">
            <a href="https://github.com/Nelia95" target="_blank"  title="Link to Git Hub">
              <img
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png"
                alt=""
                class="team__item-icon"
              />
            </a>
          </div>
          </div>
        </li>
        <li class="team__item">
          <img
            src="${volodymyr}"
            alt="Volodymyr Tymoshchuk"
            class="team__item-img"
          />
          <div class="team__item-data"><p class="team__item-name team__item--font">Volodymyr Tymoshchuk</p>
          <p class="team__item-role">Developer</p>
          <div class="team__item-wrap">
            <a href="https://github.com/Vobzilla" target="_blank" title="Link to Git Hub">
              <img
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png"
                alt=""
                class="team__item-icon"
              />
            </a>
          
          </div>
          </div>
        </li>
        <li class="team__item">
          <img
            src="${sofiia}"
            alt="Sofiia Korostenska"
            class="team__item-img"
          />
          <div class="team__item-data">
          <p class="team__item-name">Sofiia Korostenska</p>
          <p class="team__item-role">Developer</p>
          <div class="team__item-wrap">
            <a href="https://github.com/SofiiaKorost" target="_blank"  title="Link to Git Hub">
              <img
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png"
                alt=""
                class="team__item-icon"
              />
            </a>
          </div>
          </div>
        </li>
        <li class="team__item">
          <img
            src="${mykola}"
            alt="Mykola Zaikovskyi"
            class="team__item-img"
          />
          <div class="team__item-data">
          <p class="team__item-name">Mykola Zaikovskyi</p>
          <p class="team__item-role">Developer</p>
          <div class="team__item-wrap">
            <a href="https://github.com/mykola1982" target="_blank" title="Link to Git Hub">
              <img
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png"
                alt=""
                class="team__item-icon"
              />
            </a>
            
          </div>
          </div>
        </li>
        <li class="team__item">
          <img
            src="${yuliia}"
            alt="Yuliia Tymchuk"
            class="team__item-img"
          />
          <div class="team__item-data">
          <p class="team__item-name">Yuliia Tymchuk</p>
          <p class="team__item-role">Developer</p>
          <div class="team__item-wrap">
            <a href="https://github.com/yuliia-tymchuk " target="_blank" title="Link to Git Hub">
              <img
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png"
                alt=""
                class="team__item-icon"
              />
            </a>
            
          </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
`;
const body = document.querySelector('body');

refs.link.addEventListener('click', openModalTeam);
export function openModalTeam(event) {
  event.preventDefault();
  const modalTeam = basicLightbox.create(markup);
  modalTeam.show();
  if (modalTeam.show()) {
    body.style.overflow = 'hidden';
  }
  const modalClose = document.querySelector('.modal__close');

  modalClose.addEventListener('click', event => {
    modalTeam.close();
  });
  window.addEventListener('keydown', closeModalTeam);
  window.addEventListener('click', clickOutsideModal);
  function closeModalTeam(event) {
    if (event.code !== 'Escape') {
      return;
    }

    modalTeam.close();
    window.removeEventListener('keydown', closeModalTeam);
  }
  function clickOutsideModal(event) {
    if (event.target.classList.value === 'basicLightbox__placeholder') {
      modalTeam.close();
      body.style.overflow = 'scroll';
      window.removeEventListener('click', clickOutsideModal);
    }
  }
}
