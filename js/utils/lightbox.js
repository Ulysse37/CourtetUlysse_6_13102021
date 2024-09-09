"use strict";

const lightboxId = document.querySelector("#lightbox");
const lightbox = document.querySelector(".lightbox-container");
const lightboxCloseBtn = document.querySelector(".close_lightbox_btn");
const lightboxPrev = document.querySelector(".prev_lightbox_btn");
const lightboxNext = document.querySelector(".next_lightbox_btn");

// Tableau des médias (images/vidéos)
const medias = [];

// Index de l'image/vidéo actuellement affichée
let currentIndex = 0;

// Fonction pour ajouter les médias dans le tableau
function addMedias() {
  const lis = document.querySelectorAll('.photograph-gallery li');
  lis.forEach((li) => {
    const media = li.querySelector('img, video');
    medias.push(media);
  });
}

// Appel de la fonction pour ajouter les médias après un délai pour laisser l'injection de la gallery
setTimeout(() => {
  addMedias();
  console.log(medias);
}, 1000);

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
  const index = medias.indexOf(media); // trouve l'index du media dans le tableau medias
  currentIndex = index;
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
  /* console.log(lis); */
  lis.forEach((li) => {
    li.addEventListener('click', (e) => {
      const media = e.target.closest('img, video'); // target l'img/vidéo la plus proche de la <li>
      /* console.log('media:', media); */
      displayMedia(media); // ouvre la lightbox sur le media cliqué
      openLightbox(media);
    });
  });
}, 1000); // délai afin de laisser le temps à la gallery de s'injecter

// Fonction pour afficher le média précédent
function prevMedia() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = medias.length - 1;
  }
  displayMedia(medias[currentIndex]);
}

// Fonction pour afficher le média suivant
function nextMedia() {
  currentIndex++;
  if (currentIndex >= medias.length) {
    currentIndex = 0;
  }
  displayMedia(medias[currentIndex]);
}

// Ajout d'un événement click sur les boutons précédent et suivant
lightboxPrev.addEventListener("click", prevMedia);
lightboxNext.addEventListener("click", nextMedia);
