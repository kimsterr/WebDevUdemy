const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 8080;
const path = require('path');
const methodOverride = require('method-override'); // For UPDATE capabilities!
const mongoose = require('mongoose')

const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("DB CONNECTION OPEN!");
    })
    .catch((err) => {
        console.log("OH NO THERE IS AN ERROR! WITH THE DB CONNECTION");
        console.log(err);
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/products', async (req, res) => {
    const products = await Product.find({}); // An array of our products
    res.render('products/index', { products });
})

app.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
})