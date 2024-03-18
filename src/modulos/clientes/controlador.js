const TABLA = 'clientes';
//exportar
module.exports = function (dbinyectada) {
    //por si pasa un fallo
    let db = dbinyectada;

    if (!db) {
        db = require('../../db/mysql.js');
    }
    function todos() {
        return db.todos(TABLA)
    }

    function uno(id) {
        return db.uno(TABLA, id);
    }

    function elimina(body) {
        return db.elimina(TABLA, body);
    }

    function agregar(body) {
        return db.agregar(TABLA, body);
    }

    return {
        todos,
        uno,
        agregar,
        elimina,
    }


}