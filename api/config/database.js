const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/react2_test');
} else {
  mongoose.connect('mongodb://localhost/react2');
}

module.exports = mongoose;
