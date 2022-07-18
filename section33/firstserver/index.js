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

