"use strict";

//lightbox const
const lightboxId              = document.querySelector("#lightbox");
const lightbox                = document.querySelector(".lightbox-container");
const lightboxMediaContainer  = document.querySelector('.lightbox-media-container');
const lightboxCloseBtn        = document.querySelector(".close_lightbox_btn");
const lightboxPrev            = document.querySelector(".prev_lightbox_btn");
const lightboxNext            = document.querySelector(".next_lightbox_btn");
const encartContainer         = document.querySelector(".encart");

let isLightboxOpen = false;
// Index de l'image/vidéo actuellement affichée
let currentIndex = 0;

// Appel de la fonction pour ajouter les médias après un délai pour laisser l'injection de la gallery
setTimeout(() => {
  addMedias();
  /* console.log(medias); */
}, 1000);

// Injecte dans la lightbox le media cliqué en lui donnant les mêmes attributs que l'original
function displayMedia(media) {

  const lightboxMediaContainer      = document.querySelector('.lightbox-media-container');

  lightboxMediaContainer.innerHTML  = ''; // vide les éléments de la lightbox précédente avant de créer la nouvelle
  // recrée la figcaption du media de la lightbox
  const lightboxFigcaption = document.createElement('figcaption');
  lightboxFigcaption.className = 'lightbox-media-figcaption';
  lightboxMediaContainer.appendChild(lightboxFigcaption);
  
  if (media.tagName === 'VIDEO') { // crée une <video> dans la lightbox si le media cliqué est une <video>
    
    const video = document.createElement('video');

    video.src       = media.src;
    video.type      = media.type;
    video.controls  = true;
    
    lightboxFigcaption.innerText = media.getAttribute('aria-label');
    
    lightboxMediaContainer.appendChild(video);

  } else { // crée une <img> dans la lightbox si le media cliqué est une <img>

    const img = document.createElement('img');

    img.src   = media.src;
    img.alt   = media.alt;
    
    lightboxFigcaption.innerText = media.alt;
    
    lightboxMediaContainer.appendChild(img);
  }
}

let currentOverlay;
// Fonction pour ouvrir la lightbox sur le media cliqué
function openLightbox(media, overlay) {

  if (overlay) { // cache l'overlay de la vidéo à l'ouverture de la lightbox s'il y en a une
    overlay.classList.add('hidden');
  }
  currentOverlay = overlay;

  lightboxId.setAttribute("aria-hidden", "false");
  photographerHeader.setAttribute("aria-hidden", "true");
  imageGallery.setAttribute("aria-hidden", "true");
  encartContainer.setAttribute("aria-hidden", "true");
  isLightboxOpen = true;

  lightboxId.style.display      = "flex";
  encartContainer.style.display = "none";
  
  const index   = medias.indexOf(media); // trouve l'index du media dans le tableau medias
  currentIndex  = index; // définit l'index de l'image/vidéo actuellement affichée

  displayMedia(media);
}

// Fonction pour fermer la lightbox
function closeLightbox() {

  if (currentOverlay) {
    currentOverlay.classList.remove('hidden');
  }

  lightboxId.setAttribute("aria-hidden", "true");
  photographerHeader.setAttribute("aria-hidden", "false");
  imageGallery.setAttribute("aria-hidden", "false");
  encartContainer.setAttribute("aria-hidden", "false");
  isLightboxOpen = false;
  
  lightboxId.style.display      = "none";
  encartContainer.style.display = "flex";
}

// Fonction pour afficher le média précédent
function prevMedia() {

  currentIndex--; // décrémentation de l'index pour passer au media précédent

  if (currentIndex < 0) currentIndex = medias.length - 1; // si index < 0, on passe au dernier media de la liste

  displayMedia(medias[currentIndex]); // affichage du media correspondant au nouvel index
}

// Fonction pour afficher le média suivant
function nextMedia() {

  currentIndex++; // incrémentation de l'index pour passer au media suivant

  if (currentIndex >= medias.length) currentIndex = 0; // si index >= longueur du tableau, on passe au premier media de la liste

  displayMedia(medias[currentIndex]); // affichage du media correspondant au nouvel index
}

// Ajout d'un événement click sur les boutons précédent et suivant
lightboxPrev.addEventListener("click", prevMedia);
lightboxNext.addEventListener("click", nextMedia);

// Ajout d'un événement keydown pour naviguer entre les images et quitter la lightbox
document.addEventListener("keydown", (e) => {

  if (lightboxId.style.display === "flex") {
    
    if (e.key === "ArrowLeft") { // si touche flèche gauche pressée, appel de la fonction prevMedia 
      prevMedia();

    } else if (e.key === "ArrowRight") { // si touche flèche droite pressée, appel de la fonction nextMedia
      nextMedia();

    } else if (e.key === " ") { // Si lightbox sur une video, permet de lancer la video avec touche espace
      const lightboxMediaContainer  = document.querySelector('.lightbox-media-container');
      const video                   = lightboxMediaContainer.querySelector('video');

        if (video) {

          video.play();
        }

    } else if (e.key === "Escape") { // Quitter la lightbox avec la touche escape

      closeLightbox();
    }
  }
});


// ouvre la lightbox au clic ou pression touche enter sur une img ou une video de la gallery
function handleMediaEvent(photographerSection) {
  
  function openMedia(event) { // ouvre la lightbox si clic sur une <img> ou <video> de la gallery
  
    if (event.target.tagName === 'IMG' || event.target.tagName === 'VIDEO') {
      const media = event.target;
      openLightbox(media, currentOverlay);
    }
  }

  photographerSection.addEventListener('click', openMedia); // lance lightbox au clic
  photographerSection.addEventListener('keydown', function(event) { // lance lightbox au clavier sur enter

    if (event.key === "Enter") {
      
      openMedia(event);
    }
  });
}

handleMediaEvent(photographerSection);
