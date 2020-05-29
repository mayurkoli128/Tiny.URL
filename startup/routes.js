
const bodyParser =      require('body-parser');
const users =           require('../routes/users');
const auth =            require('../routes/auth');
const links =           require('../routes/links');
const me =              require('../routes/me');
const home =            require('../routes/home');
const express =         require('express');
const passport =        require('passport');
const cookieSession =   require('cookie-session');
                        require('dotenv').config();

/*
cookie-session does not require any database / resources on the server side, though the total session data cannot exceed the browser's max cookie size.
cookie-session can simplify certain load-balanced scenarios.
cookie-session can be used to store a "light" session and include an identifier to look up a database-backed secondary store to reduce database lookups. */


module.exports = function (app) {
    
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
   // Passport middleware
   
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.json());
    app.use('/', home);
    app.use('/me', me);
    app.use('/api/auth/', auth);
    app.use('/api/users/', users);
    app.use('/api/links/', links);
}