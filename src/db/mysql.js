const mysql = require('mysql2');
const config = require('../config.js');
const { error } = require('../modulos/red/respuesta.js');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

//variable de conexion
let conexion;
//conexio a la base datos
function conMysql() {
    conexion = mysql.createConnection(dbconfig);
    //por si sucede un error a conectar a la BD
    conexion.connect((err) => {
        if (err) {
            console.log('[db err]', err);
            setTimeout(conMysql, 200);
        } else {
            console.log('DB Connection')
        }
    })

    conexion.on('error', err => {
        console.log('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conMysql();
        } else {
            throw err;
        }
    })
}

//llamar la conexion
conMysql();

//traer todos los datos
function todos(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            if (error) {
                return reject(error);
            } else {
                resolve(result);
            }
        })
    })
}

function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} where id = ${id}`, (error, result) => {
            if (error) {
                return reject(error);
            } else {
                resolve(result);
            }
        })
    })
}

function elimina(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} where id = ?`, data.id, (error, result) => {
            if (error) {
                return reject(error);
            } else {
                resolve(result);
            }
        })
    })
}

//se va agregar una nueva data o actualizar una data
// function agregar(tabla, data) {
//     if (data && data.id === 0) {
//         return insertar(tabla, data);
//     } else {
//         return actualizar(tabla, data);
//     }
// }

// function insertar(tabla, data) {
//     return new Promise((resolve, reject) => {
//         conexion.query(`insert into ${tabla} set ?`, data, (error, result) => {
//             if (error) {
//                 return reject(error);
//             } else {
//                 resolve(result);
//             }
//         })
//     })
// }

// function actualizar(tabla, data) {
//     return new Promise((resolve, reject) => {
//         conexion.query(`update ${tabla} set ? where id = ?`, [data, data.id], (error, result) => {
//             if (error) {
//                 return reject(error);
//             } else {
//                 resolve(result);
//             }
//         })
//     })
// }

function agregar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`insert into ${tabla} set ? ON DUPLICATE KEY UPDATE ?`, [data, data], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}

function query(tabla, consulta) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta, (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        })
    })
}
//exportar todo
module.exports = {
    todos,
    uno,
    agregar,
    elimina,
    query
}