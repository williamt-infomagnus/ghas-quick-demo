// Simple Express backend for Snake game
const express = require('express');
const sql = require('mssql');
require('dotenv').config();

const app = express();
app.use(express.json());

// Use environment variable for Azure SQL connection string
const sqlConfig = {
    connectionString: process.env.AZURE_SQL_CONNECTION_STRING,
    options: {
        encrypt: true // For Azure SQL
    }
};

// Endpoint to save score
app.post('/api/score', async (req, res) => {
    const { player, score } = req.body;
    if (!player || typeof score !== 'number') {
        return res.status(400).json({ error: 'Invalid input' });
    }
    try {
        await sql.connect(sqlConfig);
        await sql.query`INSERT INTO Scores (Player, Score) VALUES (${player}, ${score})`;
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to get top scores
app.get('/api/scores', async (req, res) => {
    try {
        await sql.connect(sqlConfig);
        const result = await sql.query`SELECT TOP 10 Player, Score FROM Scores ORDER BY Score DESC`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
