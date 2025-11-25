const db = require('../db/connection');

const obtenerVentas = (callback) => {
    db.query('SELECT * FROM ventas', callback);
};

const obtenerVentaPorId = (id, callback) => {
    db.query('SELECT * FROM ventas WHERE id = ?', [id], callback);
};

const crearVenta = (datos, callback) => {
    const { cliente_id, total, fecha } = datos;
    db.query(
        'INSERT INTO ventas (cliente_id, total, fecha) VALUES (?, ?, ?)',
        [cliente_id, total, fecha],
        callback
    );
};

module.exports = {
    obtenerVentas,
    obtenerVentaPorId,
    crearVenta
};
