require('dotenv').load();
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/user');

const twitterCallbackURL = {
  development: 'http://127.0.0.1:3000/auth/twitter/callback',
  test: 'http://127.0.0.1:3000/auth/twitter/callback',
  production: 'https://app.react2.co/auth/twitter/callback',
};

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CLIENT_ID,
  consumerSecret: process.env.TWITTER_CLIENT_SECRET,
  callbackURL: twitterCallbackURL[process.env.NODE_ENV]
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ oauthID: profile.id }, function(err, user) {
      if(err) { console.log(err); }

      user = user || new User();
      user.oauthID = profile.id;
      user.name = profile.displayName;
      user.created = user ? user.created : Date.now();
      user.avatar = profile.photos[0].value;
      // save user
      user.save(function(err) {
        if(err) {
          console.log(err);  // handle errors!
        } else {
          console.log("saving user ...");
          done(null, user);
        }
      });
    });
  }
));

// serialize and deserialize
passport.serializeUser(function(user, done) {
  // console.log('serializeUser: ' + user._id);
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    // console.log(user);
      if(!err) done(null, user);
      else done(err, null);
    });
});

module.exports = passport;
