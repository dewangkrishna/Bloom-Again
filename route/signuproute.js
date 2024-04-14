module.exports = function(db) {
    const express = require('express');
    const router = express.Router();
  
    const queryAsync = (sql, params) => new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
  
    router.post('/', async (req, res) => {
        const { username, email, password } = req.body;
        console.log(username, email, password);
        try {
            // Insert the user data into the database
            await queryAsync("INSERT INTO login (username, email, password) VALUES (?, ?, ?)", [username, email, password]);
            
            res.status(200).send('User created successfully');
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send('Internal server error');
        }
    });
  
    return router;
};
