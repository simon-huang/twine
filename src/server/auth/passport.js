// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var bcryptOriginal = require('bcrypt');
var Promise = require('bluebird');

var bcrypt = Promise.promisifyAll(bcryptOriginal);

var User = require('../../db/schema.js').User;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User
    .findOne({ where: {id: id} })
    .then(function(user) {
      done(null, user);
    })
    .catch(function(err) {
      done(err);
    })
  });
  
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true },
    function(req, email, password, done) {
      console.log('email: ', email);
      console.log('passwrod:  ', password);
      User.findOne({ where: {email: email} })
      .then(function(user) {
        if (user) {
          bcrypt.compareAsync(password, user.password)
            .then(function(isCorrect) {
              return isCorrect ? done(null, user) : done(null, false);
            })
            .catch(function(err) {
              return done(err); 
            });
        } else {
          return done(null, false);
        }
      });
    })
  );
}