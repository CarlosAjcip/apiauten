const express = require('express');
const morgan = require('morgan');
const config = require('./config.js');

const clientes = require('./modulos/clientes/rutas.js');
const usuarios = require('./modulos/usuarios/rutas.js');

const error = require('../src/modulos/red/errors.js');
const auth = require('./modulos/auth/rutas.js');

const app = express();
//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracion
app.set('port', config.app.port)

//rutas
app.use('/api/clientes', clientes);
app.use('/api/usuarios', usuarios);
app.use('/api/auth', auth)
app.use(error);

module.exports = app;