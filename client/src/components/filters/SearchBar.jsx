import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../store/slices/assignmentSlice';

function SearchBar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    dispatch(setFilter({ search: value }));
  };

  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search assignments..."
        value={search}
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;