var NodeGit = require('nodegit');
var path = require('path');
var promisify = require('promisify-node');
var fse = promisify(require('fs-extra'));
fse.ensureDir = promisify(fse.ensureDir);


var fileName = "newfile.txt";
var repoDir = 'testRepos/removeFileTest';
var repository;
var index;
var old;

return NodeGit.Repository.open(path.resolve(__dirname, repoDir))
.then(function(repo) {
  repository = repo;
  return repository.index();
})
.then(function(idx) {
  index = idx;
})
.then(function() {
  return index.removeByPath(fileName);
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

  return repository.createCommit("HEAD", author, committer, "Overwrite textfile", oid, [parent]);
})
.then(function(commitId) {
  console.log("New Commit for removing from index: ", commitId);
  return fse.unlink(path.join(repository.workdir(), fileName));
})
.done(function() {
  console.log('Deleted file')
});