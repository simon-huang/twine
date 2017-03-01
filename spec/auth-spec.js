import request from 'supertest';
import chai from 'chai';
import session from 'supertest-session';
import app from '../src/server/server.js';
//var Sequelize = require('sequelize');
//var User = require('../src/db/schema.js').User;

var username = 'tom';
var password = 'tom';
var email = 'tom@tom.com';

var expect = chai.expect;

describe('Authentication Test', function() {
  
  var agent = request.agent(app);
  var testSession;

  beforeEach(function() {
    testSession = session(app);
  });
  
  describe('Login', function() {

   /* // before each
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
    */
    xit('should sign in with testSession', function(done) {
      // var testSession = session(app);
      agent
        .post('/api/auth/login')
        .send({ password: 'tom', email: 'tom@tom.com' })
        .end(function(err, res) {
          console.log("STATUS CODE", res.statusCode);
          expect(res.statusCode).to.equal(200);
          done();
        });
    });

    xit('should return a status code of 200 for redirect', function(done) {
      //var testSession = session(app);
      agent
        .post('/api/auth/login')
        .send({ email: 'tom@tom.com', password: 'tom' })
        .end(function(err, res) {
          console.log("STATUS CODE:  ", res.statusCode)
          expect(res.statusCode).to.equal(200);
          expect(res.headers['set-cookie']).to.not.equal([]);
          expect(res.headers['set-cookie']).to.not.equal(undefined);
          done();
        });
    });
    
    it('should return a status code of 404 when there`s a get request to login', function(done) {
      //var testSession = session(app);
      agent
        .get('/api/auth/login')
        .end(function(err, res) {
          //console.log('response', res);
          console.log('STATUS CODE:  ', res.statusCode);
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
  });
  
  xdescribe('Logout', function() {
    var authenticatedSession;

    beforeEach(function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'tom@tom.com', password: 'tom' })
        .expect(302)
        .end(function(err) {
          if (err) return done('this is the error', err);
          authenticatedSession = testSession;
          return done();
        });
    });
    
    it('should destroy the session on logout', function(done) {
      var sessionCookie = testSession.cookies.find(cookie => cookie.name === 'connect.sid');
      //console.log('sessionCookie: ', sessionCookie);
      expect(sessionCookie).to.not.equal(undefined);
      expect(sessionCookie).to.not.equal(null);

      testSession.post('/api/auth/logout') 
        .send()
        .expect(302)
        .end(function(err) {
          sessionCookie = testSession.cookies.find(cookie => cookie.name === 'connect.sid');
          //console.log('Second session cookie', sessionCookie);
          expect(sessionCookie).to.equal(undefined);
          done();
        });
    });
  });

  xdescribe('Sign Up', function() {
    it('should respond to existing users with 409 status code', function(done) {
      testSession
        .post('/api/auth/signup')
        .send({ username: 'tom', password: 'tom' , email: 'tom@tom.com'})
        .end(function(err, res) {
          console.log('STATUS CODE:  ', res.statusCode);
          console.log('STATUS TEXT:  ', res.text);
          expect(res.statusCode).to.equal(409);
          //expect(res.statusCode).to.equal(200);
          expect(res.text).to.equal('user exists');
          done();
        });
    });
  });
});