const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const { errorHandler, clientErrorHandler } = require('./helpers/express');

const app = express();

app.use(clientErrorHandler);
app.use(errorHandler);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/api', (req, res) => {
  res.send({ sah: 'doo' });
});

let port;
if (process.env.NODE_ENV === 'production') {
  port = 80;
} else {
  port = 3000;
}

app.listen(port, () => {
  console.log('😱  React backend up and running');
});
