import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="bg-white border-end h-100 d-flex flex-column shadow-sm" style={{ width: 'var(--sidebar-width)', minHeight: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1000, paddingTop: '80px' }}>
            <div className="flex-grow-1 py-4 d-flex flex-column">
                <div className="small text-uppercase fw-bold text-muted px-4 mb-3" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Menu Principal</div>
                <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <i className="bi bi-speedometer2"></i>
                    Dashboard
                </NavLink>
                <NavLink to="/home" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <i className="bi bi-house-door"></i>
                    Home
                </NavLink>
                <div className="small text-uppercase fw-bold text-muted px-4 mt-4 mb-3" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Gestión</div>
                <NavLink to="/productos" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <i className="bi bi-box-seam"></i>
                    Productos
                </NavLink>
                <NavLink to="/clientes" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <i className="bi bi-people"></i>
                    Clientes
                </NavLink>
                <NavLink to="/ventas" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <i className="bi bi-cart-check"></i>
                    Ventas
                </NavLink>
            </div>
            <div className="p-4 border-top bg-light">
                <div className="d-flex align-items-center">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                        <i className="bi bi-person-fill"></i>
                    </div>
                    <div>
                        <div className="fw-bold text-dark">Admin User</div>
                        <small className="text-muted">admin@sistema.com</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
