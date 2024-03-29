// Fill up the DB with seed data
const mongoose = require('mongoose')
const cities = require('./cities') // This will import the array
const Campground = require('../models/campground')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("DB CONNECTION OPEN!");
    })
    .catch((err) => {
        console.log("OH NO THERE IS AN ERROR! WITH THE DB CONNECTION");
        console.log(err);
    })

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < 50; i++) {
        const currCity = sample(cities)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62fe8ff3c45b5f86629c8b77', // Fake Darth Vader user; need to update as needed
            location: `${currCity.city}, ${currCity.state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum',
            price: price
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});