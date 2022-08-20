function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        req.flash('error', "Can't do that; you're not logged in!");
        return res.redirect('/login');
    }
}

module.exports = isLoggedIn;