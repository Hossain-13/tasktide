import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAssignments } from '../store/slices/assignmentSlice';
import AssignmentList from '../components/assignments/AssignmentList';
import AssignmentForm from '../components/assignments/AssignmentForm';
import AssignmentDetails from '../components/assignments/AssignmentDetails';
import FilterPanel from '../components/filters/FilterPanel';
import SortOptions from '../components/filters/SortOptions';

function Assignments() {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    dispatch(fetchAssignments());
  }, [dispatch]);

  return (
    <div className="assignments-page">
      <div className="page-header">
        <h1>Assignments</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Create Assignment
        </button>
      </div>

      <div className="filters-bar">
        <FilterPanel />
        <SortOptions />
      </div>

      <AssignmentList 
        onAssignmentClick={(assignment) => {
          setSelectedAssignment(assignment);
          setShowDetails(true);
        }}
      />

      {showForm && (
        <AssignmentForm 
          assignment={selectedAssignment}
          onClose={() => {
            setShowForm(false);
            setSelectedAssignment(null);
          }}
        />
      )}

      {showDetails && (
        <AssignmentDetails
          assignment={selectedAssignment}
          onEdit={(assignment) => {
            setShowDetails(false);
            setShowForm(true);
          }}
          onClose={() => {
            setShowDetails(false);
            setSelectedAssignment(null);
          }}
        />
      )}
    </div>
  );
}

export default Assignments;