require('dotenv').load();
const faker = require('faker');
const passport = require('./helpers/passport');
const User = require('./models/user')
const app = require('./routes');
const http = require('http').Server(app); // eslint-disable-line new-cap
const io = require('socket.io')(http);
const SocketController = require('./controllers/SocketController');
const UsersController = require('./controllers/UsersController');
require('./config/database');

app.use(passport.initialize());
app.use(passport.session());

// FIXME maybe this should all be in it's own file?
app.get('/login', (req, res) => {
  const user = {
    avatar: faker.internet.avatar(),
    connected: false
  };
  res.json({ user });
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

// Middleware => Check for login
function isLoggedIn(req, res, next) {
  // first check if user is authenticated
  if (req.isAuthenticated()) { return next(); } // Carry on, they're logged in
  req.flash('error', 'Oops! You must be logged in to do that.');
  res.redirect('/');
}

app.get('/api/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    const usefulProfileInfo = {
      oauthID: req.user.oauthID, // req.user.id_str
      name: req.user.name,
      // handle: jProfile.screen_name,
      // profileBackgroundColor: jProfile.profile_background_color,
      avatar: req.user.avatar
    };
    res.json({ user: usefulProfileInfo });
  });

app.get('/api/users', UsersController.index);

io.on('connection', (socket) => SocketController.connection(socket, io));

const port = (process.env.NODE_ENV === 'production') ? process.env.PORT : 3000;

http.listen(port, () => {
  console.log(`Listening on port ${port}`); // eslint-disable-line no-console
});
