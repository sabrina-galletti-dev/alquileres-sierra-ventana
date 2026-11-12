# Alquileres Temporales — Sierra de la Ventana

Proyecto desarrollado como parte de las entregas del curso de Desarrollo Web y Frontend.

## 📄 Descripción y Objetivo
Sitio web interactivo y multipágina diseñado para la búsqueda, filtrado y gestión de alojamientos temporales (cabañas, casas, complejos y hostels) y guías turísticas en la localidad de Sierra de la Ventana, Provincia de Buenos Aires. Su objetivo es brindar una plataforma ágil, responsiva y orientada a la experiencia del usuario para planificar su estadía.

## 👥 Integrantes
* Sabrina Victoria Galletti Gonzalez

## 🚀 Tecnologías Utilizadas
* **HTML5:** Estructura semántica distribuida en páginas independientes con etiquetas accesibles.
* **CSS3:** Estilos personalizados mediante variables, Flexbox, CSS Grid y diseño responsivo adaptado a dispositivos móviles, tablets y escritorios.
* **JavaScript (ES6 Modules):** Manipulación del DOM, gestión de eventos, validaciones, métodos de arrays/strings y persistencia de datos mediante `localStorage`.
* **Git & GitHub:** Control de versiones y colaboración en el repositorio público.

## ⚙️ Funcionalidades del Proyecto (Evolución de Entregas)

### Pre-entrega 1: Propuesta Lógica y Funcionalidades
* **Filtrado por Categoría:** Selección en el menú para aislar alojamientos según tipología (Cabañas, Casas, Complejos, Hostels).
* **Buscador por Palabras Clave:** Búsqueda en tiempo real sobre los títulos y descripciones de las tarjetas.
* **Prototipo Lógico Base:** Estructura de datos inicial en arreglos de objetos (`CARD_DATA`) y funciones lógicas validadas.

### Pre-entrega 2: Integración con HTML y DOM
* **Renderizado Dinámico:** Las tarjetas de alojamientos se generan e insertan de forma dinámica en el DOM a partir de una fuente de datos centralizada (`src/data.js`).
* **Navegación por Rutas:** Páginas independientes interconectadas con menús semánticos estandarizados y enlaces externos seguros (`target="_blank"` con `rel="noopener noreferrer"`).
* **Gestión de Favoritos (`localStorage`):** Capacidad de guardar y persistir los alojamientos favoritos seleccionados por el usuario.
* **Validaciones y Mensajes:** Control visual en pantalla ante búsquedas sin resultados o validaciones de entradas.

## 💻 Instrucciones para Ejecutar el Proyecto Localmente
Dado que el proyecto implementa **Módulos de JavaScript (`type="module"`)**, es necesario ejecutarlo a través de un servidor local para evitar bloqueos de seguridad por políticas de CORS del navegador (`file://`).

1. Clonar el repositorio o descargar los archivos en tu computadora.
2. Abrir la carpeta del proyecto en **Visual Studio Code**.
3. Iniciar la aplicación utilizando la extensión **Live Server** (hacer clic derecho en `index.html` -> *Open with Live Server*).
4. Navegar por el sitio de forma local en tu navegador.

## 📌 Estado de las Entregas
* **Pre-entrega 1:** Completada (Propuesta de funcionalidades y prototipo lógico).
* **Pre-entrega 2:** Completada (Integración con HTML, DOM dinámico, eventos, validaciones y persistencia con `localStorage`).

## 🔗 Enlaces
* **Repositorio de GitHub:** (https://github.com/sabrina-galletti-dev/alquileres-sierra-ventana) 
