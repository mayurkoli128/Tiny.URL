const mongoose = require('mongoose');

module.exports = function (app) {
    
    if(app.get('env') == 'production') {
        require('dotenv').config();
    }
    else {
        var config = require('../config/default.json');
    }

    const DB_HOST = config.DB_HOST || process.env.DB_HOST;
    const DB_NAME = config.DB_NAME || process.env.DB_NAME;

    mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('connected to DB'))
    .catch((err) => console.log('Cannot connected to DB'));
}
