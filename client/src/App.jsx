import React, { useState, useEffect } from 'react';
import { fetchEvents } from './api';
import EventTable from './components/EventTable';
import FilterBar from './components/FilterBar';
import moment from 'moment';
import './styles.css';

const App = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set default date range to current week
  const defaultDateRange = {
    startDate: moment().startOf('week').format('YYYY-MM-DD'),
    endDate: moment().endOf('week').format('YYYY-MM-DD')
  };

  // Load events on initial load
  useEffect(() => {
    loadEvents(defaultDateRange.startDate, defaultDateRange.endDate);
  }, []);

  // Function to load events from backend
  const loadEvents = async (startDate, endDate) => {
    // Prevent form submission and page reload
    try {
      setLoading(true);
      setError(null);
      
      // Log the date range being requested
      console.log(`Fetching events from ${startDate} to ${endDate}`);
      
      const data = await fetchEvents(startDate, endDate);
      setAllEvents(data);
      setFilteredEvents(data);
    } catch (err) {
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle client-side filtering
  const handleFilter = (filters) => {
    const { country, eventType, sentiment, search } = filters;
    
    // Apply client-side filtering
    const filtered = allEvents.filter((event) => {
      // Country filter (partial match)
      const matchesCountry = !country || 
        event.country.toLowerCase().includes(country.toLowerCase());
      
      // Event type filter (partial match)
      const matchesEventType = !eventType || 
        event.event.toLowerCase().includes(eventType.toLowerCase()) ||
        (event.category && event.category.toLowerCase().includes(eventType.toLowerCase()));
      
      // Sentiment filter (exact match)
      const matchesSentiment = !sentiment || 
        event.sentiment === sentiment;
      
      // General search (across multiple fields)
      const matchesSearch = !search || 
        event.event.toLowerCase().includes(search.toLowerCase()) ||
        event.country.toLowerCase().includes(search.toLowerCase()) ||
        (event.category && event.category.toLowerCase().includes(search.toLowerCase()));
      
      return matchesCountry && matchesEventType && matchesSentiment && matchesSearch;
    });
    
    setFilteredEvents(filtered);
  };

  // Prevent default form submission for the entire app
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    return false;
  };

  return (
    <div className="app" onSubmit={handleSubmit}>
      <header>
        <h1>Trading Economic Calendar</h1>
        <p>Track high-impact economic events and market predictions</p>
      </header>
      
      <FilterBar 
        onFilter={handleFilter} 
        onDateRangeChange={loadEvents}
      />
      
      <div className="content">
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading">Loading events...</div>
        ) : filteredEvents.length > 0 ? (
          <EventTable events={filteredEvents} />
        ) : (
          <div className="no-events">No events found for the selected criteria</div>
        )}
      </div>
      
      <footer>
        <p>Data provided by Trading Economics API</p>
      </footer>
    </div>
  );
};

export default App;
