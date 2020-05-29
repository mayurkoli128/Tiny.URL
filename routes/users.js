const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const _ = require('lodash');
//const validateToken = require('../middleware/authorize');
const bcrypt = require('bcrypt');
//handling all the middleware async-await function
//const async = require('../middleware/async'); 
require('express-async-errors');

// @type    GET
// @route   /api/users/me
// @desc    route for to get current login user
// @access  PRIVATE 
router.get('/me', (req, res) => {
    res.status(200).send(req.user);
});

// @type    get
// @route   /api/users/register
// @desc    route for user to redirect to registration page
// @access  PUBLIC 

router.get('/register', (req, res) => {
    res.render('register');
})

// @type    post
// @route   /api/users/register
// @desc    route for user Login using jsonwebtoken
// @access  PUBLIC 
router.post('/register', async(req, res) => {
     // validate req body
    const {error} = validate(req.body);

     if(error) {
         return res.status(400).render('register', {error : error});
     }
     //make sure that email is unique...
     let user = await User.findOne({email: req.body.email});
     
     if(user) {
         return res.status(400).render('register', {error_msg :'That Email address already exist.'});
     }
     // make sure that username is unique..
     user = await User.findOne({username: req.body.username});
     
     if(user) {
         return res.status(400).render('register', {error_msg :'Sorry! Username already taken.'});
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
     //let token = user.generateAuthToken();

     res
         .status(200)
         .redirect('../auth/login');
});

module.exports = router;