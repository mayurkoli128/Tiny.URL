const localStrategy = require('passport-local').Strategy;
const {User} = require('../models/user');
require('express-async-errors');
const Joi = require('joi');

module.exports = function(passport) {

    // serialize the user and pass the user ID to create cookie
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    // function will deserialize the user when client make a request for login
    passport.deserializeUser(async(id, done) => {
        const user = await User.findById(id);
        done(null, user);
    });    

    passport.use(new localStrategy({usernameField: 'email'}, async (email, password, done) => {
        const {error} = validate({email, password});
        
        if(error) {
            return done(null, false, {message: error.details[0].message});
        }
        const user = await User.findOne({email : email});

        if(user) {
            return done(null, user);
        }
        else {
            return done(null, false, {message : 'Invalid Email or Password'});
        }
    }))
}
// validate req body

function validate(req) {
    const schema = {
      email: Joi.string().required().email(),
      password: Joi.string().min(6).max(255).required()
    };
  
    return Joi.validate(req, schema);
}