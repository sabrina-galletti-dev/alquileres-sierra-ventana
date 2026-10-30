document.addEventListener("DOMContentLoaded", () => {
    const soloCasas = alojamientos.filter(item => item.tipo === "casas");
    renderizarLista(soloCasas);
});