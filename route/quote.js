module.exports = function(db) {
    const express = require('express');
    const router = express.Router();
  
    const queryAsync = (sql, params) => new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
  
    // Route to fetch quotes from the database
    router.get('/', async (req, res) => {
        try {
            const quotes = await queryAsync("SELECT * FROM quotes");
            res.json(quotes);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send('Internal server error');
        }
    });
  
    // Route to save a new quote
    router.post('/save', async (req, res) => {
        const { quote, author } = req.body;
        try {
            await queryAsync("INSERT INTO quotes (Quote, name) VALUES (?, ?)", [quote, author]);
            res.status(200).send('Quote saved successfully');
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send('Internal server error');
        }
    });
  
    return router;
};
