"use strict";

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

const photographUrlId = parseInt(location.href.split("=")[1], 10); // va chercher l'id du photographe dans l'url
const photographerGallery = document.querySelector(".photograph-gallery");

/**
 * Affiche le header sur la page photographe
 * @param {object} data 
 */
function showPhotographerInfo(data) {
    const { id, name, city, country, tagline, portrait, price } = data;

    const photographerHeader    = document.querySelector(".photograph-header");
    const photographerInfo      = document.querySelector(".photograph-header-info");

    const picture       = `../images/photographers/${portrait}`; 

    const nameElt       = document.createElement("h2");
    const locationElt   = document.createElement("p");
    const tagElt        = document.createElement("p");
    const figureElt     = document.createElement("figure");
    const pictureElt    = document.createElement("img");

    nameElt.innerText       = name;
    locationElt.innerText   = city + ", " + country;
    tagElt.innerText        = tagline;
    pictureElt.src          = picture;
    pictureElt.alt          = name;

    photographerHeader.style.display            = "flex";
    photographerHeader.style.justifyContent     = "space-around";
    photographerHeader.style.alignItems         = "center";
    photographerHeader.style.backgroundColor    = "#FAFAFA";
    photographerHeader.style.margin             = "2rem 6rem";
    nameElt.style.color                         = "#D3573C";
    nameElt.style.fontSize                      = "250%";
    locationElt.style.color                     = "#901C1C";
    locationElt.style.fontSize                  = "125%";
    tagElt.style.color                          = "#525252"
    figureElt.style.width                       = "250px";
    figureElt.style.height                      = "250px";
    figureElt.style.borderRadius                = "50%";
    figureElt.style.overflow                    = "hidden";
    pictureElt.style.width                      = "100%";
    pictureElt.style.height                     = "100%";
    pictureElt.style.objectFit                  = "cover";
    
    photographerInfo.appendChild(nameElt);
    photographerInfo.appendChild(locationElt);
    photographerInfo.appendChild(tagElt);
    photographerHeader.appendChild(figureElt);
    figureElt.appendChild(pictureElt);

    //console.log(data);
    //return { id, name, city, country, tagline, portrait, price }
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
 * Affiche la photo ou la video
 * @param {object} data 
 */
function createPhotographerMedia(data) {

    const liElt         = document.createElement("li");
    const figureElt     = document.createElement("figure");
    const figcaptionElt = document.createElement("figcaption");

    if (data.image) {
        const imgElt = document.createElement("img");

        imgElt.src      = "../images/" + data.photographerId + "/" + data.image;
        imgElt.alt      = data.title;

        imgElt.style.width          = "100%";
        imgElt.style.height         = "100%";
        imgElt.style.objectFit      = "cover";
        imgElt.style.borderRadius   = "2%";

        figureElt.appendChild(imgElt);
    }

    if (data.video) {
        const videoElt = document.createElement("video");

        videoElt.controls               = "controls";
        videoElt.src                    = "../images/" + data.photographerId + "/" + data.video;
        videoElt.type                   = "video/mp4";

        videoElt.style.width            = "100%";
        videoElt.style.height           = "100%";
        videoElt.style.objectFit        = "cover";
        videoElt.style.borderRadius     = "2%";

        figureElt.appendChild(videoElt);
    }
    //console.log(data.id);
    figcaptionElt.innerText = data.title;

    liElt.style.margin              = "2rem 0rem";
    figureElt.style.width           = "400px";
    figureElt.style.height          = "400px";
    figcaptionElt.style.color       = "#901C1C";
    figcaptionElt.style.fontSize    = "120%";
    
    photographerGallery.appendChild(liElt);
    liElt.appendChild(figureElt);
    figureElt.appendChild(figcaptionElt);  
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

/**
 * sort les photo du photographe de la page
 * @param {object} media 
 */
async function displayPhotographerGallery(media) {
    let photographerGallery = [];
    
    for (let i = 0; i < media.length; i++) {
        if (media[i].photographerId === photographUrlId) {
            
            photographerGallery.push(media[i]);
        }
    }
    console.log(photographerGallery);
    createPhotographerGallery(photographerGallery);
}

/**
 * Initialise le code
 */
async function init() {

    const { photographers } = await fetchPhotographer();
    const { media } = await fetchPhotographer();
    displayPhotographer(photographers);  
    displayPhotographerGallery(media);
};
init();