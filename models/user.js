// USERS Schema
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config;

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        maxlength: 255,
        required: true,
    },
    username: {
        type: String,
        maxlength: 255,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    urlCounts: {
        type: Number,
        min: 0,
        //max: 10,
        default: 0,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
});
userSchema.methods.generateAuthToken = function() {
    let token = jwt.sign({
        name: this.name,
        _id: this._id,
        email: this.email,
    }, process.env.JWT_PRIVATE_TOKEN, {expiresIn: '1h'});

    return token;
}
const User = mongoose.model('users', userSchema);

// validating body of the request...

function validate(user) {
    const schema = Joi.object().keys({
        name: Joi.string().max(255).required(),
        username: Joi.string().max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(255).required()
    });
    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validate;