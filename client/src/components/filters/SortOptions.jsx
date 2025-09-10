import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../../store/slices/assignmentSlice';

function SortOptions() {
  const dispatch = useDispatch();
  const { sortBy } = useSelector((state) => state.assignments);

  const sortOptions = [
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'title', label: 'Title' },
    { value: 'createdAt', label: 'Created Date' },
  ];

  return (
    <div className="sort-options">
      <label className="sort-label">Sort by:</label>
      <select
        className="sort-select"
        value={sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value))}
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortOptions;