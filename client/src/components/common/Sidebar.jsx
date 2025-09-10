import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Sidebar() {
  const { sidebarOpen } = useSelector((state) => state.ui);

  const navItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/assignments', icon: '📋', label: 'Assignments' },
    { path: '/calendar', icon: '📅', label: 'Calendar' },
    { path: '/analytics', icon: '📈', label: 'Analytics' },
    { path: '/settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">🌊</div>
          <span>TaskTide</span>
        </div>
      </div>

      <nav className="nav-menu">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;