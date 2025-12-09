import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionToggle = async (userId, permission) => {
    try {
      const targetUser = users.find(u => u._id === userId);
      const token = localStorage.getItem('token');
      
      const updatedPermissions = {
        ...targetUser.permissions,
        [permission]: !targetUser.permissions[permission],
      };

      const res = await axios.put(
        `http://localhost:5000/api/users/${userId}/permissions`,
        updatedPermissions,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers(users.map(u => u._id === userId ? res.data : u));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update permissions');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter(u => u._id !== userId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading users...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User Management</h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Manage user access and permissions
      </p>

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

      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          background: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                Name
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                Email
              </th>
              <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #ddd' }}>
                Role
              </th>
              <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #ddd' }}>
                Create
              </th>
              <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #ddd' }}>
                Read
              </th>
              <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #ddd' }}>
                Update
              </th>
              <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #ddd' }}>
                Delete
              </th>
              <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #ddd' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '1rem' }}>{u.name}</td>
                <td style={{ padding: '1rem' }}>{u.email}</td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.875rem',
                    background: u.role === 'admin' ? '#e3f2fd' : '#f5f5f5',
                    color: u.role === 'admin' ? '#1976d2' : '#666',
                  }}>
                    {u.role}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={u.permissions?.canCreate || false}
                    onChange={() => handlePermissionToggle(u._id, 'canCreate')}
                    disabled={u.role === 'admin'}
                    style={{ cursor: u.role === 'admin' ? 'not-allowed' : 'pointer' }}
                  />
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={u.permissions?.canRead || false}
                    onChange={() => handlePermissionToggle(u._id, 'canRead')}
                    disabled={u.role === 'admin'}
                    style={{ cursor: u.role === 'admin' ? 'not-allowed' : 'pointer' }}
                  />
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={u.permissions?.canUpdate || false}
                    onChange={() => handlePermissionToggle(u._id, 'canUpdate')}
                    disabled={u.role === 'admin'}
                    style={{ cursor: u.role === 'admin' ? 'not-allowed' : 'pointer' }}
                  />
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={u.permissions?.canDelete || false}
                    onChange={() => handlePermissionToggle(u._id, 'canDelete')}
                    disabled={u.role === 'admin'}
                    style={{ cursor: u.role === 'admin' ? 'not-allowed' : 'pointer' }}
                  />
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  {u._id !== user._id && u.role !== 'admin' && (
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      style={{
                        padding: '0.25rem 0.75rem',
                        background: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                      }}
                    >
                      Delete
                    </button>
                  )}
                  {u.role === 'admin' && (
                    <span style={{ color: '#999', fontSize: '0.875rem' }}>
                      Protected
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#f5f5f5',
        borderRadius: '4px',
      }}>
        <h3 style={{ marginTop: 0 }}>Permission Guide:</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>Create:</strong> Can add new members, plans, and memberships</li>
          <li><strong>Read:</strong> Can view data (enabled by default for all users)</li>
          <li><strong>Update:</strong> Can edit existing records</li>
          <li><strong>Delete:</strong> Can remove records</li>
        </ul>
        <p style={{ color: '#666', marginBottom: 0 }}>
          <strong>Note:</strong> Admin users have all permissions by default and cannot be modified.
        </p>
      </div>
    </div>
  );
};

export default AdminUsersPage;
