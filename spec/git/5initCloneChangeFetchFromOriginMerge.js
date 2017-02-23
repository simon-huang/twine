var NodeGit = require('nodegit');
var path = require('path');
var promisify = require('promisify-node');
var fse = promisify(require('fs-extra'));
fse.ensureDir = promisify(fse.ensureDir);


var fileName = "newfile.txt";
var repoDir = 'testRepos/5FetchTestOriginal';
var secondRepoDir = 'testRepos/5FetchTestClone';
var repository;
var index;

// CREATE ORIGIN
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
  var author = NodeGit.Signature.now('me','me@gmail.com');
  var committer = NodeGit.Signature.now('me','me@gmail.com');

  return repository.createCommit("HEAD", author, committer, "Add textfile", oid, []);
})
.then(function(commitId) {
  // CLONE ORIGIN
  return NodeGit.Clone(path.resolve(__dirname, repoDir), path.resolve(__dirname, secondRepoDir));
})
  // EDIT ORIGIN
.then(function() {
  return NodeGit.Repository.open(path.resolve(__dirname, repoDir));
})
.then(function(repo) {
  repository = repo;
  return fse.writeFile(path.join(repository.workdir(), fileName), 'Overwriting with this');
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

  return repository.createCommit("HEAD", author, committer, "Overwrite textfile", oid, [parent]);
})
.then(function() {
  // FETCH CHANGES FROM ORIGIN
  return NodeGit.Repository.open(path.resolve(__dirname, secondRepoDir));
})
.then(function(repo) {
  repository = repo;
  return repository.fetch('origin', {
    callbacks: {
    }
  });
})
.then(function() {
  return repository.mergeBranches("master", "origin/master");
})
.done(function() {
  console.log("Done!");
});
