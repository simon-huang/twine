var NodeGit = require('nodegit');
var path = require('path');
var promisify = require('promisify-node');
var fse = promisify(require('fs-extra'));
fse.ensureDir = promisify(fse.ensureDir);


var fileName = "newfile.txt";
var fileContent = "hello world";
var repoDir = '9CheckoutOldCommit';
var repository;
var index;


var exec = require('child_process').exec;
exec = promisify(exec);

// MAKE SURE TESTING ENVIRONMENT IS CLEAN
return fse.remove(path.resolve(__dirname, '9CheckoutOldCommit'))
// CREATE ORIGIN
.then(function() {
  return NodeGit.Repository.init(path.resolve(__dirname, repoDir), 0)
})
.then(function(repo) {
  repository = repo;
  return fse.writeFile(path.join(repository.workdir(), fileName), 'Original text');
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
  var author = NodeGit.Signature.now('me','me@gmail.com');
  var committer = NodeGit.Signature.now('me','me@gmail.com');

  return repository.createCommit("HEAD", author, committer, "Add textfile", oid, []);
})
.then(function(commitId) {
  return fse.writeFile(path.join(repository.workdir(), fileName), 'Overwriting original with this');
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
.then(function(oidResult) {
  oid = oidResult;
  return NodeGit.Reference.nameToId(repository, "HEAD");
})
.then(function(head) {
  return repository.getCommit(head);
})
.then(function(parent) {
  var author = NodeGit.Signature.now('me','me@gmail.com');
  var committer = NodeGit.Signature.now('me','me@gmail.com');

  return repository.createCommit("HEAD", author, committer, "Overwrite origin", oid, [parent]);
})
.done(function() {
  console.log("Done!");
});
