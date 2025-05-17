import React, { useState } from 'react';
import DateRangePicker from './DateRangePicker';
import moment from 'moment';

const FilterBar = ({ onFilter, onDateRangeChange }) => {
  const [filters, setFilters] = useState({
    country: '',
    eventType: '',
    sentiment: '',
    search: '',
    startDate: moment().startOf('week').format('YYYY-MM-DD'),
    endDate: moment().endOf('week').format('YYYY-MM-DD'),
  });

  // Handle regular filter inputs (client-side filtering)
  const handleChange = (e) => {
    e.preventDefault(); // Prevent any form submission
    const updatedFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  // Handle date changes (server-side data fetch)
  const handleDateChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    
    // Always fetch new data when date range changes
    onDateRangeChange(
      updatedFilters.startDate, 
      updatedFilters.endDate
    );
  };

  // Prevent form submission if Enter is pressed
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className="filter-section" onSubmit={(e) => e.preventDefault()}>
      <DateRangePicker 
        startDate={filters.startDate}
        endDate={filters.endDate}
        onDateChange={handleDateChange}
      />
      
      <div className="filter-bar">
        <div className="filter-input">
          <input
            type="text"
            name="country"
            placeholder="Filter by Country"
            value={filters.country}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            title="Enter a country name (e.g., USA, Japan, Germany)"
          />
          <small>Enter country name (e.g., US, Japan)</small>
        </div>
        
        <div className="filter-input">
          <input
            type="text"
            name="eventType"
            placeholder="Filter by Event Type"
            value={filters.eventType}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            title="Enter an event type (e.g., GDP, CPI, NFP, PMI, FOMC)"
          />
          <small>Enter event type (e.g., GDP, CPI, NFP)</small>
        </div>
        
        <div className="filter-input">
          <select 
            name="sentiment" 
            value={filters.sentiment} 
            onChange={handleChange}
            title="Select market impact prediction"
          >
            <option value="">All Market Impact</option>
            <option value="Bullish 🟢">Bullish 🟢</option>
            <option value="Bearish 🔴">Bearish 🔴</option>
            <option value="Neutral">Neutral</option>
          </select>
          <small>Market impact prediction</small>
        </div>
        
        <div className="filter-input search-input">
          <input
            type="text"
            name="search"
            placeholder="Search across all fields"
            value={filters.search}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            title="Search across all fields (country, event, category)"
          />
          <small>Search all fields</small>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;