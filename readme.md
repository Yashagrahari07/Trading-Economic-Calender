# Trading Economic Calendar

This project fetches and displays high-impact economic event data for the current week using the TradingEconomics API. It provides backend functionality to filter, search, and analyze events based on market impact.

---

## Setup Instructions

### Prerequisites
1. Install [Node.js](https://nodejs.org/) (v14 or higher).
2. Install [MongoDB](https://www.mongodb.com/) and ensure it is running locally or provide a connection URI.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Trade-Economic-Calendar.git
   cd Trade-Economic-Calendar
2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the server directory:
    ```env
    TRADING_ECONOMICS_API_KEY=your_api_key
    MONGODB_URI=your_mongodb_uri
    PORT=5000
    ```

4. Start the server:
    ```bash
    npm start
    ```

## API Documentation

### Endpoints

#### GET /api/events
Fetches high-impact economic events for the current week.

Response:
```json
{
  "events": [
     {
        "id": "string",
        "date": "2023-XX-XX",
        "country": "string",
        "event": "string",
        "impact": "high",
        "forecast": "number",
        "previous": "number"
     }
  ]
}
```

#### GET /api/events/filter
Filter events by various parameters.

Query Parameters:
- `country`: Filter by country
- `eventType`: Filter by event type
- `sentiment`: Filter by market sentiment
- `search`: Search events by name
- `sortBy`: Sort by date or sentiment

## Next Steps
- Implement frontend interface
- Add user authentication
- Enable custom event notifications

## License
MIT License