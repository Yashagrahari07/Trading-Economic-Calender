import React, { useState } from 'react';

const FilterBar = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    country: '',
    eventType: '',
    sentiment: '',
    search: '',
  });

  const handleChange = (e) => {
    const updatedFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(updatedFilters);
    onFilter(updatedFilters); // Trigger the filter function on every change
  };

  return (
    <form className="filter-bar">
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={filters.country}
        onChange={handleChange}
      />
      <input
        type="text"
        name="eventType"
        placeholder="Event Type"
        value={filters.eventType}
        onChange={handleChange}
      />
      <select name="sentiment" value={filters.sentiment} onChange={handleChange}>
        <option value="">All Market Impact</option>
        <option value="Bullish 🟢">Bullish 🟢</option>
        <option value="Bearish 🔴">Bearish 🔴</option>
        <option value="Neutral">Neutral</option>
      </select>
      <input
        type="text"
        name="search"
        placeholder="Search"
        value={filters.search}
        onChange={handleChange}
      />
    </form>
  );
};

export default FilterBar;