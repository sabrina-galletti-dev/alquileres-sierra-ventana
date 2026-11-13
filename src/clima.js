"use strict";

// Coordenadas reales de Sierra de la Ventana, Buenos Aires
const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=-38.13&longitude=-61.79" +
  "&current=temperature_2m,weather_code" +
  "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max" +
  "&timezone=America/Argentina/Buenos_Aires";

const REQUEST_TIMEOUT_MS = 10000;
const MAX_RAIN_PROB = 40; // % Umbral de alerta de lluvia

const WEATHER_CODES = {
  0: ["☀️", "Despejado"],
  1: ["🌤️", "Mayormente despejado"],
  2: ["⛅", "Parcialmente nublado"],
  3: ["☁️", "Nublado"],
  45: ["🌫️", "Niebla"],
  48: ["🌫️", "Niebla con escarcha"],
  51: ["🌦️", "Llovizna leve"],
  53: ["🌦️", "Llovizna"],
  55: ["🌧️", "Llovizna intensa"],
  61: ["🌧️", "Lluvia leve"],
  63: ["🌧️", "Lluvia"],
  65: ["🌧️", "Lluvia intensa"],
  71: ["❄️", "Nieve leve"],
  73: ["❄️", "Nieve"],
  75: ["❄️", "Nieve intensa"],
  80: ["🌦️", "Chaparrones leves"],
  81: ["🌧️", "Chaparrones"],
  82: ["⛈️", "Chaparrones fuertes"],
  95: ["⛈️", "Tormenta"],
  96: ["⛈️", "Tormenta con granizo"]
};

export async function cargarClimaSierra() {
  const contenedor = document.getElementById("clima-widget");
  if (!contenedor) return;

  // Controlador para cancelar la petición si tarda más de 10 segundos
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const respuesta = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    // Ausencia de resultados
    if (!datos.current || !datos.daily) {
      contenedor.innerHTML = `<p class="clima__mensaje clima__mensaje--error">No hay datos meteorológicos disponibles en este momento.</p>`;
      return;
    }

    // Extraemos y redondeamos temperaturas
    const tempActual = Math.round(datos.current.temperature_2m);
    const tempMax = Math.round(datos.daily.temperature_2m_max[0]);
    const tempMin = Math.round(datos.daily.temperature_2m_min[0]);
    const probLluvia = datos.daily.precipitation_probability_max[0];
    const codigoClima = datos.current.weather_code;

    // Buscamos ícono y descripción en el diccionario
    const [icono, descripcion] = WEATHER_CODES[codigoClima] || ["🌡️", "Clima variable"];

    // Modificador BEM según el umbral MAX_RAIN_PROB
    const avisoLluvia =
      probLluvia >= MAX_RAIN_PROB
        ? `<span class="clima__dato clima__dato--alerta">☔ Prob. de lluvia: ${probLluvia}% (llevá piloto)</span>`
        : `<span class="clima__dato">Prob. de lluvia: ${probLluvia}%</span>`;

    // Renderizamos en el DOM con estructura BEM
    contenedor.innerHTML = `
      <div class="clima__info">
        <div class="clima__principal">
          <span class="clima__icono">${icono}</span>
          <div class="clima__ubicacion">
            <h3 class="clima__titulo">Sierra de la Ventana</h3>
            <p class="clima__descripcion">${descripcion}</p>
          </div>
          <span class="clima__temperatura">${tempActual}°C</span>
        </div>
        <div class="clima__detalles">
          <span class="clima__dato">Máx: <strong>${tempMax}°C</strong></span>
          <span class="clima__dato">Mín: <strong>${tempMin}°C</strong></span>
          ${avisoLluvia}
        </div>
      </div>
    `;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Error al obtener el clima:", error);
    contenedor.innerHTML = `
      <p class="clima__mensaje clima__mensaje--error">⚠️ No se pudo conectar con el servicio meteorológico. Intentá más tarde.</p>
    `;
  }
}