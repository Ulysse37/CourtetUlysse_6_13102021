"use strict";

const modal                 = document.getElementById("contact_modal");
const photographerHeader    = document.querySelector(".photograph-header");
const imageGallery          = document.querySelector(".photograph-gallery");
const closeModalBtn         = document.querySelector(".close-modal-elt");
const orderBy               = document.getElementById("orderBy");

/**
 *Affiche la modale quand on appuie sur le bouton contactez-moi
 */
function displayModal() {

	modal.style.display = "block";
    photographerHeader.setAttribute("aria-hidden", "true");
    imageGallery.setAttribute("aria-hidden", "true");
    orderBy.setAttribute("aria-hidden", "true");
    closeModalBtn.focus();
}

/**
 *Ferme la modale quand on appuie sur la croix 
 */
function closeModal() {

    modal.style.display = "none";
    photographerHeader.setAttribute("aria-hidden", "false");
    imageGallery.setAttribute("aria-hidden", "false");
    orderBy.setAttribute("aria-hidden", "false");
}

const first     = document.getElementById("firstName");
const last      = document.getElementById("lastName");
const email     = document.getElementById("email");
const message   = document.getElementById("message");

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
