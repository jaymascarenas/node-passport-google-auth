const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_CONFIG } = require('../config');

module.exports = () => {
  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));

  // The callback that is invoked when an OAuth provider sends back user
  // information. Normally, you would save the user to the database
  // in this callback and it would be customized for each provider
  const callback = (accessToken, refreshToken, profile, cb) => cb(null, profile);

  // Adding each OAuth provider's strategy to passport
  passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback));

  passport.use(
    new GoogleStrategy(GOOGLE_CONFIG, function(accessToken, refreshToken, profile, cb) {
      console.log(profile, accessToken);

      // use this space to set any DB's with data needed from the users profile
      // User.findOrCreate({ googleId: profile.id }, function(err, user) {
      // });

      return cb(null, profile);

    })
  );
};
