const Review = require('../../models/review')

async function isReviewer(req, res, next) {
    const { rid } = req.params
    const rev = await Review.findById(rid);
    if (!rev.author.equals(req.user._id)) {
        req.flash('error', 'User not authorized to perform that action!');
        res.redirect('back');
    }
    else {
        next();
    }
}

module.exports = isReviewer;