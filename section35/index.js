const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Where are the ejs files ("dynamic HTML files")?

// Our faux resource
const comments = [
    {
        username: 'Todd',
        comment: 'lol that is so funny!',
        id: uuidv4()
    },
    {
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog',
        id: uuidv4()
    },
    {
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd',
        id: uuidv4()
    },
    {
        username: 'onlysayswoof',
        comment: 'woof woof woof',
        id: uuidv4()
    }
]

app.get('/index', (req, res) => {
    res.render('index');
})
app.get('/comments', (req, res) => {
    res.render('comments', { comments });
})
app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})
app.get('/comments/:id/edit', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

app.patch('/comments/:id', (req, res) => {
    const id = req.params.id;
    const newCommentText = req.body.comment; // Extract the new comment content in the Request Payload
    const comment = comments.find(c => c.id === id); // This dude needs to be updated

    // Now make the update and then redirect
    comment.comment = newCommentText;
    res.redirect('/comments');
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    // Simulate adding to DB
    comments.push({ username: username, comment: comment, id: uuidv4() });

    // To make sure it REALLY worked, visit /comments page (which is a GET request)
    //res.send(`Posted new comment!  User: ${username} and Comment: ${comment}`);

    // The above (commented out stuff) is unsatisfactory; USE A REDIRECT!
    res.redirect('/comments'); // defaults to a GET request
})

// Last time, we did GET requests like this one!
app.get('/', (req, res) => {
    res.render('home');  // don’t need to do ‘home.ejs’
})

app.get('/tacos', (req, res) => {
    res.send('GET /tacos response');
})

// NOW we can work with POST requests
app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`Yo, you ordered ${qty} tacos filled with ${meat}!`);
})

app.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
})