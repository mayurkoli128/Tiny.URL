const express = require('express');
const app = express();




const PORT = process.env.PORT || 8080;
const HOST = 'localhost';

require('./startup/db')();
require('./startup/routes')(app);



app.listen(PORT, HOST, (err) => {
    console.log(`Listening on ${HOST}:${PORT}`);
});
