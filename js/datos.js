// =========================================================
// EVENTRA — DATOS
// Esta es la "base de datos" de la aplicación: un arreglo de
// objetos. La interfaz NO tiene eventos escritos a mano;
// todo lo que se ve sale de aquí.
//
// Reglas de cada evento:
//   id          número único (sirve para evento.html?id=…)
//   categoria   debe existir en CATEGORIAS
//   fecha       formato 'AAAA-MM-DD' (así se ordena como texto)
//   hora        formato 'HH:MM'
//   cupos       lugares totales
//   ocupados    lugares ya reservados (nunca mayor que cupos)
// =========================================================
// Clave técnica → nombre que se muestra al usuario
const CATEGORIAS = {
    tecnologia: 'Tecnología',
    musica: 'Música',
    deporte: 'Deporte',
    gastronomia: 'Gastronomía',
    negocios: 'Negocios',
    cultura: 'Cultura'
};
const EVENTOS = [
    {
        id: 1,
        titulo: 'Taller de desarrollo web desde cero',
        categoria: 'tecnologia',
        fecha: '2026-11-14',
        hora: '10:00',
        ciudad: 'Puebla',
        lugar: 'Hub Tecnológico Centro',
        descripcion: 'Una jornada práctica para construir tu primera página con HTML, CSS y JavaScript. No necesitas experiencia previa; solo traer tu laptop.',
        cupos: 40,
        ocupados: 12
    },
    {
        id: 2,
        titulo: 'Noche de jazz en vivo',
        categoria: 'musica',
        fecha: '2026-11-21',
        hora: '20:00',
        ciudad: 'Ciudad de México',
        lugar: 'Foro Roma',
        descripcion: 'Un cuarteto local interpreta clásicos y composiciones propias en un ambiente íntimo, con barra de cocteles y cocina abierta.',
        cupos: 90,
        ocupados: 78
    },
    {
        id: 3,
        titulo: 'Festival de cocina regional',
        categoria: 'gastronomia',
        fecha: '2026-11-28',
        hora: '13:00',
        ciudad: 'Oaxaca',
        lugar: 'Plaza de la Cantera',
        descripcion: 'Cocineras y cocineros de distintas comunidades preparan platillos tradicionales. Incluye degustación y demostraciones en vivo.',
        cupos: 120,
        ocupados: 96
    },
    {
        id: 4,
        titulo: 'Carrera 10K de la ciudad',
        categoria: 'deporte',
        fecha: '2026-11-08',
        hora: '07:00',
        ciudad: 'Guadalajara',
        lugar: 'Parque Alameda',
        descripcion: 'Recorrido urbano de 10 kilómetros para corredores de todos los niveles. El registro incluye playera, medalla e hidratación en ruta.',
        cupos: 300,
        ocupados: 212
    },
    {
        id: 5,
        titulo: 'Conferencia de emprendimiento',
        categoria: 'negocios',
        fecha: '2026-12-03',
        hora: '09:00',
        ciudad: 'Monterrey',
        lugar: 'Centro de Convenciones Norte',
        descripcion: 'Fundadoras y fundadores comparten cómo validaron su idea, consiguieron clientes y superaron sus primeros errores.',
        cupos: 200,
        ocupados: 145
    },
    {
        id: 6,
        titulo: 'Exposición de arte contemporáneo',
        categoria: 'cultura',
        fecha: '2026-11-18',
        hora: '11:00',
        ciudad: 'Querétaro',
        lugar: 'Galería Cantera',
        descripcion: 'Obra reciente de once artistas emergentes en pintura, escultura e instalación. Incluye visita guiada con las y los creadores.',
        cupos: 60,
        ocupados: 22
    },
    {
        id: 7,
        titulo: 'Introducción a la inteligencia artificial',
        categoria: 'tecnologia',
        fecha: '2026-12-05',
        hora: '16:00',
        ciudad: 'Ciudad de México',
        lugar: 'Aula Digital Reforma',
        descripcion: 'Qué es y qué no es la inteligencia artificial, con ejemplos cotidianos y una práctica guiada. Pensado para público general.',
        cupos: 50,
        ocupados: 50
    },
    {
        id: 8,
        titulo: 'Festival de música electrónica',
        categoria: 'musica',
        fecha: '2026-12-12',
        hora: '21:00',
        ciudad: 'Guadalajara',
        lugar: 'Foro Open Air',
        descripcion: 'Una noche con cinco artistas, escenario al aire libre y visuales en pantalla gigante. Zona de comida y área de descanso.',
        cupos: 500,
        ocupados: 340
    },
    {
        id: 9,
        titulo: 'Torneo de pádel amateur',
        categoria: 'deporte',
        fecha: '2026-11-22',
        hora: '09:00',
        ciudad: 'Querétaro',
        lugar: 'Club Los Arcos',
        descripcion: 'Torneo por parejas con categorías mixta y varonil. Partidos de 40 minutos y premios para las tres primeras parejas.',
        cupos: 32,
        ocupados: 20
    },
    {
        id: 10,
        titulo: 'Cata de café de especialidad',
        categoria: 'gastronomia',
        fecha: '2026-11-15',
        hora: '12:00',
        ciudad: 'Puebla',
        lugar: 'Café Sala',
        descripcion: 'Aprende a distinguir aromas y notas en cinco cafés de distintas regiones, guiado por una barista certificada.',
        cupos: 25,
        ocupados: 19
    },
    {
        id: 11,
        titulo: 'Networking para startups',
        categoria: 'negocios',
        fecha: '2026-12-10',
        hora: '18:30',
        ciudad: 'Ciudad de México',
        lugar: 'Coworking Polanco',
        descripcion: 'Encuentro informal para conocer a otras personas que están construyendo un proyecto: inversión, talento y alianzas.',
        cupos: 80,
        ocupados: 41
    },
    {
        id: 12,
        titulo: 'Noche de teatro y poesía',
        categoria: 'cultura',
        fecha: '2026-12-18',
        hora: '19:30',
        ciudad: 'Oaxaca',
        lugar: 'Teatro de la Ciudad',
        descripcion: 'Dos obras cortas y una lectura de poesía a cargo de colectivos locales. Cupo limitado y entrada con boleto numerado.',
        cupos: 150,
        ocupados: 60
    }
];
