const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: Date,
  event: String,
  country: String,
  forecast: String,
  actual: String,
  previous: String,
  sentiment: String,
  details: String,
  highImpact: { type: Boolean, default: false }, 
});

eventSchema.pre('save', function (next) {
  const highImpactKeywords = ['CPI', 'NFP', 'FOMC', 'Interest Rate'];
  this.highImpact = highImpactKeywords.some(keyword =>
    this.event.toLowerCase().includes(keyword.toLowerCase())
  );
  next();
});

module.exports = mongoose.model('Event', eventSchema);