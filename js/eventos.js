// =========================================================
// EVENTRA — LISTA DE EVENTOS (eventos.html)
// Busca, filtra y ordena. El ciclo de TODA aplicación dinámica:
//
//   1. El usuario hace algo (escribe, elige una opción)
//   2. Leemos qué quiere (los valores de los controles)
//   3. Calculamos la lista resultante (filtrar + ordenar)
//   4. Volvemos a pintar la pantalla
//
// Requiere (en este orden): datos.js, storage.js y tarjeta.js
// =========================================================
const formulario = document.querySelector('#filtros');
if (formulario) {
    const campoBusqueda = document.querySelector('#busqueda');
    const campoCategoria = document.querySelector('#categoria');
    const campoCiudad = document.querySelector('#ciudad');
    const campoOrden = document.querySelector('#orden');
    const botonLimpiar = document.querySelector('#limpiar');
    const lista = document.querySelector('#lista-eventos');
    // Se leen UNA vez al cargar (los creados vienen de localStorage):
    // después se filtra sobre esta lista cuantas veces haga falta.
    const todosLosEventos = obtenerEventos();
    const contador = document.querySelector('#contador');
    const sinResultados = document.querySelector('#sin-resultados');
    // ---------------------------------------------------------
    // Utilidades
    // ---------------------------------------------------------
    // Quita acentos y mayúsculas: "Música" y "musica" deben coincidir.
    // normalize('NFD') separa la letra de su acento y la expresión
    // regular borra los acentos sueltos.
    function normalizar(texto) {
        return texto
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .toLowerCase()
            .trim();
    }
    // ---------------------------------------------------------
    // Paso 0: llenar los menús desde los datos
    // Si se agrega un evento en una ciudad nueva (en datos.js o desde
    // crear.html), la ciudad aparece sola en el filtro: no hay que
    // tocar el HTML.
    // ---------------------------------------------------------
    function llenarOpciones() {
        Object.entries(CATEGORIAS).forEach(([clave, nombre]) => {
            const opcion = new Option(nombre, clave);
            campoCategoria.add(opcion);
        });
        // Set elimina repetidos: 12 eventos pero solo 6 ciudades distintas
        const ciudades = [...new Set(todosLosEventos.map((e) => e.ciudad))]
            .sort((a, b) => a.localeCompare(b, 'es'));
        ciudades.forEach((ciudad) => {
            campoCiudad.add(new Option(ciudad, ciudad));
        });
    }
    // ---------------------------------------------------------
    // Paso 2: leer lo que el usuario eligió
    // Los controles son la única fuente de verdad.
    // ---------------------------------------------------------
    function leerFiltros() {
        return {
            texto: normalizar(campoBusqueda.value),
            categoria: campoCategoria.value,
            ciudad: campoCiudad.value,
            orden: campoOrden.value
        };
    }
    // ---------------------------------------------------------
    // Paso 3: calcular la lista
    // ---------------------------------------------------------
    function filtrarEventos(eventos, filtros) {
        return eventos.filter((evento) => {
            const coincideTexto =
                filtros.texto === '' ||
                normalizar(`${evento.titulo} ${evento.lugar}`).includes(filtros.texto);
            const coincideCategoria =
                filtros.categoria === 'todas' || evento.categoria === filtros.categoria;
            const coincideCiudad =
                filtros.ciudad === 'todas' || evento.ciudad === filtros.ciudad;
            // El evento se muestra solo si cumple LAS TRES condiciones
            return coincideTexto && coincideCategoria && coincideCiudad;
        });
    }
    // filter() ya devuelve un arreglo NUEVO, así que aquí sí es seguro
    // llamar a sort() directamente (en la portada tuvimos que copiar).
    function ordenarEventos(eventos, orden) {
        switch (orden) {
            case 'fecha-desc':
                return eventos.sort((a, b) => b.fecha.localeCompare(a.fecha));
            case 'lugares':
                return eventos.sort(
                    (a, b) => lugaresDisponibles(b) - lugaresDisponibles(a)
                );
            case 'nombre':
                return eventos.sort((a, b) => a.titulo.localeCompare(b.titulo, 'es'));
            default: // 'fecha-asc'
                return eventos.sort((a, b) => a.fecha.localeCompare(b.fecha));
        }
    }
    // ---------------------------------------------------------
    // Paso 4: pintar
    // ---------------------------------------------------------
    function pintar(eventos) {
        // replaceChildren() vacía la lista antes de volver a llenarla.
        // Sin esto, las tarjetas se irían acumulando.
        lista.replaceChildren(...eventos.map(crearTarjeta));
        const n = eventos.length;
        contador.textContent = n === 1 ? '1 evento encontrado' : `${n} eventos encontrados`;
        sinResultados.hidden = n !== 0;
    }
    // Las 3 funciones juntas: leer → calcular → pintar
    function actualizar() {
        const filtros = leerFiltros();
        const resultado = ordenarEventos(filtrarEventos(todosLosEventos, filtros), filtros.orden);
        pintar(resultado);
    }
    // ---------------------------------------------------------
    // Paso 1: escuchar al usuario
    // 'input' se dispara con cada tecla; 'change' al elegir una opción.
    // ---------------------------------------------------------
    campoBusqueda.addEventListener('input', actualizar);
    campoCategoria.addEventListener('change', actualizar);
    campoCiudad.addEventListener('change', actualizar);
    campoOrden.addEventListener('change', actualizar);
    function limpiar() {
        formulario.reset();   // devuelve cada control a su valor inicial
        actualizar();
        campoBusqueda.focus();
    }
    botonLimpiar.addEventListener('click', limpiar);
    document.querySelector('#limpiar-vacio').addEventListener('click', limpiar);
    // Sin esto, pulsar Enter en el buscador enviaría el formulario
    // y la página se recargaría, perdiendo los filtros.
    formulario.addEventListener('submit', (e) => e.preventDefault());
    // Arranque
    llenarOpciones();
    actualizar();
}
