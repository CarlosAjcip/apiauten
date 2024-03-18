const respuesta = require('./respuesta');

function errors(err, req, res, next) {
    console.log('[error', err);

    const menssage = err.menssage || 'Error Interno';
    const status = err.StatusCode || 500;

    respuesta.error(req, res, menssage, status);
}

module.exports = errors;