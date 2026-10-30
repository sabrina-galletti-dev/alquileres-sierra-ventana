// Array de objetos con los alojamientos
const alojamientos = [
    {
        id: 1,
        nombre: "Cabañas Aguaribay",
        tipo: "cabañas", // <-- ¡Acá va con ñ!
        precio: 45000,
        descripcion: "Hermosas cabañas rodeadas de naturaleza y tranquilidad.",
        imagen: "images/aguaribay.jpg"
    },
    {
        id: 2,
        nombre: "Complejo Serrano",
        tipo: "complejos",
        precio: 60000,
        descripcion: "Complejo con pileta y vistas panorámicas a las sierras.",
        imagen: "images/complejo.jpg"
    },
    {
        id: 3,
        nombre: "Casa de las Sierras",
        tipo: "casas",
        precio: 80000,
        descripcion: "Amplia casa equipada para toda la familia.",
        imagen: "images/casa.jpg"
    },
    {
        id: 4,
        nombre: "Hostel Ventana",
        tipo: "hostels",
        precio: 25000,
        descripcion: "Ambiente cálido, habitaciones compartidas y privadas.",
        imagen: "images/hostel.jpg"
    }
];

// Función reutilizable para renderizar tarjetas en el DOM
function renderizarLista(lista) {
    const contenedor = document.querySelector("#js_cardsContainer");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = "<p>No hay alojamientos disponibles en esta categoría por el momento.</p>";
        return;
    }

    lista.forEach(alojamiento => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card");
        
        tarjeta.innerHTML = `
            <img src="${alojamiento.imagen}" alt="${alojamiento.nombre}" class="card__img">
            <div class="card__content">
                <h3>${alojamiento.nombre}</h3>
                <p>${alojamiento.descripcion}</p>
                <p class="card__price">Precio por noche: $${alojamiento.precio}</p>
                <button class="card__btn" data-id="${alojamiento.id}">Guardar en Favoritos ⭐</button>
            </div>
        `;

        contenedor.appendChild(tarjeta);
    });

    activarBotonesFavoritos();
}

// Función con Eventos y localStorage
function activarBotonesFavoritos() {
    const botones = document.querySelectorAll(".card__btn");

    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const idAlojamiento = e.target.getAttribute("data-id");
            const seleccionado = alojamientos.find(item => item.id == idAlojamiento);

            let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
            const yaExiste = favoritos.some(item => item.id == idAlojamiento);

            if (!yaExiste) {
                favoritos.push(seleccionado);
                localStorage.setItem("favoritos", JSON.stringify(favoritos));
                alert(`¡Guardaste "${seleccionado.nombre}" en tus favoritos!`);
            } else {
                alert(`"${seleccionado.nombre}" ya se encontraba en tus favoritos.`);
            }
        });
    });
}