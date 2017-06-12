const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const reactionSchema = new Schema({
  value: {
    type: Number,
    default: 50
  },
},
{
  timestamps: true
});

module.exports = mongoose.model('Reaction', reactionSchema);
