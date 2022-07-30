const mongoose = require('mongoose')
const { Schema } = mongoose;

// Operation buffering allows us to use Models we defined immediately
// so don't have to run in "then" ^ block above!
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // this is why we did name: { } w/ braces
        maxLength: 200
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
})

// Make Model class
const Product = mongoose.model('Product', productSchema)

module.exports = Product

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