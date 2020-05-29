
//  currently disabled because of module express-async-errors

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function validateToken(req, res, next) {
    token = req.header('x-auth-header');
    if(!token) {

        return res.status(401).send('Invalid Token!');
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_PRIVATE_TOKEN);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(403).send('Access Denied!');
    }
}