const CARD_DATA = [
    {
        id: "complejos",
        category: "Complejo",
        image: "./images/Complejo Nagahuel.jpeg",
        alttext: "Complejo Nagahuel",
        title: "Complejo Nagahuel",
        paragraph: "Servicios integrales, pileta y grandes parques para familias."
    },
    {
        id: "cabanas",
        category: "Cabaña",
        image: "./images/Cabañas Aguaribay.jpeg",
        alttext: "Cabañas Aguaribay",
        title: "Cabañas Aguaribay",
        paragraph: "Alojamiento de madera y piedra inmersas en el paisaje serrano."
    }, 
    {
        id: "casas",
        category: "Casa",
        image: "./images/Casa Luna de Abril.jpeg",
        alttext: "Casa Luna de Abril",
        title: "Casa Luna de Abril",
        paragraph: "Propiedad equipada con parque y parrilla."
    },
    {
        id: "hostels",
        category: "Hostel",
        image: "./images/Hostel Punto Cadia.jpeg",
        alttext: "Hostel Punto Cadia",
        title: "Hostel Punto Cadia",
        paragraph: "Ambiente cálido y compartido ideal para viajeros."
    }
];

const cardContainer = document.getElementById('js_cardsContainer');

if (cardContainer) {
    CARD_DATA.forEach(card => {
        const article = document.createElement('article');
        article.classList.add('card');
        article.id = card.id; // Le pone un ID a la tarjeta para conectarla con el menú de arriba
        
        article.innerHTML = `
            <header class="card__header">
                <figure class="card__header--avatar">
                    <img class="card__header--avatar--img"
                        height="185px" width="297px"
                        src="${card.image}"
                        alt="${card.alttext}">
                </figure>
            </header>
            <main>
                <span class="card__category" style="display: block; font-size: 0.85rem; text-transform: uppercase; color: #666; margin-bottom: 4px; font-weight: 600;">${card.category}</span>
                <h3>${card.title}</h3>
                <p>${card.paragraph}</p>
            </main>
        `;
        
        cardContainer.appendChild(article);
    });
}