const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/react2_test');
} else {
  const uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/react2';

  mongoose.connect(uristring, function (err, res) {
    if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
    console.log ('Succeeded connected to: ' + uristring);
    }
  });
}

module.exports = mongoose;
