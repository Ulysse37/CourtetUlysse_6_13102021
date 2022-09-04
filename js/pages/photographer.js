"use strict";

const photographUrlId = parseInt(location.href.split("=")[1], 10); // va chercher l'id du photographe dans l'url
const photographerSection = document.querySelector(".photograph-gallery");

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
    figureElt.style.width                       = "250px";
    figureElt.style.height                      = "250px";
    figureElt.style.borderRadius                = "50%";
    figureElt.style.overflow                    = "hidden";

    photographerHeader.appendChild(figureElt);
    figureElt.appendChild(pictureElt);
}
/**
 * Crée le style des infos concernant le photographe
 * @param {object} data 
 */
function createPhotographerInfoStyle(data) {

    let photographerInfo      = document.querySelector(".photograph-header-info");
    let nameElt       = document.createElement("h2");
    let locationElt   = document.createElement("p");
    let tagElt        = document.createElement("p");

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
    const { id, name, city, country, tagline, portrait, price } = data;

    const photographerName      = document.querySelector(".photographer-name");
    const picture       = `../images/photographers/${portrait}`; 
    const pictureElt    = document.createElement("img");

    let photographerHeader = createPhotographerStyle(pictureElt);
    let photographerInfo  = createPhotographerInfoStyle(data);

    photographerName.innerText  = name; // Affiche le nom du photographe dans la modale Contactez-moi
    pictureElt.src              = picture;
    pictureElt.alt              = name;

    pictureElt.style.width                      = "100%";
    pictureElt.style.height                     = "100%";
    pictureElt.style.objectFit                  = "cover";
}

/**
 * Sort les data du photographe de la page
 * @param {object} photographers 
 */
async function displayPhotographer(photographers) {
    
    for (let i = 0; i < photographers.length; i++) {
        
        if (photographers[i].id === photographUrlId) {
            showPhotographerInfo(photographers[i]);
            //console.log(photographers[i]);
            //return photographers[i];    
        }
    };
}

//! ****************************** GALLERY  ******************************

/* fonction ouvrant la Lightbox */ 
function openLightbox() {
    document.getElementById("lightbox").style.display = "block";
}

function createImgElt(image, figureElt) {
    let imgElt = document.createElement("img");

    imgElt.src      = "../images/" + image.photographerId + "/" + image.image;
    imgElt.alt      = image.title;
        
    imgElt.style.width          = "100%";
    imgElt.style.height         = "100%";
    imgElt.style.objectFit      = "cover";
    imgElt.style.borderRadius   = "2%";
        
    figureElt.appendChild(imgElt);

    //imgElt.addEventListener("click", openLightbox);
    //imgElt.addEventListener("click", currentSlide);

    return imgElt;
}

function createVideoElt(video, figureElt) {
    let videoElt = document.createElement("video");

    videoElt.controls               = "controls";
    videoElt.src                    = "../images/" + video.photographerId + "/" + video.video;
    videoElt.type                   = "video/mp4";

    videoElt.style.width            = "100%";
    videoElt.style.height           = "100%";
    videoElt.style.objectFit        = "cover";
    videoElt.style.borderRadius     = "2%";

    figureElt.appendChild(videoElt);

    //videoElt.addEventListener("click", openLightbox);

    return videoElt;
}



/**
 * Affiche et style la photo ou la video
 * @param {object} media
 */
function createPhotographerMedia(media) {

    const liElt         = document.createElement("li");
    const figureElt     = document.createElement("figure");
    const figcaptionElt = document.createElement("figcaption");
    //const linkElt       = document.createElement("a");
    
    if (media.image) {
        let imgElt = createImgElt(media, figureElt);
    }

    if (media.video) {
        let videoElt = createVideoElt(media, figureElt);
    }
    
    figcaptionElt.innerText = media.title;
    figureElt.className = "media";
    
    liElt.style.margin              = "2rem 0";
    figureElt.style.width           = "400px";
    figureElt.style.height          = "400px";
    figcaptionElt.style.color       = "#901C1C";
    figcaptionElt.style.fontSize    = "120%";
    
    photographerSection.appendChild(liElt);
    liElt.appendChild(figureElt);
    figureElt.appendChild(figcaptionElt); 

    figureElt.addEventListener("click", openLightbox);
    //figureElt.addEventListener("click", currentSlide);
}

/**
 * Affiche la gallery du photographe
 * @param {object} data 
 */
function createPhotographerGallery(data) {
    
    for (let i = 0; i < data.length; i++) {
        createPhotographerMedia(data[i]);
    }
}

/**
 * sort les photos du photographe de la page
 * @param {object} allMedia
 */
async function displayPhotographerGallery(allMedia) {
    let photographerGallery = [];
    
    for (let i = 0; i < allMedia.length; i++) {
        if (allMedia[i].photographerId === photographUrlId) {
            
            photographerGallery.push(allMedia[i]);
        }
    }
    //console.log(photographerGallery);
    createPhotographerGallery(photographerGallery);
}

//! **************************** LIGHTBOX  ******************************

/**
 * Affiche la photo ou la video de la lightbox
 * @param {object} media
 */
function createLightboxMedia(media) {
    const lightboxContent   = document.querySelector(".lightbox-container");
    const liElt             = document.createElement("li");
    const figureElt         = document.createElement("figure");
    const figcaptionElt     = document.createElement("figcaption");
    

    if (media.image) {
        let imgElt = createImgElt(media, figureElt);
    }

    if (media.video) {
        let videoElt = createVideoElt(media, figureElt);
    }
    //console.log(data.id);
    figcaptionElt.innerText = media.title;
    figureElt.className = "media";
    liElt.className = "mySlides"

    liElt.style.margin              = "2rem 0";
    figureElt.style.width           = "400px";
    figureElt.style.height          = "400px";
    figcaptionElt.style.color       = "#901C1C";
    figcaptionElt.style.fontSize    = "120%";


    lightboxContent.appendChild(liElt);
    liElt.appendChild(figureElt);
    figureElt.appendChild(figcaptionElt); 
}

/**
 * Affiche la gallery du photographe pour la lightbox
 * @param {object} allPhotographerMedias
 */
function createLightboxGallery(allPhotographerMedias) {
    
    for (let i = 0; i < allPhotographerMedias.length; i++) {
        createLightboxMedia(allPhotographerMedias[i]);
    }
}

/**
 * sort les photos du photographe de la page
 * @param {object} allMedia
 */
async function displayLightbox(allMedia) {
    let photographerGallery = [];
    
    for (let i = 0; i < allMedia.length; i++) {
        if (allMedia[i].photographerId === photographUrlId) {
            
            photographerGallery.push(allMedia[i]);
        }
    }
    //console.log(photographerGallery);
    createLightboxGallery(photographerGallery);
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

var slideIndex = 1;

function showLightbox(n) {
    var slides = document.getElementsByClassName("mySlides");
    
    //console.log(slideIndex);
    //console.log(slides);
    //console.log(slides.length);
    if (n > slides.length) {
        slideIndex = 1;
        //console.log("if (n > slides.length)", slideIndex);
    }

    if (n < 1) {
        slideIndex = slides.length;
        //console.log("if (n < 1)", slideIndex);
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        //console.log("(i = 0; i < slides.length; i++)", slides[i]);
    }

    slides[slideIndex-1].style.display = "block";
    //console.log(slides[slideIndex-1]);
}

function plusSlides(n) {
    showLightbox(slideIndex += n);
}

function currentSlide(n) {
    showLightbox(slideIndex = n);
}

/**
 * Initialise le code
 */
async function init() {

    const { photographers, media } = await fetchPhotographer();
    //const { media } = await fetchPhotographer();
    displayPhotographer(photographers);  
    displayPhotographerGallery(media);
    displayLightbox(media);
    showLightbox(slideIndex);
};

init();

// Initialise le code seulement après que le DOM soit chargé
/*document.addEventListener('DOMContentLoaded', function(event) {
    init();
});*/


//showLightbox(slideIndex); // à mettre dans init quand ça marchera

/*
document.addEventListener("DOMContentLoaded", function(event) { 
    async function init() {

    const { photographers, media } = await fetchPhotographer();
    //const { media } = await fetchPhotographer();
    displayPhotographer(photographers);  
    displayPhotographerGallery(media);
    displayLightbox(media);
    showLightbox(slideIndex);
};
init();
});
*/





