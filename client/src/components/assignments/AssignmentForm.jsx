import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createAssignment, updateAssignment } from '../../store/slices/assignmentSlice';
import { PRIORITY_LEVELS } from '../../utils/constants';

function AssignmentForm({ assignment, onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseId: '',
    dueDate: '',
    priority: 'medium',
    estimatedTime: 60,
    tags: [],
    links: [],
  });

  useEffect(() => {
    if (assignment) {
      setFormData({
        title: assignment.title || '',
        description: assignment.description || '',
        courseId: assignment.courseId || '',
        dueDate: assignment.dueDate ? 
          new Date(assignment.dueDate).toISOString().slice(0, 16) : '',
        priority: assignment.priority || 'medium',
        estimatedTime: assignment.estimatedTime || 60,
        tags: assignment.tags || [],
        links: assignment.links || [],
      });
    }
  }, [assignment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (assignment) {
      dispatch(updateAssignment({ 
        id: assignment.id, 
        data: formData 
      }));
    } else {
      dispatch(createAssignment(formData));
    }
    
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {assignment ? 'Edit Assignment' : 'Create New Assignment'}
          </h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              type="text"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Due Date *</label>
              <input
                type="datetime-local"
                name="dueDate"
                className="form-input"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                name="priority"
                className="form-select"
                value={formData.priority}
                onChange={handleChange}
              >
                {Object.values(PRIORITY_LEVELS).map(level => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Estimated Time (minutes)</label>
            <input
              type="number"
              name="estimatedTime"
              className="form-input"
              value={formData.estimatedTime}
              onChange={handleChange}
              min="1"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {assignment ? 'Update' : 'Create'} Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignmentForm;