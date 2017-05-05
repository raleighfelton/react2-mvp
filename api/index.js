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
          broadcastConnectedUsers() // Broadcast all newly-connected users
      })
      .catch((err) => {
        console.log(`An Error Occured: ${err}`)
      });
  });

  // Update reaction of user
  // params: { id: '<user_id>', value: <integer 1-100> }
  // broadcasts:
  //  - connected users (array of all connected users)
  socket.on('reaction', function(reaction) {
    User.find({ _id: reaction.id })
      .then(([ user ]) => {
        user.reaction = reaction.value;
        user.connected = true;
        user.save()
          .then((user) => {
            broadcastConnectedUsers() // Broadcast all newly-connected users
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
