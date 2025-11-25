const VentaModel = require('../models/venta.model');

const getVentas = (req, res) => {
    VentaModel.obtenerVentas((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

const getVentaById = (req, res) => {
    VentaModel.obtenerVentaPorId(req.params.id, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rows.length === 0) return res.status(404).json({ mensaje: 'No encontrado' });
        res.json(rows[0]);
    });
};

const createVenta = (req, res) => {
    VentaModel.crearVenta(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, ...req.body });
    });
};

module.exports = {
    getVentas,
    getVentaById,
    createVenta
};
