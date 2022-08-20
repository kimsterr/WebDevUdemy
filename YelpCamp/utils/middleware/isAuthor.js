const Campground = require('../../models/campground')

async function isAuthor(req, res, next) {
    const { id } = req.params
    const cg = await Campground.findById(id);
    if (!cg.author.equals(req.user._id)) {
        req.flash('error', 'User not authorized to perform that action!');
        res.redirect(`/campgrounds/${id}`);
    }
    else {
        next();
    }
}

module.exports = isAuthor;