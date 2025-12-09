import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem' }}>User Profile</h2>
      
      <div style={{ 
        background: '#f5f5f5', 
        padding: '1.5rem', 
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Name:</strong>
          <p style={{ marginTop: '0.5rem' }}>{user?.name || 'N/A'}</p>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <strong>Email:</strong>
          <p style={{ marginTop: '0.5rem' }}>{user?.email || 'N/A'}</p>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <strong>Role:</strong>
          <p style={{ marginTop: '0.5rem' }}>
            <span style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '12px',
              background: user?.role === 'admin' ? '#e3f2fd' : '#f5f5f5',
              color: user?.role === 'admin' ? '#1976d2' : '#666',
            }}>
              {user?.role || 'User'}
            </span>
          </p>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <strong>Permissions:</strong>
          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {user?.permissions?.canCreate && (
              <span style={{ padding: '0.25rem 0.5rem', background: '#c8e6c9', borderRadius: '4px', fontSize: '0.875rem' }}>
                Create
              </span>
            )}
            {user?.permissions?.canRead && (
              <span style={{ padding: '0.25rem 0.5rem', background: '#bbdefb', borderRadius: '4px', fontSize: '0.875rem' }}>
                Read
              </span>
            )}
            {user?.permissions?.canUpdate && (
              <span style={{ padding: '0.25rem 0.5rem', background: '#fff9c4', borderRadius: '4px', fontSize: '0.875rem' }}>
                Update
              </span>
            )}
            {user?.permissions?.canDelete && (
              <span style={{ padding: '0.25rem 0.5rem', background: '#ffccbc', borderRadius: '4px', fontSize: '0.875rem' }}>
                Delete
              </span>
            )}
          </div>
        </div>

        <div>
          <strong>User ID:</strong>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
            {user?._id || user?.id || 'N/A'}
          </p>
        </div>
      </div>

      <div style={{ marginTop: '2rem', color: '#666' }}>
        <p>This is your profile page where you can view your account information and permissions.</p>
        {user?.role !== 'admin' && (
          <p><em>Contact an administrator to request additional permissions.</em></p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
