const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something catstrophic happend' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  res.status(500);
  res.render('error', { error: err });
}

const app = express();

app.use(clientErrorHandler);
app.use(errorHandler);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static(path.join(__dirname, '..', '..', 'build')));

module.exports = app;
