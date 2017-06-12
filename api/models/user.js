const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  reactions: {
    type: Schema.Types.ObjectId,
    ref: 'Reaction',
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

userSchema.methods.latestReaction = function() {
  console.log(this.reactions);
  return this.reactions.sort('-createdAt');
};

module.exports = mongoose.model('User', userSchema);
