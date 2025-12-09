import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to GymTrack</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Manage your gym members, plans, and memberships efficiently
      </p>
      {!user ? (
        <div>
          <p>Please login to access the dashboard</p>
          <Link to="/login">
            <button style={{ padding: '0.75rem 2rem', fontSize: '1rem', cursor: 'pointer' }}>
              Go to Login
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <p>You're logged in! Access your dashboard to manage gym data.</p>
          <Link to="/dashboard">
            <button style={{ padding: '0.75rem 2rem', fontSize: '1rem', cursor: 'pointer' }}>
              Go to Dashboard
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
