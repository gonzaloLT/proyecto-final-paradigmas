const readline = require('readline-sync');
const { crearTarea, mostrarDetallesTarea, cambiarDescripcion, cambiarEstado, cambiarDificultad, cambiarVencimiento} = require('./tarea');
const { agregarTarea, buscarPorTitulo, mostrarListadoTareas, obtenerTareasPorEstado} = require('./manejadorListaTareas');
const {esFechaValida} = require('./utils')

const verTareasMENU = (listaDeTareas) => {
    console.clear();
    console.log('¿Que tareas deseas ver?');
    console.log('');
    console.log('[1] Todas');
    console.log('[2] Pendientes');
    console.log('[3] En curso');
    console.log('[4] Terminadas');
    console.log('[0] Volver');
    console.log('');

    const opcion = readline.question('> ');

    switch (opcion) {
        case '1':
            console.clear();
            if (listaDeTareas.length === 0) {
                console.log('No hay tareas');
            } else {
                console.log('Estas son todas tus tareas');
                console.log('');
                mostrarListadoTareas(listaDeTareas);
                gestionarDetallesTarea(listaDeTareas);
                readline.question('Presiona cualquier tecla para continuar...')
            }

            break;
        case '2':
            mostrarTareasPorEstado(listaDeTareas, 'Pendiente');
            readline.question('Presiona cualquier tecla para continuar...')
            break;
        case '3':
            mostrarTareasPorEstado(listaDeTareas, 'En curso');
            readline.question('Presiona cualquier tecla para continuar...')
            break;
        case '4':
            mostrarTareasPorEstado(listaDeTareas, 'Terminada');
            readline.question('Presiona cualquier tecla para continuar...')
            break;
        case '0':
            return;
        default:
            console.log('Respuesta no valida');
    }
};

const buscarTareaMENU = (listaDeTareas) => {
    console.clear();
    console.log('Introduce el titulo de una tarea para buscarla: ')
    const titulo = readline.question('> ');
    console.log('');
    const resultados = buscarPorTitulo(listaDeTareas, titulo);

    if (resultados.length === 0) {
        console.log('No hay tareas relacionadas con la busqueda. ');
    } else {
        console.log('Estas son las tareas relacionadas');
        console.log('');
        mostrarListadoTareas(resultados);
        gestionarDetallesTarea(listaDeTareas, resultados);
    }
    readline.question('Presiona cualquier tecla para continuar...')
};

const agregarTareaMENU = (listaDeTareas) => {
    console.clear();
    console.log('Vamos a agregar una tarea');
    const titulo = readline.question('Titulo: ');
    const descripcion = readline.question('Descripcion: ');
    const estado = readline.question('Estado (pendiente, en curso, terminada, cancelada): ').toLowerCase();
    const dificultad = readline.question('Dificultad (facil, medio, dificil): ').toLowerCase();
    const vencimiento = readline.question('Fecha de vencimiento (YYYY-MM-DD): ');

    let fechaVencimiento = null;
    if (vencimiento && esFechaValida(vencimiento)) {
        fechaVencimiento = vencimiento;
    } else if (vencimiento) {
        console.log('Fecha no valida, se dejara en blanco.');
    }

    try {
        const tarea = crearTarea(
            titulo,
            descripcion,
            estado,
            fechaVencimiento,
            dificultad
        );
        const nuevaListaDeTareas = agregarTarea(listaDeTareas, tarea);
        console.log('Tarea creada con exito');
        readline.question('Presiona cualquier tecla para continuar...');
        return nuevaListaDeTareas;
    } catch (error) {
        console.log(`Error al crear la tarea: ${error.message}`);
        readline.question('Presiona cualquier tecla para continuar...');
        return listaDeTareas;
    }

    
};

const mostrarTareasPorEstado = (listaDeTareas, estado) => {
    const tareas = obtenerTareasPorEstado(listaDeTareas, estado.toLowerCase());
    if (tareas.length === 0) {
        console.log(`No hay tareas ${estado.toLowerCase()}`);
    } else {
        console.log(`Estas son tus tareas ${estado.toLowerCase()}`);
        mostrarListadoTareas(tareas);
        gestionarDetallesTarea(listaDeTareas, tareas);
    }
};

const gestionarDetallesTarea = (listaDeTareas, tareas = listaDeTareas) => {
    console.log('');
    console.log('');
    console.log('¿Deseas ver los detalles de alguna?');
    console.log('Introduce el numero para verla o 0 para volver');
    const indice = parseInt(readline.question('> ')) - 1;
    console.clear()

    if (indice >= 0 && indice < tareas.length) {
        console.log('Esta es la tarea que elegiste');
        console.log('');
        mostrarDetallesTarea(tareas[indice]);

        console.log('Si deseas editarla, presiona E o presiona 0 para volver');
        const editar = readline.question('> ');
        console.clear();

        if (editar.toLowerCase() === 'e') {
            const tareaActualizada = editarTarea(tareas[indice]);
            const indiceEnListaDeTareas = listaDeTareas.findIndex(t => t.id === tareaActualizada.id);
            if (indiceEnListaDeTareas !== -1) {
                listaDeTareas[indiceEnListaDeTareas] = tareaActualizada;
            }
        }
    }
};

const editarTarea = (tarea) => {
    console.log(`Estas editando la tarea ${tarea.titulo}`);
    console.log('');
    console.log('-Si deseas mantener los valores de un atributo, simplemente déjalo en blanco');
    console.log('-Si deseas dejar en blanco un atributo, escribe un espacio');
    console.log('');

    const nuevaDescripcion = readline.question('1. Ingresa la descripcion: ');
    const nuevoEstado = readline.question('2. Estado (pendiente, en curso, terminada, cancelada): ');
    const nuevaDificultad = readline.question('3. Dificultad (facil, medio, dificil): ');
    const nuevoVencimiento = readline.question('4. Vencimiento (YYYY-MM-DD): ');

    try {
        let tareaActualizada = { ...tarea };

        if (nuevaDescripcion.trim() || nuevaDescripcion === ' ') {
            tareaActualizada = cambiarDescripcion(
                tareaActualizada,
                nuevaDescripcion === ' ' ? '' : nuevaDescripcion.trim()
            );
        }

        const estadosValidos = ['pendiente', 'en curso', 'terminada', 'cancelada'];
        if (nuevoEstado && estadosValidos.includes(nuevoEstado)) {
            tareaActualizada = cambiarEstado(tareaActualizada, nuevoEstado.trim());
        }

        const dificultadesValidas = ['facil', 'medio', 'dificil'];
        if (nuevaDificultad && dificultadesValidas.includes(nuevaDificultad)) {
            tareaActualizada = cambiarDificultad(tareaActualizada, nuevaDificultad.trim());
        }

        if (nuevoVencimiento.trim()) {
            tareaActualizada = cambiarVencimiento(tareaActualizada, nuevoVencimiento.trim() ? new Date(nuevoVencimiento.trim()) : null);
        }

        console.log('¡Datos guardados!');
        return tareaActualizada;
    } catch (error) {
        console.log(`Error al actualizar la tarea: ${error.message}`);
    }
};


module.exports = {
    verTareasMENU,
    buscarTareaMENU,
    agregarTareaMENU,
};