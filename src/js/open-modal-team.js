// import * as basicLightbox from 'basiclightbox';
// import { refs } from './refs';
// console.log(refs.link);

// refs.link.addEventListener('click', openModalTeam);
// export function openModalTeam(event) {
//   console.log('hello');
//   event.preventDefault();
//   const modalTeam = basicLightbox.create(`
//     <div class="modal-team">
//         <p>
//             Your first lightbox with just a few lines of code.
//             Yes, it's really that simple.
//         </p>
//     </div>
// `);
//   modalTeam.show();
//   window.addEventListener('keydown', closeModalTeam);
//   function closeModalTeam(event) {
//     console.log(event.code);

//     if (event.code !== 'Escape') {
//       return;
//     }
//     modalTeam.close();
//     window.removeEventListener('keydown', closeModalTeam);
//   }
// }
