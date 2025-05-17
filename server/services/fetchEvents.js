const axios = require('axios');
const analyzeSentiment = require('../utils/sentimentAnalysis');
const moment = require('moment');
const Event = require('../models/eventModel');

const fetchEvents = async (startDate, endDate) => {
  try {
    // Set default dates to current week if not provided
    const start = startDate ? moment(startDate).format('YYYY-MM-DD') : moment().startOf('week').format('YYYY-MM-DD');
    const end = endDate ? moment(endDate).format('YYYY-MM-DD') : moment().endOf('week').format('YYYY-MM-DD');
    
    // Check for events in database within the date range
    const existingEvents = await Event.find({
      date: {
        $gte: moment(start).toDate(),
        $lte: moment(end).toDate()
      }
    });
    
    // If we have events for this date range, return them
    if (existingEvents && existingEvents.length > 0) {
      return existingEvents;
    }
    
    // If no events in DB, fetch from API
    const API_KEY = process.env.TRADING_ECONOMICS_API_KEY;
    // Use the format from the API documentation - country/All/start/end
    const url = `https://api.tradingeconomics.com/calendar/country/All/${start}/${end}?c=${API_KEY}`;
    
    const { data } = await axios.get(url);
    
    if (!data || data.length === 0) {
      return [];
    }

    const formattedEvents = data.map(event => {
      const sentiment = analyzeSentiment(event);
      return {
        date: event.Date,
        event: event.Event,
        country: event.Country,
        category: event.Category || '',
        forecast: event.Forecast || event.TEForecast || '',
        actual: event.Actual || '',
        previous: event.Previous || '',
        importance: event.Importance || 1,
        sentiment,
      };
    });

    if (formattedEvents.length > 0) {
      await Event.insertMany(formattedEvents, { ordered: false });
      return formattedEvents;
    }
    
    return [];
  } catch (error) {
    throw error;
  }
};

module.exports = fetchEvents;