const mongoose =    require('mongoose');
                    require('dotenv').config();

module.exports = function () {
    mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('connected to DB'))
    .catch((err) => console.log('Cannot connected to DB'));
}
