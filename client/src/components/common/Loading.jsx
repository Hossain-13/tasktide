import React from 'react';

function Loading({ fullScreen = false, message = 'Loading...' }) {
  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className="spinner"></div>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}

export default Loading;