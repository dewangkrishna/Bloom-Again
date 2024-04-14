module.exports = function(db) {
    const express = require('express');
    const router = express.Router();
  
    const queryAsync = (sql, params) => new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
  
    // Route to fetch doctors data from the database
    router.get('/doctors', async (req, res) => {
        try {
            const doctors = await queryAsync("SELECT * FROM doctors");
            res.json(doctors);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send('Internal server error');
        }
    });
  
    // Route to handle appointment booking
    router.post('/book-appointment', async (req, res) => {
        const { Pname, Dname, Date } = req.body;
        console.log(Pname, Dname, Date);
        try {
            await queryAsync("INSERT INTO booking (Pname, Dname, Date) VALUES (?, ?, ?)", [Pname, Dname, Date]);
            res.status(200).send('Appointment booked successfully');
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send('Internal server error');
        }
    });
  
    return router;
};
