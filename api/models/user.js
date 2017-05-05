const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  reactions: {
    type: Array,
    default: []
  },
  connected: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String
  }
});

module.exports = mongoose.model('User', userSchema);
