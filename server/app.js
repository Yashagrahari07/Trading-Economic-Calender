const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const eventsRoutes = require('./routes/event');

dotenv.config();

const app = express();

// Configure CORS to allow requests from client
app.use(cors({
  origin: ['https://trading-economic-calender.onrender.com'],
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

app.get('/', (req, res) => {
  res.send('Welcome to the Trading Economic Calender');
});
app.use('/api/events', eventsRoutes);

module.exports = app;
