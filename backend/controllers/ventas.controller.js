// Importa el modelo de Ventas, encargado de interactuar con la base de datos
const VentaModel = require('../models/venta.model');

/**
 * Obtener todas las ventas
 * GET /ventas
 */
const getVentas = (req, res) => {
    // Llama al método del modelo para obtener todas las ventas
    VentaModel.obtenerVentas((err, rows) => {

        // Si ocurre un error en la base de datos, retorna error 500
        if (err) return res.status(500).json({ error: err.message });

        // Retorna la lista de ventas en formato JSON
        res.json(rows);
    });
};

/**
 * Obtener una venta por su ID
 * GET /ventas/:id
 */
const getVentaById = (req, res) => {
    // Obtiene el ID desde los parámetros de la URL
    const { id } = req.params;

    // Llama al modelo para buscar la venta por ID
    VentaModel.obtenerVentaPorId(id, (err, rows) => {

        // Manejo de error interno
        if (err) return res.status(500).json({ error: err.message });

        // Si no se encuentra la venta, retorna 404
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'No encontrado' });
        }

        // Retorna la venta encontrada
        res.json(rows[0]);
    });
};

/**
 * Crear una nueva venta
 * POST /ventas
 */
const createVenta = (req, res) => {
    // Envía los datos recibidos en el body al modelo para crear la venta
    VentaModel.crearVenta(req.body, (err, result) => {

        // Manejo de error en la creación
        if (err) return res.status(500).json({ error: err.message });

        // Retorna el ID generado y los datos enviados
        res.json({
            id: result.insertId,
            ...req.body
        });
    });
};

// Exporta los controladores para ser usados en las rutas
module.exports = {
    getVentas,
    getVentaById,
    createVenta
};
