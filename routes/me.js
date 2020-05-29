const express = require('express');
const router = express.Router();
const auth = require('../middleware/authorized');

router.get('/', [auth], (req, res) => {
    res.status(200).send('success');
});

module.exports = router;