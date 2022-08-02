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

app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/products', async (req, res) => {
    const products = await Product.find({}); // An array of our products
    res.render('products/index', { products });
})

app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(mongoose.Types.ObjectId(id));

    res.render('products/show', { product });
})

app.get('/newproduct', async (req, res) => {
    res.render('forms/new');
})

app.post('/products', async (req, res) => {
    // To create a new product, need some user input VIA, say, a form
    // which in this case exists at '/newproduct'
    const { name, price, category } = req.body;

    // Insert these into the database
    const newProd = new Product({ name, price, category });
    await newProd.save();

    res.redirect('/products');
})

app.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
})