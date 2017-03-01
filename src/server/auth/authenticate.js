var bcryptOriginal = require('bcrypt');
var Promise = require('bluebird');

var User = require('../../db/schema.js').User;

var bcrypt = Promise.promisifyAll(bcryptOriginal);

var retrieveDocsAndPullRequests = require('../../db/docControllers.js').retrieveDocsAndPullRequests;

exports.auth = function (req, res, next) {
  !req.isAuthenticated() ? req.send(401) : next();
}

exports.login = function (req, res, next) {
  if (req.user) {
    req.session.username = req.user.username;
    retrieveDocsAndPullRequests(req.user.username, function(docsArray, myDocsObject, pullRequestsArray) {
      res
      .status(200)
      //.status(302)
      .send({ 
        status: 'successful', 
        username: req.user.username, 
        allDocuments: docsArray,
        allMyDocuments: myDocsObject,
        pullRequestsToMe: pullRequestsArray
      });
    });
  } else {
    console.log('UNSUCCESSFUL');
    console.log('REQ.USER  ', req.user);
    res
    .status(401)
    .send({ status: 'unsuccessful login'});
  }
}

exports.register = function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;

  User.findOne({ where: {username: username} })
    .then(function(err, user) {
      if (!user) {
        return bcrypt.genSaltAsync()
          .then(function(salt) {
            return bcrypt.hashAsync(password, salt);
          }).then(function(hashedPassword) {
            User.build({ 
              username: username,
              password: hashedPassword,
              email: email
            })
            .save()
            .then(function(user) {
              next();
            })
            .catch(function(err) {
              res.status(400).end();
            });
          });
      } else {
        res.status(409).end('user exists');
      }
    })
}

exports.logout = function (req, res, next) {
  req.session.destroy(function(err) {
    res.clearCookie('connect.sid');
    res.end('Logged out');
  });
}





