import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../store/slices/uiSlice';
import TimerSettings from '../components/timer/TimerSettings';
import NotificationSettings from '../components/notifications/NotificationSettings';

function Settings() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.ui);
  const [activeTab, setActiveTab] = useState('appearance');

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-layout">
        <div className="settings-nav">
          <button 
            className={activeTab === 'appearance' ? 'active' : ''}
            onClick={() => setActiveTab('appearance')}
          >
            🎨 Appearance
          </button>
          <button 
            className={activeTab === 'timer' ? 'active' : ''}
            onClick={() => setActiveTab('timer')}
          >
            ⏱️ Timer
          </button>
          <button 
            className={activeTab === 'notifications' ? 'active' : ''}
            onClick={() => setActiveTab('notifications')}
          >
            🔔 Notifications
          </button>
        </div>

        <div className="settings-content">
          {activeTab === 'appearance' && (
            <div>
              <h2>Appearance Settings</h2>
              <div className="theme-selector">
                <button 
                  className={theme === 'light' ? 'active' : ''}
                  onClick={() => dispatch(setTheme('light'))}
                >
                  ☀️ Light
                </button>
                <button 
                  className={theme === 'dark' ? 'active' : ''}
                  onClick={() => dispatch(setTheme('dark'))}
                >
                  🌙 Dark
                </button>
              </div>
            </div>
          )}

          {activeTab === 'timer' && <TimerSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
        </div>
      </div>
    </div>
  );
}

export default Settings;