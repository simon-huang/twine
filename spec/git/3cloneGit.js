var NodeGit = require('nodegit');
var path = require('path');

var firstRepoDir = 'testRepos/createRepoTest';
var secondRepoDir = 'testRepos/cloneRepoTest';

return NodeGit.Clone(path.resolve(__dirname, firstRepoDir), path.resolve(__dirname, secondRepoDir))
.done(function(repo) {
  console.log('Cloned repo ', repo);
});
