import React from 'react';

const EventTable = ({ events }) => {
  return (
    <table className="event-table">
      <thead>
        <tr>
          <th>Date & Time</th>
          <th>Event Name</th>
          <th>Country</th>
          <th>Forecast</th>
          <th>Actual</th>
          <th>Previous</th>
          <th>Market Impact</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, index) => (
          <tr key={index} className={event.highImpact ? 'high-impact' : ''}>
            <td>{new Date(event.date).toLocaleString()}</td>
            <td>{event.event}</td>
            <td>{event.country}</td>
            <td>{event.forecast}</td>
            <td>{event.actual || 'Pending'}</td>
            <td>{event.previous}</td>
            <td>{event.sentiment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;