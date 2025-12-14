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
                <h1>Gestión de Ventas</h1>
                <button
                    className="btn btn-warning"
                    onClick={() => setShowModal(true)}
                >
                    Nueva Venta
                </button>
            </div>

            <div className="card">
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas.map((venta) => (
                                <tr key={venta.id}>
                                    <td>{venta.id}</td>
                                    <td>{venta.cliente_nombre || venta.cliente_id}</td>
                                    <td>{venta.producto_nombre || venta.producto_id}</td>
                                    <td>{venta.cantidad}</td>
                                    <td>${venta.total}</td>
                                    <td>{new Date(venta.fecha_venta).toLocaleDateString()}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info me-2">Ver</button>
                                        <button className="btn btn-sm btn-danger">Anular</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal para nueva venta */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Nueva Venta</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Cliente</label>
                                        <select
                                            className="form-select"
                                            name="cliente_id"
                                            value={formData.cliente_id}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Seleccione un cliente</option>
                                            {clientes.map(cliente => (
                                                <option key={cliente.id} value={cliente.id}>
                                                    {cliente.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Producto</label>
                                        <select
                                            className="form-select"
                                            name="producto_id"
                                            value={formData.producto_id}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Seleccione un producto</option>
                                            {productos.map(producto => (
                                                <option key={producto.id} value={producto.id}>
                                                    {producto.nombre} - ${producto.precio}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Cantidad</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="cantidad"
                                            value={formData.cantidad}
                                            onChange={handleInputChange}
                                            required
                                            min="1"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Total</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="total"
                                            value={formData.total}
                                            onChange={handleInputChange}
                                            readOnly
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancelar
                                        </button>
                                        <button type="submit" className="btn btn-warning">
                                            Guardar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Ventas;
