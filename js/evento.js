// =========================================================
// EVENTRA — DETALLE DE EVENTO (evento.html?id=…)
// Lee el id de la URL, busca ese evento y rellena la página.
//
// Requiere (en este orden): datos.js y storage.js
// =========================================================
const detalle = document.querySelector('.evento-detalle');
const errorEvento = document.querySelector('#evento-error');
// '2026-11-14' → 'sábado, 14 de noviembre de 2026'
// Se construye la fecha con año, mes y día por separado:
// new Date('2026-11-14') se interpretaría en UTC y en México
// mostraría el día anterior.
function formatearFechaLarga(fecha) {
    const [anio, mes, dia] = fecha.split('-').map(Number);
    return new Intl.DateTimeFormat('es-MX', { dateStyle: 'full' })
        .format(new Date(anio, mes - 1, dia));
}
if (detalle && errorEvento) {
    const params = new URLSearchParams(window.location.search);
    // buscarEvento convierte el id (texto) a número y busca en los
    // eventos iniciales Y en los creados por el usuario.
    // Si falta el id o no existe, devuelve undefined.
    const eventoActual = buscarEvento(params.get('id'));
    if (!eventoActual) {
        detalle.hidden = true;
        errorEvento.hidden = false;
        document.title = 'Evento no encontrado | EVENTRA';
    } else {
        detalle.hidden = false;
        errorEvento.hidden = true;
        document.title = `${eventoActual.titulo} | EVENTRA`;
        // textContent (no innerHTML): los eventos los escribe el usuario,
        // así que todo se trata como texto plano.
        const nombreCategoria = CATEGORIAS[eventoActual.categoria];
        // La etiqueta toma su color de data-categoria (igual que en las tarjetas)
        const etiquetaCategoria = document.querySelector('#evento-categoria');
        etiquetaCategoria.textContent = nombreCategoria;
        etiquetaCategoria.dataset.categoria = eventoActual.categoria;
        document.querySelector('#evento-imagen').textContent = nombreCategoria;
        document.querySelector('#evento-titulo').textContent = eventoActual.titulo;
        document.querySelector('#evento-fecha').textContent = formatearFechaLarga(eventoActual.fecha);
        document.querySelector('#evento-hora').textContent = `${eventoActual.hora} h`;
        document.querySelector('#evento-ciudad').textContent = eventoActual.ciudad;
        document.querySelector('#evento-lugar').textContent = eventoActual.lugar;
        document.querySelector('#evento-descripcion').textContent = eventoActual.descripcion;
        // OJO con el alcance: "disponibles" se declara con const DENTRO
        // de este bloque, así que solo existe aquí. Todo lo que la use
        // debe estar dentro del mismo bloque.
        const disponibles = eventoActual.cupos - eventoActual.ocupados;
        document.querySelector('#evento-cupos').textContent = disponibles;
        const btnRegistro = document.querySelector('#btn-registro');
        if (disponibles <= 0) {
            btnRegistro.disabled = true;
            btnRegistro.textContent = 'Evento lleno';
        } else {
            btnRegistro.disabled = false;
            btnRegistro.textContent = 'Registrarme';
            btnRegistro.addEventListener('click', () => {
                alert('Las inscripciones estarán disponibles próximamente.');
            });
        }
    }
}
