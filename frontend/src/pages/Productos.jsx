import { useState, useEffect } from 'react';
import { productosService } from '../services/api';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: ''
    });

    const loadProductos = async () => {
        try {
            const data = await productosService.getAll();
            setProductos(data);
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    };

    useEffect(() => {
        loadProductos();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await productosService.create({
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock)
            });
            setShowModal(false);
            setFormData({ nombre: '', descripcion: '', precio: '', stock: '' });
            loadProductos();
        } catch (error) {
            console.error('Error al crear producto:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este producto?')) {
            try {
                await productosService.delete(id);
                loadProductos();
            } catch (error) {
                console.error('Error al eliminar producto:', error);
            }
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1">Productos</h2>
                    <p className="text-muted m-0">Gestiona tu inventario de productos</p>
                </div>
                <button
                    className="btn btn-primary d-flex align-items-center gap-2"
                    onClick={() => setShowModal(true)}
                >
                    <i className="bi bi-plus-lg"></i>
                    Nuevo Producto
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
                                <input type="text" className="form-control bg-light border-start-0" placeholder="Buscar productos..." />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4">Nombre</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Estado</th>
                                    <th className="text-end pe-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((producto) => (
                                    <tr key={producto.id}>
                                        <td className="ps-4">
                                            <div className="d-flex align-items-center">
                                                <div className="bg-light rounded p-2 me-3">
                                                    <i className="bi bi-box-seam text-primary"></i>
                                                </div>
                                                <span className="fw-bold">{producto.nombre}</span>
                                            </div>
                                        </td>
                                        <td><span className="text-muted">{producto.descripcion}</span></td>
                                        <td className="fw-bold">${producto.precio}</td>
                                        <td>
                                            <span className={`badge ${producto.stock > 10 ? 'bg-success' : 'bg-warning'} bg-opacity-10 text-${producto.stock > 10 ? 'success' : 'warning'} px-3 py-2 rounded-pill`}>
                                                {producto.stock} uds
                                            </span>
                                        </td>
                                        <td>
                                            <span className="badge bg-success bg-opacity-10 text-success px-2 py-1 rounded">Activo</span>
                                        </td>
                                        <td className="text-end pe-4">
                                            <button className="btn btn-light btn-sm me-2 text-primary" title="Editar">
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button
                                                className="btn btn-light btn-sm text-danger"
                                                title="Eliminar"
                                                onClick={() => handleDelete(producto.id)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {productos.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5 text-muted">
                                            <i className="bi bi-inbox fs-1 d-block mb-3"></i>
                                            No hay productos registrados
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal para nuevo producto */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Nuevo Producto</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body p-4">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold small text-uppercase text-muted">Nombre del Producto</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            placeholder="Ej. Laptop Gamer"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold small text-uppercase text-muted">Descripción</label>
                                        <textarea
                                            className="form-control"
                                            name="descripcion"
                                            rows="3"
                                            value={formData.descripcion}
                                            onChange={handleInputChange}
                                            placeholder="Detalles del producto..."
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-bold small text-uppercase text-muted">Precio</label>
                                            <div className="input-group">
                                                <span className="input-group-text">$</span>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="precio"
                                                    value={formData.precio}
                                                    onChange={handleInputChange}
                                                    placeholder="0.00"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-bold small text-uppercase text-muted">Stock Inicial</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="stock"
                                                value={formData.stock}
                                                onChange={handleInputChange}
                                                placeholder="0"
                                                required
                                            />
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
                                    <button type="submit" className="btn btn-primary px-4">
                                        Guardar Producto
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

export default Productos;
