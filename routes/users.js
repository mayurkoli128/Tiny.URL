const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const _ = require('lodash');
const {auth, forwardAuthenticated} = require('../middleware/authorized');
//const validateToken = require('../middleware/authorize');
const bcrypt = require('bcrypt');
//handling all the middleware async-await function
//const async = require('../middleware/async'); 
require('express-async-errors');

// @type    GET
// @route   /api/users/me
// @desc    route for to get current login user
// @access  PRIVATE 
router.get('/me', [auth], (req, res) => {
    res.status(200).render('dashboard', 
    {
        user : req.user, 
        error: req.flash('error')[0],
        hash: req.flash('hash')[0],
        host: req.flash('host')[0],
        info: req.flash('info'),
        success_msg: req.flash('success_msg')[0],
    });
});

// @type    get
// @route   /api/users/register
// @desc    route for user to redirect to registration page
// @access  PUBLIC 

router.get('/register', [forwardAuthenticated], (req, res) => {

    res.render('register', {
        error: req.flash('error')[0],
        error_msg: req.flash('error_msg')[0],
    });
})

// @type    post
// @route   /api/users/register
// @desc    route for user to register
// @access  PUBLIC 
router.post('/register', async(req, res) => {
     // validate req body
    const {error} = validate(req.body);

     if(error) {
         req.flash('error', error.details[0].message);
         return res.status(400).redirect('register');
     }
     //make sure that email is unique...
     let user = await User.findOne({email: req.body.email});
     
     if(user) {
         req.flash('error_msg', 'That Email address already exist.');
         return res.status(400).redirect('register');
     }
     // make sure that username is unique..
     user = await User.findOne({username: req.body.username});
     
     if(user) {
         req.flash('error_msg', 'Sorry! Username already taken.');
         return res.status(400).redirect('register');
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

     req.flash('success_msg', 'register successfully please login');
     res
         .status(200)
         .redirect('../auth/login');
});

module.exports = router;