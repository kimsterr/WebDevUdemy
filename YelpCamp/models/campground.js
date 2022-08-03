const mongoose = require('mongoose')
const { Schema } = mongoose;

const campgroundSchema = new mongoose.Schema({
    title: {
        type: String
    },
    price: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        type: String
    }
});

// Make Model class
const Campground = mongoose.model('Campground', campgroundSchema) // We are compiling the model

module.exports = Campground

/*
// Create model instance methods
productSchema.methods.greet = function () {
    console.log("HELLO!!! HI!!! HOWDY!!!!")
    console.log(` - from ${this.name}`);
}
productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}
productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

// Add model static methods
productSchema.statics.fireSale = function () {
    // use this.updateMany instead of Product.updateMany to avoid hardcoding
    // first {} means to update EVERYTHING
    return this.updateMany({}, { price: 0, onSale: true })
}



const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Mountain Bike' });
    foundProduct.greet();
}

// "Driver part" of the file using the stuff above
const bike = new Product({ name: 'Mountain Bike', price: 599 });
bike.save()
    .then(data => {
        console.log("It worked!")
        console.log(data)
        findProduct()
    })
    .catch(err => {
        console.log("Oh no error!")
        console.log(err.errors.name.properties.message)
    })
    */