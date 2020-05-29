const mongoose = require('mongoose');

const Counter = mongoose.model('counters', new mongoose.Schema({
    _id: {
        type: String,
        default: "urlID",
    },
    currentCnt : {
        type: Number,
        min: 0,
        default: 0,
    }
}));

module.exports.Counter = Counter;