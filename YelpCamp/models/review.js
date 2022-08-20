const mongoose = require('mongoose')
const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema({
    body: {
        type: String // The review text e.g. "THIS IS A GREAT PLACE!"
    },
    rating: {
        type: Number
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Make Model class
const Review = mongoose.model('Review', reviewSchema) // We are compiling the model

module.exports = Review