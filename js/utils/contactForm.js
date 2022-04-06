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
        validFormFirstName = true;
        return true;
    }

    first.style.border = "5px solid red";
    validFormFirstName = false;
}

function validationLastName(e) {

    let value = e.target.value;
    
    if((value.length >= 2) && (value != "")) {

        last.style.border = "6px solid green";
        validFormLastName = true
        return true;
    }
    last.style.border = "5px solid red";
    validFormLastName = false;
}

function validationEmail(e) {

    let value = e.target.value;
    let validMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (value.match(validMail)) {

        email.style.border = "6px solid green";
        validFormEmail = true;
        return true;
    } 

    email.style.border = "6px solid red";
    validFormEmail = false;
  }

  function validationMessage(e) {

    let value = e.target.value;
    
    if((value.length >= 10) && (value != "")) {

        message.style.border = "6px solid green";
        validFormMessage = true
        return true;
    }

    message.style.border = "5px solid red";
    validFormMessage = false;
}

function validate() {

    event.preventDefault();
    let validForm = validFormFirstName && validFormLastName && validFormEmail && validFormMessage;
    
    if (validForm) {

        closeModal();
        console.log(`First name : ${first.value}`);
        console.log(`Last name : ${last.value}`);
        console.log(`Email : ${email.value}`);
        console.log(`Message : ${message.value}`);
    }
}

first.addEventListener('change', validationFirstName);
last.addEventListener('change', validationLastName);
email.addEventListener('change', validationEmail);
message.addEventListener('change', validationMessage);


