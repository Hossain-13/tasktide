import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { toggleTheme, toggleSidebar } from '../../store/slices/uiSlice';
import NotificationBell from '../notifications/NotificationBell';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.ui);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="header-bar">
      <div className="header-left">
        <button 
          className="icon-btn"
          onClick={() => dispatch(toggleSidebar())}
        >
          ☰
        </button>
        <h1 className="page-title">
          {window.location.pathname.slice(1).charAt(0).toUpperCase() + 
           window.location.pathname.slice(2) || 'Dashboard'}
        </h1>
      </div>

      <div className="header-right">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search assignments..." />
        </div>

        <div className="header-actions">
          <button 
            className="icon-btn"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          <NotificationBell />
          
          <div className="user-menu">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span>{user?.name || 'User'}</span>
            <div className="dropdown">
              <button onClick={() => navigate('/profile')}>Profile</button>
              <button onClick={() => navigate('/settings')}>Settings</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;