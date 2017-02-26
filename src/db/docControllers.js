var User = require('./schema.js').User;
var Doc = require('./schema.js').Doc;
var DocVersion = require('./schema.js').DocVersion;
var DocPermission = require('./schema.js').DocPermission;
var PullRequest = require('./schema.js').PullRequest;

var NodeGit = require('nodegit');
var path = require('path');
var promisify = require('promisify-node');
var fse = promisify(require('fs-extra'));
fse.ensureDir = promisify(fse.ensureDir);

// pull
var exec = require('child_process').exec;
// exec = promisify(exec);


// diff
var jsdiff = require('diff');
function escapeHTML(s) {
  var n = s;
  n = n.replace(/&/g, '&amp;');
  n = n.replace(/</g, '&lt;');
  n = n.replace(/>/g, '&gt;');
  n = n.replace(/"/g, '&quot;');
  return n;
}

var filesFolder = 'documents';

function retrieveDocsAndPullRequests(username, callback) {
  var user, docs, myDocs, pullRequests;
  var myDocsObject = {};
  User.findOne({ where: {username: username } })
  .then(function(foundUser) {
    user = foundUser;
    console.log('found user in db ');
    return Doc.findAll()
  })
  .then(function(allDocs) {
    console.log('found all docs');

    docs = allDocs.map(instance => {
      var type = instance.dataValues.public === 1 ? 'public' : 'private';
      return {
        docOwner: username,
        docName: instance.dataValues.name, 
        docDescription: instance.dataValues.description,
        docType: type,
        parentID: instance.dataValues.originId,
        filePath: instance.dataValues.filepath,
        docContent: '',
        docCommits: []
      }
    });
    myDocs = docs.filter(doc => {
      return doc.docOwner === user.username;
    });
    myDocsObject.owned = myDocs.filter(doc => {
      return doc.parentID === null;
    });
    myDocsObject.contributing = myDocs.filter(doc => {
      return doc.parentID !== null;
    });
    // console.log(myDocsObject);
    return PullRequest.findAll({ where: {targetUsername: user.username, status: 'open'} })
  })
  .then(function(foundPullRequests) {
    console.log('found pull requests db ');
    pullRequests = foundPullRequests.map(instance => {
      return {
        docOwner: user.username, 
        username: instance.dataValues.requesterName, 
        docName: instance.dataValues.docName,  
        collaboratorMessage: instance.dataValues.collaboratorMessage, 
        mergeStatus: 'open', 
        commitID: instance.dataValues.commitId, 
        ownerMessage: ''
      }
    });
    callback(docs, myDocsObject, pullRequests);
  })
}



// CHECK VARIABLE NAMES
function createDoc(req, res, next) {
  // console.log('POST request received on /api/doc/createDoc');
  console.log('req body ', req.body);
  var firstCommit;
  var user, pathToDoc, commitID;
  var repository;
  var index;
  var doc = {
    name: req.body.docName,
    description: req.body.docDescription,
    public: req.body.docType === 'public' ? 1 : 0
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
          firstCommit = madeDocVersion;
          DocPermission.build({
            docId: doc.id,
            userId: user.id,
            type: 'owner'
          })
          .save()
          .then(function(madeDocPermission) { 
            var type = doc.public === 1 ? 'public' : 'private';
            res.send({
              docOwner: user.username,
              docName: doc.name, 
              docDescription: doc.description,
              docType: type,
              parentID: null,
              filePath: doc.filepath,
              docContent: '',
              docCommits: [firstCommit]
            }); 
          })
        })
      })
    });
  })
};

function saveDoc(req, res, next) {
  console.log('req body ', req.body);
  // {username, doc name, doc text, optional commit message}
  var user, doc, commitID, comment, commits;

  var repository, index, oid;

  return User.findOne({ where: {username: req.body.username } })
  .then(function(foundUser){
    console.log('found user ');
    user = foundUser.dataValues;
    // make sure the user doesn't already have a doc with the same name
    return Doc.findOne({ where: {name: req.body.docName, userID: user.id} }) 
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
      return fse.writeFile(path.join(repository.workdir(), doc.name + '.txt'), req.body.docContent);
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
      var who = NodeGit.Signature.now(user.username, user.email);
      comment = req.body.commitMessage || new Date().toLocaleString();

      return repository.createCommit("HEAD", who, who, comment, oid, [parent]);
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
        return DocVersion.findAll({ where: {docId: doc.id} })
      })
      .done(function(foundCommits) {
        commits = foundCommits.map((instance) => {
          return {
            id: instance.dataValues.id,
            commitID: instance.dataValues.commitID,
            commitMessage: instance.dataValues.commitMessage
          }
        });
        res.send(commits);
      })
    });
  })
};


function copyDoc(req, res, next) {
  console.log('req body ', req.body);
  // {username, username and doc name of target doc}
  var currentUser, docOwner, targetDoc, copiedDoc, docs;
  var newFilepath, repo;

  return User.findOne({ where: {username: req.body.docOwner } })
  .then(function(foundUser){
    console.log('found user ');
    docOwner = foundUser.dataValues;
    // make sure the user doesn't already have a doc with the same name
    return Doc.findOne({ where: {name: req.body.docName, userID: docOwner.id} }) 
  })
  .then(function(foundDoc){
    if (!foundDoc) {
      console.log('doc doesn\'t exist');
      res.end('Can\t find that doc');
    }
    targetDoc = foundDoc.dataValues; 
    console.log('found target doc');
    return User.findOne({ where: {username: req.body.username } })
  })
  .then(function(foundUser){
    console.log('found user ');
    currentUser = foundUser.dataValues;
    // make sure the user doesn't already have a doc with the same name
    return Doc.findOne({ where: {name: req.body.docName, userID: currentUser.id} }) 
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
        originId: targetDoc.id,
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
          console.log('put permission in db');
          return Doc.findAll({ where: {userId: currentUser.id} })
        })
        .then(function(allDocs) {
          docs = allDocs.map(instance => {
            var type = instance.dataValues.public === 1 ? 'public' : 'private';
            return {
              docOwner: currentUser.username,
              docName: instance.dataValues.name, 
              docDescription: instance.dataValues.description,
              docType: type,
              parentID:instance.dataValues.originId,
              filePath: instance.dataValues.filepath,
              docContent: '',
              docCommits: []
            }
          });
          console.log('found updated list of all docs');
          res.send({allDocuments: docs}); 
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
    return Doc.findOne({ where: {name: req.body.docName, userID: user.id} }) 
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
    var type = doc.public === 1 ? true : false;
    res.send({
      docOwner: user.username,
      docName: doc.name, 
      docDescription: doc.description,
      docType: type,
      parentID: doc.originId,
      filePath: doc.filepath,
      docContent: text,
      docCommits: commits,
    });
  })
};

function reviewUpstream(req, res, next) {
  console.log('req body ', req.body);
  // {username, doc name}
  var user, doc, upstreamDoc;
  var repository;
  var result = [];
  var obj = {};

  return User.findOne({ where: {username: req.body.username } })
  .then(function(foundUser){
    console.log('found user ');
    user = foundUser.dataValues;
    return Doc.findOne({ where: {name: req.body.docName, userID: user.id} }) 
  })
  .then(function(foundDoc){
    if (!foundDoc) {
      console.log('doc doesn\'t exist');
      res.end('Can\'t find that doc');
    }
    console.log('found my doc');
    doc = foundDoc.dataValues; 
    return Doc.findOne({ where: {name: req.body.docName, id: doc.originId} }) 
  })
  .then(function(foundDoc){
    if (!foundDoc) {
      console.log('doc doesn\'t exist');
      res.end('Can\'t find upstream doc');
    }
    console.log('found upstream doc');
    upstreamDoc = foundDoc.dataValues; 
    // console.log('here they are ', doc, upstreamDoc);
    return fse.readFile(path.join(doc.filepath, doc.name + '.txt'), 'utf8')
  })
  .then(function(data) {
    obj.text1 = data;
    console.log('text 1 ', data);
    return fse.readFile(path.join(upstreamDoc.filepath, upstreamDoc.name + '.txt'), 'utf8')
  })
  .done(function(data) {
    obj.text2 = data;
    console.log('text 2 ', data);
    var diff = jsdiff.diffWordsWithSpace(obj.text1, obj.text2);

    diff.forEach(function(part){
      if (part.added) {
        result.push('<ins>');
      } else if (part.removed) {
        result.push('<del>');
      }

      result.push(escapeHTML(part.value));

      if (part.added) {
        result.push('</ins>');
      } else if (part.removed) {
        result.push('</del>');
      }
    });

    console.log('result', result.join(''));
    result = result.join('');
    res.send({
      docContent: obj.text1,
      diffToolMergePreview: result
    });
  })
};

function getUpstream(req, res, next) {
  console.log('req body ', req.body);
  // {username, doc name}
  var user, doc, upstreamDoc, text;
  var repository, index, oid, comment, commitID, commits;

  return User.findOne({ where: {username: req.body.username } })
  .then(function(foundUser){
    console.log('found user ');
    user = foundUser.dataValues;
    return Doc.findOne({ where: {name: req.body.docName, userID: user.id} }) 
  })
  .then(function(foundDoc){
    if (!foundDoc) {
      console.log('doc doesn\'t exist');
      res.end('Can\'t find that doc');
    }
    console.log('found my doc');
    doc = foundDoc.dataValues; 
    return Doc.findOne({ where: {name: req.body.docName, id: doc.originId} }) 
  })
  .then(function(foundDoc){
    if (!foundDoc) {
      console.log('doc doesn\'t exist');
      res.end('Can\'t find upstream doc');
    }
    console.log('found upstream doc');
    upstreamDoc = foundDoc.dataValues; 
    console.log('both filepaths ', doc.filepath, upstreamDoc.filepath);
    var fp = doc.filepath.split('');
    for (var i = 0; i < fp.length; i++) {
      // console.log(fp[i]);
      if (fp[i] === ' ') {
        // console.log('found a space');
        fp[i] = '\\\ ';
      }
    }
    // console.log('edited fp ', fp);
    fp = fp.join('');
    exec(`git --git-dir=${fp}/.git --work-tree=${fp}/ pull origin master`, (error, stdout, stderr) => {
      console.log(error, stdout, stderr);
      NodeGit.Repository.open(doc.filepath)
      .then(function(repo) {
        repository = repo;
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
        var who = NodeGit.Signature.now(user.username, user.email);
        comment = `Update from original at ${new Date().toLocaleString()}`;

        return repository.createCommit("HEAD", who, who, comment, oid, [parent]);
      })
      .then(function(commit) {
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
          return fse.readFile(path.join(doc.filepath, doc.name + '.txt'), 'utf8');
        })
        .then(function(data) {
          console.log('read contents ', data);
          text = data;
          return DocVersion.findAll({ where: {docId: doc.id, userId: user.id} })
        })
        .done(function(foundCommits) {
          commits = foundCommits.map((instance) => {
            return {
              id: instance.dataValues.id,
              commitID: instance.dataValues.commitID,
              commitMessage: instance.dataValues.commitMessage
            }
          });
          res.send({
            docOwner: user.id,
            docName: doc.name, 
            docDescription: '',
            docType: doc.description,
            parentID: doc.originId,
            filePath: doc.filepath,
            docContent: text,
            docCommits: commits
          });
        })
      })
    });
  })
};

function requestMerge(req, res, next) { 
  console.log('req body ', req.body);
  // {username, docName, collaboratorMessage, commitID}
  var user, doc, upstreamDoc, upstreamUser, text;
  var repository, index, oid, comment, commitID;
  var pathToClonedRequester;


  return User.findOne({ where: {username: req.body.username } })
  .then(function(foundUser){
    console.log('found user ');
    user = foundUser.dataValues;
    return Doc.findOne({ where: {name: req.body.docName, userID: user.id} }) 
  })
  .then(function(foundDoc){
    if (!foundDoc) {
      console.log('doc doesn\'t exist');
      res.end('Can\'t find that doc');
    }
    console.log('found my doc');
    doc = foundDoc.dataValues; 
    return Doc.findOne({ where: {name: req.body.docName, id: doc.originId} }) 
  })
  .then(function(foundDoc){
    if (!foundDoc) {
      console.log('doc doesn\'t exist');
      res.end('Can\'t find upstream doc');
    }
    console.log('found upstream doc');
    upstreamDoc = foundDoc.dataValues; 
    return User.findOne({ where: {id: upstreamDoc.userId } })
  })
  .then(function(foundUser){
    if (!foundUser) {
      console.log('log: Can\'t find upstream user');
      res.end('Can\'t find upstream user');
    }
    console.log('found upstream user ');
    upstreamUser = foundUser.dataValues;
    PullRequest.build({
      status: 'open',
      collaboratorMessage: req.body.collaboratorMessage,
      requesterName: user.username,
      requestingDocId: doc.id,
      targetUsername: upstreamUser.username,
      docName: doc.name,
      upstreamDocId: upstreamDoc.id,
      commitId: req.body.commitID
    })
    .save()
    .then(function(pullRequestEntry) {
      // console.log('Pull request added to database', pullRequestEntry);
      console.log('type ', typeof pullRequestEntry.id);
      var stringiFiedID = '' + pullRequestEntry.id;
      pathToClonedRequester = path.resolve(__dirname, 'pullRequests', stringiFiedID);
      return NodeGit.Clone(doc.filepath, pathToClonedRequester);
    })
    .then(function(repo) {
      res.end('Pull request sent');
    })
  })
};


function reviewPullRequest(req, res, next) { 
  console.log('req body ', req.body);
  // {commitID}
  var user, doc, requestingDoc, pullRequest;
  var repository;
  var result = [];
  var obj = {};
  return PullRequest.findOne({ where: {commitId: req.body.commitID } })
  .then(function(foundPullRequest){
    console.log('found pull request ', foundPullRequest);
    pullRequest = foundPullRequest.dataValues;
    return Doc.findOne({ where: {id: pullRequest.upstreamDocId} }) 
  })
  .then(function(foundUpstreamDoc){
    console.log('found upstreamDequest ', foundUpstreamDoc);
    doc = foundUpstreamDoc.dataValues;
    return fse.readFile(path.join(doc.filepath, doc.name + '.txt'), 'utf8')
  })
  .then(function(data) {
    obj.text1 = data;
    console.log('text 1 ', data);
    var stringiFiedID = '' + pullRequest.id;
    return fse.readFile(path.join(__dirname, 'pullRequests', stringiFiedID, doc.name + '.txt'), 'utf8')
  })
  .done(function(data) {
    obj.text2 = data;
    console.log('text 2 ', data);
    var diff = jsdiff.diffWordsWithSpace(obj.text1, obj.text2);

    diff.forEach(function(part){
      if (part.added) {
        result.push('<ins>');
      } else if (part.removed) {
        result.push('<del>');
      }

      result.push(escapeHTML(part.value));

      if (part.added) {
        result.push('</ins>');
      } else if (part.removed) {
        result.push('</del>');
      }
    });

    // console.log('result', result.join(''));
    result = result.join('');
    res.send({
      originContent: obj.text1,
      diffContent: result
    });
  })
};

function actionPullRequest(req, res, next) { 
  // commitID, ownerMessage, mergeStatus: 'accept/decline' 
  console.log('req body ', req.body);
  // {commitID}
  var user, upstreamDoc, requestingDoc, pullRequest, text;
  var repository, index, oid, comment, commitID;

  return PullRequest.findOne({ where: {commitId: req.body.commitID } })
  .then(function(foundPullRequest){
    console.log('found pull request ');
    pullRequest = foundPullRequest.dataValues;
    console.log(pullRequest);
    if (req.body.mergeStatus === 'decline') {
      pullRequest.status = 'decline';
      pullRequest.save()
      .then(function(){
        console.log('Updated table for denial');
        res.end('Pull Request declined');
      })
    }
    return Doc.findOne({ where: {id: pullRequest.upstreamDocId} }) 
  })
  .then(function(foundUpstreamDoc){
    console.log('found upstream doc', foundUpstreamDoc.dataValues);
    upstreamDoc = foundUpstreamDoc.dataValues;
    return User.findOne({ where: {username: pullRequest.targetUsername } })
  })
  .then(function(foundUser){
    console.log('foundUser', foundUser.dataValues);
    user = foundUser.dataValues;
    return NodeGit.Repository.open(upstreamDoc.filepath);
  })
  .then(function(repo) {
    console.log('opened repo');
    repository = repo;
    var stringiFiedID = '' + pullRequest.id;
    return NodeGit.Remote.create(repository, `pullRequestFrom${pullRequest.requesterName}`, path.join(__dirname, 'pullRequests', stringiFiedID));
  }) 
  .then(function() {
    console.log('remote made');
    var fp = upstreamDoc.filepath.split('');
    for (var i = 0; i < fp.length; i++) {
      // console.log(fp[i]);
      if (fp[i] === ' ') {
        // console.log('found a space');
        fp[i] = '\\\ ';
      }
    }
    // console.log('edited fp ', fp);
    fp = fp.join('');

    exec(`git --git-dir=${fp}/.git --work-tree=${fp}/ pull pullRequestFrom${pullRequest.requesterName} master`, (error, stdout, stderr) => {
      console.log(error, stdout, stderr);
      NodeGit.Repository.open(upstreamDoc.filepath)
      .then(function(repo) {
        repository = repo;
        console.log('got here 1');
        return repository.index();
      })
      .then(function(idx) {
        console.log('got here 2');
        index = idx;
        return index.addByPath(upstreamDoc.name + '.txt');
      })
      .then(function(s) {
        console.log('got here 3', s);
        return index.write();
      })
      .catch(function(e) {
        console.log('error',e)
      })
      .then(function() {
        console.log('got here 4');
        return index.writeTree();
      })
      .then(function(oidResult) {
        oid = oidResult;
        console.log('got here 5');
        return NodeGit.Reference.nameToId(repository, "HEAD");
      })
      .then(function(head) {
        return repository.getCommit(head);
      })
      .then(function(parent) {
        console.log('got here 7');
        var who = NodeGit.Signature.now(user.username, user.email);
        comment = `Contribution from ${upstreamDoc.requesterName} at ${new Date().toLocaleString()}`;

        return repository.createCommit("HEAD", who, who, comment, oid, [parent]);
      })
      .then(function(commit) {
        console.log('successful commit ', commit);
        commitID = commit.tostrS();
        // console.log(commit.tostrS(), typeof commit.tostrS());
        DocVersion.build({
          commitID: commitID,
          commitMessage: comment,
          docId: upstreamDoc.id,
          userId: user.id
        })
        .save()
        .then(function(madeDocVersion) {
          return fse.readFile(path.join(upstreamDoc.filepath, upstreamDoc.name + '.txt'), 'utf8');
        })
        .then(function(data) {
          console.log('read contents ', data);
          text = data;
          return DocVersion.findAll({ where: {docId: upstreamDoc.id, userId: user.id} })
        })
        .done(function(foundCommits) {
          var commits = foundCommits.map((instance) => {
            return {
              id: instance.dataValues.id,
              commitID: instance.dataValues.commitID,
              commitMessage: instance.dataValues.commitMessage
            }
          });
          res.send({
            docOwner: user.id,
            docName: upstreamDoc.name, 
            docDescription: '',
            docType: upstreamDoc.description,
            parentID: upstreamDoc.originId,
            filePath: upstreamDoc.filepath,
            docContent: text,
            docCommits: commits
          });
        })
      })
    });
  })

// reject
// nothing

// accept
// have upstream pull from the new clone

// both
// update PullRequest table in db
};

export { retrieveDocsAndPullRequests, createDoc, saveDoc, copyDoc, openDoc, reviewUpstream, getUpstream, requestMerge, reviewPullRequest, actionPullRequest };
