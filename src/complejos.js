document.addEventListener("DOMContentLoaded", () => {
    const soloComplejos = alojamientos.filter(item => item.tipo === "complejos");
    renderizarLista(soloComplejos);
});