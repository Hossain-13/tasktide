import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings } from '../../store/slices/timerSlice';

function TimerSettings() {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.timer);
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (field, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    dispatch(updateSettings(localSettings));
  };

  return (
    <div className="timer-settings">
      <h3>Timer Settings</h3>
      
      <div className="form-group">
        <label>Pomodoro Duration (minutes)</label>
        <input
          type="number"
          value={localSettings.pomodoroDuration}
          onChange={(e) => handleChange('pomodoroDuration', parseInt(e.target.value))}
          min="1"
          max="60"
        />
      </div>

      <div className="form-group">
        <label>Short Break (minutes)</label>
        <input
          type="number"
          value={localSettings.shortBreakDuration}
          onChange={(e) => handleChange('shortBreakDuration', parseInt(e.target.value))}
          min="1"
          max="30"
        />
      </div>

      <div className="form-group">
        <label>Long Break (minutes)</label>
        <input
          type="number"
          value={localSettings.longBreakDuration}
          onChange={(e) => handleChange('longBreakDuration', parseInt(e.target.value))}
          min="1"
          max="60"
        />
      </div>

      <button className="btn-primary" onClick={handleSave}>
        Save Settings
      </button>
    </div>
  );
}

export default TimerSettings;