"use strict";

const photographUrlId       = parseInt(location.href.split("=")[1], 10); // va chercher l'id du photographe dans l'url
const photographerSection   = document.querySelector(".photograph-gallery");
/* const orderBySelect         = document.getElementById('orderBy'); */
let medias = []; // Tableau des médias (images/vidéos) qui seront injectés dans la lightbox

async function fetchPhotographer() {
    
    const url = '../FishEyeData.json';
    try {
        let res = await fetch(url);
        //console.log(res.json());
        return await res.json();
        
    } catch (error) {
        console.log(error);
    }
}

//! ****************************** HEADER  ******************************
/**
 * Affiche le style du header et son contenant
 * @param {object} pictureElt 
 */
function createPhotographerStyle(pictureElt) {

    let photographerHeader      = document.querySelector(".photograph-header");
    let figureElt               = document.createElement("figure");
    
    photographerHeader.style.display            = "flex";
    photographerHeader.style.justifyContent     = "space-around";
    photographerHeader.style.alignItems         = "center";
    photographerHeader.style.backgroundColor    = "#FAFAFA";
    photographerHeader.style.margin             = "2rem 6rem";
    figureElt.style.width                       = "200px";
    figureElt.style.height                      = "200px";
    figureElt.style.borderRadius                = "50%";
    figureElt.style.overflow                    = "hidden";
    figureElt.style.margin                      = "30px";

    photographerHeader.appendChild(figureElt);
    figureElt.appendChild(pictureElt);
}
/**
 * Crée le style des infos concernant le photographe
 * @param {object} data 
 */
function createPhotographerInfoStyle(data) {

    let photographerInfo        = document.querySelector(".photograph-header-info");
    let nameElt                 = document.createElement("h2");
    let locationElt             = document.createElement("p");
    let tagElt                  = document.createElement("p");

    nameElt.innerText           = data.name;
    locationElt.innerText       = data.city + ", " + data.country;
    tagElt.innerText            = data.tagline;

    nameElt.style.color                         = "#D3573C";
    nameElt.style.fontSize                      = "250%";
    locationElt.style.color                     = "#901C1C";
    locationElt.style.fontSize                  = "125%";
    tagElt.style.color                          = "#525252"

    photographerInfo.appendChild(nameElt);
    photographerInfo.appendChild(locationElt);
    photographerInfo.appendChild(tagElt);
}

/**
 * Affiche le header sur la page photographe
 * @param {object} data 
 */
function showPhotographerInfo(data) {

    const { name, portrait } = data;

    const photographerName      = document.querySelector(".photographer-name");
    const picture               = `../images/photographers/${portrait}`; 
    const pictureElt            = document.createElement("img");

    createPhotographerStyle(pictureElt);
    createPhotographerInfoStyle(data);

    photographerName.innerText  = "Contactez-moi \n" + name; // Affiche le nom du photographe dans la modale Contactez-moi
    pictureElt.src              = picture;
    pictureElt.alt              = name;

    pictureElt.style.width                      = "100%";
    pictureElt.style.height                     = "100%";
    pictureElt.style.objectFit                  = "cover";
}

// Affiche le prix du photographe dans l'encart de bas de page
function displayPhotographerPrice(data) { 

    const { price } = data;
    const photographerPrice      = document.querySelector(".photograph-price");

    photographerPrice.innerText  = data.price + "€ / jour";
}

/**
 * Sort les data du photographe de la page
 * @param {object} photographers 
 */
async function displayPhotographer(photographers) {
    
    for (let i = 0; i < photographers.length; i++) {
        
        if (photographers[i].id === photographUrlId) {
            showPhotographerInfo(photographers[i]);
            displayPhotographerPrice(photographers[i]);  
        }
    };
}

//! ****************************** GALLERY  ******************************

function createImgElt(image, figureElt) {

    let imgElt = document.createElement("img");

    imgElt.src          = "../images/" + image.photographerId + "/" + image.image;
    imgElt.alt          = image.title;
    imgElt.tabIndex     = "0";
        
    imgElt.style.width          = "100%";
    imgElt.style.height         = "100%";
    imgElt.style.objectFit      = "cover";
    imgElt.style.borderRadius   = "2%";
        
    figureElt.appendChild(imgElt);

    return imgElt;
}

function createVideoElt(video, figureElt) {

    let videoElt        = document.createElement("video");

    let videoContainer  = document.createElement('div');
    let overlay         = document.createElement('div'); // Overlay pour empêcher lecture de la video au clic et lancer lightbox

    videoElt.controls               = "controls";
    videoElt.src                    = "../images/" + video.photographerId + "/" + video.video;
    videoElt.type                   = "video/mp4";
    videoElt.ariaLabel              = video.title;
    videoElt.tabIndex               = "0";

    videoContainer.style.width      = "100%";
    videoContainer.style.height     = "100%";
    videoContainer.style.position   = "relative";

    overlay.className               = "overlay";
    overlay.style.width             = "100%";
    overlay.style.height            = "90%";
    overlay.style.position          = "absolute";
    overlay.style.top               = "0";
    overlay.style.left              = "0";
    overlay.style.zIndex            = "1";
    overlay.style.background        = "transparent";
    overlay.tabIndex                = "-1";

    videoElt.style.width            = "100%";
    videoElt.style.height           = "100%";
    videoElt.style.objectFit        = "cover";
    videoElt.style.borderRadius     = "2%";

    overlay.addEventListener('click', function(event) { // lance la lightbox au clic sur l'overlay au lieu de lancer la vidéo
        event.preventDefault();
        event.stopPropagation();
        if (!isLightboxOpen) {
          openLightbox(videoElt, overlay);
        }
    });

    /* figureElt.appendChild(videoElt); */
    figureElt.appendChild(videoContainer);
    videoContainer.appendChild(videoElt);
    videoContainer.appendChild(overlay);

    return videoElt;
}

/**
 * Affiche et style la photo ou la video
 * @param {object} media
 */
function createPhotographerMedia(media) {

    const liElt             = document.createElement("li");
    const figureElt         = document.createElement("figure");
    const figcaptionElt     = document.createElement("figcaption");
    const likeContainer     = document.createElement("p");
    const likeCounterElt    = document.createElement("span");
    const heartElt          = document.createElement("i");
    
    if (media.image) {
        createImgElt(media, figureElt);
    }

    if (media.video) {
        createVideoElt(media, figureElt);
    }

    figureElt.className         = "media";
    figcaptionElt.innerText     = media.title;
    likeContainer.className     = "likes";
    likeCounterElt.className    = "like-count";
    likeCounterElt.innerText    = media.likes;
    heartElt.className          = "fas fa-heart";
    heartElt.tabIndex           = "0";

    liElt.style.margin                  = "2rem 2rem";
    figureElt.style.width               = "330px";
    figureElt.style.height              = "330px";
    figcaptionElt.style.display         = "flex";
    figcaptionElt.style.justifyContent  = "space-between";
    figcaptionElt.style.fontWeight      = "400";
    figcaptionElt.style.fontSize        = "24px";
    figcaptionElt.style.color           = "#901C1C";
    likeContainer.style.margin          = "0";
    
    photographerSection.appendChild(liElt);
    liElt.appendChild(figureElt);
    figureElt.appendChild(figcaptionElt);
    figcaptionElt.appendChild(likeContainer);
    likeContainer.appendChild(likeCounterElt);
    likeContainer.appendChild(heartElt);

    handleLikeEvent(heartElt, likeCounterElt); // appelle fonction pour ajouter 1 like au media + compteur total de like
}

/**
 * Affiche la gallery du photographe
 * @param {object} data 
 */
function createPhotographerGallery(data) {
    // Supprimer les éléments existants dans la galerie afin d'éviter doublons quand utilisation du trieur
    photographerSection.innerHTML = ''; 
    
    for (let i = 0; i < data.length; i++) {
        createPhotographerMedia(data[i]);
    }
}

/**
 * sort les photos du photographe de la page
 * @param {object} allMedia -> contient toutes les photos de tous les photographes
 */
let photographerGallery = []; /* va contenir toutes les photo du photographe de la page */
async function displayPhotographerGallery(allMedia) {
    
    for (let i = 0; i < allMedia.length; i++) {
        if (allMedia[i].photographerId === photographUrlId) {
            
            photographerGallery.push(allMedia[i]);
        }
    }
    createPhotographerGallery(photographerGallery);
}

//! **************************** TRIEUR ******************************
// Fonction pour ajouter les médias de la gallery dans le tableau medias pour la lightbox dans l'odre des tris
function addMedias() {

    const lis = document.querySelectorAll('.photograph-gallery li');
    lis.forEach((li) => {
      const media = li.querySelector('img, video');
      medias.push(media);
    });
}

const trieurButton = document.querySelector('.trieur-button');
const trieurListe = document.querySelector('.trieur-liste');
const trieurItems = document.querySelectorAll('.trieur-item');

function sortMedia(sortBy) {
    // Récupérer les médias à trier
    const mediaToSort = photographerGallery;
    
    // Trier les médias en fonction de la sélection
    switch (sortBy) {
      case 'popularity':
        mediaToSort.sort((a, b) => b.likes - a.likes);
        break;
      case 'date':
        mediaToSort.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'title':
        mediaToSort.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        console.error('Erreur de tri');
    }
    
    // Met à jour la galerie avec les médias triés
    createPhotographerGallery(mediaToSort);
    // met à jour tableau medias avec les medias triés pour la lightbox
    medias = [];
    addMedias();
}

// Affiche la liste du trieur au clic sur le bouton
trieurButton.addEventListener('click', () => {
    trieurListe.classList.toggle('visible');
});

// Cache la liste au clic hors de la liste.
document.addEventListener('click', function(event) {
    if (trieurListe.classList.contains('visible') && !trieurListe.contains(event.target) && event.target !== trieurButton) {
        trieurListe.classList.remove('visible');
    }
});

// Appelle la fonction sortMedia au clique sur chacun des éléments du trieur
trieurItems.forEach((item) => {
    item.addEventListener('click', () => {
      const sortBy = item.getAttribute('data-sort');
      trieurButton.textContent = item.textContent; // met à jour le texte du bouton
      sortMedia(sortBy);
      trieurListe.classList.remove('visible');
    });
});

// style du chevron du trieur
const trieurIcon   = document.querySelector(".trieur-icon");

trieurButton.addEventListener('click', () => {
    trieurIcon.classList.toggle("rotated"); // Ajoute ou supprime la classe 'rotated' au clic sur le trieur
});

trieurButton.addEventListener('blur', () => {  // Supprime la classe 'rotated' à la perte du focus
    trieurIcon.classList.remove("rotated");
});


//! **************************** LIKES ******************************

function updateTotalLikes() { // Fonction qui va calculer la somme des likes

    const likeCounterElts = document.querySelectorAll('.like-count');

    const totalLikes = Array.from(likeCounterElts).reduce((acc, counter) => { // calcule somme des valeurs de chaque compteur de like
      return acc + parseInt(counter.textContent);
    }, 0);
    document.querySelector('.total-likes').textContent = totalLikes; // affiche le résultatdans l'encart de bas de page
}

setTimeout(function() { // update le nombre total de like au chargement de la page
    updateTotalLikes();
}, 1000); // attendre 1 seconde avant d'exécuter le code

function handleLikeEvent(heartElt, likeCounterElt) {

    function updateMediaLikesCount() { // Fonction qui va ajouter +1 au like du media

        if (!heartElt.classList.contains("liked")) {

            const currentLikeCount      = parseInt(likeCounterElt.textContent);

            likeCounterElt.textContent  = currentLikeCount + 1;
            heartElt.classList.add("liked");

            // Mets à jour le compteur de like total
            updateTotalLikes();
        }
    }
    heartElt.addEventListener("click", updateMediaLikesCount); // ajoute +1 au like au clic
    heartElt.addEventListener("keydown", function(event) { // ajoute +1 au like à la pression touche enter

      if (event.key === "Enter") {
        updateMediaLikesCount();
      }
    });
}

//! **************************** INIT *******************************

/**
 * Initialise le code
 */
async function init() {

    const { photographers, media } = await fetchPhotographer();

    displayPhotographer(photographers);  
    displayPhotographerGallery(media);
};

init();
