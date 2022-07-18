const express = require('express')
const app = express()
const port = 3000

// Callback fired by server when client's request detected.
// req:  incoming request, res: outgoing response
// Commented out because this applies to ALL requests and overrides later GET requests
/*
app.use((req, res) => {
    console.log("REQUEST RECEIVED!");
})
*/

// root resource gets THIS response
app.get('/', (req, res) => {
    res.send("<h1>I AM GROOT!</h1>");
})

// the colon indicates a variable in ":subreddit"
// matches '/r/subreddit'
// matches '/r/dogs'
// matches '/r/cscareerquestions'
// does NOT match '/r/'
// does NOT match '/r/dogs/corgis'
// notice how variable can be accessed via req.params
app.get('/r/:subreddit', (req, res) => {
    res.send(`YOU asked for the ${req.params['subreddit']} subreddit.`);
})

// This will match '/r/dogs/234324232423' (above get does NOT match this)
app.get('/r/:subreddit/:postId', (req, res) => {
    res.send(`Browsing postId ${req.params.postId} in the ${req.params['subreddit']} subreddit.`);
})

// '/cats' path gets THIS response
app.get('/cats', (req, res) => {
    res.send("<h1>Meow!</h1>");
})

// '/dogs' path gets THIS response
app.get('/dogs', (req, res) => {
    res.send("<h1>Woof!</h1>");
})

// Matches anything; put this LAST and NOT first.
app.get('*', (req, res) => {
    res.send(`I don't know that path!`);
})

// GET and POST get different responses!!
app.post('/cats', (req, res) => {
    res.send("YOU JUST DID A POST REQUEST TO /cats LOL!");
})


// Server keeps listening on the port
app.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
})

