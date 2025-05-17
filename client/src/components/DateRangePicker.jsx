import React from 'react';
import moment from 'moment';

const DateRangePicker = ({ startDate, endDate, onDateChange }) => {
  const handleStartDateChange = (e) => {
    onDateChange('startDate', e.target.value);
  };

  const handleEndDateChange = (e) => {
    onDateChange('endDate', e.target.value);
  };

  const setCurrentWeek = (e) => {
    e.preventDefault(); // Prevent form submission
    const start = moment().startOf('week').format('YYYY-MM-DD');
    const end = moment().endOf('week').format('YYYY-MM-DD');
    onDateChange('startDate', start);
    onDateChange('endDate', end);
  };

  const setCurrentMonth = (e) => {
    e.preventDefault(); // Prevent form submission
    const start = moment().startOf('month').format('YYYY-MM-DD');
    const end = moment().endOf('month').format('YYYY-MM-DD');
    onDateChange('startDate', start);
    onDateChange('endDate', end);
  };
  
  const setPrevWeek = (e) => {
    e.preventDefault(); // Prevent form submission
    const start = moment().subtract(1, 'week').startOf('week').format('YYYY-MM-DD');
    const end = moment().subtract(1, 'week').endOf('week').format('YYYY-MM-DD');
    onDateChange('startDate', start);
    onDateChange('endDate', end);
  };

  return (
    <div className="date-range-picker">
      <h3>Select Date Range</h3>
      <div className="date-inputs">
        <div className="input-group">
          <label htmlFor="startDate">From:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="endDate">To:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>
      
      <div className="date-presets">
        <button 
          type="button" 
          onClick={setPrevWeek} 
          title="Previous week"
        >
          Prev Week
        </button>
        <button 
          type="button" 
          onClick={setCurrentWeek} 
          title="Current week"
        >
          This Week
        </button>
        <button 
          type="button" 
          onClick={setCurrentMonth} 
          title="Current month"
        >
          This Month
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker; 