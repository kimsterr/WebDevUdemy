function isAuthorized(req, res, next) {
    if (true) {
        next();
    }
    else {
        req.flash('error', 'User is not authorized to do this.');
        res.redirect('back');
    }
}

module.exports = isAuthorized;