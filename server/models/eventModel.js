const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: Date,
  event: String,
  country: String,
  forecast: String,
  actual: String,
  previous: String,
  sentiment: String,
  importance: Number,
  category: String,
  details: String,
  highImpact: { type: Boolean, default: false }, 
});

eventSchema.pre('save', function (next) {
  // High impact events by keywords
  const highImpactKeywords = ['CPI', 'NFP', 'FOMC', 'Interest Rate', 'GDP', 'Employment'];
  
  // Set highImpact based on keywords or importance value from API (if 3 is highest)
  this.highImpact = 
    this.importance >= 3 || 
    highImpactKeywords.some(keyword =>
      this.event?.toLowerCase().includes(keyword.toLowerCase()) ||
      this.category?.toLowerCase().includes(keyword.toLowerCase())
    );
    
  next();
});

module.exports = mongoose.model('Event', eventSchema);