const TABLA = 'auth';
const bcrypt = require('bcrypt');
const auth = require('../../auth/index.js');
//exportar
module.exports = function (dbinyectada) {
    //por si pasa un fallo
    let db = dbinyectada;

    if (!db) {
        db = require('../../db/mysql.js');
    }

    async function login(usuario, password) {
        const data = await db.query(TABLA, { usuario: usuario });

        return bcrypt.compare(password, data.password)
            .then(resultado => {
                if (resultado === true) {
                    //generar token
                    return auth.asignarToken({
                        ...data
                    })
                } else {
                    throw new Error('Informacion Invalia');
                }
            })
    }

    async function agregar(data) {

        const authData = {
            id: data.id
        }

        if (data.usuario) {
            authData.usuario = data.usuario;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password.toString(), 5);
        }
        return db.agregar(TABLA, authData);
    }

    return {
        agregar,
        login
    }


}