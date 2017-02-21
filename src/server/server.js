var express = require('express');
var parser = require('body-parser');
var mysql = require('mysql');

var path = require('path');
var schema = require('../db/schema.js')

var port = process.env.PORT || 3000;

var app = express();

// middleware - parse JSON
app.use(parser.json());

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
