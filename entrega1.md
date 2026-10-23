# Pre-entrega 1: Propuesta de Funcionalidades y Prototipo Lógico
**Proyecto:** Alquileres Temporales - Sierra de la Ventana  

---

## 1. Propuesta de Funcionalidades

### Funcionalidad 1: Filtrado de alojamientos por categoría
* **Qué hace el usuario:** Selecciona una opción en el menú superior (Complejos, Cabañas, Casas, Hostels) para ver solo los alojamientos de su interés.
* **Cómo funciona:** A través de JavaScript, se recorre el listado de tarjetas y se filtran según la categoría elegida para mostrar únicamente las que coinciden en la pantalla.

### Funcionalidad 2: Buscador por palabras clave
* **Qué hace el usuario:** Escribe un término (por ejemplo, "pileta", "parque", "madera") para encontrar alojamientos específicos.
* **Cómo funciona:** El sistema toma el texto ingresado, lo pasa a minúsculas y busca coincidencias dentro de los títulos y descripciones de las tarjetas para mostrar los resultados correctos.

### Funcionalidad 3: Simulador de presupuesto de estadía
* **Qué hace el usuario:** Ingresa la cantidad de días que se quiere hospedar.
* **Cómo funciona:** El sistema valida que el número sea mayor a cero, realiza el cálculo multiplicando las noches por la tarifa diaria de cada lugar y devuelve el costo total estimado.

---

## 2. Prototipo Lógico (JavaScript)

```javascript
// Array con los objetos de los alojamientos
const CARD_DATA = [
    { id: "complejos", category: "Complejo", title: "Complejo Nagahuel", paragraph: "Servicios integrales, pileta y grandes parques para familias.", precioNoche: 15000 },
    { id: "cabanas", category: "Cabaña", title: "Cabañas Aguaribay", paragraph: "Alojamiento de madera y piedra inmersas en el paisaje serrano.", precioNoche: 12000 },
    { id: "casas", category: "Casa", title: "Casa Luna de Abril", paragraph: "Propiedades equipadas con parque y parrilla.", precioNoche: 18000 },
    { id: "hostels", category: "Hostel", title: "Hostel Punto Cadia", paragraph: "Ambiente cálido y compartido ideal para viajeros.", precioNoche: 8000 }
];

// Función 1: Filtrar por categoría
function filtrarPorCategoria(categoria) {
    if (!categoria) {
        console.warn("⚠️ Ingresá una categoría válida.");
        return [];
    }
    return CARD_DATA.filter(card => card.category.toLowerCase() === categoria.toLowerCase());
}

// Función 2: Buscar por término
function buscarAlojamiento(termino) {
    if (!termino || termino.trim() === "") {
        console.error("❌ El campo de búsqueda está vacío.");
        return [];
    }
    
    const textoBuscado = termino.toLowerCase().trim();
    return CARD_DATA.filter(card => 
        card.title.toLowerCase().includes(textoBuscado) || 
        card.paragraph.toLowerCase().includes(textoBuscado)
    );
}

// Función 3: Calcular presupuesto
function calcularPresupuesto(noches, tarifaDiaria) {
    if (noches <= 0 || isNaN(noches)) {
        console.error("❌ La cantidad de noches debe ser mayor a 0.");
        return null;
    }
    return noches * tarifaDiaria;
}

// Ciclo para recorrer y mostrar los datos en consola
console.log("--- LISTADO DE ALOJAMIENTOS ---");
for (let i = 0; i < CARD_DATA.length; i++) {
    console.log(`${i + 1}. ${CARD_DATA[i].title} (${CARD_DATA[i].category})`);
}

// Casos de prueba
console.log("\n--- CASOS DE PRUEBA ---");
console.log("Prueba 1 (Filtrar Cabañas):", filtrarPorCategoria("Cabaña"));
console.log("Prueba 2 (Buscar 'pileta'):", buscarAlojamiento("pileta"));
console.log("Prueba 3 (Búsqueda vacía):", buscarAlojamiento(""));