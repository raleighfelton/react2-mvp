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

app.get('/login/twitter', passport.authenticate('twitter'));

app.get('/login/twitter/return',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
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

app.get('/api/users', UsersController.index);

io.on('connection', (socket) => SocketController.connection(socket, io));

const port = (process.env.NODE_ENV === 'production') ? process.env.PORT : 3000;

http.listen(port, () => {
  console.log(`Listening on port ${port}`); // eslint-disable-line no-console
});
