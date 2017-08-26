// Imports
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const mongoose = require('../config/database');

// Setup Mongoose
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// Schema
const userSchema = new Schema({
  oauthID: Number,
  name: String,
  created: Date,
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

userSchema.plugin(mongodbErrorHandler);

// Export
module.exports = mongoose.model('User', userSchema);
