const Strategy = require('passport-twitter').Strategy;
const passport = require('passport');

passport.use(new Strategy({
    consumerKey: process.env.R2_TWITTER_CONSUMER_KEY || '',
    consumerSecret: process.env.R2_TWITTER_CONSUMER_SECRET || '',
    callbackURL: 'http://127.0.0.1:3000/login/twitter/return'
  },
  function(token, tokenSecret, profile, cb) {
    // In this example, the user's Twitter profile is supplied as the user
    // record.  In a production-quality application, the Twitter profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    const jProfile = profile._json;
    const usefulProfileInfo = {
      twitterId: jProfile.id, // jProfile.id_str
      name: jProfile.name,
      handle: jProfile.screen_name,
      profileBackgroundColor: jProfile.profile_background_color,
      avatar: jProfile.profile_image_url, // jProfile.profile_image_url_https
    };

    return cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;
