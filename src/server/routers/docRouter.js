var express = require('express');
var router = express.Router();

router.route('/createDoc').post(function(req, res) {
  var docInit = req.body;
  console.log('POST request received on /api/doc/createDoc');
  console.log('Inbound init values', docInit)
});

module.exports = router;