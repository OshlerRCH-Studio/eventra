// =========================================================
// EVENTRA — CONTACTO (contacto.html)
// Valida el formulario y muestra un mensaje. NO envía nada:
// no hay servidor, y lo aclaramos al usuario en la pantalla.
// =========================================================
const formularioContacto = document.querySelector('#form-contacto');
const estadoContacto = document.querySelector('#mensaje-contacto');
// Un solo lugar para mostrar mensajes. data-estado permite que el CSS
// pinte distinto el error y el éxito.
function mostrarEstadoContacto(texto, estado) {
    estadoContacto.textContent = texto;
    estadoContacto.dataset.estado = estado; // 'error' | 'exito'
}
if (formularioContacto && estadoContacto) {
    formularioContacto.addEventListener('submit', (evento) => {
        // Evitar que el navegador recargue la página
        evento.preventDefault();
        const datos = new FormData(formularioContacto);
        const nombre = datos.get('nombre').trim();
        const correo = datos.get('correo').trim();
        const asunto = datos.get('asunto').trim();
        const mensaje = datos.get('mensaje').trim();
        // Forma mínima de un correo: algo@algo.algo, sin espacios.
        // No pretende validar que el correo exista, solo que parezca uno.
        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
        // Cada validación muestra su mensaje y lleva el foco al campo
        // con el problema: quien usa teclado o lector de pantalla
        // llega justo donde debe corregir.
        function rechazar(texto, idCampo) {
            mostrarEstadoContacto(texto, 'error');
            formularioContacto.querySelector(`#${idCampo}`).focus();
        }
        if (!nombre) return rechazar('Escribe tu nombre.', 'nombre');
        if (!correoValido) return rechazar('Escribe un correo electrónico válido.', 'correo');
        if (!asunto) return rechazar('Escribe un asunto.', 'asunto');
        if (mensaje.length < 10) {
            return rechazar('El mensaje debe tener al menos 10 caracteres.', 'mensaje');
        }
        // textContent: el nombre lo escribió el usuario, se trata como texto.
        mostrarEstadoContacto(
            `Gracias, ${nombre}. Esto es una demostración: tu mensaje no se envió a ningún servidor.`,
            'exito'
        );
        formularioContacto.reset();
    });
}
