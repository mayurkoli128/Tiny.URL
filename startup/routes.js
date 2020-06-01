
const users =           require('../routes/users');
const auth =            require('../routes/auth');
const home =            require('../routes/home');
const links =           require('../routes/links');
const passport =        require('passport');
const bodyParser =      require('body-parser');
const result =          require('../routes/result');
const cookieSession =   require('cookie-session');
const flash =           require('connect-flash');
var cookieParser =      require('cookie-parser');
var session =           require('express-session');
                        

/*
cookie-session does not require any database / resources on the server side, though the total session data cannot exceed the browser's max cookie size.
cookie-session can simplify certain load-balanced scenarios.
cookie-session can be used to store a "light" session and include an identifier to look up a database-backed secondary store to reduce database lookups. */


module.exports = function (app, express) {

    if(app.get('env') == 'production') {
        require('dotenv').config();
    }
    else {
        var config = require('../config/default.json');
    }
    /*A user session can be stored in two main ways with cookies: on the server or on the client. This module stores the session data on the client within a cookie */

    // the function will de
    app.use(cookieSession({
        maxAge : 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_DECRYPT_SECRETE],
    }));

    //ejs to serve the ejs pages 
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    /*
        express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded());
    */
    app.use(bodyParser.urlencoded({extended: false}));
    /*  
        express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json()); 
    */

   //flash massaging
    app.use(cookieParser('keyboard cat'));
    app.use(session({ 
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }}
    ));
    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.json());
    app.use('/', home);
    app.use('/', result);
    app.use('/api/auth/', auth);
    app.use('/api/users/', users);
    app.use('/api/links/', links);
}
