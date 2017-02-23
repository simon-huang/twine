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

// Create Doc model
//BIT is truthy. 1/0 instead of true/false
var Doc = sequelize.define('doc', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  filepath: Sequelize.STRING,
  public: Sequelize.BIT, 
  timeCreated: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
});
Doc.hasMany(Doc, {as: 'origin', allowNull: true}); // TEST THIS

// Create DocVersion model
// Are we letting the user see all saves (commits) in their version history?
  // if not, add another column to differentiate between "quick saves" and saves with a comment
var DocVersion = sequelize.define('docVersion', {
  commitID: {type: Sequelize.STRING, unique: true},
  commitMessage: Sequelize.STRING,
  timeCreated: {type: Sequelize.DATE, defaultValue: Sequelize.NOW} 
});
DocVersion.belongsTo(Doc, {as: 'doc_ID'});
DocVersion.belongsTo(User, {as: 'user_ID'});

// Create DocPermission model
// type: owner or collaborator
var DocPermission = sequelize.define('docPermission', {
  type: Sequelize.STRING 
});
DocPermission.belongsTo(Doc, {as: 'doc_ID'});
DocPermission.belongsTo(User, {as: 'user_ID'});

// Sync all models and associations
sequelize.sync();

module.exports.User = User;




