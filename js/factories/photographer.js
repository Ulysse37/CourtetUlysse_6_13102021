function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;
    console.log(data);

    const picture = `images/photographers/${portrait}`;  

    function getUserCardDOM() {
        const article = document.createElement('article');
        const pictureElt = document.createElement('img');
        pictureElt.setAttribute("src", picture);
        const nameElt = document.createElement('h2');
        nameElt.textContent = name;  
        const cityElt = document.createElement('p');
        cityElt.textContent = city + ", " + country;
        const taglineElt = document.createElement( 'p' );
        taglineElt.textContent = tagline;
        const priceElt = document.createElement( 'p' );
        priceElt.textContent = price + "€/jour";
        article.appendChild(pictureElt);
        article.appendChild(nameElt);
        article.appendChild(cityElt);
        article.appendChild(taglineElt);
        article.appendChild(priceElt);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM } 
}
