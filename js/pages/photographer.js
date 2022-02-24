"use strict";
//Mettre le code JavaScript lié à la page photographer.html

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

const photographerId = location.href.split("=")[1]; 

function photographerInfo(data) {
    const { id, name, city, country, tagline, portrait, price } = data;
    console.log(data);
    
    return { id, name, city, country, tagline, portrait, price }
}


async function displayPhotographer(photographers) {
    const photographerHeader = document.querySelector(".photograph-header");

    photographers.forEach((photographer) => {
        const photographerModel = photographerInfo(photographer);
        
    });
}



async function init() {

    const { photographers } = await fetchPhotographer();
    displayPhotographer(photographers);
};

init();
