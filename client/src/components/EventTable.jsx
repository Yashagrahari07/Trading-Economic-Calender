import React from 'react';

const EventTable = ({ events }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="table-container">
      <table className="event-table">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Country</th>
            <th>Event Name</th>
            <th>Forecast</th>
            <th>Actual</th>
            <th>Previous</th>
            <th>Market Impact</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 ? (
            <tr>
              <td colSpan="7" className="no-data">No events found</td>
            </tr>
          ) : (
            events.map((event, index) => (
              <tr key={index} className={event.highImpact ? 'high-impact' : ''}>
                <td>{formatDate(event.date)}</td>
                <td>{event.country}</td>
                <td title={event.category}>{event.event}</td>
                <td>{event.forecast || '-'}</td>
                <td>{event.actual || 'Pending'}</td>
                <td>{event.previous || '-'}</td>
                <td className={
                  event.sentiment.includes('Bullish') ? 'bullish' : 
                  event.sentiment.includes('Bearish') ? 'bearish' : 'neutral'
                }>
                  {event.sentiment}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;