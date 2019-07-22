const express = require('express');
const router = express.Router();
const passport = require('passport');
const isLoggedIn = require('connect-ensure-login');

// Define routes.
router.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/');
});

router.get('/profile', isLoggedIn.ensureLoggedIn(), (req, res) => {
  res.render('profile', { user: req.user });
});

// Export routes for server.js to use.
module.exports = router;
