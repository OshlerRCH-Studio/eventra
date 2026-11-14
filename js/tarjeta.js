// =========================================================
// EVENTRA — TARJETA DE EVENTO
// Una función que recibe UN objeto de evento y devuelve el
// elemento HTML de su tarjeta. La usarán la portada, la lista
// de eventos y cualquier lugar donde se muestre un evento.
//
// Se construye con createElement + textContent (no con
// plantillas de texto) porque más adelante los eventos los
// escribirá el usuario en un formulario. textContent trata
// todo como texto plano, así que nadie puede inyectar código.
// =========================================================
const MESES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
// Crea un elemento con clase y texto opcionales
function crear(etiqueta, clase, texto) {
    const el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto) el.textContent = texto;
    return el;
}
// '2026-11-14' → { dia: 14, mes: 'NOV' }
// Se separa el texto en lugar de usar new Date('2026-11-14'),
// porque ese formato se interpreta en UTC y en México
// mostraría el día anterior.
function partesDeFecha(fecha) {
    const [anio, mes, dia] = fecha.split('-').map(Number);
    return { dia, mes: MESES[mes - 1] };
}
function lugaresDisponibles(evento) {
    return evento.cupos - evento.ocupados;
}
function textoDisponibilidad(evento) {
    const libres = lugaresDisponibles(evento);
    if (libres === 0) return 'Agotado';
    return libres === 1 ? '1 lugar disponible' : `${libres} lugares disponibles`;
}
function crearTarjeta(evento) {
    const { dia, mes } = partesDeFecha(evento.fecha);
    const libres = lugaresDisponibles(evento);
    const porcentaje = Math.round((evento.ocupados / evento.cupos) * 100);
    const tarjeta = crear('article', 'event-card');
    // Parte superior: fecha + categoría
    const arriba = crear('div', 'event-top');
    const fecha = crear('div', 'event-date');
    fecha.append(crear('strong', '', dia), crear('span', '', mes));
    const etiqueta = crear('span', 'badge', CATEGORIAS[evento.categoria]);
    etiqueta.dataset.categoria = evento.categoria;
    arriba.append(fecha, etiqueta);
    // Barra de cupos (decorativa: el texto de abajo da la información)
    const cupos = crear('div', libres === 0 ? 'capacity capacity--agotado' : 'capacity');
    const barra = crear('div', 'capacity-bar');
    barra.setAttribute('aria-hidden', 'true');
    const relleno = document.createElement('span');
    relleno.style.width = `${porcentaje}%`;
    barra.append(relleno);
    cupos.append(barra, crear('p', '', textoDisponibilidad(evento)));
    // Enlace al detalle: el id viaja en la URL
    const enlace = crear('a', 'text-link', 'Ver detalle →');
    enlace.href = `evento.html?id=${evento.id}`;
    enlace.setAttribute('aria-label', `Ver detalle de ${evento.titulo}`);
    tarjeta.append(
        arriba,
        crear('h3', '', evento.titulo),
        crear('p', 'event-meta', `${evento.ciudad} · ${evento.hora} h`),
        cupos,
        enlace
    );
    return tarjeta;
}
