/*"use strict";

var slideIndex = 1;

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

function createLightboxGallery(data) {
    
    for (let i = 0; i < data.length; i++) {
        createLightboxMedia(data[i]);
    }
}

function createLightboxMedia(data) {
    const lightboxContent = document.querySelector(".lightbox-container");
    const figureElt     = document.createElement("figure");
    const figcaptionElt = document.createElement("figcaption");
    //const linkElt       = document.createElement("a");

    if (data.image) {
        const imgElt = document.createElement("img");

        imgElt.src      = "../images/" + data.photographerId + "/" + data.image;
        imgElt.alt      = data.title;

        figureElt.appendChild(imgElt);
        
    }

    if (data.video) {
        const videoElt = document.createElement("video");

        videoElt.controls               = "controls";
        videoElt.src                    = "../images/" + data.photographerId + "/" + data.video;
        videoElt.type                   = "video/mp4";

        figureElt.appendChild(videoElt);
        
    }
    //console.log(data.id);
    figcaptionElt.innerText = data.title;

    lightboxContent.appendChild(figureElt);
    figureElt.appendChild(figcaptionElt); 
}


/**
 * Ouvre la lightbox
 

function openLightbox() {
    document.getElementById("lightbox").style.display = "block";
}

/**
 * Ferme la lightbox
 
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}


//showLightbox(slideIndex);

/**
 * Media suivant / précédent 
 
function plusSlides(n) {
    showSlides(slideIndex += n);
  }

function currentSlide(n) {
    showLightbox(slideIndex = n);
}
/*
function showLightbox(n) {
    var i;
    var slides = document.getElementsByClassName("media");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    //Ajouter le reste
}
*/
/*const data = fetchPhotographer();

for (let i = 0; i < data.length; i++)

first.addEventListener('click', openLightBox);*/

