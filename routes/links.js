const express =                     require('express');
const router =                      express.Router();
const {Url, validate} =             require('../models/url');
const {auth} = require('../middleware/authorized');
const base62 =                      require('base-62');
const {getNextCounter} =            require('../sequence');
                                    require('express-async-errors');

// @type    POST
// @route   /api/links/new
// @desc    route for to create new short url for the long one
// @access  PRIVATE 
router.post('/new', [auth], async (req, res) => {

    const {error} = validate(req.body);

    if(error) {
        req.flash('error', error.details[0].message);
        return res.status(401).redirect('../users/me');
    }

    const urlID = await getNextCounter();
    const url = new Url({
        _id: urlID,
        originalUrl : req.body.originalUrl,
        hash: base62.encode(urlID),
        user: req.user._id,
    });
    await url.save();
    req.flash('hash', url.hash);
    req.flash('host', req.get('host'));
    res.status(200).redirect('../users/me');
});
module.exports = router;