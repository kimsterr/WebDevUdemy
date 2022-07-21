const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 8080;
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Where are the ejs files ("dynamic HTML files")?

app.get('/', (req, res) => {
    res.render('home');  // don’t need to do ‘home.ejs’
})

app.get('/cats', (req, res) => {
    // Pretend that this array is coming from a database
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ];
    res.render('cats', { cats })
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.render('subreddit', { subreddit });
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { rand: num });
})

app.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
})
