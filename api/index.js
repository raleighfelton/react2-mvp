const path = require('path');
const faker = require('faker');
const app = require('./helpers/express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const User = require('./models/user');
require('./config/database');

app.get('/api', (req, res) => {
  res.send({ sah: 'doo' });
});

io.on('connection', (socket) => {
  socket.on('new user', function() {
    user = new User();
    user.avatar = faker.internet.avatar();
    user.connected = true;
    user.save()
      .then((user) => {
        socket.emit('new user', user); // Return new user
        User.count({})
          .then((count) => {
            io.emit('users', count); // Broadcast user count
          });
        User.find({ connected: true })
          .then((users) => {
            io.emit('connected users', users); // Broadcast all newly-connected users
          });
      })
      .catch((err) => {
        console.log(`An Error Occured: ${err}`)
      });
  });

  socket.on('reaction', function(reaction) {
    User.find({ _id: reaction.id })
      .then(([ user ]) => {
        user.reaction = reaction.value;
        user.connected = true;
        user.save()
          .then((user) => {
            User.find({ connected: true })
              .then((users) => {
                io.emit('connected users', users); // Broadcast all newly-connected users
              });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

const port = (process.env.NODE_ENV === 'production')? process.env.PORT : 3000;

http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
