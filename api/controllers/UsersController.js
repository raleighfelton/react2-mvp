const User = require('../models/user');

function index(req, res) {
  User.find({})
    .then((users) => {
      res.send({
        users
      });
    });
}

module.exports = {
  index
};
