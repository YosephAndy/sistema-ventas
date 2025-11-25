const db = require('../db/connection');

const obtenerProductos = (callback) => {
    db.query('SELECT * FROM productos', callback);
};

const obtenerProductoPorId = (id, callback) => {
    db.query('SELECT * FROM productos WHERE id = ?', [id], callback);
};

const crearProducto = (datos, callback) => {
    const { nombre, precio, stock } = datos;
    db.query(
        'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
        [nombre, precio, stock],
        callback
    );
};

const actualizarProducto = (id, datos, callback) => {
    const { nombre, precio, stock } = datos;
    db.query(
        'UPDATE productos SET nombre=?, precio=?, stock=? WHERE id=?',
        [nombre, precio, stock, id],
        callback
    );
};

const eliminarProducto = (id, callback) => {
    db.query('DELETE FROM productos WHERE id=?', [id], callback);
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
