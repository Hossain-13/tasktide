import React, { useEffect, useState } from 'react';
import './styles/globals.css';

function App() {
  const [serverStatus, setServerStatus] = useState('Checking...');
  const [apiData, setApiData] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Test backend connection
    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => {
        setServerStatus('✅ Connected');
        console.log('Server response:', data);
        
        // Test API endpoint
        return fetch('http://localhost:5000/api/test');
      })
      .then(res => res.json())
      .then(data => {
        setApiData(data.data);
      })
      .catch(err => {
        setServerStatus('❌ Not connected - Start server with: cd server && npm run dev');
        console.error('Error:', err);
      });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{ 
          color: 'var(--primary-blue)',
          fontSize: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          🌊 TaskTide
        </h1>
        <button 
          onClick={toggleTheme}
          className="btn btn-secondary"
        >
          {theme === 'light' ? '🌙' : '☀️'} Toggle Theme
        </button>
      </div>

      {/* Status Card */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
          📊 System Status
        </h2>
        
        <div style={{ display: 'grid', gap: '12px' }}>
          <div style={{ 
            padding: '12px',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)'
          }}>
            <strong>Frontend:</strong> ✅ Running on http://localhost:3000
          </div>
          
          <div style={{ 
            padding: '12px',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)'
          }}>
            <strong>Backend:</strong> {serverStatus}
          </div>
          
          <div style={{ 
            padding: '12px',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)'
          }}>
            <strong>Theme:</strong> {theme === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </div>
        </div>
      </div>

      {/* Test Data from API */}
      {apiData && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
            📈 Test API Data
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{
              padding: '20px',
              backgroundColor: 'var(--primary-yellow)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-blue)' }}>
                {apiData.courses}
              </div>
              <div style={{ color: 'var(--primary-blue)', fontSize: '0.875rem' }}>Courses</div>
            </div>
            
            <div style={{
              padding: '20px',
              backgroundColor: 'var(--periwinkle)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
                {apiData.assignments}
              </div>
              <div style={{ color: 'white', fontSize: '0.875rem' }}>Assignments</div>
            </div>
            
            <div style={{
              padding: '20px',
              backgroundColor: 'var(--success)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
                {apiData.completed}
              </div>
              <div style={{ color: 'white', fontSize: '0.875rem' }}>Completed</div>
            </div>
          </div>
        </div>
      )}

      {/* Test Components */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
          🧪 Component Tests
        </h2>
        
        <div style={{ display: 'grid', gap: '16px' }}>
          {/* Test Buttons */}
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>
              Buttons:
            </h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-yellow">Yellow</button>
              <button className="btn btn-primary" disabled>Disabled</button>
            </div>
          </div>

          {/* Test Form Elements */}
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>
              Form Elements:
            </h3>
            <div className="form-group">
              <label className="form-label">Test Input</label>
              <input className="form-input" type="text" placeholder="Type something..." />
            </div>
            <div className="form-group">
              <label className="form-label">Test Select</label>
              <select className="form-select">
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
          </div>

          {/* Test Loading Spinner */}
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>
              Loading Spinner:
            </h3>
            <div className="spinner"></div>
          </div>
        </div>
      </div>

      {/* Files Status */}
      <div className="card">
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
          ✅ Files Created
        </h2>
        <div style={{ 
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          backgroundColor: 'var(--bg-tertiary)',
          padding: '16px',
          borderRadius: 'var(--radius-md)'
        }}>
          <div>✓ client/src/styles/globals.css</div>
          <div>✓ client/src/styles/variables.css</div>
          <div>✓ client/src/utils/constants.js</div>
          <div>✓ client/src/utils/dateHelpers.js</div>
          <div>✓ client/src/utils/validators.js</div>
          <div>✓ client/src/utils/timerHelpers.js</div>
          <div>✓ client/src/utils/exportHelpers.js</div>
          <div>✓ server/utils/cronJobs.js</div>
          <div>✓ server/utils/validators.js</div>
          <div>✓ server/utils/logger.js</div>
        </div>
      </div>
    </div>
  );
}

export default App;