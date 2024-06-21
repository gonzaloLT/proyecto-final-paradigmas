const {formatearFecha} = require('./utils')

//Funcion pura crear una tarea
const crearTarea = (
    titulo,
    descripcion = '',
    estado = 'Pendiente',
    fechaVencimiento = null,
    dificultad = 'Facil'
) => {
    if (!titulo.trim()) {
        throw new Error('El titulo no puede estar vacio');
    }

    const now = new Date();
    return {
        id: Date.now(),
        titulo,
        descripcion,
        estado,
        fechaCreacion: now,
        ultimaEdicion: now,
        fechaVencimiento,
        dificultad,
    };
};

//Funcion pura para cambiar el estado de una tarea
const cambiarEstado = (tarea, nuevoEstado) => {
    const estadosValidos = ['Pendiente', 'En curso', 'Terminada', 'Cancelada'];

    if (estadosValidos.includes(nuevoEstado)) {
        return { ...tarea, estado: nuevoEstado, ultimaEdicion: new Date() };
    }
    throw new Error('Estado no valido');
};

//Funcion pura para cambiar dificultad de una tarea
const cambiarDificultad = (tarea, nuevaDificultad) => {
    const dificultadesValidas = ['Facil', 'Medio', 'Dificil'];

    if (dificultadesValidas.includes(nuevaDificultad)) {
        return {
            ...tarea,
            dificultad: nuevaDificultad,
            ultimaEdicion: new Date(),
        };
    }
    throw new Error('Dificultad no valida');
};

//Funcion para establecer una fecha de vencimiento
const cambiarVencimiento = (tarea, nuevoVencimiento) => {
    return {
        ...tarea,
        fechaVencimiento: nuevoVencimiento,
        ultimaEdicion: new Date(),
    };
};

//Funcion para actualizar la descripcion de una tarea
const cambiarDescripcion = (tarea, nuevaDescripcion) => {
    return {
        ...tarea,
        descripcion: nuevaDescripcion,
        ultimaEdicion: new Date(),
    };
};

//Funcion para mostrar tarea sin detalles
const mostrarTarea = (tarea, indice) => {
    console.log(`[${indice + 1}] ${tarea.titulo}`);
};

//Funcion pura para mostrar una tarea en detalle
const mostrarDetallesTarea = (tarea) => {
    const dificultadEmoji = {
        Facil: '⭐',
        Medio: '⭐⭐',
        Dificil: '⭐⭐⭐',
    };

    console.log(`${tarea.titulo}`);
    console.log('');
    console.log(`${tarea.descripcion}`);
    console.log('');
    console.log(`Estado: ${tarea.estado}`);
    console.log(`Fecha de creacion: ${formatearFecha(tarea.fechaCreacion)}`);
    console.log(`Ultima edicion: ${formatearFecha(tarea.ultimaEdicion)}`);
    console.log(`Fecha de vencimiento: ${formatearFecha(tarea.fechaVencimiento)}`);
    console.log(`Dificultad: ${dificultadEmoji[tarea.dificultad]}`);
    console.log('');
    console.log('');
};

module.exports = {
    crearTarea,
    cambiarEstado,
    cambiarDificultad,
    cambiarVencimiento,
    cambiarDescripcion,
    mostrarTarea,
    mostrarDetallesTarea,
};
