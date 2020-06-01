const express =                 require('express');
const router =                  express.Router();
const passport =                require('passport');
const {forwardAuthenticated} =  require('../middleware/authorized');

// @type    GET
// @route   /api/auth/login
// @desc    route for user to render to login page
// @access  PUBLIC 
router.get('/login', [forwardAuthenticated], (req, res) => {
  res.render('login', {
    error_msg : req.flash('error_msg')[0], 
    error : req.flash('error')[0], 
    success_msg: req.flash('success_msg')[0],
    info: req.flash('info')[0]
  });
})
// @type    POST
// @route   /api/auth/login
// @desc    route for user Login using email and password
// @access  PUBLIC 
// router.post('/login',
//   passport.authenticate('local',
//   { 
//     successRedirect: '../users/me',
//     failureRedirect: 'login',
//   }));

router.post('/login',
  passport.authenticate('local',{failureRedirect: 'login', failureFlash: true, successFlash: 'Welcome'}),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    req.flash('info', 'welcome');
    res.redirect('../users/me');
  });

// @type    GET
// @route   /api/auth/logout
// @desc    route for to logout user
// @access  PUBLIC 
router.get('/logout', (req, res) => {
  req.logOut();
  req.session = null;
  res.redirect('/');
});

module.exports = router; 