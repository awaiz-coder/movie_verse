import React, { useState, useEffect } from 'react';
import { usersAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await usersAPI.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"? This will also delete all their reviews.`)) {
      try {
        await usersAPI.delete(userId);
        setUsers(users.filter(user => user._id !== userId));
        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h2>Manage Users</h2>
      <p>Total Users: {users.length}</p>
      
      <div className="users-list">
        {users.map(user => (
          <div key={user._id} className="card" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="avatar"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/50/1a1a1a/666666?text=U';
                  }}
                />
                <div>
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                  <p style={{ color: '#888', fontSize: '0.9rem' }}>
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <button 
                className="btn btn-danger"
                onClick={() => handleDeleteUser(user._id, user.name)}
              >
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No users found.</p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;