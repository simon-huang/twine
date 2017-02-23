var NodeGit = require('nodegit');
var path = require('path');
var promisify = require('promisify-node');
var fse = promisify(require('fs-extra'));
fse.ensureDir = promisify(fse.ensureDir);


var fileName = "newfile.txt";
var repoDir = 'testRepos/createRepoTest';
var repository;
var index;

return NodeGit.Repository.init(path.resolve(__dirname, repoDir), 0)
.then(function(repo) {
  repository = repo;
  return fse.writeFile(path.join(repository.workdir(), fileName), '');
})
.then(function(){
  return repository.index();
})
.then(function(idx) {
  index = idx;
})
.then(function() {
  return index.addByPath(fileName);
})
.then(function() {
  return index.write();
})
.then(function() {
  return index.writeTree();
})
.then(function(oid) {
  var author = NodeGit.Signature.now('Simon','simon@gmail.com');
  var committer = NodeGit.Signature.now('Simon','simon@gmail.com');

  return repository.createCommit("HEAD", author, committer, "Add textfile", oid, []);
})
.done(function(commitId) {
});