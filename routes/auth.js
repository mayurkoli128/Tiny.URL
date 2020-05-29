const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const express = require('express');
const ejs = require('ejs');
const router = express.Router();
const validateToken = require('../middleware/authorize');

// @type    GET
// @route   /api/auth/me
// @desc    route for to get current login user
// @access  PRIVATE 
router.get('/me', [validateToken], (req, res) => {
    res.status(200).send(req.user);
});

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

router.post('/login',async (req, res) => {
  const { error } = validate(req.body); 
  if (error) {
    res.render('login', {error: error});
    return;
  }
  
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).render('login', 'Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).render('login', 'Invalid email or password');

  const token = user.generateAuthToken();
  res.status(200).send(token);
});

// validate req body

function validate(req) {
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(255).required()
  };

  return Joi.validate(req, schema);
}
module.exports = router; 