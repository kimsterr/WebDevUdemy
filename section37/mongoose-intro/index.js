const mongoose = require('mongoose')
const { Schema } = mongoose;

// Get mongoose to connect to mongodb server running in the background
// The default mongo port is 27017 (it's on MongoDB docs)
// mongodb://localhost:27017  <= Where mongodb is being served locally on machine
// test <= Which database to use (can either already exist or not and be created)
mongoose.connect('mongodb://localhost:27017/movies')
    .then(() => {
        console.log("CONNECTION OPEN!");
    })
    .catch((err) => {
        console.log("OH NO THERE IS AN ERROR!");
        console.log(err);
    })

const movieSchema = new Schema({
    title: String, // String is shorthand for {type: String}
    year: Number,
    score: Number,
    rating: String
});

// Take ^this schema and tell mongoose that you want to make a model
// pass in string containing name of model, and the schema
const Movie = mongoose.model('Movie', movieSchema); // Yes it is capitalized; "Movie" is a model CLASS
const amadeus = new Movie({ title: 'Amadeus', year: 1984, score: 9.2, rating: 'R' });

// Save this object to the mongo DB (otherwise, DB doesn't contain it)
// Works even if the collection doesn't exist yet.  Just need to be connected to DB.
amadeus.save()
