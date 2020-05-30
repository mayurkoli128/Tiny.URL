const express = require('express');
const router = express.Router();

// @type    GET
// @route   /
// @desc    route for to get current login user
// @access  PRIVATE 
router.get('/', (req, res) => {
    res.render('home');
});
module.exports = router;