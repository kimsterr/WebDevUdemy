const express = require('express')
const app = express()
const port = 3000

app.use(() => {
    console.log("YO, we got a new request!");
})

app.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
})