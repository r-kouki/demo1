import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <nav style={{ 
        background: '#333', 
        color: 'white', 
        padding: '1rem',
        marginBottom: '1rem'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>GymTrack</h2>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            {user && (
              <>
                <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
                <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
                {user.role === 'admin' && (
                  <Link to="/admin/users" style={{ color: 'white', textDecoration: 'none' }}>
                    Users
                  </Link>
                )}
              </>
            )}
          </div>
          <div>
            {user ? (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span>Welcome, {user.name || user.email}</span>
                <button onClick={handleLogout} style={{ 
                  padding: '0.5rem 1rem',
                  cursor: 'pointer'
                }}>
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            )}
          </div>
        </div>
      </nav>
      <main className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
