document.addEventListener("DOMContentLoaded", () => {
    // Filtramos buscando exactamente "cabañas" con la ñ
    const soloCabanas = alojamientos.filter(item => item.tipo === "cabañas");
    renderizarLista(soloCabanas);
});