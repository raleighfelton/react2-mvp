require('dotenv').load();
const faker = require('faker');
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const app = require('./helpers/express');
const http = require('http').Server(app); // eslint-disable-line new-cap
const io = require('socket.io')(http);
const User = require('./models/user');
require('./config/database');

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

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) => {
  const user = {
    avatar: faker.internet.avatar(),
    connected: false
  };
  res.json({ user });
});

app.get('/login/twitter',
  passport.authenticate('twitter'));

app.get('/login/twitter/return',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    // Successful Login! Redirect whereever.
    res.redirect('/');
  });

app.get('/api', (req, res) => {
  res.send({ sah: 'doo' });
});

app.get('/api/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    const jProfile = req.user._json;
    const usefulProfileInfo = {
      twitterId: jProfile.id, // jProfile.id_str
      name: jProfile.name,
      handle: jProfile.screen_name,
      profileBackgroundColor: jProfile.profile_background_color,
      avatar: jProfile.profile_image_url, // jProfile.profile_image_url_https
    };
    res.json({ user: usefulProfileInfo });
  });

function broadcastConnectedUsers() {
  User.find({ connected: true })
    .then((users) => {
      io.emit('connected users', users); // Broadcast all newly-connected users
    });
}

io.on('connection', (socket) => {
  // Creates a new user
  // emits:
  //  - new user (user object)
  // broadcasts:
  //  - connected users (array of all connected users including new user)
  socket.on('new user', function(u) {
    const user = new User();
    user.avatar = (u && u.avatar) || faker.internet.avatar();
    user.connected = true;
    user.save()
      .then((saved) => {
        socket.emit('new user', saved); // Return new user
        User.count({})
          .then((count) => {
            io.emit('users', count); // Broadcast user count
          });
        broadcastConnectedUsers(); // Broadcast all newly-connected users
      })
      .catch((err) => {
        console.warn(`An Error Occured: ${err}`); // eslint-disable-line no-console
      });
  });

  // Update reaction of user
  // params: { id: '<user_id>', value: <integer 1-100> }
  // broadcasts:
  //  - connected users (array of all connected users)
  socket.on('reaction', function(reaction) {
    // console.log(reaction); // eslint-disable-line no-console
    User.find({ _id: reaction.id })
      .then(([user]) => {
        user.reaction = reaction.value;
        user.connected = true;
        user.save()
          .then(() => {
            broadcastConnectedUsers(); // Broadcast all newly-connected users
          });
      })
      .catch((err) => {
        console.warn(err); // eslint-disable-line no-console
      });
  });
});

const port = (process.env.NODE_ENV === 'production') ? process.env.PORT : 3000;

http.listen(port, () => {
  console.log(`Listening on port ${port}`); // eslint-disable-line no-console
});
