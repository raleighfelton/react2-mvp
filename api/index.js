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
    socket.emit('reaction', reaction.reaction);
    // socket.emit('reaction', {
    //   user: reaction.userID,
    //   reaction: reaction.score
    // });
  });
});

MongoClient.connect("mongodb://localhost:27017/react2", { promiseLibrary: Promise })
  .then((db) => {
    app.locals.db = db;
    const port = (process.env.NODE_ENV === 'production')? process.env.PORT : 3000;
    http.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
    // app.listen(port, () => {
    //   console.log(`😱  React backend up and running on localhost:${port}`);
    // });
  })
  .catch((err) => {
    console.log(err);
  });
