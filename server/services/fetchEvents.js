const axios = require('axios');
const analyzeSentiment = require('../utils/sentimentAnalysis');
const moment = require('moment');
const Event = require('../models/eventModel');

const fetchEvents = async () => {
  const API_KEY = process.env.TRADING_ECONOMICS_API_KEY;
  const url = `https://api.tradingeconomics.com/calendar?c=${API_KEY}`;

  const { data } = await axios.get(url);

  const currentWeekStart = moment().startOf('week');
  const currentWeekEnd = moment().endOf('week');

  const formattedEvents = data
    .filter(event => {
      const eventDate = moment(event.Date);
      return eventDate.isBetween(currentWeekStart, currentWeekEnd, 'day', '[]');
    })
    .map(event => {
      const sentiment = analyzeSentiment(event);
      return {
        date: event.Date,
        event: event.Event,
        country: event.Country,
        forecast: event.Forecast || '',
        actual: event.Actual || '',
        previous: event.Previous || '',
        sentiment,
      };
    });

  await Event.insertMany(formattedEvents);

  return formattedEvents;
};

module.exports = fetchEvents;