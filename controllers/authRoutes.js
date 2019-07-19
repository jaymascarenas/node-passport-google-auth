const express = require('express');
const router = express.Router();
const passport = require('passport');
const isLoggedIn = require('connect-ensure-login');

// Define routes.
router.get('/', function(req, res) {
  res.render('home', { user: req.user });
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});

router.get('/profile', isLoggedIn.ensureLoggedIn(), function(req, res) {
  res.render('profile', { user: req.user });
});

// Export routes for server.js to use.
module.exports = router;
