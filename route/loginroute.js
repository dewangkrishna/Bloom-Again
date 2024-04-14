module.exports = function(db) {
  const express = require('express');
  const router = express.Router();

  const queryAsync = (sql, params) => new Promise((resolve, reject) => {
      db.query(sql, params, (err, results) => {
          if (err) reject(err);
          else resolve(results);
      });
  });

  router.post('/loginuser', async (req, res) => {
      const { username, password } = req.body;
      console.log(username, password);
      try {
          const users = await queryAsync("SELECT * FROM login WHERE username = ?", [username]);
          if (users.length > 0) {
              const user = users[0];
              console.log(user);
              console.log(user.Password);

              if (user.Password === password) {
                  res.status(200).send('Login successful');
              } else {
                  res.status(401).send('Invalid password');
              }
          } else {
              // await queryAsync("INSERT INTO login (username, password) VALUES (?, ?)", [username, password]);
              // res.status(200).send('User created successfully');
              res.status(401).send('Invalid username');
          }
      } catch (error) {
          console.error("Error:", error);
          res.status(500).send('Internal server error');
      }
  });

  return router;
};
