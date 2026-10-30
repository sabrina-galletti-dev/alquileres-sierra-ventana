// Función 1: Renderizar tarjetas dinámicamente en el DOM (Requisito: Función + Ciclo + Métodos)
function renderCards(dataToRender) {
    const cardContainer = document.getElementById('js_cardsContainer');
    
    // Condicional 1: Verificar que el contenedor exista
    if (!cardContainer) return;

    cardContainer.innerHTML = ""; // Limpiar contenedor

    // Detectar rutas de imágenes según estemos en raíz o en /pages/
    const isInPages = window.location.pathname.includes('/pages/');
    const imagePathPrefix = isInPages ? '../' : './';

    // Ciclo (forEach) para recorrer el array
    dataToRender.forEach(card => {
        const article = document.createElement('article');
        article.classList.add('card');
        article.id = card.id;
        
        const finalImageSrc = imagePathPrefix + card.image;

        article.innerHTML = `
            <header class="card__header">
                <figure class="card__header--avatar">
                    <img class="card__header--avatar--img"
                        height="185px" width="297px"
                        src="${finalImageSrc}"
                        alt="${card.alttext}">
                </figure>
            </header>
            <main>
                <span class="card__category" style="display: block; font-size: 0.85rem; text-transform: uppercase; color: #666; margin-bottom: 4px; font-weight: 600;">${card.category}</span>
                <h3>${card.title}</h3>
                <p>${card.paragraph}</p>
                <button class="btn-favorito" data-title="${card.title}">⭐ Guardar Favorito</button>
            </main>
        `;
        
        cardContainer.appendChild(article);
    });

    activarEventosFavoritos();
}

// Función 2: Filtrar datos por categoría usando métodos de arrays (filter)
function filtrarAlojamientos(categoriaBuscada) {
    // Condicional 2: Si no se pasa categoría, devuelve todo
    if (!categoriaBuscada) {
        return CARD_DATA;
    }
    return CARD_DATA.filter(item => item.id === categoriaBuscada);
}

// Función 3: Manejo de localStorage y eventos de usuario
function activarEventosFavoritos() {
    const botones = document.querySelectorAll('.btn-favorito');
    
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const alojamientoTitulo = e.target.getAttribute('data-title');
            
            // Persistencia con localStorage (Requisito clave)
            localStorage.setItem('favoritoSeleccionado', alojamientoTitulo);
            
            alert(`¡Guardaste "${alojamientoTitulo}" en tus favoritos (localStorage)!`);
        });
    });
}

// Ejecución inicial al cargar la página
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
    } else {
        renderCards(CARD_DATA);
    }

    // Recuperar datos de localStorage al iniciar
    const favoritoGuardado = localStorage.getItem('favoritoSeleccionado');
    if (favoritoGuardado) {
        console.log(`Último alojamiento favorito guardado: ${favoritoGuardado}`);
    }
});