
var NodeGit = require('nodegit');
var path = require('path');
var promisify = require('promisify-node');
var fse = promisify(require('fs-extra'));
fse.ensureDir = promisify(fse.ensureDir);

var filesFolder = 'documents';

var repository;
var index;


function createNewDoc(user, docName) {
  NodeGit.Repository.init(path.resolve(__dirname, filesFolder, user.username, docName), 0)
  .then(function(repo) {
    repository = repo;
    return fse.writeFile(path.join(repository.workdir(), docName + '.txt'), '');
  })
  .then(function(){
    return repository.index();
  })
  .then(function(idx) {
    index = idx;
  })
  .then(function() {
    return index.addByPath(docName);
  })
  .then(function() {
    return index.write();
  })
  .then(function() {
    return index.writeTree();
  })
  .then(function(oid) {
    var who = NodeGit.Signature.now(user.username, user.email);

    return repository.createCommit("HEAD", who, who, "Create document", oid, []);
  })
  .done(function(commitID) {
    return {
      path: path.resolve(__dirname, filesFolder, user.username, docName),
      commitID: commitID
    };
  });
}
// createNewDoc = promisify(createNewDoc);

export {createNewDoc};