const UsuarioModel = require('../models/usuario.model');

const getUsuarios = (req, res) => {
    UsuarioModel.obtenerUsuarios((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

const getUsuarioById = (req, res) => {
    UsuarioModel.obtenerUsuarioPorId(req.params.id, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rows.length === 0) return res.status(404).json({ mensaje: 'No encontrado' });
        res.json(rows[0]);
    });
};

const createUsuario = (req, res) => {
    UsuarioModel.crearUsuario(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, ...req.body });
    });
};

const updateUsuario = (req, res) => {
    UsuarioModel.actualizarUsuario(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Actualizado correctamente' });
    });
};

const deleteUsuario = (req, res) => {
    UsuarioModel.eliminarUsuario(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Eliminado correctamente' });
    });
};

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
};
