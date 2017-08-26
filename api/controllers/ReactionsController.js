// const User = require('../models/user');
const _ = require('lodash');
const moment = require('moment');
const faker = require('faker');
const User = require('../models/user');

function index(req, res, next) {
  User.find({})
    .then((users) => {
      res.json({
        reactions: _.flatten(users.map((u) => { return u.reactions }))
      });
      next();
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  index
}
