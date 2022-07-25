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

// It takes time, so need to work with callbacks and promises
// This one does NOT need a separate save
Movie.insertMany([
    { title: 'Amelie', year: 2001, score: 8.3, rating: 'R' },
    { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG' },
    { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R' },
])
    .then(data => {
        console.log("IT WORKED");
        console.log(data);
    })

// Movie.find(...) returns a QUERY object.
// A query object is NOT a promise, but it IS "then-able"
Movie.find({ year: { $gte: 1980, $lte: 1989 } })
    .then(data => console.log(data)); // Here, data is an ARRAY of objects
Movie.findOne({ year: { $gte: 1980, $lte: 1989 } })
    .then(data => console.log(data)); // Here, data is a SINGLE object

// Using callbacks
Movie.find({ year: { $gte: 1980, $lte: 1989 } }, function (err, arr) { });

const id = '62ded9cab72f7883df35b54d'; // Dummy ID
Movie.findById(id)
    .then(data => console.log(data));
/*
// select only the movie's title and score
Movie.findById(id, 'title score')
    .then(data => console.log(data));
*/

// Update the first query result matching the first passed in object
// using the info from the second passed in object
// Does NOT return updated object.  So "res" is NOT the updated object.
Movie.updateOne({ title: 'Amelie' }, { rating: 9.8 })
    .then(res => console.log(res));

Movie.updateMany({ title: { $in: ['Amadeus', 'Stand By Me'] } }, { score: 10 })
    .then(res => console.log(res));

// This will return actual (updated) object in m.  NEED third arg {new: true} because
// returns OLD object in m as the default.
Movie.findOneAndUpdate({ title: 'Amelie' }, { rating: 9.6 }, { new: true })
    .then(m => console.log(m)); 