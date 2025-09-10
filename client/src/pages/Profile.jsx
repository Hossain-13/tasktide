import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSave = () => {
    // Save profile logic
    setEditing(false);
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>

      <div className="profile-card">
        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>

        {editing ? (
          <div className="profile-form">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div className="profile-info">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <button onClick={() => setEditing(true)}>Edit Profile</button>
          </div>
        )}

        <div className="profile-stats">
          <div className="stat">
            <span className="stat-value">{user?.stats?.totalPomodorosCompleted || 0}</span>
            <span className="stat-label">Pomodoros</span>
          </div>
          <div className="stat">
            <span className="stat-value">{user?.stats?.currentStreak || 0}</span>
            <span className="stat-label">Day Streak</span>
          </div>
          <div className="stat">
            <span className="stat-value">{user?.stats?.totalFocusTime || 0}m</span>
            <span className="stat-label">Focus Time</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;