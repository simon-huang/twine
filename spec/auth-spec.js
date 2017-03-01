import request from 'supertest';
import chai from 'chai';
import session from 'supertest-session';
import app from '../src/server/server.js';

var expect = chai.expect;
var User = require('../src/db/schema.js').User;

var username = 'tom';
var password = 'tom';
var email = 'tom@tom.com';

describe('Authentication Test', function() {
  var agent = request.agent(app);
  var testSession;

  beforeEach(function() {
    testSession = session(app);
  });

  describe('Login', function() {
   // before each
    beforeEach(function() {
      // use sequelize to create new user in database
      User
        .findOne({ where: {username: username} })
        .then(function(user) {
          if (!user) {
            User
              .build({
                username: username,
                password: password,
                email: email
              })
              .save()
              .then(() => console.log('made new user!'))
          } 
        });
    });
      
    // after each
    afterEach(function() {
      // delete user in database
      User
        .findOne({ where: {username: username} })
        .then(function(user) {
          if(user) {
            console.log('destroyed the user!')
            return user.destroy();
          }
        });
    });

    xit('get request to login returns a status code of 404', function(done) {
      agent
        .get('/api/auth/login')
        .end(function(err, res) {
          console.log('here we are');
          expect(res.statusCode).to.equal(404);
          done();
        });
    });

    it('testSession should sign in', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'tom@tom.com', password: 'tom' })
        .expect(302)
        .end(done);
    });

    it('returns a status code of 302 for redirect', function(done) {
      agent
        .post('/api/auth/login')
        .send({ email: 'tom@tom.com', password: 'tom' })
        .end(function(err, res) {
          expect(res.statusCode).to.equal(302);
          expect(res.headers['set-cookie']).to.not.equal([]);
          expect(res.headers['set-cookie']).to.not.equal(undefined);
          done();
        });
    });

  });

  xdescribe('Logout', function() {
    var authenticatedSession;

    beforeEach(function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'tom@tom.com', password: 'tom' })
        .expect(200)
        .end(function(err) {
          if (err) return done(err);

          authenticatedSession = testSession;
          return done();
        });
    });
    

    xit('destroys the session on logout', function(done) {
      var sessionCookie = testSession.cookies.find(cookie => cookie.name === 'connect.sid');
      expect(sessionCookie).to.not.equal(undefined);
      expect(sessionCookie).to.not.equal(null);

      testSession.post('/api/auth/logout') 
        .send()
        .expect(302)
        .end(function(err) {
          sessionCookie = testSession.cookies.find(cookie => cookie.name === 'connect.sid');
          expect(sessionCookie).to.equal(undefined);
          done();
        });
    });
  });

  describe('Register', function() {
    xit('should respond to existing users with 409 status code', function(done) {
      agent
        .post('/api/auth/register')
        .send({ email: 'eeee', password: 'pppp' })
        .end(function(err, res) {
          expect(res.statusCode).to.equal(409);
          expect(res.text).to.equal('user exists');
          done();
        });
    });
  });
});