# Trading Economic Calendar

This project fetches and displays high-impact economic event data using the TradingEconomics API. It provides backend functionality to filter, search, and analyze events based on market impact, along with a React-based frontend featuring a calendar UI to display and interact with the data for specific date ranges.

---

## Setup Instructions

### Prerequisites
1. Install [Node.js](https://nodejs.org/) (v14 or higher).
2. Install [MongoDB](https://www.mongodb.com/) and ensure it is running locally or provide a connection URI.

### Steps

#### Backend (Server)
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory with the following content:
   ```env
   TRADING_ECONOMICS_API_KEY=your_api_key
   MONGO_URI=your_mongodb_uri
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```

#### Frontend (Client)
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser at `http://localhost:5173`.

---

## Project Structure

### Server
- **`server.js`**: Entry point for the backend server.
- **`app.js`**: Configures Express, connects to MongoDB, and sets up routes.
- **`routes/event.js`**: Defines API endpoints for fetching and filtering events.
- **`services/fetchEvents.js`**: Fetches economic events from the TradingEconomics API and processes them.
- **`models/eventModel.js`**: Mongoose schema for storing event data.
- **`utils/sentimentAnalysis.js`**: Analyzes the sentiment of economic events.

### Client
- **`src/App.jsx`**: Main React component that renders the application.
- **`src/components/FilterBar.jsx`**: Component for filtering events.
- **`src/components/DateRangePicker.jsx`**: Component for selecting date ranges.
- **`src/components/EventTable.jsx`**: Component for displaying events in a table.
- **`src/api.js`**: Handles API requests to the backend.
- **`src/styles.css`**: Global styles for the application.

---

## AI Analysis Logic
The project includes basic AI logic to determine the sentiment of economic events based on predefined rules:

- **`CPI (Consumer Price Index)`**: If Actual > Forecast, signal Bearish 🔴 (inflation rising → rate hikes expected).
- **`NFP (Non-Farm Payrolls)`**: If Actual > Forecast, signal Bullish 🟢 (strong employment data → stronger economy).
- **`FOMC (Federal Open Market Committee)`**: Analyze rate hikes vs. cuts:
  - **Rate hike** = Bearish 🔴
  - **Rate cut** = Bullish 🟢
- **`PMI (Purchasing Managers' Index)`**: 
  - Above 50 = Bullish 🟢 (expansion)
  - Below 50 = Bearish 🔴 (contraction)
- **`GDP`**: If Actual > Forecast, signal Bullish 🟢 (stronger economic growth).
- **`Unknown Events`**: Default to Neutral.

---

## API Documentation

### Endpoints

#### GET `/api/events`
Fetches economic events for a specific date range (defaults to current week if no dates provided).

Query Parameters:
- `startDate`: Start date in YYYY-MM-DD format
- `endDate`: End date in YYYY-MM-DD format

Response:
```json
[
  {
    "date": "2023-XX-XX",
    "event": "string",
    "country": "string",
    "category": "string",
    "forecast": "string",
    "actual": "string",
    "previous": "string",
    "importance": 1,
    "sentiment": "string",
    "highImpact": true
  }
]
```

#### GET `/api/events/filter`
Filters events based on query parameters.

Query Parameters:
- `country`: Filter by country.
- `eventType`: Filter by event type.
- `sentiment`: Filter by market sentiment (e.g., `Bullish 🟢`, `Bearish 🔴`, `Neutral`).
- `search`: Search events by name.
- `startDate`: Filter events from this date (YYYY-MM-DD).
- `endDate`: Filter events until this date (YYYY-MM-DD).
- `sortBy`: Sort by `date`, `importance`, `country`, or `sentiment`.

---

## Features
- **Backend**:
  - Fetches economic events from the TradingEconomics API.
  - Analyzes market sentiment for events.
  - Stores events in MongoDB.
  - Provides filtering, date range selection, and sorting functionality via API.

- **Frontend**:
  - Date range selector with preset options (current week, current month).
  - Displays events in a table with filtering and search options.
  - Highlights high-impact events.
  - Responsive design for desktop and mobile.

---

## Next Steps
- Add user authentication.
- Enable custom event notifications.
- Add historical data analysis and trends.
- Implement data visualization with charts.
- Enhance UI/UX with additional features.