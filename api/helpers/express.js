function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: "Something catstrophic happend" });
  } else {
    next(err);
  }
}

function errorHandler (err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

module.exports = {
  errorHandler,
  clientErrorHandler
}
