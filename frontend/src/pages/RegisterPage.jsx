import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Registration successful - redirect to login
      navigate('/login', { 
        state: { message: 'Registration successful! Please login.' } 
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Create Account
      </h2>

      {error && (
        <div style={{
          background: '#ffebee',
          color: '#c62828',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem',
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
            placeholder="Your full name"
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
            placeholder="your@email.com"
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
            placeholder="At least 6 characters"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
            placeholder="Re-enter password"
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
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </form>

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <p>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#007bff' }}>
            Login here
          </Link>
        </p>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
        <small style={{ color: '#666' }}>
          <strong>Note:</strong> New accounts have read-only access by default. 
          Contact an administrator for additional permissions.
        </small>
      </div>
    </div>
  );
};

export default RegisterPage;
