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

  xdescribe('New Doc', function() {
    it('should work', function(done) {
      agent
        .post('/api/doc/createDoc')
        .send({username: 'Sim', name: 'testMinusSpacesDoc2', description: 'This is the test', public: 'public'})
        .end(function(err, res) {
          expect(res.text).to.equal('Success');
          done();
        });
    });
  });

  xdescribe('Save Doc', function() {
    it('should work without commit message', function(done) {
      agent
        .post('/api/doc/saveDoc')
        .send({username: 'Sim', name: 'testMinusSpacesDoc2', text: 'Overwriting the text 1', commit: ''})
        .end(function(err, res) {
          expect(res.text).to.equal('Saved');
          done();
        });
    });
    it('should work with commit message', function(done) {
      agent
        .post('/api/doc/saveDoc')
        .send({username: 'Sim', name: 'testMinusSpacesDoc2', text: 'Overwriting the text 2', commit: 'Testing commit'})
        .end(function(err, res) {
          expect(res.text).to.equal('Saved');
          done();
        });
    });
  });
  
  xdescribe('Copy Doc', function() {
    it('should work', function(done) {
      agent
        .post('/api/doc/copyDoc')
        .send({targetUser: 'Sim', name: 'testMinusSpacesDoc2', currentUser: 'Tim'})
        .end(function(err, res) {
          expect(res.text).to.equal('Copied');
          done();
        });
    });
  });

  xdescribe('Open Doc', function() {
    it('should work', function(done) {
      agent
        .post('/api/doc/openDoc')
        .send({username: 'Sim', name: 'testMinusSpacesDoc2'})
        .end(function(err, res) {
          expect(res.body.docText).to.equal('Overwriting the text 2');
          done();
        });
    });
  });
  xdescribe('Review Upstream', function() {
    it('should work', function(done) {
      agent
        .post('/api/doc/reviewUpstream')
        .send({username: 'Tim', name: 'testMinusSpacesDoc2'})
        .end(function(err, res) {
          console.log('res.text: ', res.text);
          // expect(res.body.docText).to.equal('Overwriting the text 2');
          done();
        });
    });
  });
  describe('Get Upstream', function() {
    it('should work', function(done) {
      agent
            .post('/api/doc/getUpstream')
            .send({username: 'Tim', name: 'testMinusSpacesDoc2'})
            .end(function(err, res) {
              console.log('res.text: ', res.text, res.body);
              // expect(res.body.docText).to.equal('Overwriting the text 2');
              done();
            });
        
      // agent
      //   .post('/api/doc/saveDoc')
      //   .send({username: 'Sim', name: 'testMinusSpacesDoc2', text: 'Overwriting the text a Fifth time', commit: ''})
      //   .end(function(err, res) {
      //     agent
      //       .post('/api/doc/getUpstream')
      //       .send({username: 'Tim', name: 'testMinusSpacesDoc2'})
      //       .end(function(err, res) {
      //         console.log('res.text: ', res.text, res.body);
      //         // expect(res.body.docText).to.equal('Overwriting the text 2');
      //         done();
      //       });
      //   });
    });
  });
});
