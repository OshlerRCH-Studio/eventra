// =========================================================
// EVENTRA — ALMACENAMIENTO (localStorage)
//
// Hay DOS fuentes de eventos:
//   1. EVENTOS (datos.js)    → los 12 iniciales. Nunca se modifican.
//   2. localStorage          → los que el usuario crea en este navegador.
//
// Todas las páginas deben pedir los eventos con obtenerEventos(),
// que une ambas fuentes. Así un evento creado en crear.html aparece
// también en la portada, en la lista y en su página de detalle.
//
// Carga requerida: datos.js ANTES que este archivo.
// =========================================================
const CLAVE_STORAGE = 'eventra:eventos-creados';
// ---------------------------------------------------------
// Validación
// Lo que sale de localStorage NO es de fiar: el usuario puede
// editarlo desde las herramientas del navegador, otro programa
// pudo escribir en la misma clave, o los datos pudieron dañarse.
// Antes de usar un evento guardado comprobamos que tenga la forma
// correcta; si no, se ignora en lugar de romper la página.
// ---------------------------------------------------------
// '2026-02-31' cumple el formato pero no existe. Se comprueba
// construyendo la fecha y verificando que no se "corrigió" sola.
function fechaValida(texto) {
    if (typeof texto !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(texto)) return false;
    const [anio, mes, dia] = texto.split('-').map(Number);
    const fecha = new Date(anio, mes - 1, dia);
    return (
        fecha.getFullYear() === anio &&
        fecha.getMonth() === mes - 1 &&
        fecha.getDate() === dia
    );
}
function textoNoVacio(valor) {
    return typeof valor === 'string' && valor.trim() !== '';
}
function esEventoValido(e) {
    return (
        e !== null &&
        typeof e === 'object' &&
        Number.isInteger(e.id) && e.id > 0 &&
        textoNoVacio(e.titulo) &&
        Object.hasOwn(CATEGORIAS, e.categoria) &&
        fechaValida(e.fecha) &&
        typeof e.hora === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(e.hora) &&
        textoNoVacio(e.ciudad) &&
        textoNoVacio(e.lugar) &&
        textoNoVacio(e.descripcion) &&
        Number.isInteger(e.cupos) && e.cupos > 0 &&
        Number.isInteger(e.ocupados) && e.ocupados >= 0 && e.ocupados <= e.cupos
    );
}
// ---------------------------------------------------------
// Leer y escribir
// try/catch porque localStorage puede lanzar errores: modo
// privado en algunos navegadores, almacenamiento bloqueado por
// el usuario, cuota llena, o JSON dañado.
// ---------------------------------------------------------
function leerEventosCreados() {
    try {
        const texto = localStorage.getItem(CLAVE_STORAGE);
        if (texto === null) return [];           // todavía no hay nada guardado
        const datos = JSON.parse(texto);         // de texto a objetos
        if (!Array.isArray(datos)) return [];
        return datos.filter(esEventoValido);
    } catch (error) {
        return [];                               // ante la duda: solo los iniciales
    }
}
function escribirEventosCreados(lista) {
    try {
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista)); // de objetos a texto
        return true;
    } catch (error) {
        return false;
    }
}
// ---------------------------------------------------------
// API pública: lo único que usan las páginas
// ---------------------------------------------------------
// Devuelve un arreglo NUEVO cada vez, así que es seguro ordenarlo.
function obtenerEventos() {
    return [...EVENTOS, ...leerEventosCreados()];
}
// El id de la URL llega como texto ("7"); aquí se compara como número.
function buscarEvento(id) {
    const numero = Number(id);
    return obtenerEventos().find((evento) => evento.id === numero);
}
function siguienteId() {
    return Math.max(0, ...obtenerEventos().map((evento) => evento.id)) + 1;
}
// Recibe los datos del formulario (SIN id ni ocupados).
// Devuelve el evento guardado, o null si los datos no son válidos
// o el navegador no permitió guardar.
//
// Ojo: FormData entrega TODO como texto. Quien llame a esta función
// debe convertir con Number() los campos cupos antes de pasarlos;
// si no, la validación los rechazará.
function guardarEvento(datos) {
    const evento = { ...datos, id: siguienteId(), ocupados: 0 };
    if (!esEventoValido(evento)) return null;
    const creados = leerEventosCreados();
    creados.push(evento);
    return escribirEventosCreados(creados) ? evento : null;
}
// Ayuda para pruebas: borra solo los eventos creados por el usuario.
function borrarEventosCreados() {
    try {
        localStorage.removeItem(CLAVE_STORAGE);
        return true;
    } catch (error) {
        return false;
    }
}
