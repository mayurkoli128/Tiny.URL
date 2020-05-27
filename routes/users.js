const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
//handling all the middleware async-await function
//const async = require('../middleware/async'); 
require('express-async-errors');


// @type    post
// @route   /api/auth/register
// @desc    route for user Login using jsonwebtoken
// @access  PUBLIC 
router.get('/', (req, res) => {
    console.log('exe');
})
router.post('/register', async(req, res) => {
     // validate req body
     const {error} = validate(req.body);
     if(error) {
         return res.status(400).send(error.details[0].message);
     }
     //make sure that email is unique...
     let user = await User.findOne({email: req.body.email});
     if(user) {
         return res.status(400).send('User already registered.');
     }
     //if valid create user object.
     user = new User(_.pick(req.body, ['name', 'username', 'email', 'password']));
     //create hash of password.
     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(req.body.password, salt);
     //insert into database
     await user.save();
     //send user object in response (use lodash for selecting properties of user)
 
     // send json web token in response...
     let token = user.generateAuthToken();
     res
         .status(200)
         .header('x-auth-header', token)
         .send(_.pick(user, ['name', 'username', 'email']));
});

module.exports = router;