module.exports.auth = function(req, res, next) {
    if(!req.user) {
        req.flash('info', 'session expired please login');
        return res.status(401).redirect('../auth/login');
    }
    else {
        next();
    }
}
module.exports.forwardAuthenticated = function (req, res, next) {
    if(req.user) {
        return res.status(401).redirect('../users/me');
    }
    else {
        next();
    }
}