const User = require('../models/user');
const moment = require('moment');
const faker = require('faker');


module.exports = function(socket, io) {
  function broadcastConnectedUsers() {
    User.find({ connected: true }, 'reaction avatar')
      .then((users) => {
        io.emit('connected users', users); // Broadcast all newly-connected users
      });
  }

  // Creates a new user
  // emits:
  //  - new user (user object)
  // broadcasts:
  //  - connected users (array of all connected users including new user)
  socket.on('new user', function() {
    const user = new User();
    user.avatar = faker.internet.avatar();
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
    User.find({ _id: reaction.id })
      .then(([user]) => {
        user.reaction = reaction.value;
        user.connected = true;
        user.reactions.push({
          value: reaction.value,
          createdAt: moment().valueOf()
        });
        user.save()
          .then(() => {
            broadcastConnectedUsers(); // Broadcast all newly-connected users
          });
      })
      .catch((err) => {
        console.warn(err); // eslint-disable-line no-console
      });
  });
}
