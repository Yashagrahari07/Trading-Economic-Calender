const express = require('express');
const router = express.Router();
const fetchEvents = require('../services/fetchEvents');
const Event = require('../models/eventModel');

router.get('/', async (req, res) => {
  try {
    const events = await fetchEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
});

router.get('/filter', async (req, res) => {
  const { country, eventType, sentiment, search, sortBy } = req.query;

  const query = {};
  if (country) query.country = country;
  if (eventType) query.event = new RegExp(eventType, 'i');
  if (sentiment) query.sentiment = sentiment;
  if (search) query.event = new RegExp(search, 'i');

  const sortOptions = {};
  if (sortBy === 'date') sortOptions.date = 1;
  if (sortBy === 'sentiment') sortOptions.sentiment = 1;

  try {
    const events = await Event.find(query).sort(sortOptions);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering events', error: error.message });
  }
});

module.exports = router;
