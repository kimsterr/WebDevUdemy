const express = require('express');
const app = express();
const port = 8080;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('home');  // don’t need to do ‘home.ejs’
})

app.listen(port, () => {
	console.log(`Example app listening at https://localhost:${port}`);
})
