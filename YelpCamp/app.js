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
const userRoutes = require('./routes/users')
const session = require('express-session');
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
    secret: 'thisisnotagoodsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // Date.now() is in milliseconds, set it to expire a week from now
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
}
app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize());
// This middleware support needs to be used for persistent login sessions.
// It would be bad to have to login on every single request.
// Make sure that session is being used first (it is).
app.use(passport.session());
// Hey Passport, use the "Local Strategy", and the authentication method
// is located on the User model.
// We did not need to define .authenticate() ourselves, it was generated
// for us by Passport's local strategy.
passport.use(new LocalStrategy(User.authenticate()))
// Tells Passport, how do we store a user in the session
passport.serializeUser(User.serializeUser())
// How do you get a user out of the session
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    // res.locals:  Available for the views rendered during THAT request-response cycle
    // The .success part could be named anything, technically.  In the prior section
    // we used the more generic .message.  Just be consistent when extracting.
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes)
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
    req.flash('error', `Message: ${err.message}, Status: ${err.status}`)
    res.redirect('back')
})

app.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
})