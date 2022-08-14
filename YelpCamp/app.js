const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const methodOverride = require('method-override'); // For UPDATE capabilities!
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const ExpressError = require('./utils/ExpressError')
const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews')

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/campgrounds/:id/reviews', reviewRoutes)
app.use('/campgrounds', campgroundRoutes)

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("DB CONNECTION OPEN!");
    })
    .catch((err) => {
        console.log("OH NO THERE IS AN ERROR! WITH THE DB CONNECTION");
        console.log(err);
    })

app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send("HELLO FROM YELPCAMP!");
})

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