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
var commit;

var commitSha = '7e8677a48a912687f13a2db84f717220066adf0d';
var currentText;

return fse.readFile(path.resolve(__dirname, '9CheckoutOldCommit', fileName), 'utf8')
.then(function(data) {
  currentText = data;
  console.log('at start: ', currentText);
  return NodeGit.Repository.open(path.resolve(__dirname, '9CheckoutOldCommit'))
})
.catch(function(e) {
  console.log(e);
})
.then(function(repo) {
  console.log('Repo open done!');
  repository = repo;
  return repository.getCommit(NodeGit.Oid.fromString(commitSha))
})
.then(function(c) {
  commit = c;
  console.log('Get commit done!');
  return NodeGit.Reset.reset(repository, commit, 3, {}, 'master')
  // return NodeGit.Checkout.tree(repository, commit)
})
.then(function(number) {
  console.log('Checkout done? ', number);
  return fse.readFile(path.resolve(__dirname, '9CheckoutOldCommit', fileName), 'utf8');
})
.done(function(data) {
  currentText = data;
  console.log('at end: ', currentText);
});
