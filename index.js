const express = require('express');
const app =     express();
const base62 =  require('base-62');

if(app.get('env') == 'production') {
    require('dotenv').config();
}
else {
    var config = require('./config/default.json');
}


require('./startup/passport')();
require('./startup/db')(app);
require('./startup/routes')(app, express);


const PORT = config.PORT || process.env.PORT;
const HOST = config.DB_HOST || process.env.DB_HOST;

app.listen(PORT, HOST, (err) => {
    console.log(`Listening on ${HOST}:${PORT}`);
});
