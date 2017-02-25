// import { User, Doc, DocVersion, Doc Permission } from './schema.js';
var User = require('./schema.js').User;
var Doc = require('./schema.js').Doc;
var DocVersion = require('./schema.js').DocVersion;
var DocPermission = require('./schema.js').DocPermission;

// import { createNewDoc } from './docHelpers.js';
var NodeGit = require('nodegit');
var path = require('path');
var promisify = require('promisify-node');
var fse = promisify(require('fs-extra'));
fse.ensureDir = promisify(fse.ensureDir);

var filesFolder = 'documents';


// CHECK VARIABLE NAMES
function createDoc(req, res, next) {
  // console.log('POST request received on /api/doc/createDoc');
  console.log('req body ', req.body);
  var user, pathToDoc, commitID;

  var repository;
  var index;

  var doc = {
    name: req.body.name,
    description: req.body.description,
    public: req.body.TYPE === 'public' ? 1 : 0
  }; 
  
  // get userID
  return User.findOne({ where: {username: req.body.username } })
  .then(function(foundUser){
    console.log('found user ');
    user = foundUser.dataValues;
    // make sure the user doesn't already have a doc with the same name
    return Doc.findOne({ where: {name: req.body.name, userID: user.id} }) 
  })
  .then(function(foundDoc){
  //already exists
    if (foundDoc) {
      // res.status().end()
      console.log('doc already exists');
      res.end('You already have a doc with that name');
    } 
    console.log('make doc');
    var docName = doc.name;
    NodeGit.Repository.init(path.resolve(__dirname, filesFolder, user.username, docName), 0)
    .then(function(repo) {
      console.log('1');
      repository = repo;
      return fse.writeFile(path.join(repository.workdir(), docName + '.txt'), '');
    })
    .then(function(){
      console.log('2');
      return repository.index();
    })
    .then(function(idx) {
      console.log('3');
      index = idx;
    })
    .then(function() {
      console.log('4');
      return index.addByPath(docName+ '.txt');
    })
    .then(function() {
      console.log('5');
      return index.write();
    })
    .then(function() {
      console.log('6');
      return index.writeTree();
    })
    .then(function(oid) {
      console.log('7');
      var who = NodeGit.Signature.now(user.username, user.email);

      return repository.createCommit("HEAD", who, who, "Create document", oid, []);
    })
    .done(function(commit) {
      console.log('successful commit ', commit);
      commitID = commit.tostrS();
      console.log('file made')
      pathToDoc = path.resolve(__dirname, filesFolder, user.username, docName);
      Doc.build({
        name: doc.name,
        description: doc.description,
        filepath: pathToDoc,
        public: doc.public,
        origin: null,
        userId: user.id
      })
      .save()
      .then(function(madeDoc) { 
        console.log('put into database');
        doc = madeDoc;
        DocVersion.build({
          commitID: commitID,
          commitMessage: "Create document",
          docId: doc.id,
          userId: user.id
        })
        .save()
        .then(function(madeDocVersion) { 
          DocPermission.build({
            docId: doc.id,
            userId: user.id,
            type: 'owner'
          })
          .save()
          .then(function(madeDocPermission) { 
            res.end('Success'); // WHAT SHOULD WE SEND BACK? array, username, email
          })
        })
      })
    });
  })
};

//3:16
function saveDoc(req, res, next) {
  console.log('req body ', req.body);
  // {username, doc name, doc text, optional commit message}
  var user, doc, commitID, comment;

  var repository, index, oid;

  return User.findOne({ where: {username: req.body.username } })
  .then(function(foundUser){
    console.log('found user ');
    user = foundUser.dataValues;
    // make sure the user doesn't already have a doc with the same name
    return Doc.findOne({ where: {name: req.body.name, userID: user.id} }) 
  })
  .then(function(foundDoc){
    if (!foundDoc) {
      console.log('doc doesn\'t exist');
      res.end('Can\'t find that doc');
    }
    doc = foundDoc.dataValues; 
    console.log('save doc');
    NodeGit.Repository.open(doc.filepath)
    .then(function(repo) {
      repository = repo;
      return fse.writeFile(path.join(repository.workdir(), doc.name + '.txt'), req.body.text);
    })
    .then(function(){
      return repository.index();
    })
    .then(function(idx) {
      index = idx;
    })
    .then(function() {
      return index.addByPath(doc.name + '.txt');
    })
    .then(function() {
      return index.write();
    })
    .then(function() {
      return index.writeTree();
    })
    .then(function(oidResult) {
      oid = oidResult;
      return NodeGit.Reference.nameToId(repository, "HEAD");
    })
    .then(function(head) {
      return repository.getCommit(head);
    })
    .then(function(parent) {
      var author = NodeGit.Signature.now('Simon','simon@gmail.com');
      var committer = NodeGit.Signature.now('Simon','simon@gmail.com');
      comment = req.body.commit || new Date().toLocaleString();

      return repository.createCommit("HEAD", author, committer, comment, oid, [parent]);
    })
    .done(function(commit) {
      console.log('successful commit ', commit);
      commitID = commit.tostrS();
      // console.log(commit.tostrS(), typeof commit.tostrS());
      DocVersion.build({
        commitID: commitID,
        commitMessage: comment,
        docId: doc.id,
        userId: user.id
      })
      .save()
      .then(function(madeDocVersion) { 
        res.end('Saved');
      })
    });
  })
};

function copyDoc(req, res, next) {
  console.log('req body ', req.body);
  // {username, username and doc name of target doc}
  var currentUser, targetUser, targetDoc, copiedDoc;
  var newFilepath, repo;

  return User.findOne({ where: {username: req.body.targetUser } })
  .then(function(foundUser){
    console.log('found user ');
    targetUser = foundUser.dataValues;
    // make sure the user doesn't already have a doc with the same name
    return Doc.findOne({ where: {name: req.body.name, userID: targetUser.id} }) 
  })
  .then(function(foundDoc){
    if (!foundDoc) {
      console.log('doc doesn\'t exist');
      res.end('Can\t find that doc');
    }
    targetDoc = foundDoc.dataValues; 
    console.log('found target doc');
    return User.findOne({ where: {username: req.body.currentUser } })
  })
  .then(function(foundUser){
    console.log('found user ');
    currentUser = foundUser.dataValues;
    // make sure the user doesn't already have a doc with the same name
    return Doc.findOne({ where: {name: req.body.name, userID: currentUser.id} }) 
  })
  .then(function(foundDoc){
    if (foundDoc) {
      console.log('doc already exists');
      res.end('You already have a doc with that name');
    }
    newFilepath = path.resolve(__dirname, filesFolder, currentUser.username, targetDoc.name);
    NodeGit.Clone(targetDoc.filepath, newFilepath)
    .done(function(repository) {
      console.log('Cloned repo ', repository);
      repo = repository;
      Doc.build({
        name: targetDoc.name,
        description: targetDoc.description,
        filepath: newFilepath,
        public: targetDoc.public,
        origin: targetDoc.id,
        userId: currentUser.id
      })
      .save()
      .then(function(madeDoc) { 
        console.log('put into database');
        DocPermission.build({
          docId: madeDoc.id,
          userId: currentUser.id,
          type: 'owner'
        })
        .save()
        .then(function(madeDocPermission) { 
          res.end('Copied'); // WHAT SHOULD WE SEND BACK?
        })
      })
    });
  })
};

function openDoc(req, res, next) {
  console.log('req body ', req.body);
  // {username, doc name}
  var user, doc;
  var text, commits;
  var repository;

  return User.findOne({ where: {username: req.body.username } })
  .then(function(foundUser){
    console.log('found user ');
    user = foundUser.dataValues;
    return Doc.findOne({ where: {name: req.body.name, userID: user.id} }) 
  })
  .then(function(foundDoc){
    if (!foundDoc) {
      console.log('doc doesn\'t exist');
      res.end('Can\'t find that doc');
    }
    // console.log('found doc', foundDoc.dataValues);
    doc = foundDoc.dataValues; 
    console.log('get commits');
    return DocVersion.findAll({ where: {docId: doc.id, userId: user.id} })
  })
  .then(function(foundCommits){
    console.log('found commits ');
    commits = foundCommits.map((instance) => {
      return {
        id: instance.dataValues.id,
        commitID: instance.dataValues.commitID,
        commitMessage: instance.dataValues.commitMessage
      }
    });
    // console.log('reduced commits to send later ', commits);
    return NodeGit.Repository.open(doc.filepath)
  })
  .then(function(repo) {
    repository = repo;
    console.log('found repo');
    return fse.readFile(path.join(repository.workdir(), doc.name + '.txt'), 'utf8');
  })
  .done(function(data) {
    console.log('read contents ', data);
    text = data;
    res.send({
      docName: doc.name, 
      docDescription: doc.description,
      docText: text
    });
  })

};


export { createDoc, saveDoc, copyDoc, openDoc };


/*
On pull from origin:
receive request with info to find doc in database
need doc path and ID of origin document
get path of origin document
do a 'git pull origin master'
do a 'git add' and 'commit'
add the commit to DocVersion
send back an okay
*/

/*
Things to add to handle pull requests:
To let owners know they have a pull request to look at, I think we need another table for pull requests.
How do we let owners know they have a new pull request? The server can't initiate contact with the client
Also need to let collaborators know if there was an accept or reject.
*/

/*
On send pull request to origin:
receive request with info to find doc in database
*short version* 
make a copy of the current doc
add the path to the doc, the commitiD, the docID, and optionally the userID and the user/doc ID of the origin
  also whether the pull request is open/closed
*/

/*
On review pull request:
receive request with info to query table of pull requests
*then needs discussion (or I need to be filled in)*
  are we sending the client 2 version for them to see them side by side? 
  or a combined version from the diff tool?
*/


/*
On accepting/rejecting a pull request:
*short version* 
On accept: override origin and otherwise follow a regular document save
On reject: change the pull request to closed
Both: then notify
*/