const app = require('./config/express');
const ReactionsController = require('./controllers/ReactionsController');

app.get('/api/requests', ReactionsController.index);

module.exports = app;
