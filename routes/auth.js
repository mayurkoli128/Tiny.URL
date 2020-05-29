const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const express = require('express');
const ejs = require('ejs');
const router = express.Router();
const passport = require('passport');

// @type    GET
// @route   /api/auth/login
// @desc    route for user to render to login page
// @access  PUBLIC 
router.get('/login', (req, res) => {
  res.render('login');
})
// @type    POST
// @route   /api/auth/login
// @desc    route for user Login using email and password
// @access  PUBLIC 

// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/me',
//     failureRedirect: 'login',
//   })(req, res, next);
// });

router.post('/login',
  passport.authenticate('local', { successRedirect: '/me',
                                   failureRedirect: '/login',
     })
);
module.exports = router; 