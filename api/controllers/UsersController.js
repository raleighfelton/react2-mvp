const User = require('../models/user');
const Event = require('../models/event');

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

function backup(req, res, next) {
  User.find({})
    .then((users) => {
      event = new Event({ users: users });
      event.save()
        .then(() => {
          User.find({}).remove()
            .then((u) => {
              res.json({success: "removed users"});
            });
        })
        .catch(console.log);
    })
    .catch(console.log);
}

module.exports = {
  index,
  backup,
  show
};
