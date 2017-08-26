const User = require('../models/user');

function index(req, res) {
  User.find({})
    .then((users) => {
      res.send({
        users
      });
    });
}

function show(req, res) {
  User.find({_id: req.params.id})
    .then((user) => {
      res.send({
        user: user[0]
      });
    })
    .catch((err) => {
      res.send({
        error: err
      });
    });
}

module.exports = {
  index,
  show
};
