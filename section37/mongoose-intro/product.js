const mongoose = require('mongoose')
const { Schema } = mongoose;

// Get mongoose to connect to mongodb server running in the background
// The default mongo port is 27017 (it's on MongoDB docs)
// mongodb://localhost:27017  <= Where mongodb is being served locally on machine
// shopApp <= Which database to use (can either already exist or not and be created)
mongoose.connect('mongodb://localhost:27017/shopApp')
    .then(() => {
        console.log("CONNECTION OPEN!");
    })
    .catch((err) => {
        console.log("OH NO THERE IS AN ERROR!");
        console.log(err);
    })

// Operation buffering allows us to use Models we defined immediately
// so don't have to run in "then" ^ block above!
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // this is why we did name: { } w/ braces
        maxLength: 20
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    onSale: {
        type: Boolean,
        default: false
    },
    endorsers: [String], // An array only consisting of strings (or will be CAST to string)
    categories: {
        type: [String],
        default: ['cycling']
    },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    }
})

// Make Model class
const Product = mongoose.model('Product', productSchema)

const bike = new Product({ name: 'Mountain Bike', price: 599 });
bike.save()
    .then(data => {
        console.log("It worked!")
        console.log(data)
    })
    .catch(err => {
        console.log("Oh no error!")
        console.log(err.errors.name.properties.message)
    })