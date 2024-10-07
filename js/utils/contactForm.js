"use strict";

const modal                 = document.getElementById("contact_modal");
const photographerHeader    = document.querySelector(".photograph-header");
const imageGallery          = document.querySelector(".photograph-gallery");
const closeModalBtn         = document.querySelector(".close-modal-elt");
const labelByOrder          = document.getElementById("labelTriage");
const orderBy               = document.getElementById("orderBy");
const formElements          = document.querySelectorAll('.focusableElt'); // Tous les elts focusable de la modale de contact

const first                 = document.getElementById("firstName");
const last                  = document.getElementById("lastName");
const email                 = document.getElementById("email");
const message               = document.getElementById("message");

/**
 *Affiche la modale quand on appuie sur le bouton contactez-moi
 */
function displayModal() {

	modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    photographerHeader.setAttribute("aria-hidden", "true");
    imageGallery.setAttribute("aria-hidden", "true");
    labelByOrder.setAttribute("aria-hidden", "true");
    orderBy.setAttribute("aria-hidden", "true");
    
    formElements[0].focus(); // focus sur le premier elt de la modale à son ouverture 
    
    // Passes les autres éléments de la page quand modale ouverte en tabindex -1 pour ne pas pouvoir entrer en focus dessus
    orderBy.tabIndex        = -1; 

    const mediaElements     = imageGallery.querySelectorAll('img, video, i');

    mediaElements.forEach((media) => {
        media.tabIndex      = -1;
    });
}

/**
 *Ferme la modale quand on appuie sur la croix 
 */
function closeModal() {

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    photographerHeader.setAttribute("aria-hidden", "false");
    imageGallery.setAttribute("aria-hidden", "false");
    labelByOrder.setAttribute("aria-hidden", "false");
    orderBy.setAttribute("aria-hidden", "false");

    orderBy.tabIndex        = 0;

    const mediaElements     = imageGallery.querySelectorAll('img, video, i');

    mediaElements.forEach((media) => {
        media.tabIndex      = -0;
    });
}

let hasFirstName  = false;
let hasLastName   = false;
let hasEmail      = false;
let hasMessage    = false;

function checkFirstName(e) { // Vérifie que le prénom est bien > 2 caractères

    let value = e.target.value;
    first.style.border = "5px solid red";

    if((value.length >= 2) && (value != "")) {

        first.style.border = "6px solid green";
        hasFirstName = true;
    }
}

function checkLastName(e) { // vérifie que le nom est bien > 2 caractères

    let value = e.target.value;
    last.style.border = "5px solid red";
    
    if((value.length >= 2) && (value != "")) {

        last.style.border = "6px solid green";
        hasLastName = true
    }
}

function checkEmail(e) { // Vérifie que l'email est valide

    let value = e.target.value;
    let validMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    email.style.border = "6px solid red";
  
    if (value.match(validMail)) {

        email.style.border = "6px solid green";
        hasEmail = true;
    } 
  }

  function checkMessage(e) { // Vérifie que le message est >= 10 caractères

    let value = e.target.value;
    message.style.border = "5px solid red";

    if((value.length >= 10) && (value != "")) {

        message.style.border = "6px solid green";
        hasMessage = true
    } 
}

function validate() { // Vérifie que tous les champs sont correctement remplis

    event.preventDefault();
    let isValidate = hasFirstName && hasLastName && hasEmail && hasMessage;
    
    if (isValidate) {

        closeModal();
        console.log(`First name : ${first.value}`);
        console.log(`Last name : ${last.value}`);
        console.log(`Email : ${email.value}`);
        console.log(`Message : ${message.value}`);
    }
}

first.addEventListener('change', checkFirstName);
last.addEventListener('change', checkLastName);
email.addEventListener('change', checkEmail);
message.addEventListener('change', checkMessage);

// Ferme la modale à l'utilisation de la touche Escape
document.addEventListener('keydown', function(event) { 

    if (event.key === 'Escape' && modal.style.display === 'block') {

      closeModal();
    }
});

// Définie l'ordre de navigation au clavier des champs et boutons de la modale de contact
formElements.forEach((element, index) => {

    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'BUTTON') {

        element.tabIndex = index + 1;
    }
});

// Revient au 1er élément focusable de la modale de contact quand on arrive à la fin, navigation clavier
modal.addEventListener('keydown', (event) => {

    if (event.key === 'Tab') {
      const lastElement = formElements[formElements.length - 1];
      
      if (event.target === lastElement) {
        // Définie le focus sur le premier élément de la modale lorsque l'utilisateur arrive à la fin
        formElements[0].focus();
        event.preventDefault(); // Empêche le focus de se faire sur le 2ème élément.
      }
    }
});
