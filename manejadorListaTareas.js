const { mostrarTarea } = require('./tarea');

const agregarTarea = (listaDeTareas, tarea) => {
    return [...listaDeTareas, tarea];
};

const buscarPorTitulo = (listaDeTareas, titulo) => {
    return listaDeTareas.filter((tarea) => {
        return tarea.titulo.toLowerCase().includes(titulo.toLowerCase());
    });
};

const mostrarListadoTareas = (listaDeTareas) => {
    listaDeTareas.forEach((tarea, indice) => {
        mostrarTarea(tarea, indice);
    });
};

const obtenerTareasPorEstado = (listaDeTareas, estado) => {
    return listaDeTareas.filter((tarea) => {
        return tarea.estado.toLowerCase() === estado.toLowerCase();
    });
};

module.exports = {
    agregarTarea,
    buscarPorTitulo,
    mostrarListadoTareas,
    obtenerTareasPorEstado,
};
