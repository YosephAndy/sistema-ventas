const ProductoModel = require('../models/producto.model');

const getProductos = (req, res) => {
    ProductoModel.obtenerProductos((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

const getProductoById = (req, res) => {
    ProductoModel.obtenerProductoPorId(req.params.id, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rows.length === 0) return res.status(404).json({ mensaje: 'No encontrado' });
        res.json(rows[0]);
    });
};

const createProducto = (req, res) => {
    ProductoModel.crearProducto(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, ...req.body });
    });
};

const updateProducto = (req, res) => {
    ProductoModel.actualizarProducto(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Actualizado correctamente' });
    });
};

const deleteProducto = (req, res) => {
    ProductoModel.eliminarProducto(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Eliminado correctamente' });
    });
};

module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
};
