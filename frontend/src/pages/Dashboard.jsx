function Dashboard() {
    const stats = [
        { title: 'Total Productos', count: '124', icon: 'bi-box-seam', color: 'primary', bg: 'rgba(67, 97, 238, 0.1)' },
        { title: 'Total Clientes', count: '45', icon: 'bi-people', color: 'success', bg: 'rgba(76, 201, 240, 0.1)' },
        { title: 'Ventas del Mes', count: '$12,450', icon: 'bi-graph-up', color: 'warning', bg: 'rgba(247, 37, 133, 0.1)' },
        { title: 'Pedidos Pendientes', count: '8', icon: 'bi-clock', color: 'info', bg: 'rgba(72, 149, 239, 0.1)' }
    ];

    return (
        <div>
            <div className="mb-4">
                <h2 className="mb-1">Dashboard</h2>
                <p className="text-muted">Bienvenido al panel de control</p>
            </div>

            <div className="row g-4 mb-5">
                {stats.map((stat, index) => (
                    <div className="col-md-3" key={index}>
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                    <div className={`rounded-circle d-flex align-items-center justify-content-center me-3`}
                                        style={{ width: '48px', height: '48px', backgroundColor: stat.bg, color: `var(--${stat.color}-color)` }}>
                                        <i className={`bi ${stat.icon} fs-4`}></i>
                                    </div>
                                    <div>
                                        <h6 className="card-subtitle text-muted mb-1">{stat.title}</h6>
                                        <h3 className="card-title mb-0">{stat.count}</h3>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="text-success small fw-bold me-2">
                                        <i className="bi bi-arrow-up-short"></i> 12%
                                    </span>
                                    <span className="text-muted small">vs mes anterior</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-4">
                <div className="col-md-8">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Ventas Recientes</h5>
                            <button className="btn btn-light btn-sm">Ver Todo</button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>ID</th>
                                            <th>Cliente</th>
                                            <th>Producto</th>
                                            <th>Estado</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[1, 2, 3, 4, 5].map(item => (
                                            <tr key={item}>
                                                <td>#202{item}</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                                                            <i className="bi bi-person text-secondary"></i>
                                                        </div>
                                                        <span>Cliente {item}</span>
                                                    </div>
                                                </td>
                                                <td>Producto Ejemplo</td>
                                                <td><span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill">Completado</span></td>
                                                <td className="fw-bold">$150.00</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-transparent border-0">
                            <h5 className="mb-0">Productos Populares</h5>
                        </div>
                        <div className="card-body p-0">
                            <div className="list-group list-group-flush">
                                {[1, 2, 3, 4].map(item => (
                                    <div className="list-group-item border-0 d-flex align-items-center px-4 py-3" key={item}>
                                        <div className="me-3">
                                            <div className="bg-light rounded p-2">
                                                <i className="bi bi-box-seam text-primary fs-5"></i>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="mb-0">Producto Top {item}</h6>
                                            <small className="text-muted">32 ventas</small>
                                        </div>
                                        <div className="fw-bold">$450</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
