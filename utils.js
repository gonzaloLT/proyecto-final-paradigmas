const formatearFecha = (fecha) => {
    if (!fecha) return 'N/A';
    const fechaObj = new Date(fecha);
    const dia = String(fechaObj.getDate()).padStart(2, '0');
    const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
    const año = fechaObj.getFullYear();
    return `${dia}/${mes}/${año}`;
};


const esFechaValida = (fecha) => {
    // Verificar si la fecha sigue el formato YYYY-MM-DD usando una expresión regular
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(fecha)) {
        return false;
    }
    
    const [year, month, day] = fecha.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    
    // Verificar si la fecha es válida y coincide con la entrada
    return date.getFullYear() === year && date.getMonth() === (month - 1) && date.getDate() === day;
};

module.exports = {
    formatearFecha,
    esFechaValida
} 