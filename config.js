exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production' ? '' : ['https://127.0.0.1:8080', 'https://localhost:8080'];

exports.GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/google/callback'
};
