const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 8080;
const path = require('path');
const methodOverride = require('method-override'); // For UPDATE capabilities!
const mongoose = require('mongoose')

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

app.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
})