const TABLA = 'usuarios';
const auth = require('../auth/index.js');
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

    async function agregar(body) {

        const usuario = {
            id: body.id,
            nombre: body.nombre,
            activo: body.activo
        }
        const respuesta = await db.agregar(TABLA, usuario);
        console.log('respuesta', respuesta)
        var insertId = 0;

        if (body.id == 0) {
            insertId = respuesta.insertId;
        }
        else {
            insertId = body.id;
        }

        var respuesta2 = '';
        if (body.usuario || body.password) {
            respuesta2 = await auth.agregar({
                id: insertId,
                usuario: body.usuario,
                password: body.password
            })
        }
        return respuesta2;
    }

    return {
        todos,
        uno,
        agregar,
        elimina,
    }


}