const db = require('../db/connection');

const obtenerUsuarios = (callback) => {
    db.query('SELECT id, nombre, email FROM usuarios', callback);
};

const obtenerUsuarioPorId = (id, callback) => {
    db.query('SELECT id, nombre, email FROM usuarios WHERE id = ?', [id], callback);
};

const crearUsuario = (datos, callback) => {
    const { nombre, email, password } = datos;
    db.query(
        'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
        [nombre, email, password],
        callback
    );
};

const actualizarUsuario = (id, datos, callback) => {
    const { nombre, email, password } = datos;
    db.query(
        'UPDATE usuarios SET nombre=?, email=?, password=? WHERE id=?',
        [nombre, email, password, id],
        callback
    );
};

const eliminarUsuario = (id, callback) => {
    db.query('DELETE FROM usuarios WHERE id=?', [id], callback);
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};
