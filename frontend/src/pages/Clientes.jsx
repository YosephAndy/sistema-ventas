import { useState, useEffect } from 'react';
import { clientesService } from '../services/api';

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: ''
    });

    const loadClientes = async () => {
        try {
            const data = await clientesService.getAll();
            setClientes(data);
        } catch (error) {
            console.error('Error al cargar clientes:', error);
        }
    };

    useEffect(() => {
        loadClientes();
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
            await clientesService.create({
                nombre: formData.nombre,
                email: formData.email,
                telefono: formData.telefono,
                direccion: formData.direccion
            });
            setShowModal(false);
            setFormData({ nombre: '', email: '', telefono: '', direccion: '' });
            loadClientes();
        } catch (error) {
            console.error('Error al crear cliente:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este cliente?')) {
            try {
                await clientesService.delete(id);
                loadClientes();
            } catch (error) {
                console.error('Error al eliminar cliente:', error);
            }
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1">Clientes</h2>
                    <p className="text-muted m-0">Administra tu base de clientes</p>
                </div>
                <button
                    className="btn btn-primary d-flex align-items-center gap-2"
                    onClick={() => setShowModal(true)}
                >
                    <i className="bi bi-person-plus"></i>
                    Nuevo Cliente
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
                                <input type="text" className="form-control bg-light border-start-0" placeholder="Buscar clientes..." />
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
                                    <th>Contacto</th>
                                    <th>Ubicación</th>
                                    <th>Estado</th>
                                    <th className="text-end pe-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map((cliente) => (
                                    <tr key={cliente.id}>
                                        <td className="ps-4">
                                            <div className="d-flex align-items-center">
                                                <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                                                    <span className="fw-bold">{cliente.nombre.charAt(0).toUpperCase()}</span>
                                                </div>
                                                <div>
                                                    <div className="fw-bold">{cliente.nombre}</div>
                                                    <small className="text-muted">ID: {cliente.id}</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column">
                                                <span className="mb-1"><i className="bi bi-envelope me-2 text-muted"></i>{cliente.email}</span>
                                                <small className="text-muted"><i className="bi bi-telephone me-2"></i>{cliente.telefono}</small>
                                            </div>
                                        </td>
                                        <td>
                                            <i className="bi bi-geo-alt me-2 text-muted"></i>{cliente.direccion}
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
                                                onClick={() => handleDelete(cliente.id)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {clientes.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5 text-muted">
                                            <i className="bi bi-people fs-1 d-block mb-3"></i>
                                            No hay clientes registrados
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal para nuevo cliente */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Nuevo Cliente</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body p-4">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold small text-uppercase text-muted">Nombre Completo</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            placeholder="Ej. Juan Pérez"
                                            required
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-bold small text-uppercase text-muted">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="correo@ejemplo.com"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-bold small text-uppercase text-muted">Teléfono</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="telefono"
                                                value={formData.telefono}
                                                onChange={handleInputChange}
                                                placeholder="+51 999..."
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold small text-uppercase text-muted">Dirección</label>
                                        <textarea
                                            className="form-control"
                                            name="direccion"
                                            rows="2"
                                            value={formData.direccion}
                                            onChange={handleInputChange}
                                            placeholder="Dirección completa..."
                                            required
                                        ></textarea>
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
                                        Guardar Cliente
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

export default Clientes;
