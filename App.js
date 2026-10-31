// App.js
import CARD_DATA from './src/data.js';

function renderCards(dataToRender) {
    const cardContainer = document.getElementById('js_cardsContainer');
    if (!cardContainer) return;

    cardContainer.innerHTML = "";

    const isInPages = window.location.pathname.includes('/pages/');
    const imagePathPrefix = isInPages ? '../' : './';

    dataToRender.forEach(card => {
        const article = document.createElement('article');
        article.classList.add('card');
        article.id = card.id;
        
        const finalImageSrc = imagePathPrefix + card.image;

        article.innerHTML = `
            <header class="card__header">
                <figure class="card__header--avatar">
                    <img class="card__header--avatar--img"
                        src="${finalImageSrc}"
                        alt="${card.alttext}">
                </figure>
            </header>
            <main>
                <span class="card__category" style="display: block; font-size: 0.85rem; text-transform: uppercase; color: #666; margin-bottom: 4px; font-weight: 600;">${card.category}</span>
                <h3>${card.title}</h3>
                <p>${card.paragraph}</p>
                <p class="card__direction">📍 <strong>Dirección:</strong> ${card.direction}</p>
                <p class="card__phone">📞 <strong>Teléfono:</strong> ${card.phone}</p>
                ${card.linkWeb ? `<p class="card__web"><a href="${card.linkWeb}" target="_blank" rel="noopener noreferrer" style="color: #0066cc; font-weight: bold; text-decoration: underline;">🔗 Visitar web oficial de turismo</a></p>` : ''}
                <button class="btn-favorito" data-title="${card.title}">⭐ Guardar Favorito</button>
            </main>
        `;
        
        cardContainer.appendChild(article);
    });

    activarEventosFavoritos();
}

function filtrarAlojamientos(categoriaBuscada) {
    if (!categoriaBuscada) {
        return CARD_DATA;
    }
    return CARD_DATA.filter(item => item.id === categoriaBuscada);
}

function activarEventosFavoritos() {
    const botones = document.querySelectorAll('.btn-favorito');
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const alojamientoTitulo = e.target.getAttribute('data-title');
            localStorage.setItem('favoritoSeleccionado', alojamientoTitulo);
            alert(`¡Guardaste "${alojamientoTitulo}" en tus favoritos!`);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    if (path.includes('cabanas.html')) {
        renderCards(filtrarAlojamientos('cabanas'));
    } else if (path.includes('casas.html')) {
        renderCards(filtrarAlojamientos('casas'));
    } else if (path.includes('complejos.html')) {
        renderCards(filtrarAlojamientos('complejos'));
    } else if (path.includes('hostels.html')) {
        renderCards(filtrarAlojamientos('hostels'));
    } else if (path.includes('informes.html')) {
        renderCards(filtrarAlojamientos('informes'));
    } else {
        renderCards(CARD_DATA);
    }
});