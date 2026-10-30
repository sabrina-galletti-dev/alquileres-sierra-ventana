document.addEventListener("DOMContentLoaded", () => {
    const soloHostels = alojamientos.filter(item => item.tipo === "hostels");
    renderizarLista(soloHostels);
});