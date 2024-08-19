"use strict";

const lightboxId = document.querySelector("#lightbox");
const lightbox = document.querySelector(".lightbox-container");
const lightboxCloseBtn = document.querySelector(".close_lightbox_btn");
const lightboxPrev = document.querySelector(".prev_lightbox_btn");
const lightboxNext = document.querySelector(".next_lightbox_btn");

/* console.log(lightboxId); */

const openLightbox = () => {
    lightboxId.setAttribute("arias-hidden", "false");
}

/*const displayLightbox = () => {
    const medias document.querySelectorAll('.gallery__link');
}*/
