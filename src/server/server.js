var express = require('express');
var parser = require('body-parser');
var mysql = require('mysql');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var path = require('path');
var schema = require('../db/schema.js')

var port = process.env.PORT || 3000;

var app = express();


//=== MIDDLEWARE ====/ 
//parse requests
app.use(parser.json());
app.use(parser.urlencoded({
  extended: true
}));

// read cookies (needed for auth)
app.use(cookieParser()); 
// required for passport
app.use(session({
  secret: 'kenny',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('../passport.js')(passport);
//=========================


// ============ route middleware to make sure a user is logged in ==========/
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page POTENTIAL PROBLEM!! 
    //CANNOT REDIRECT FROM BACK END IN REACT!!
    res.redirect('/'); //res.send('This user is not logged in!!')
}




// serve static client-facing files
app.use(express.static(path.resolve(__dirname, '../public')));
app.use('*', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
})

// spin up server
app.listen(port, function() {
  console.log('Listening on port ', port);
});

// export app
module.exports = app;
