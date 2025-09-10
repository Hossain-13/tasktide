import React from 'react';

function SubjectBreakdown({ courses = [] }) {
  return (
    <div className="subject-breakdown">
      <h3>Subject Progress</h3>
      <div className="subject-list">
        {courses.map((course) => (
          <div key={course.id} className="subject-item">
            <div className="subject-header">
              <span className="subject-name">{course.name}</span>
              <span className="subject-percent">{course.completionRate}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${course.completionRate}%`,
                  backgroundColor: course.color 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubjectBreakdown;