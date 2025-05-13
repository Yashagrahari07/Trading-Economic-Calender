import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/events';

export const fetchEvents = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const filterEvents = async (filters) => {
  const { country, eventType, sentiment, search } = filters;

  // Fetch all events (or use cached data)
  const allEvents = await fetchEvents();

  // Apply partial matching
  return allEvents.filter((event) => {
    const matchesCountry = country
      ? event.country.toLowerCase().includes(country.toLowerCase())
      : true;
    const matchesEventType = eventType
      ? event.event.toLowerCase().includes(eventType.toLowerCase())
      : true;
    const matchesSentiment = sentiment
      ? event.sentiment.toLowerCase() === sentiment.toLowerCase()
      : true;
    const matchesSearch = search
      ? event.event.toLowerCase().includes(search.toLowerCase()) ||
        event.country.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchesCountry && matchesEventType && matchesSentiment && matchesSearch;
  });
};