// =========================================================
// EVENTRA — SCRIPT GLOBAL
// Lo que se necesita en TODAS las páginas: el menú móvil.
// La lógica de cada página va en su propio archivo.
// =========================================================
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuToggle && nav) {
    function setMenu(abierto) {
        nav.classList.toggle('open', abierto);
        menuToggle.setAttribute('aria-expanded', abierto);
        menuToggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
        menuToggle.textContent = abierto ? '✕' : '☰';
    }
    menuToggle.addEventListener('click', () => {
        setMenu(!nav.classList.contains('open'));
    });
    // Cerrar al elegir una opción
    nav.querySelectorAll('a').forEach((enlace) => {
        enlace.addEventListener('click', () => setMenu(false));
    });
    // Cerrar con Escape y devolver el foco al botón
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('open')) {
            setMenu(false);
            menuToggle.focus();
        }
    });
    // Si la pantalla crece, el menú debe volver a su estado normal
    window.matchMedia('(min-width: 769px)').addEventListener('change', (e) => {
        if (e.matches) setMenu(false);
    });
}
