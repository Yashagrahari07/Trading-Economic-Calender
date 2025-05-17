import axios from 'axios';

const API_BASE_URL = 'https://trading-economic-calender-api.onrender.com/api/events';

export const fetchEvents = async (startDate, endDate) => {
  try {
    let url = API_BASE_URL;
    
    // Add date parameters if provided
    if (startDate || endDate) {
      url += '?';
      if (startDate) url += `startDate=${startDate}`;
      if (startDate && endDate) url += '&';
      if (endDate) url += `endDate=${endDate}`;
    }
    
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Throw the error so it can be handled by the component
    throw new Error(error.message || 'Error fetching events');
  }
};

export const filterEvents = async (filters) => {
  const { country, eventType, sentiment, search, startDate, endDate } = filters;
  
  try {
    // Build query string
    const params = new URLSearchParams();
    if (country) params.append('country', country);
    if (eventType) params.append('eventType', eventType);
    if (sentiment) params.append('sentiment', sentiment);
    if (search) params.append('search', search);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await axios.get(`${API_BASE_URL}/filter?${params.toString()}`);
    return response.data;
  } catch (error) {
    // Throw the error so it can be handled by the component
    throw new Error(error.message || 'Error filtering events');
  }
};