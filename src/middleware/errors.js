function error(menssge, code) {
    let e = new Error(menssge);

    if (code) {
        e.StatusCode = code;
    }

    return e;
}
module.exports = error;