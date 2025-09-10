import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, clearFilters } from '../../store/slices/assignmentSlice';
import { PRIORITY_LEVELS, ASSIGNMENT_STATUS } from '../../utils/constants';

function FilterPanel() {
  const dispatch = useDispatch();
  const { filters = { status: 'all', priority: 'all', search: '' } } =
    useSelector((state) => state.assignments || {});

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilter({ [filterType]: value }));
  };

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label className="filter-label">Status</label>
        <select
          className="filter-select"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="all">All Status</option>
          {Object.values(ASSIGNMENT_STATUS).map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Priority</label>
        <select
          className="filter-select"
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
        >
          <option value="all">All Priorities</option>
          {Object.values(PRIORITY_LEVELS).map(priority => (
            <option key={priority} value={priority}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button 
        className="btn-secondary"
        onClick={() => dispatch(clearFilters())}
      >
        Clear Filters
      </button>
    </div>
  );
}

export default FilterPanel;