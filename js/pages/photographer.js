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

const photographerId = parseInt(location.href.split("=")[1], 10); // va chercher l'id du photographe dans l'url

// Affiche le header sur la page photographe
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
    photographerHeader.style.justifyContent     = "space-between"
    photographerHeader.style.alignItems         = "center";
    nameElt.style.color                         = "#D3573C"
    locationElt.style.color                     = "#901C1C"
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

    console.log(data);
    
    //return { id, name, city, country, tagline, portrait, price }
}

// Sort les data du photographe de la page
async function displayPhotographer(photographers) {

    for (let i = 0; i < photographers.length; i++) {
        
        if (photographers[i].id === photographerId) {
            showPhotographerInfo(photographers[i]);
            //console.log(photographers[i]);
            return photographers[i];    
        }  
    };
}

async function init() {

    const { photographers } = await fetchPhotographer();
    let photographer = displayPhotographer(photographers);
    showPhotographerInfo(photographer);
};

init();
