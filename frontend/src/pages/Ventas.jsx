import { useState, useEffect } from 'react';
import { ventasService, clientesService, productosService } from '../services/api';

function Ventas() {
    const [ventas, setVentas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        cliente_id: '',
        producto_id: '',
        cantidad: '',
        total: ''
    });

    const loadData = async () => {
        try {
            const [ventasData, clientesData, productosData] = await Promise.all([
                ventasService.getAll(),
                clientesService.getAll(),
                productosService.getAll()
            ]);
            setVentas(ventasData);
            setClientes(clientesData);
            setProductos(productosData);
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Si cambia el producto o la cantidad, calcular el total automáticamente
        if (name === 'producto_id' || name === 'cantidad') {
            const productoId = name === 'producto_id' ? value : formData.producto_id;
            const cantidad = name === 'cantidad' ? value : formData.cantidad;

            const productoSeleccionado = productos.find(p => p.id === parseInt(productoId));

            let nuevoTotal = formData.total;
            if (productoSeleccionado && cantidad) {
                nuevoTotal = productoSeleccionado.precio * parseInt(cantidad);
            }

            setFormData({
                ...formData,
                [name]: value,
                total: nuevoTotal
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ventasService.create({
                cliente_id: parseInt(formData.cliente_id),
                producto_id: parseInt(formData.producto_id),
                cantidad: parseInt(formData.cantidad),
                total: parseFloat(formData.total)
            });
            setShowModal(false);
            setFormData({ cliente_id: '', producto_id: '', cantidad: '', total: '' });
            loadData();
        } catch (error) {
            console.error('Error al crear venta:', error);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1">Ventas</h2>
                    <p className="text-muted m-0">Registro y control de transacciones</p>
                </div>
                <button
                    className="btn btn-warning d-flex align-items-center gap-2 text-white"
                    onClick={() => setShowModal(true)}
                >
                    <i className="bi bi-plus-lg"></i>
                    Nueva Venta
                </button>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-header bg-transparent py-3">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-4">
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0">
                                    <i className="bi bi-search text-muted"></i>
                                </span>
                                <input type="text" className="form-control bg-light border-start-0" placeholder="Buscar ventas..." />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4">ID</th>
                                    <th>Cliente</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Total</th>
                                    <th>Fecha</th>
                                    <th className="text-end pe-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ventas.map((venta) => (
                                    <tr key={venta.id}>
                                        <td className="ps-4 fw-bold">#{venta.id}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                                                    <i className="bi bi-person text-muted"></i>
                                                </div>
                                                {venta.cliente_nombre || venta.cliente_id}
                                            </div>
                                        </td>
                                        <td>{venta.producto_nombre || venta.producto_id}</td>
                                        <td>
                                            <span className="badge bg-light text-dark border">{venta.cantidad}</span>
                                        </td>
                                        <td className="fw-bold text-success">${venta.total}</td>
                                        <td>
                                            <div className="d-flex align-items-center text-muted">
                                                <i className="bi bi-calendar3 me-2"></i>
                                                {new Date(venta.fecha_venta).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="text-end pe-4">
                                            <button className="btn btn-light btn-sm me-2 text-primary" title="Ver Detalle">
                                                <i className="bi bi-eye"></i>
                                            </button>
                                            <button className="btn btn-light btn-sm text-danger" title="Anular">
                                                <i className="bi bi-x-circle"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {ventas.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-5 text-muted">
                                            <i className="bi bi-cart-x fs-1 d-block mb-3"></i>
                                            No hay ventas registradas
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal para nueva venta */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Registrar Nueva Venta</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body p-4">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold small text-uppercase text-muted">Cliente</label>
                                        <select
                                            className="form-select form-select-lg"
                                            name="cliente_id"
                                            value={formData.cliente_id}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Seleccione un cliente...</option>
                                            {clientes.map(cliente => (
                                                <option key={cliente.id} value={cliente.id}>
                                                    {cliente.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold small text-uppercase text-muted">Producto</label>
                                        <select
                                            className="form-select form-select-lg"
                                            name="producto_id"
                                            value={formData.producto_id}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Seleccione un producto...</option>
                                            {productos.map(producto => (
                                                <option key={producto.id} value={producto.id}>
                                                    {producto.nombre} - ${producto.precio}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-bold small text-uppercase text-muted">Cantidad</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="cantidad"
                                                value={formData.cantidad}
                                                onChange={handleInputChange}
                                                required
                                                min="1"
                                                placeholder="0"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-bold small text-uppercase text-muted">Total Estimado</label>
                                            <div className="input-group">
                                                <span className="input-group-text">$</span>
                                                <input
                                                    type="number"
                                                    className="form-control fw-bold"
                                                    name="total"
                                                    value={formData.total}
                                                    onChange={handleInputChange}
                                                    readOnly
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer bg-light">
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-warning text-white px-4">
                                        Confirmar Venta
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Ventas;
