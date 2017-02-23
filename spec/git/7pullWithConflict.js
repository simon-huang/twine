var NodeGit = require('nodegit');
var path = require('path');
var promisify = require('promisify-node');
var fse = promisify(require('fs-extra'));
fse.ensureDir = promisify(fse.ensureDir);


var fileName = "newfile.txt";
var fileContent = "hello world";
var repoDir = 'testRepos/7MergeConflict/7MergeTestOriginal';
var secondRepoDir = 'testRepos/7MergeConflict/7MergeTestClone';
var repository;
var index;


var exec = require('child_process').exec;
exec = promisify(exec);

// MAKE SURE TESTING ENVIRONMENT IS CLEAN
return fse.remove(path.resolve(__dirname, 'testRepos/7MergeConflict'))
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
  // CLONE ORIGIN
  return NodeGit.Clone(path.resolve(__dirname, repoDir), path.resolve(__dirname, secondRepoDir));
})
// on origin, add add cloned as remote
.then(function() {
  return NodeGit.Repository.open(path.resolve(__dirname, repoDir));
})
.then(function(repo) {
  repository = repo;
  return NodeGit.Remote.create(repository, 'me', path.resolve(__dirname, secondRepoDir));
})
// EDIT ORIGIN
.then(function() {
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
// EDIT CLONE
.then(function() {
  return NodeGit.Repository.open(path.resolve(__dirname, secondRepoDir));
})
.then(function(repo) {
  repository = repo;
  return fse.writeFile(path.join(repository.workdir(), fileName), 'Overwriting clone with this');
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

  return repository.createCommit("HEAD", author, committer, "Overwrite clone", oid, [parent]);
})
.then(function(a) {
  console.log('commit added ', a);
  return exec("git --git-dir=/Users/simonhuang/Desktop/publishus/spec/testRepos/7MergeConflict/7MergeTestClone/.git --work-tree=/Users/simonhuang/Desktop/publishus/spec/testRepos/7MergeConflict/7MergeTestClone/ pull origin master");
})
.then(function(a,b,c) {
  console.log('pulled ', a,b,c);
})
.catch(function(a,b,c) {
  console.log('pull conflict ', a,b,c);
})
.done(function() {
  console.log("Done!");
});
