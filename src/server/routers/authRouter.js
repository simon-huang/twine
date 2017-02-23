var express = require('express');
var router = express.Router();

router.route('/signup').post(function(req, res) {
  var user = req.body;
  console.log('WOA! Signup is happening', user);
});

router.route('/login').post(function(req, res) {
  var user = req.body;
  console.log('AIEEEE! Someone is logging in', user);
});

module.exports = router;