const passport = require('passport');

module.exports = function() {
    require('../config/passport-strategy')(passport);
};