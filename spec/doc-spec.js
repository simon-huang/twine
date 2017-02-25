import request from 'supertest';
import chai from 'chai';
import session from 'supertest-session';
import app from '../src/server/server.js';

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
        .send({username: 'Sim', docName: 'Twelfth Test Doc', docDescription: 'This is the test', docType: 'public'})
        .end(function(err, res) {
          expect(res.body.docName).to.equal('Twelfth Test Doc');
          done();
        });
    });
  });

  describe('Save Doc', function() {
    it('should work without commit message', function(done) {
      agent
        .post('/api/doc/saveDoc')
        .send({username: 'Sim', docName: 'Twelfth Test Doc', docContent: 'Overwriting the text 1', commitMessage: ''})
        .end(function(err, res) {
          // expect(res.text).to.equal('Saved');
          done();
        });
    });
    it('should work with commit message', function(done) {
      agent
        .post('/api/doc/saveDoc')
        .send({username: 'Sim', docName: 'Twelfth Test Doc', docContent: 'Overwriting the text 2', commitMessage: 'Testing commit'})
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
        .send({docOwner: 'Sim', docName: 'Twelfth Test Doc', username: 'Tim'})
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
        .send({username: 'Sim', docName: 'Twelfth Test Doc'})
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
        .send({username: 'Tim', docName: 'Twelfth Test Doc'})
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
        .send({username: 'Sim', docName: 'Twelfth Test Doc', docContent: 'Overwriting the origin for something to be pulled', commitMessage: ''})
        .end(function(err, res) {
          agent
            .post('/api/doc/getUpstream')
            .send({username: 'Tim', docName: 'Twelfth Test Doc'})
            .end(function(err, res) {
              console.log('res.text: ', res.text, res. body);
              done();
            });
        });
    });
    it('should work despite merge conflict', function(done) {
      agent
        .post('/api/doc/saveDoc')
        .send({username: 'Sim', docName: 'Twelfth Test Doc', docContent: 'Overwriting the text a \nFifth time', commitMessage: ''})
        .end(function(err, res) {
          agent
            .post('/api/doc/saveDoc')
            .send({username: 'Tim', docName: 'Twelfth Test Doc', docContent: 'drones \nThis is it \nAgain time', commitMessage: ''})
            .end(function(err, res) {
              agent
                .post('/api/doc/getUpstream')
                .send({username: 'Tim', docName: 'Twelfth Test Doc'})
                .end(function(err, res) {
                  console.log('res.text: ', res.text, res.body);
                  done();
                });
            });
        });
    });
  });
});

          