import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div className="d-flex" style={{ paddingTop: '72px' }}>
                <Sidebar />
                <main className="flex-grow-1 p-4" style={{ minHeight: 'calc(100vh - 72px)', marginLeft: 'var(--sidebar-width)' }}>
                    <div className="container-fluid" style={{ maxWidth: '1600px' }}>
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}

export default Layout;
