import request from 'supertest';
import chai from 'chai';
import session from 'supertest-session';
import app from '../src/server/server.js';

var testName = 'Third Test';
var expect = chai.expect;

describe('Doc Tests', function() {
  var agent = request.agent(app);
  var testSession;

  beforeEach(function() {
    testSession = session(app);
  });

  describe('New Doc', function() {
    it('should work', function(done) {
      agent
        .post('/api/doc/createDoc')
        .send({username: 'Sim', docName: testName, docDescription: 'This is the test', docType: 'public'})
        .end(function(err, res) {
          expect(res.body.docName).to.equal(testName);
          done();
        });
    });
  });

  describe('Save Doc', function() {
    it('should work without commit message', function(done) {
      agent
        .post('/api/doc/saveDoc')
        .send({username: 'Sim', docName: testName, docContent: 'Overwriting the text 1', commitMessage: ''})
        .end(function(err, res) {
          console.log('saved ', res.body);
          // expect(res.text).to.equal('Saved');
          done();
        });
    });
    xit('should work with commit message', function(done) {
      agent
        .post('/api/doc/saveDoc')
        .send({username: 'Sim', docName: testName, docContent: 'Overwriting the text 2', commitMessage: 'Testing commit'})
        .end(function(err, res) {
          // expect(res.text).to.equal('Saved');
          done();
        });
    });
  });
  
  describe('Copy Doc', function() {
    it('should work', function(done) {
      agent
        .post('/api/doc/copyDoc')
        .send({docOwner: 'Sim', docName: testName, username: 'Tim'})
        .end(function(err, res) {
          expect(Array.isArray(res.body.allDocuments)).to.equal(true);
          done();
        });
    });
  });

  describe('Open Doc', function() {
    it('should work', function(done) {
      agent
        .post('/api/doc/openDoc')
        .send({username: 'Sim', docName: testName})
        .end(function(err, res) {
          console.log('opened ', res.body);
          // expect(res.body.docText).to.equal('Overwriting the text 2');
          done();
        });
    });
  });
  describe('Review Upstream', function() {
    it('should work', function(done) {
      agent
        .post('/api/doc/reviewUpstream')
        .send({username: 'Tim', docName: testName})
        .end(function(err, res) {
          console.log('res.body: ', res.body);
          // expect(res.body.docText).to.equal('Overwriting the text 2');
          done();
        });
    });
  });
  describe('Get Upstream', function() {
    it('should work when there\'s no merge conflict', function(done) {
      agent
        .post('/api/doc/saveDoc')
        .send({username: 'Sim', docName: testName, docContent: 'Overwriting the origin for something to be pulled', commitMessage: ''})
        .end(function(err, res) {
          agent
            .post('/api/doc/getUpstream')
            .send({username: 'Tim', docName: testName})
            .end(function(err, res) {
              console.log('res.text: ', res.text, res. body);
              done();
            });
        });
    });
    it('should work despite merge conflict', function(done) {
      agent
        .post('/api/doc/saveDoc')
        .send({username: 'Sim', docName: testName, docContent: 'Overwriting the text a \nasdfth time', commitMessage: ''})
        .end(function(err, res) {
          agent
            .post('/api/doc/saveDoc')
            .send({username: 'Tim', docName: testName, docContent: 'drones \nThis is it \nAgain time', commitMessage: ''})
            .end(function(err, res) {
              agent
                .post('/api/doc/getUpstream')
                .send({username: 'Tim', docName: testName})
                .end(function(err, res) {
                  console.log('res.text: ', res.text, res.body);
                  done();
                });
            });
        });
    });
  });

  xdescribe('Get All Docs', function() {
    it('should work', function(done) {
      agent
        .get('/api/doc/allDocs')
        .end(function(err, res) {
          console.log('this is the res.body: ', res.body);
          // expect(res.body).to.equal();
          done();
        });
    });
  });

  xdescribe('Request Merge', function() {
    it('should work without commit message', function(done) {
      agent
        .post('/api/doc/saveDoc')
        .send({username: 'Tim', docName: testName, docContent: 'Doing an overwrite\nSo that I can \nTry to merge this in', commitMessage: ''})
        .end(function(err, res) {
          console.log('saved ', res.body);
          var latestCommit = res.body.currentCommit;
          // expect(res.text).to.equal('Saved');
          agent
            .post('/api/doc/requestMerge')
            .send({username: 'Tim', docName: testName, collaboratorMessage: 'Helping', commitID: latestCommit})
            .end(function(err, res) {
              expect(res.text).to.equal('Pull request sent');
              done();
            });
        });
    });
    xit('should work', function(done) {
      agent
        .post('/api/doc/requestMerge')
        .send({username: 'Tim', docName: testName, collaboratorMessage: 'Helping', commitID: 'INSERT'})
        .end(function(err, res) {
          expect(res.text).to.equal('Pull request sent');
          done();
        });
    });
  });
  xdescribe('Review Pull Request', function() {
    it('should work', function(done) {
      agent
        .post('/api/doc/reviewPullRequest')
        .send({commitID: '31875cbef6fb670c25ae85ea7ca848bb3e65e7f9'})
        .end(function(err, res) {
          console.log('res.body: ', res.body);
          // expect(res.text).to.equal('Pull request sent');
          done();
        });
    });
  });
  describe('Action Pull Request', function() {
    it('should accept', function(done) {
      agent
        .post('/api/doc/actionPullRequest')
        .send({commitID: '31875cbef6fb670c25ae85ea7ca848bb3e65e7f9', ownerMessage: 'Thanks', mergeStatus: 'accept'})
        .end(function(err, res) {
          console.log('res.body: ', res.body);
          // expect(res.text).to.equal('Pull request sent');
          done();
        });
    });
    xit('should decline', function(done) {
      agent
        .post('/api/doc/actionPullRequest')
        .send({commitID: '4a41c49373204ca91a6ec2a7a392374bd876d85a', ownerMessage: 'Nope', mergeStatus: 'decline'})
        .end(function(err, res) {
          console.log('res.body: ', res.body);
          // expect(res.text).to.equal('Pull request sent');
          done();
        });
    });
  });

  xdescribe('Checkout past version', function() {
    it('should work', function(done) {
      agent
        .post('/api/doc/pastVersion')
        .send({commitID: 'f912e43ed93ffde7ca4031f1c97e28f2d829948c'})
        .end(function(err, res) {
          console.log('res.body: ', res.body);
          // expect(res.text).to.equal('Pull request sent');
          done();
        });
    });
  });
});

          