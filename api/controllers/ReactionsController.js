// const User = require('../models/user');
const moment = require('moment');
const faker = require('faker');

function index(req, res) {
  const now = moment()
  const users = new Array(10).fill(undefined);
  const reactions = users.map(function(u, i) {
    return {
      value: parseFloat(faker.finance.amount(-1,1,4)),
      createdAt: now.clone().subtract(i * 10, 'seconds')
    }
  });
  res.json({ reactions });
}

module.exports = {
  index
}
