const mongoose = require('mongoose');
const {User} = require('../models/user');
const Joi = require('joi');

const urlSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    originalUrl: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    expirationDate: {
        type: Date,
    },
});

const Url = mongoose.model('urls', urlSchema);

module.exports.Url = Url;