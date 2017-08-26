const app = require('./helpers/express');
const UsersController = require('./controllers/UsersController');
const ReactionsController = require('./controllers/ReactionsController');

app.get('/api', (req, res) => {
  res.send({ sah: 'doo' });
});

app.get('/api/reactions', ReactionsController.index);
app.get('/api/users/backup', UsersController.backup);
app.get('/api/users/:id', UsersController.show);

module.exports = app;
