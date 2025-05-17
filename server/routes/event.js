const express = require('express');
const router = express.Router();
const fetchEvents = require('../services/fetchEvents');
const Event = require('../models/eventModel');

// Get events for date range or default to current week
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    // Set response headers to prevent caching
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    const events = await fetchEvents(startDate, endDate);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
});

// Route to clear the database for testing purposes
router.get('/reset', async (req, res) => {
  try {
    await Event.deleteMany({});
    res.json({ message: 'Database cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing database', error: error.message });
  }
});

// Advanced filtering options
router.get('/filter', async (req, res) => {
  const { country, eventType, sentiment, search, sortBy, startDate, endDate } = req.query;
  
  // If date parameters are present, fetch fresh data first
  if (startDate || endDate) {
    try {
      // Set response headers to prevent caching
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      // Get fresh data for this date range
      await fetchEvents(startDate, endDate);
    } catch (error) {
      // If fetch fails, continue with existing database data
    }
  }

  // Build query based on filters
  const query = {};
  
  // Apply country filter (partial matching)
  if (country) query.country = new RegExp(country, 'i');
  
  // Apply event type filter (partial matching)
  if (eventType) query.event = new RegExp(eventType, 'i');
  
  // Apply sentiment filter (exact matching)
  if (sentiment) query.sentiment = sentiment;
  
  // Search in event name, country, or category
  if (search) {
    query.$or = [
      { event: new RegExp(search, 'i') },
      { country: new RegExp(search, 'i') },
      { category: new RegExp(search, 'i') }
    ];
  }
  
  // Add date range if provided
  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  // Set sort options
  const sortOptions = {};
  if (sortBy === 'date') sortOptions.date = 1;
  if (sortBy === 'importance') sortOptions.importance = -1;
  if (sortBy === 'country') sortOptions.country = 1;
  if (sortBy === 'sentiment') sortOptions.sentiment = 1;

  try {
    const events = await Event.find(query).sort(sortOptions);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering events', error: error.message });
  }
});

module.exports = router;
