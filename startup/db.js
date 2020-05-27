const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/tiny-url', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('connected to DB'))
    .catch((err) => console.log('Cannot connected to DB'));

    mongoose.connect('mongodb://localhost/tiny-url', { useNewUrlParser: true  , useUnifiedTopology: true })
    .then('connected to DB (Counter)')
    .catch('Not connected to DB (Counter)');
}
