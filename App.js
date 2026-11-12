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
        

        const finalImageSrc = imagePathPrefix + card.image;

        article.innerHTML = `
            <header class="card__header">
                <figure class="card__header--avatar">
                    <img class="card__header--avatar--img"
                        src="${finalImageSrc}"
                        alt="${card.alttext}">
                </figure>
            </header>
            <div class="card__body">
                <span class="card__category" style="display: block; font-size: 0.85rem; text-transform: uppercase; color: #666; margin-bottom: 4px; font-weight: 600;">${card.category}</span>
                <h3>${card.title}</h3>
                <p>${card.paragraph}</p>
                <p class="card__direction">📍 <strong>Dirección:</strong> ${card.direction}</p>
                <p class="card__phone">📞 <strong>Teléfono:</strong> ${card.phone}</p>
                ${card.linkWeb ? `<p class="card__web"><a href="${card.linkWeb}" target="_blank" rel="noopener noreferrer" style="color: #0066cc; font-weight: bold; text-decoration: underline;">🔗 Ver todos los alquileres temporales de Informe Turístico</a></p>` : ''}
                <button class="btn-favorito" data-title="${card.title}">⭐ Guardar Favorito</button>
            </div>
        `;
        
        cardContainer.appendChild(article);
    });

    activarEventosFavoritos();
}

function filtrarAlojamientos(categoriaBuscada) {
    if (!categoriaBuscada) {
        return CARD_DATA;
    }
    const normalizar = (texto) => texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    
    const busquedaLimpia = normalizar(categoriaBuscada);

    return CARD_DATA.filter(item => {
        const categoriaLimpia = normalizar(item.category);
        return categoriaLimpia.includes(busquedaLimpia) || busquedaLimpia.includes(categoriaLimpia);
    });
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

// Búsqueda por palabras clave totalmente opcional y fluida
const searchInput = document.getElementById('js_searchInput');
const searchMessage = document.getElementById('js_searchMessage');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const textoBusqueda = e.target.value.trim().toLowerCase();
        
        // Si está vacío, muestra todo normalmente
        if (textoBusqueda === "") {
            searchMessage.textContent = ""; // O un texto guía sutil si querés
            renderCards(CARD_DATA);
        } 
        // Si escribe algo (1 letra o más), filtra al instante
        else {
            const resultados = CARD_DATA.filter(item => 
                item.title.toLowerCase().includes(textoBusqueda) ||
                item.paragraph.toLowerCase().includes(textoBusqueda) ||
                item.category.toLowerCase().includes(textoBusqueda)
            );

            if (resultados.length === 0) {
                searchMessage.textContent = `No se encontraron alojamientos para "${textoBusqueda}".`;
                renderCards([]); 
            } else {
                searchMessage.textContent = `Se encontraron ${resultados.length} resultado(s):`;
                renderCards(resultados);
            }
        }
    });
}