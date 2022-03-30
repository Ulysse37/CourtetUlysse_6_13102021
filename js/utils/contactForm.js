"use strict";
/**
 *Affiche la modale quand on appuie sur le bouton contactez-moi
 */
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

/**
 *Ferme la modale quand on appuie sur la croix 
 */
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const first     = document.getElementById("firstName");
const last      = document.getElementById("lastName");
const email     = document.getElementById("email");
const message   = document.getElementById("message");

let validFormFirstName  = false;
let validFormLastName   = false;
let validFormEmail      = false;
let validFormMessage    = false;

function validationFirstName(e) {
    let value = e.target.value;
    
    if((value.length >= 2) && (value != "")) {

        first.style.border = "6px solid green";
        
        return validFormFirstName = true;
    }
    first.style.border = "5px solid red";
}

function validationLastName(e) {
    let value = e.target.value;
    
    if((value.length >= 2) && (value != "")) {

        last.style.border = "6px solid green";
        
        return validFormLastName = true;
    }
    last.style.border = "5px solid red";
}

function validationEmail(e) {
    let value = e.target.value;
    let validMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (value.match(validMail)) {

        email.style.border = "6px solid green";
  
        return validFormEmail = true;
    } 
    email.style.border = "6px solid red";
  }

  function validationMessage(e) {
    let value = e.target.value;
    
    if((value.length >= 10) && (value != "")) {

        message.style.border = "6px solid green";
        
        return validFormMessage = true;
    }
    message.style.border = "5px solid red";
}

function validate() {
    let validForm = validFormFirstName && validFormLastName && validFormEmail && validFormMessage;
    console.log(validForm);
    if (validForm) {
        closeModal();
        // Afficher les consoles log des différents champs dans la console
    }
}

first.addEventListener('change', validationFirstName);
last.addEventListener('change', validationLastName);
email.addEventListener('change', validationEmail);
message.addEventListener('change', validationMessage);


