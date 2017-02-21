// Setup relational database with Sequelize ORM
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('publishus', 'root', '');

// Setup document database with Mongoose ORM
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/publishus');


/*
// Create User model
var User = sequelize.define('user', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING
});
// Sync all models and associations
sequelize.sync();

module.exports.User = User;


// For adding new users (ADD TO NEW FILE)
// If added to new file, make sure to require schema.js

// db.User.create({
//   username: 'theUsername',
//   password: 'theirPassword'
// })
*/


/*
// methods ======================
// generating a hash
User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
*/