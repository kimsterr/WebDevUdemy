const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 8080;
const path = require('path');
const methodOverride = require('method-override'); // For UPDATE capabilities!
const mongoose = require('mongoose')

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("DB CONNECTION OPEN!");
    })
    .catch((err) => {
        console.log("OH NO THERE IS AN ERROR! WITH THE DB CONNECTION");
        console.log(err);
    })

const Campground = require('./models/campground')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send("HELLO FROM YELPCAMP!");
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
})

app.get('/campgrounds/new', (req, res) => {
    res.render("campgrounds/new");
})

app.get('/campgrounds/:id', async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findById(id);
    res.render("campgrounds/show", { campground });
})

app.post('/campgrounds', async (req, res) => {
    const { title, location } = req.body.campground;
    const newCG = new Campground({ title, location });
    await newCG.save();
    res.redirect(`/campgrounds/${newCG._id}`);
})

app.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
})