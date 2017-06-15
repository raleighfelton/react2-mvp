const app = require('./helpers/express');
const UsersController = require('./controllers/UsersController');

app.get('/api', (req, res) => {
  res.send({ sah: 'doo' });
});

app.get('/api/users', UsersController.index);

module.exports = app;
