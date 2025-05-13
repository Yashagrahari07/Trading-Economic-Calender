module.exports = function analyzeSentiment(event) {
  const actual = parseFloat(event.Actual?.replace('%', '') || 0);
  const forecast = parseFloat(event.Forecast?.replace('%', '') || 0);
  const eventName = event.Event?.toLowerCase() || '';

  if (!actual && !forecast) return 'Neutral';

  if (eventName.includes('cpi')) {
    return actual > forecast ? 'Bearish 🔴' : 'Bullish 🟢';
  } else if (eventName.includes('non-farm') || eventName.includes('nfp')) {
    return actual > forecast ? 'Bullish 🟢' : 'Bearish 🔴';
  } else if (eventName.includes('fomc') || eventName.includes('interest rate')) {
    if (event.Actual > event.Previous) return 'Bearish 🔴';
    if (event.Actual < event.Previous) return 'Bullish 🟢';
    return 'Neutral';
  }

  return 'Neutral';
};
