// Imports
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const mongoose = require('../config/database');

// Setup Mongoose
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// Schema
const eventSchema = new Schema({
  users: Array
});

eventSchema.plugin(mongodbErrorHandler);

// Export
module.exports = mongoose.model('Event', eventSchema);
