// Setup relational database with Sequelize ORM
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('publishus', 'root', '');

// Create User model
var User = sequelize.define('user', {
  username: {type: Sequelize.STRING, unique: true},
  email: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
});

// Sync all models and associations
sequelize.sync();

module.exports.User = User;




