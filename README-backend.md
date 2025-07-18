# Snake Game Backend

## Setup
1. Install dependencies:
   npm install express mssql dotenv
2. Set your Azure SQL connection string in `.env` as `AZURE_SQL_CONNECTION_STRING`.
3. Create the `Scores` table in your Azure SQL database using `Scores.sql`.
4. Start the backend:
   npm install
   node backend.js

## Endpoints
- POST `/api/score` with `{ player, score }` JSON to save a score.
- GET `/api/scores` to get top 10 scores.
