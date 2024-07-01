const readline = require('readline-sync');
const {verTareasMENU, buscarTareaMENU, agregarTareaMENU} = require('./funcionesMenu');

const tarea1 = {
    id: 1,
    titulo: 'aprender CSS',
    descripcion: 'Estoy aprendiendo CSS',
    estado: 'En Curso',
    fechaCreacion: new Date(),
    ultimaEdicion: new Date(),
    fechaVencimiento: null,
    dificultad: 'Medio',
};

const tarea2 = {
    id: 2,
    titulo: 'aprender HTML',
    descripcion: 'Estoy aprendiendo html',
    estado: 'Pendiente',
    fechaCreacion: new Date(),
    ultimaEdicion: new Date(),
    fechaVencimiento: null,
    dificultad: 'Facil',
};

let listaDeTareas = [tarea1, tarea2];

const menuPrincipal = () => {
    console.log('¿Que deseas hacer?');
    console.log('');
    console.log('[1] Ver Mis Tareas.');
    console.log('[2] Buscar una Tarea.');
    console.log('[3] Agregar una Tarea.');
    console.log('[0] Salir.');
    console.log('');

    const opcion = readline.question('> ');
    return opcion;
};

const main = () => {
    console.clear()
    let opcion = menuPrincipal();

    switch (opcion) {
        case '1':
            verTareasMENU(listaDeTareas);
            break;
        case '2':
            buscarTareaMENU(listaDeTareas);
            break;
        case '3':
            listaDeTareas = agregarTareaMENU(listaDeTareas);
            break;
        case '0':
            console.log('Hasta luego')
            return;
        default:
            console.log('Opcion invalida, intente nuevamente');
    }

    main();
};

main();
