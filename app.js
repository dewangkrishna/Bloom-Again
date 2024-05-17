// Import required modules
const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');

// Create Express app
const app = express();

// Configure database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

// Connect to the database
db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// Set the directory to serve static files like CSS, JavaScript, and images
app.use(express.static('public'));

// Import and configure login route
const loginRoute = require('./route/loginroute')(db);
app.use('/loginroute', loginRoute);

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/loginSign.html'));
});

// Import and configure consulting route
const consultingRoute = require('./route/consulting')(db);
app.use('/consulting', consultingRoute);

// Serve the booking page
app.get('/bookings', (req, res) => {
    res.sendFile(path.join(__dirname,'/views/Consulting_page.html'));
});

// Import and configure quotes route
const quoteRoute = require('./route/quote')(db);
app.use('/quotes', quoteRoute);

// Serve the quotes page
app.get('/quotes_page', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/Writings_page.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/chat_page.html'));
});


// Import and configure signup route
const signupRoute = require('./route/signuproute')(db);
app.use('/signup', signupRoute);

// Serve the signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/signup.html'));
});

// Starting the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

