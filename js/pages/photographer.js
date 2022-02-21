"use strict";
//Mettre le code JavaScript lié à la page photographer.html

async function fetchPhotographer() {
    
    const url = '../../FishEyeData.json';
    try {
        let res = await fetch(url);
        
        return await res.json();
        
    } catch (error) {
        console.log(error);
    }
}
fetchPhotographer();

const getUrlID = location.pathname.split('=')[0]; 
console.log(getUrlID);


/*async function displayPhotographer(photographer) {
    const photographerHeader = document.querySelector(".photograph-header");
}

*/