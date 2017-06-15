const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  reaction: {
    type: Number,
    default: 0
  },
  reactions: {
    type: [{
      value: Number,
      createdAt: Date
    }],
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
