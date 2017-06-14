const app = require('./helpers/express');
const http = require('http').Server(app); // eslint-disable-line new-cap
const io = require('socket.io')(http);
const User = require('./models/user');
const SocketController = require('./controllers/SocketController');
require('./config/database');

app.get('/api', (req, res) => {
  res.send({ sah: 'doo' });
});

function broadcastConnectedUsers() {
  User.find({ connected: true }, 'reaction avatar')
    .then((users) => {
      io.emit('connected users', users); // Broadcast all newly-connected users
    });
}

io.on('connection', (socket) => {
  SocketController(socket, io);
});

const port = (process.env.NODE_ENV === 'production') ? process.env.PORT : 3000;

http.listen(port, () => {
  console.log(`Listening on port ${port}`); // eslint-disable-line no-console
});
