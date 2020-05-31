const express = require('express');
const app =     express();
                require('dotenv').config();
const base62 = require('base-62')

require('./startup/passport')();
require('./startup/db')();
require('./startup/routes')(app, express);


const PORT = process.env.PORT;
const HOST = process.env.DB_HOST;

app.listen(PORT, HOST, (err) => {
    console.log(`Listening on ${HOST}:${PORT}`);
});
