const express = require('express');
const router = express.Router();

const wrapAsync = require('../utils/catchAsync')
const validate = require('../utils/middleware/validateSchema')
const isAuthor = require('../utils/middleware/isAuthor')
const Campground = require('../models/campground')
const { campgroundSchema } = require('../joiSchemas')
const isLoggedIn = require('../utils/middleware/isLoggedIn')

// Routes will be starting with '/campgrounds'

router.get('/', wrapAsync(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}))

router.get('/new', isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
})

router.get('/:id', wrapAsync(async (req, res, next) => {
    const id = req.params.id;
    const campground = await Campground.findById(id).populate('reviews').populate('author');
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds')
    }
    res.render("campgrounds/show", { campground });
}))

router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(async (req, res, next) => {
    const id = req.params.id;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds')
    }
    res.render("campgrounds/edit", { campground });
}))

router.post('/', isLoggedIn, validate(campgroundSchema), wrapAsync(async (req, res, next) => {
    const newCG = new Campground({ ...req.body.campground, author: req.user });
    await newCG.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${newCG._id}`);
}))

router.put('/:id', isLoggedIn, isAuthor, validate(campgroundSchema), wrapAsync(async (req, res, next) => {
    await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground })
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${req.params.id}`);
}))

router.delete('/:id', isLoggedIn, isAuthor, wrapAsync(async (req, res, next) => {
    await Campground.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted campground!');
    res.redirect('/campgrounds');
}))

module.exports = router;