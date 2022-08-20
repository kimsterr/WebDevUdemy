const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;

// Define the schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// This will add on a field for username and add on a field for password
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema);