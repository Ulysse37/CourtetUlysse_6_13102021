"use strict";

const photographUrlId       = parseInt(location.href.split("=")[1], 10); // va chercher l'id du photographe dans l'url
const photographerSection   = document.querySelector(".photograph-gallery");
const orderBySelect         = document.getElementById('orderBy');
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
    const picture       = `../images/photographers/${portrait}`; 
    const pictureElt    = document.createElement("img");

    createPhotographerStyle(pictureElt);
    createPhotographerInfoStyle(data);

    photographerName.innerText  = "Contactez-moi \n" + name; // Affiche le nom du photographe dans la modale Contactez-moi
    pictureElt.src              = picture;
    pictureElt.alt              = name;

    /* pictureElt.style.objectPosition = "50% 20%"; */
    pictureElt.style.width                      = "100%";
    pictureElt.style.height                     = "100%";
    pictureElt.style.objectFit                  = "cover";
}

// Affiche le prix du photographe dans l'encart de bas de page
function displayPhotographerPrice(data) { 
    const { price } = data;
    const photographerPrice      = document.querySelector(".photograph-price");

    photographerPrice.innerText  = data.price + "€/jour";
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
            //console.log(photographers[i]);
            //return photographers[i];    
        }
    };
}

//! ****************************** GALLERY  ******************************

function createImgElt(image, figureElt) {
    let imgElt = document.createElement("img");

    imgElt.src      = "../images/" + image.photographerId + "/" + image.image;
    imgElt.alt      = image.title;
        
    imgElt.style.width          = "100%";
    imgElt.style.height         = "100%";
    imgElt.style.objectFit      = "cover";
    imgElt.style.borderRadius   = "2%";
        
    figureElt.appendChild(imgElt);


    return imgElt;
}

function createVideoElt(video, figureElt) {
    let videoElt = document.createElement("video");

    videoElt.controls               = "controls";
    videoElt.src                    = "../images/" + video.photographerId + "/" + video.video;
    videoElt.type                   = "video/mp4";
    videoElt.ariaLabel             = video.title;

    videoElt.style.width            = "100%";
    videoElt.style.height           = "100%";
    videoElt.style.objectFit        = "cover";
    videoElt.style.borderRadius     = "2%";
      
    figureElt.appendChild(videoElt);

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

    heartElt.addEventListener("click", function() { // Met à jour le compteur de like du media 
        if (!heartElt.classList.contains("liked")) {
            const currentLikeCount = parseInt(likeCounterElt.textContent);
            likeCounterElt.textContent = currentLikeCount + 1;
            heartElt.classList.add("liked");

            // Mets à jour le compteur de like total
            updateTotalLikes();
        }
    });
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
            /* console.log(allMedia); */
        }
    }
    /* console.log(photographerGallery); */
    createPhotographerGallery(photographerGallery);
}

//! **************************** TRIEUR ******************************
// Fonction pour ajouter les médias de la gallery dans le tableau medias pour la lightbox
function addMedias() {
    const lis = document.querySelectorAll('.photograph-gallery li');
    lis.forEach((li) => {
      const media = li.querySelector('img, video');
      medias.push(media);
    });
}

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
    
    // Mettre à jour la galerie avec les médias triés
    createPhotographerGallery(mediaToSort);
    // met à jour tableau medias avec les medias triés pour la lightbox
    medias = [];
    addMedias();
}

orderBySelect.addEventListener('change', (e) => {
    const selectedValue = e.target.value;
    // Appelle de la fonction pour trier les médias en fonction de l'option select
    sortMedia(selectedValue);
});

// masque l'option sélectionnée au clic sur select
orderBySelect.addEventListener('click', () => {
  const selectedIndex = orderBySelect.selectedIndex;
  const options = orderBySelect.options;
  options[selectedIndex].style.display = 'none';
});

// réaffiche toutes les options à change changement du filtre du trieur.
orderBySelect.addEventListener('change', () => {
    const options = orderBySelect.options;
    for (let i = 0; i < options.length; i++) {
      options[i].style.display = 'block';
    }
});

// style du chevron du trieur
const trieurIcon   = document.querySelector(".trieur-icon");

orderBySelect.addEventListener('click', () => {
    trieurIcon.classList.toggle("rotated"); // Ajoute ou supprime la classe 'rotated' au clic sur le trieur
});

orderBySelect.addEventListener('blur', () => {  // Supprime la classe 'rotated' à la perte du focus
    trieurIcon.classList.remove("rotated");
});

const firstSeparator    = document.querySelector(".separator-1");
const secondSeparator   = document.querySelector(".separator-2");
const thirdSeparator    = document.querySelector(".separator-3");
const fourthSeparator   = document.querySelector(".separator-4");

orderBySelect.addEventListener("change", function() {
    const selectedValue = orderBySelect.value;
    
    if (selectedValue === "date") {
        firstSeparator.style.display = "none";
        secondSeparator.style.display = "block";
        thirdSeparator.style.display = "block";
        fourthSeparator.style.display = "none";
    }
    if (selectedValue === "popularity") {
        firstSeparator.style.display = "block";
        secondSeparator.style.display = "none";
        thirdSeparator.style.display = "block";
        fourthSeparator.style.display = "none";
    }
    if (selectedValue === "title") {
        firstSeparator.style.display = "block";
        secondSeparator.style.display = "block";
        thirdSeparator.style.display = "none";
        fourthSeparator.style.display = "none";
    }
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
