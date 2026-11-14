// =========================================================
// EVENTRA — PORTADA (index.html)
// Muestra los 3 eventos más solicitados: los que tienen mayor
// porcentaje de lugares ocupados.
// Requiere (en este orden): datos.js, storage.js y tarjeta.js
// =========================================================
const contenedorDestacados = document.querySelector('#eventos-destacados');
if (contenedorDestacados) {
    // obtenerEventos() ya devuelve un arreglo NUEVO (iniciales + creados),
    // así que sort() no altera los datos originales.
    const masSolicitados = obtenerEventos()
        .sort((a, b) => b.ocupados / b.cupos - a.ocupados / a.cupos)
        .slice(0, 3);
    masSolicitados.forEach((evento) => {
        contenedorDestacados.appendChild(crearTarjeta(evento));
    });
}
