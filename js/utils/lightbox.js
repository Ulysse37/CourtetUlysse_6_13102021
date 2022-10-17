"use strict";

const lightbox = document.querySelector('.lightbox-container');
const lightboxCloseBtn = document.querySelector('.close_lightbox_btn');
const lightboxPrev = document.querySelector('.prev_lightbox_btn');
const lightboxNext = document.querySelector('.next_lightbox_btn');

const openLightbox = () => {
    mainContent.setAttribute('arias-hidden', 'true');
    lightbox.setAttribute('aria-hidden', 'false');
    body.classList.add('no-scroll');
    lightbox.style.display = 'flex';
    lightboxShow.classList.add('active');
};

/*const displayLightbox = () => {
    const medias document.querySelectorAll('.gallery__link');
}*/
