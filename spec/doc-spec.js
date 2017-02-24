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
        .send({username: 'Sim', name: 'Test Doc', description: 'This is the test', public: 'public'})
        .end(function(err, res) {
          expect(res.text).to.equal('Success');
          done();
        });
    });
  });

  describe('Save Doc', function() {
    it('should work', function(done) {
      agent
        .post('/api/doc/saveDoc')
        .send({username: 'Sim', name: 'Test Doc', text: 'Overwriting the text', commit: ''})
        .end(function(err, res) {
          expect(res.text).to.equal('Saved');
          done();
        });
    });
  });
  
});
