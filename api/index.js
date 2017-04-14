const path = require('path');
const app = require('./helpers/express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const MongoClient = require('mongodb').MongoClient;

app.get('/api', (req, res) => {
  res.send({ sah: 'doo' });
});

io.on('connection', (socket) => {
  socket.on('reaction', function (reaction) {
    io.emit('reaction', reaction);
  });
});
