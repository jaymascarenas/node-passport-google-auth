require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const morgan = require('morgan')('combined');
const cookieParser = require('cookie-parser')();
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const passportInit = require('./controllers/passport');
const { CLIENT_ORIGIN } = require('./config');
let server;

const PORT = process.env.PORT || 8080;

// Create a new Express application.
const app = express();

// If we are in production we are already running in https
if (process.env.NODE_ENV === 'production') {
  server = http.createServer(app);
}
// We are not in production so load up our certificates to be able to
// run the server in https mode locally
else {
  const certOptions = {
    key: fs.readFileSync(path.resolve('certs/server.key')),
    cert: fs.readFileSync(path.resolve('certs/server.crt'))
  };
  server = https.createServer(certOptions, app);
}

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(morgan);
app.use(cookieParser);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
passportInit();

// Accept requests from our client
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

const routes = require('./controllers/authRoutes.js');
app.use(routes);

server.listen(PORT, () => {
  console.log('listening on https://localhost:' + PORT);
});
