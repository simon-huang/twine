// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var bcryptOriginal = require('bcrypt');
var Promise = require('bluebird');

var bcrypt = Promise.promisifyAll(bcryptOriginal);

var User = require('../../db/schema.js').User;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    console.log('serialize');
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    console.log('deserialize');
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
      console.log('username', email);
      console.log('password', password);
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






//export { passport, login, register, logout };

//=============================================================================================================

// /*
// // methods ======================
// // generating a hash
// User.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// User.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };
// */


// // expose this function to our app using module.exports
// module.exports = function(passport) {
//   // =========================================================================
//   // passport session setup ==================================================
//   // =========================================================================
//   // required for persistent login sessions
//   // passport needs ability to serialize and deserialize users out of session

//   // used to serialize the user for the session
//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });

//   // used to deserialize the user
//   passport.deserializeUser(function(id, done) {
//     connection.query("select * from users where id = "+id, function(err,rows){ 
//       done(err, rows[0]);
//     });
//   });
  

//   // =========================================================================
//   // LOCAL SIGNUP ============================================================
//   // =========================================================================
//   // we are using named strategies since we have one for login and one for signup
//   // by default, if there was no name, it would just be called 'local'

//   passport.use('local-signup', new LocalStrategy({
//     // by default, local strategy uses username and password, we will override with email
//     usernameField : 'email',
//     passwordField : 'password',
//     passReqToCallback : true // allows us to pass back the entire request to the callback
//   },
//   function(req, email, password, done) {
//     // Check the database for the supplied username to see if already taken
//     db.User.findAll({
//       where: { username: username }
//     }).then(function(users) {
//       if (users.length === 0) {
//         db.User.create({
//           email: email,
//           password: password
//         })
//       }
//     })
//   }));

//   // =========================================================================
//   // LOCAL LOGIN =============================================================
//   // =========================================================================
//   // we are using named strategies since we have one for login and one for signup
//   // by default, if there was no name, it would just be called 'local'

//   passport.use('local-login', new LocalStrategy({
//     // by default, local strategy uses username and password, we will override with email
//     usernameField : 'email',
//     passwordField : 'password',
//     passReqToCallback : true // allows us to pass back the entire request to the callback
//   },
//   function(req, email, password, done) { // callback with email and password from our form
//     //check db and write !user
//   }));
  
// }