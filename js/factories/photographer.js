"use strict";

function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    //console.log(data);

    const picture = `images/photographers/${portrait}`;  

    function getUserCardDOM() {
        const article       = document.createElement("article");
        const linkElt       = document.createElement("a");
        const figureElt     = document.createElement("figure");
        const pictureElt    = document.createElement("img");
        const figCaptionElt = document.createElement("figcaption");
        const nameElt       = document.createElement("h2");
        const cityElt       = document.createElement("p");
        const taglineElt    = document.createElement("p");
        const priceElt      = document.createElement("p");

        linkElt.href            = `html/Photographe.html?id=${this.id}`;
        pictureElt.src          = picture;
        pictureElt.alt          = name;
        nameElt.textContent     = name;  
        cityElt.textContent     = city + ", " + country;
        taglineElt.textContent  = tagline;
        priceElt.textContent    = price + "€/jour";
        
        pictureElt.style.width          = "100%";
        pictureElt.style.height         = "100%";
        pictureElt.style.objectFit      = "cover";
        figureElt.style.width           = "300px";
        figureElt.style.height          = "300px";
        figureElt.style.borderRadius    = "50%";
        figureElt.style.overflow        = "hidden";
        article.style.display           = "flex";
        article.style.flexDirection     = "column"; 
        article.style.alignItems        = "center";
        article.style.margin            = "50px 35px"
        figureElt.style.display         = "flex";
        figureElt.style.flexDirection   = "column";
        figureElt.style.alignItems      = "center";
        figureElt.style.marginBottom    = "65px"
        figCaptionElt.style.color       = "#D3573C";
        figCaptionElt.style.position    = "absolute";
        nameElt.style.position          = "relative";
        nameElt.style.top               = "300px"
        cityElt.style.margin            = "0";
        cityElt.style.color             = "#901C1C";
        priceElt.style.margin           = "0";
        priceElt.style.color            = "#525252";
        taglineElt.style.margin         = "5px";
        
        article.appendChild(linkElt);
        linkElt.appendChild(figureElt);
        figureElt.appendChild(pictureElt);
        figureElt.appendChild(figCaptionElt);
        figCaptionElt.appendChild(nameElt);
        article.appendChild(cityElt);
        article.appendChild(taglineElt);
        article.appendChild(priceElt);

        return (article);
    }
    return { id, name, picture, city, country, tagline, price, getUserCardDOM } 
}
