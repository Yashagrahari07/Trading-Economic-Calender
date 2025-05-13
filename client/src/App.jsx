import React, { useState, useEffect } from 'react';
import { fetchEvents, filterEvents } from './api';
import EventTable from './components/EventTable';
import FilterBar from './components/FilterBar';
import './styles.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents();
      setEvents(data);
      setLoading(false);
    };
    loadEvents();
  }, []);

  const handleFilter = async (filters) => {
    setLoading(true);
    const data = await filterEvents(filters);
    setEvents(data);
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>Trading Economic Calendar</h1>
      <FilterBar onFilter={handleFilter} />
      {loading ? <p>Loading...</p> : <EventTable events={events} />}
    </div>
  );
};

export default App;
