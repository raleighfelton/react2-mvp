const faker = require('faker');
const app = require('./helpers/express');
const http = require('http').Server(app); // eslint-disable-line new-cap
const io = require('socket.io')(http);
const User = require('./models/user');
const { socketController } = require('./controllers/socketController');
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

io.on('connection', (socket) => { socketController(socket, io); });

const port = (process.env.NODE_ENV === 'production') ? process.env.PORT : 3000;

http.listen(port, () => {
  console.log(`Listening on port ${port}`); // eslint-disable-line no-console
});
