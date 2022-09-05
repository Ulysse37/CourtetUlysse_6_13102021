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

let hasFirstName  = false;
let hasLastName   = false;
let hasEmail      = false;
let hasMessage    = false;

function checkFirstName(e) {
    let value = e.target.value;
    first.style.border = "5px solid red";

    if((value.length >= 2) && (value != "")) {
        first.style.border = "6px solid green";
        hasFirstName = true;
    }
}

function checkLastName(e) {
    let value = e.target.value;
    last.style.border = "5px solid red";
    
    if((value.length >= 2) && (value != "")) {
        last.style.border = "6px solid green";
        hasLastName = true
    }
}

function checkEmail(e) {
    let value = e.target.value;
    let validMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    email.style.border = "6px solid red";
  
    if (value.match(validMail)) {
        email.style.border = "6px solid green";
        hasEmail = true;
    } 
  }

  function checkMessage(e) {
    let value = e.target.value;
    message.style.border = "5px solid red";

    if((value.length >= 10) && (value != "")) {
        message.style.border = "6px solid green";
        hasMessage = true
    } 
}

function validate() {
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
