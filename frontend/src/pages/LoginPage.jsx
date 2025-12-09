import { useState, useEffect } from 'react';
import { useNavigate, Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
    }
  }, [location]);

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    setLoading(false);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Login to GymTrack</h2>
      
      {success && (
        <div style={{
          background: '#e8f5e9',
          color: '#2e7d32',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem',
        }}>
          {success}
        </div>
      )}

      {error && (
        <div style={{ 
          background: '#ffebee', 
          color: '#c62828', 
          padding: '1rem', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
            placeholder="admin@gymtrack.com"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <p>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#007bff' }}>
            Register here
          </Link>
        </p>
      </div>

      <div style={{ marginTop: '1rem', textAlign: 'center', color: '#666' }}>
        <small>Demo credentials: admin@gymtrack.com / admin123</small>
      </div>
    </div>
  );
};

export default LoginPage;
