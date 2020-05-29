const express = require('express');
const router = express.Router();
const base62 = require('base-62');
const {Url} = require('../models/url');
const authorize = require('../middleware/authorize');
const {getNextCounter} = require('../sequence');
require('express-async-errors');

// @type    POST
// @route   /api/links/new
// @desc    route for to create new short url for the long one
// @access  PRIVATE 
router.post('/new', [authorize], async (req, res) => {
    const urlID = await getNextCounter();
    const url = new Url({
        _id: urlID,
        originalUrl : req.body.longUrl,
        hash: base62.encode(urlID),
        user: req.user._id,
    });
    await url.save();
    res.status(200).send(url);
});

// @type    GET
// @route   /api/links/:url
// @desc    route for to redirect form short hash url to long url
// @access  PUBLIC
router.get('/:url', async (req, res) => {
    const urlID = base62.decode(req.params.url);
    const obj = await Url.findById(urlID);
    
    return res.redirect(obj.originalUrl);
});

module.exports = router;