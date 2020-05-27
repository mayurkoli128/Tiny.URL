
const bodyParser = require('body-parser');
const users = require('../routes/users');
const auth = require('../routes/auth');
const a = require('../routes/app');

module.exports = function (app) {
    /*
        express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded());
    */
    app.use(bodyParser.urlencoded({extended: false}));
    /*  
        express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json()); 
    */
    app.use(bodyParser.json());
    app.use('/api/auth/', auth);
    app.use('/api/auth/', users);
    app.use('/api/url/', a);
}