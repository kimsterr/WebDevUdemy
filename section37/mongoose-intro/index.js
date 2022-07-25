const mongoose = require('mongoose')

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
