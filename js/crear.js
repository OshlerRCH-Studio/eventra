// =========================================================
// EVENTRA — CREAR EVENTO (crear.html)
// Captura el formulario, valida, guarda en localStorage
// y confirma al usuario.
//
// Requiere (en este orden): datos.js y storage.js
// =========================================================
const formularioCrear = document.querySelector('#form-crear-evento');
const mensaje = document.querySelector('#mensaje-formulario');
// Fecha de hoy como 'AAAA-MM-DD' en HORA LOCAL.
// (toISOString() usa UTC y en la noche devolvería el día siguiente.)
function hoyISO() {
    const d = new Date();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mes}-${dia}`;
}
// Un solo lugar para mostrar mensajes. data-estado permite darle
// estilo distinto al error y al éxito desde el CSS.
function mostrarMensaje(texto, estado) {
    mensaje.textContent = texto;
    mensaje.dataset.estado = estado; // 'error' | 'exito'
}
if (formularioCrear && mensaje) {
    // El selector de fecha del navegador ya no deja elegir días pasados
    const campoFecha = formularioCrear.querySelector('[name="fecha"]');
    if (campoFecha) campoFecha.min = hoyISO();
    formularioCrear.addEventListener('submit', (evento) => {
        // Evitar que el navegador recargue la página
        evento.preventDefault();
        // FormData entrega TODO como texto. trim() quita espacios
        // sobrantes; Number() convierte la capacidad a número.
        const datos = new FormData(formularioCrear);
        const titulo = datos.get('titulo').trim();
        const categoria = datos.get('categoria');
        const fecha = datos.get('fecha');
        const hora = datos.get('hora');
        const ciudad = datos.get('ciudad').trim();
        const lugar = datos.get('lugar').trim();
        const descripcion = datos.get('descripcion').trim();
        const cupos = Number(datos.get('cupos'));
        // ----- Validaciones: se detiene en el primer problema -----
        // Un campo con solo espacios pasa el "required" del HTML,
        // pero después de trim() queda vacío.
        if (!titulo || !ciudad || !lugar || !descripcion) {
            mostrarMensaje('Completa todos los campos.', 'error');
            return;
        }
        if (!Object.hasOwn(CATEGORIAS, categoria)) {
            mostrarMensaje('Selecciona una categoría válida.', 'error');
            return;
        }
        if (!fechaValida(fecha)) {
            mostrarMensaje('Elige una fecha válida.', 'error');
            return;
        }
        if (fecha < hoyISO()) {
            // Las fechas AAAA-MM-DD se pueden comparar como texto
            mostrarMensaje('La fecha no puede ser anterior a hoy.', 'error');
            return;
        }
        if (!hora) {
            mostrarMensaje('Elige una hora.', 'error');
            return;
        }
        if (!Number.isInteger(cupos) || cupos < 1 || cupos > 10000) {
            mostrarMensaje('La capacidad debe estar entre 1 y 10,000.', 'error');
            return;
        }
        // ----- Guardar -----
        // guardarEvento asigna el id, pone ocupados en 0, valida de nuevo
        // y escribe en localStorage. Devuelve el evento o null.
        const guardado = guardarEvento({
            titulo,
            categoria,
            fecha,
            hora,
            ciudad,
            lugar,
            descripcion,
            cupos
        });
        if (!guardado) {
            mostrarMensaje(
                'No se pudo guardar el evento. Revisa los datos y que tu navegador permita guardar información.',
                'error'
            );
            return;
        }
        // ----- Confirmación con enlace al evento nuevo -----
        mostrarMensaje('¡Evento publicado correctamente! ', 'exito');
        const enlace = document.createElement('a');
        enlace.href = `evento.html?id=${guardado.id}`;
        enlace.className = 'text-link';
        enlace.textContent = 'Ver evento →';
        mensaje.append(enlace);
        // Limpiar el formulario
        formularioCrear.reset();
    });
}
