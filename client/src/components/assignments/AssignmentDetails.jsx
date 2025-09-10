import React from 'react';
import { formatDateTime } from '../../utils/dateHelpers';

function AssignmentDetails({ assignment, onEdit, onClose }) {
  if (!assignment) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{assignment.title}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="detail-section">
            <h3>Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Course:</span>
                <span>{assignment.courseName || 'No course'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Due Date:</span>
                <span>{formatDateTime(assignment.dueDate)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Priority:</span>
                <span className={`priority-badge ${assignment.priority}`}>
                  {assignment.priority}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className={`status-badge ${assignment.status}`}>
                  {assignment.status}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Estimated Time:</span>
                <span>{assignment.estimatedTime} minutes</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Time Spent:</span>
                <span>{assignment.totalTimeSpent || 0} minutes</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Pomodoros:</span>
                <span>{assignment.pomodoroCount || 0}</span>
              </div>
            </div>
          </div>

          {assignment.description && (
            <div className="detail-section">
              <h3>Description</h3>
              <p className="description-text">{assignment.description}</p>
            </div>
          )}

          {assignment.links && assignment.links.length > 0 && (
            <div className="detail-section">
              <h3>Links</h3>
              <ul className="links-list">
                {assignment.links.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.title || link.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {assignment.tags && assignment.tags.length > 0 && (
            <div className="detail-section">
              <h3>Tags</h3>
              <div className="tags-container">
                {assignment.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn-primary" onClick={() => onEdit(assignment)}>
            Edit Assignment
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignmentDetails;