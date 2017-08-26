const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
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

if (process.env.NODE_ENV === 'production') {
  app.all('*', function(req, res, next){
    console.log('req start: ',req.secure, req.hostname, req.url, app.get('port'));
    console.log(req.header('x-forwarded-proto'))
    if (req.header('x-forwarded-proto') !== 'https') { return next(); }
    const url = 'https://'+req.hostname  + req.url
    console.log(`redirecting to ${url}`);
    res.redirect(url);
  });
}

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(clientErrorHandler);
app.use(errorHandler);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cookieParser());
app.use((expressSession)({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, '..', '..', 'build')));

module.exports = app;
