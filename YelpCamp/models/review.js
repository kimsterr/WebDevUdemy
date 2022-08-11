const mongoose = require('mongoose')
const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema({
    body: {
        type: String // The review text e.g. "THIS IS A GREAT PLACE!"
    },
    rating: {
        type: Number
    }
});

// Make Model class
const Review = mongoose.model('Review', reviewSchema) // We are compiling the model

module.exports = Review