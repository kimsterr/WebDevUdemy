const express = require('express');
const router = express.Router();

const wrapAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground')
const Review = require('../models/review')
const { campgroundSchema, reviewSchema } = require('../joiSchemas')

function validate(schema) {
    return (req, res, next) => {
        const err = schema.validate(req.body).error
        if (err) {
            const errMsg = err.details.map(el => el.message).join(',');
            next(new ExpressError(errMsg, 400));
        }
        else {
            next();
        }
    }
}

// Routes will be starting with '/campgrounds'

router.get('/', wrapAsync(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}))

router.get('/new', (req, res) => {
    res.render("campgrounds/new");
})

router.get('/:id', wrapAsync(async (req, res, next) => {
    const id = req.params.id;
    const campground = await Campground.findById(id).populate('reviews');
    res.render("campgrounds/show", { campground });
}))

router.get('/:id/edit', wrapAsync(async (req, res, next) => {
    const id = req.params.id;
    const campground = await Campground.findById(id);
    res.render("campgrounds/edit", { campground });
}))

router.get("/:id/reviews/new", (req, res) => {
    const id = req.params.id;
    res.render("reviews/new", { id });
})

router.post('/', validate(campgroundSchema), wrapAsync(async (req, res, next) => {
    const newCG = new Campground({ ...req.body.campground });
    await newCG.save();
    res.redirect(`/campgrounds/${newCG._id}`);
}))

router.post('/:id/reviews', validate(reviewSchema), wrapAsync(async (req, res) => {
    const id = req.params.id;
    const review = new Review(req.body.review);
    await review.save();

    // Add the review to the campground arry of ObjectID’s
    const campground = await Campground.findById(id);
    campground.reviews.push(review);
    await campground.save();

    res.redirect(`/campgrounds/${campground._id}`);
}))

router.put('/:id', validate(campgroundSchema), wrapAsync(async (req, res, next) => {
    await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground });
    res.redirect(`/campgrounds/${req.params.id}`);
}))

router.delete('/:id', wrapAsync(async (req, res, next) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds');
}))

router.delete('/:cid/reviews/:rid', wrapAsync(async (req, res, next) => {
    const { rid, cid } = req.params;
    await Review.findByIdAndDelete(rid);
    await Campground.findByIdAndUpdate(cid, { $pull: { reviews: rid } });

    res.redirect(`/campgrounds/${cid}`)
}))

module.exports = router;