const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 8080;
const path = require('path');
const methodOverride = require('method-override'); // For UPDATE capabilities!
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const { campgroundSchema } = require('./joiSchemas')
const ExpressError = require('./utils/ExpressError')
const wrapAsync = require('./utils/catchAsync')

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("DB CONNECTION OPEN!");
    })
    .catch((err) => {
        console.log("OH NO THERE IS AN ERROR! WITH THE DB CONNECTION");
        console.log(err);
    })

const Campground = require('./models/campground')
const Review = require('./models/review')

app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


function validateCampground(req, res, next) {
    const err = campgroundSchema.validate(req.body).error
    if (err) {
        const errMsg = err.details.map(el => el.message).join(',');
        next(new ExpressError(errMsg, 400));
    }
    else {
        next();
    }
}

app.get('/', (req, res) => {
    res.send("HELLO FROM YELPCAMP!");
})

app.get('/campgrounds', wrapAsync(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}))

app.get('/campgrounds/new', (req, res) => {
    res.render("campgrounds/new");
})

app.get('/campgrounds/:id', wrapAsync(async (req, res, next) => {
    const id = req.params.id;
    const campground = await Campground.findById(id);
    res.render("campgrounds/show", { campground });
}))

app.get('/campgrounds/:id/edit', wrapAsync(async (req, res, next) => {
    const id = req.params.id;
    const campground = await Campground.findById(id);
    res.render("campgrounds/edit", { campground });
}))

app.post('/campgrounds', validateCampground, wrapAsync(async (req, res, next) => {
    const newCG = new Campground({ ...req.body.campground });
    await newCG.save();
    res.redirect(`/campgrounds/${newCG._id}`);
}))

app.put('/campgrounds/:id', validateCampground, wrapAsync(async (req, res, next) => {
    await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground });
    res.redirect(`/campgrounds/${req.params.id}`);
}))

app.delete('/campgrounds/:id', wrapAsync(async (req, res, next) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds');
}))

app.all('*', (req, res, next) => {
    next(new ExpressError('Page NOT found', 404));
})


// The final error handler
app.use((err, req, res, next) => {
    if (!err.status) err.status = 500;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.render('error', { err });
})

app.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
})