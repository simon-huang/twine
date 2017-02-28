// Setup relational database with Sequelize ORM
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('publishus', 'root', '');

// Create User model
var User = sequelize.define('user', {
  username: {type: Sequelize.STRING, unique: true},
  email: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING
});

// Create Doc model
// BIT is truthy. 1/0 instead of true/false
// maybe Username so I don't have to query for it first
// type: owner or collaborator
var Doc = sequelize.define('doc', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  filepath: Sequelize.STRING,
  public: Sequelize.BOOLEAN, 
  timeCreated: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
  userId: {
    type: Sequelize.STRING,
    primaryKey: false,
    model: 'user',
    key: 'id'
  },
  docOwner: {
    type: Sequelize.STRING,
    primaryKey: false,
    model: 'user',
    key: 'username'
  }
});
Doc.belongsTo(Doc, {as: 'origin', allowNull: true}); // TEST THIS

// Create DocVersion model
// Are we letting the user see all saves (commits) in their version history?
  // if not, add another column to differentiate between "quick saves" and saves with a comment
var DocVersion = sequelize.define('docVersion', {
  commitID: {type: Sequelize.STRING, unique: true},
  commitMessage: Sequelize.STRING,
  timeCreated: {type: Sequelize.DATE, defaultValue: Sequelize.NOW} 
});
DocVersion.belongsTo(Doc);
DocVersion.belongsTo(User);

// Create DocPermission model
// type: owner or collaborator
var DocPermission = sequelize.define('docPermission', {
  type: Sequelize.STRING 
});
DocPermission.belongsTo(Doc);
DocPermission.belongsTo(User);

// I haven't written out the other part of the associations
  // e.g. Users haveMany Docs, PullRequests, etc.
  // Is it important to do that? Why?

// (accept/decline = closed, open = pending)
var PullRequest = sequelize.define('pullRequest', {
  status: Sequelize.STRING, 
  collaboratorMessage: Sequelize.STRING,
  ownerMessage: Sequelize.STRING,
  requesterName: {
    type: Sequelize.STRING,
    primaryKey: false,
    model: 'user',
    key: 'username'
  },
  targetUsername: {
    type: Sequelize.STRING,
    primaryKey: false,
    model: 'user',
    key: 'username'
  },
  requestingDocId: {
    type: Sequelize.INTEGER,
    primaryKey: false,
    model: 'doc',
    key: 'id'
  },
  docName: {
    type: Sequelize.STRING,
    primaryKey: false,
    model: 'doc',
    key: 'name'
  },
  upstreamDocId: {
    type: Sequelize.INTEGER,
    primaryKey: false,
    model: 'doc',
    key: 'id'
  },
  commitId: {
    type: Sequelize.STRING,
    primaryKey: false,
    model: 'docVersion',
    key: 'commitID'
  }
});

User.hasMany(PullRequest);
Doc.hasMany(PullRequest);


// PullRequest.belongsTo(User, { as: 'requester', foreignKey: 'requesterName', targetKey: 'username'});
// PullRequest.belongsTo(User, { as: 'target', foreignKey: 'targetUsername', targetKey: 'username'});
// PullRequest.belongsTo(Doc, { as: 'requestDoc', foreignKey: 'requestingDocId' });
// PullRequest.belongsTo(Doc, { as: 'nameofDoc', foreignKey: 'docName', targetKey: 'name'});
// PullRequest.belongsTo(Doc, { as: 'upstreamDoc', foreignKey: 'upstreamDocId' });
// PullRequest.belongsTo(DocVersion, { as: 'savepoint', foreignKey: 'commitId' });


// Sync all models and associations
sequelize.sync();
// sequelize.sync({force: true});


module.exports.User = User;
module.exports.Doc = Doc;
module.exports.DocVersion = DocVersion;
module.exports.DocPermission = DocPermission;
module.exports.PullRequest = PullRequest;



