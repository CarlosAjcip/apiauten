const express = require('express');
const respuesta = require('../red/respuesta.js');
//expoertar el controlador
const controlador = require('./index.js');

const seguridad = require('./seguridad.js');

const router = express.Router();

router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar); // para agregar los privilegios de usario seguridad()
router.put('/', elimina);

//forma de hacerlo asincornico
async function todos(req, res, next) {
    try {

        const items = await controlador.todos();
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
};

async function uno(req, res, next) {
    try {
        const items = await controlador.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }

};

async function elimina(req, res, next) {
    try {
        const items = await controlador.elimina(req.body);
        respuesta.success(req, res, 'Eliminado Correctamente', 200);
    } catch (err) {
        next(err);
    }

}

async function agregar(req, res, next) {
    try {
        const items = await controlador.agregar(req.body);
        if (req.body.id === 0) {
            mensaje = 'Item guardado con exito';
        } else {
            mensaje = 'Item actualizado correctamente';
        }
        respuesta.success(req, res, mensaje, 201);
    } catch (err) {
        next(err);
    }

}

module.exports = router;