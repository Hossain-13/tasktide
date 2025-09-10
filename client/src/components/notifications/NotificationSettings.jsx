import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function NotificationBell() {
  const [showPanel, setShowPanel] = useState(false);
  const { notifications, unreadCount } = useSelector(
    (state) => state.notifications
  );

  return (
    <>
      <button 
        className="icon-btn notification-badge"
        onClick={() => setShowPanel(!showPanel)}
      >
        🔔
        {unreadCount > 0 && (
          <span className="badge-count">{unreadCount}</span>
        )}
      </button>

      {showPanel && (
        <div className="notification-panel">
          <div className="panel-header">
            <h3>Notifications</h3>
            <button onClick={() => setShowPanel(false)}>✕</button>
          </div>
          
          <div className="notification-list">
            {notifications.length === 0 ? (
              <p className="empty-message">No notifications</p>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                >
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="notification-time">
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default NotificationBell;