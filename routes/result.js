const express = require('express');
const router = express.Router();
require('express-async-errors');
const base62 = require('base-62');
const {Url} = require('../models/url');


// @type    GET
// @route   /api/links/:url
// @desc    route for to redirect form short hash url to long url
// @access  PUBLIC

router.get('/:url', async (req, res) => {
    const urlID = base62.decode(req.params.url);
    const obj = await Url.findById(urlID);
    if(!obj) {
        return res.render('404');
    }
    return res.redirect(obj.originalUrl);
});

module.exports = router;