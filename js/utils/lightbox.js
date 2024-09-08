"use strict";

const lightboxId = document.querySelector("#lightbox");
const lightbox = document.querySelector(".lightbox-container");
const lightboxCloseBtn = document.querySelector(".close_lightbox_btn");
const lightboxPrev = document.querySelector(".prev_lightbox_btn");
const lightboxNext = document.querySelector(".next_lightbox_btn");

// Tableau des médias (images/vidéos)
const medias = [];

// Ajoute dans la lightbox le media cliqué
function displayMedia(media) {
  const lightboxMedia = document.querySelector('.lightbox-media');
  const imageSrc = media.getAttribute('src');
  const imageAlt = media.getAttribute('alt');
  
  if (media.src.includes('mp4')) {
    lightboxMedia.innerHTML = '';
    const video = document.createElement('video');
    video.src = imageSrc;
    video.type = 'video/mp4';
    lightboxMedia.appendChild(video);
  } else {
    lightboxMedia.src = imageSrc;
    lightboxMedia.alt = imageAlt;
  }
}

// Fonction pour ouvrir la lightbox sur le media cliqué
function openLightbox(media) {
  // Code pour ouvrir la lightbox
  lightboxId.setAttribute("aria-hidden", "false");
  lightboxId.style.display = "block";
  displayMedia(media);
}

// Fonction pour fermer la lightbox
function closeLightbox() {
  // Code pour fermer la lightbox
  lightboxId.setAttribute("aria-hidden", "true");
  lightboxId.style.display = "none";
}

// ajout événement clic sur les éléments de la gallery pour afficher la lightbox 
setTimeout(() => {
  const lis = document.querySelectorAll('.photograph-gallery li');
  console.log(lis);
  lis.forEach((li) => {
    li.addEventListener('click', (e) => {
      const media = e.target.closest('img, video'); // target l'img/vidéo la plus proche de la <li>
      console.log('media:', media);
      displayMedia(media); // ouvre la lightbox sur le media cliqué
      openLightbox(media);
    });
  });
}, 1000);


// Ajout d'un événement click sur les boutons précédent et suivant
lightboxPrev.addEventListener("click", () => {
    // Code pour afficher le média précédent
    // ...
});
lightboxNext.addEventListener("click", () => {
    // Code pour afficher le média suivant
    // ...
});
