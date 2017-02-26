import request from 'supertest';
import chai from 'chai';
import session from 'supertest-session';
import app from '../src/server/server.js';

var testName = 'Eighth Test';
var expect = chai.expect;

describe('Doc Tests', function() {
  var agent = request.agent(app);
  var testSession;

  beforeEach(function() {
    testSession = session(app);
  });

  xdescribe('New Doc', function() {
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

  xdescribe('Save Doc', function() {
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
  
  xdescribe('Copy Doc', function() {
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

  xdescribe('Open Doc', function() {
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
  xdescribe('Review Upstream', function() {
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
  xdescribe('Get Upstream', function() {
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
  xdescribe('Request Merge', function() {
    it('should work without commit message', function(done) {
      agent
        .post('/api/doc/saveDoc')
        .send({username: 'Tim', docName: testName, docContent: 'Doing an overwrite\nSo that I can \nTry to merge this in', commitMessage: ''})
        .end(function(err, res) {
          console.log('saved ', res.body);
          var latestCommit = res.body[res.body.length - 1].commitID;
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
        .send({commitID: 'CHECK DATABASE'})
        .end(function(err, res) {
          console.log('res.body: ', res.body);
          // expect(res.text).to.equal('Pull request sent');
          done();
        });
    });
  });
  describe('Action Pull Request', function() {
    it('should work', function(done) {
      agent
        .post('/api/doc/actionPullRequest')
        .send({commitID: '93ecd7e84eb97202cd272fc4b34e3681a470f4cf', ownerMessage: 'Thanks', mergeStatus: 'accept'})
        .end(function(err, res) {
          console.log('res.body: ', res.body);
          // expect(res.text).to.equal('Pull request sent');
          done();
        });
    });
  });
});

          