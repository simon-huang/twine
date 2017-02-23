var express = require('express');
var parser = require('body-parser');
var mysql = require('mysql');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');

var schema = require('../db/schema.js')
var authRouter = require('./routers/authRouter.js');
var docRouter = require('./routers/docRouter.js');

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
require('./auth/passport.js')(passport);
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
// =========================================================================/


//================== set up routes ==================

// process input routes from the client
app.use('/api/auth', authRouter);

app.use('/api/doc', docRouter);

// // process the signup form
// app.post('/signup', passport.authenticate('local-signup', {
//   successRedirect : '/profile', // redirect to the secure profile section
//   failureRedirect : '/signup', // redirect back to the signup page if there is an error
//   failureFlash : true // allow flash messages
// }));


// // process the login form
// app.post('/login', passport.authenticate('local-login', {
//   successRedirect : '/profile', // redirect to the secure profile section
//   failureRedirect : '/login', // redirect back to the signup page if there is an error
//   failureFlash : true // allow flash messages
// }));

// app.get('/logout', function (req, res) {
//   // passport attaches logout method to all requests
//   console.log('The logout listener is working');
//   req.logout();
//   res.redirect('/');
// });
//======================================================


// serve static client-facing files
app.use(express.static(path.resolve(__dirname, '../public')));

// spin up server
app.listen(port, function() {
  console.log('Listening on port ', port);
});

// export app
module.exports = app;
