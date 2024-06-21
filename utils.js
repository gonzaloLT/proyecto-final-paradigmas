const formatearFecha = (fecha) => {
    if (!fecha) return 'N/A';
    const fechaObj = new Date(fecha);
    const dia = String(fechaObj.getDate()).padStart(2, '0');
    const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
    const año = fechaObj.getFullYear();
    return `${dia}/${mes}/${año}`;
};


const validarFecha = (fecha) => {
    if (fecha) {
        const date = new Date(fecha);
        if (!isNaN(date.getTime())) {
            return date;
        }
        throw new Error('Fecha no válida');
    }
    return null;
};

module.exports = {
    formatearFecha
}