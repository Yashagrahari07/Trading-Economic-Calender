module.exports = function analyzeSentiment(event) {
  // Extract values with better handling of potential formats
  const actual = parseFloat((event.Actual || '0').replace('%', '').replace(',', '.'));
  const forecast = parseFloat((event.Forecast || event.TEForecast || '0').replace('%', '').replace(',', '.'));
  const previous = parseFloat((event.Previous || '0').replace('%', '').replace(',', '.'));
  const eventName = (event.Event || '').toLowerCase();
  const category = (event.Category || '').toLowerCase();
  
  // Handle case when we don't have enough data
  if (isNaN(actual) && isNaN(forecast) && isNaN(previous)) {
    return 'Neutral';
  }

  // CPI and Inflation related events
  if (eventName.includes('cpi') || 
      eventName.includes('inflation') || 
      category.includes('inflation') ||
      category.includes('price index') ||
      category.includes('cpi')) {
    return actual > forecast ? 'Bearish 🔴' : 'Bullish 🟢';
  } 
  
  // Employment data
  else if (eventName.includes('non-farm') || 
          eventName.includes('nfp') ||
          eventName.includes('employment') ||
          eventName.includes('payroll') || 
          category.includes('employment')) {
    return actual > forecast ? 'Bullish 🟢' : 'Bearish 🔴';
  } 
  
  // Interest rates and FOMC
  else if (eventName.includes('fomc') || 
          eventName.includes('interest rate') ||
          eventName.includes('rate decision') ||
          category.includes('interest rate')) {
    // Higher interest rates are generally bearish for markets
    if (!isNaN(actual) && !isNaN(previous)) {
      if (actual > previous) return 'Bearish 🔴';
      if (actual < previous) return 'Bullish 🟢';
    }
    return 'Neutral';
  }
  
  // GDP data
  else if (eventName.includes('gdp') || category.includes('gdp')) {
    return actual > forecast ? 'Bullish 🟢' : 'Bearish 🔴';
  }
  
  // PMI data
  else if (eventName.includes('pmi') || category.includes('pmi')) {
    // PMI above 50 is expansion, below is contraction
    if (!isNaN(actual)) {
      if (actual > 50) return 'Bullish 🟢';
      if (actual < 50) return 'Bearish 🔴';
      if (actual > forecast) return 'Bullish 🟢';
      if (actual < forecast) return 'Bearish 🔴';
    }
    return 'Neutral';
  }

  return 'Neutral';
};
