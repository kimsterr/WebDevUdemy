const express = require('express');
const router = express.Router({ mergeParams: true });

const wrapAsync = require('../utils/catchAsync')
const validate = require('../utils/middleware/validateSchema')
const Campground = require('../models/campground')
const Review = require('../models/review')
const { reviewSchema } = require('../joiSchemas')

router.get("/new", (req, res) => {
    const id = req.params.id;
    res.render("reviews/new", { id });
})

router.post('/', validate(reviewSchema), wrapAsync(async (req, res) => {
    const id = req.params.id;
    const review = new Review(req.body.review);
    await review.save();

    // Add the review to the campground arry of ObjectID’s
    const campground = await Campground.findById(id);
    campground.reviews.push(review);
    await campground.save();

    req.flash('success', 'Successfully added review!');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:rid', wrapAsync(async (req, res, next) => {
    const { rid, id } = req.params;
    await Review.findByIdAndDelete(rid);
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: rid } });

    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;