const Reaction = require('../models/reaction');

function index(req, res) {
  Reaction.find({})
    .then((reactions) => {
      res.send({ reactions: reactions });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  index
};
