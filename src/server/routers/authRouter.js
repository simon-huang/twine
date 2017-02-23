var express = require('express');
var router = express.Router();
var app = express();
var passport = require('passport');

var authentication = require('../auth/authenticate.js');


// app.post('/signup', authentication.register, passport.authenticate('local'), authentication.login);

// app.post('/signup', function(req, res) {
//   console.log(req.body);
// });
  

router.route('/signup').post(authentication.register, 
                              passport.authenticate('local'), 
                              //authentication.login, 
                              function(req, res) {
                                var user = req.body;
                                console.log('WOA! Signup is happening', user);  
  
});

router.route('/login').post(
  passport.authenticate('local'),
  authentication.login);

module.exports = router;