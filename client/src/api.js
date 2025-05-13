import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/events';

export const fetchEvents = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const filterEvents = async (filters) => {
  const query = new URLSearchParams(filters).toString();
  const response = await axios.get(`${API_BASE_URL}/filter?${query}`);
  return response.data;
};