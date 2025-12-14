import React from 'react';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg main-navbar fixed-top">
            <div className="container-fluid px-4">
                <a className="navbar-brand d-flex align-items-center gap-2" href="#">
                    <div className="bg-primary text-white rounded p-1 d-flex">
                        <i className="bi bi-graph-up-arrow"></i>
                    </div>
                    <span>Mi Sistema</span>
                </a>

                <div className="d-flex align-items-center gap-3">
                    <button className="btn btn-light position-relative rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <i className="bi bi-bell text-muted"></i>
                        <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                            <span className="visually-hidden">New alerts</span>
                        </span>
                    </button>
                    <button className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2">
                        <i className="bi bi-box-arrow-right"></i> Salir
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
