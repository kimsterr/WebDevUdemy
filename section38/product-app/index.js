const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
})