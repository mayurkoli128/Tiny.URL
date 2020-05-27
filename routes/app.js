const express = require('express');
const router = express.Router();
const base62 = require('base-62');
const {Url} = require('../models/url');
const authorize = require('../middleware/authorize');
const {getNextCounter} = require('../sequence');
require('express-async-errors');

router.post('/v1/shorten', authorize, async (req, res) => {
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

router.get('/v1/expand/:url', async (req, res) => {
    const urlID = base62.decode(req.params.url);
    const obj = await Url.findById(urlID);
    
    return res.redirect(obj.originalUrl);
});

module.exports = router;