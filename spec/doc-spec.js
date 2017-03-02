import request from 'supertest';
import chai from 'chai';
import session from 'supertest-session';
import app from '../src/server/server.js';

var testName = 'Fourth Test';
var expect = chai.expect;

describe('Profile and Doc Route Tests', function() {
  var agent = request.agent(app);
  var testSession;

  beforeEach(function() {
    testSession = session(app);
  });
  // write tests trying to grab a private doc as both the correct logged in user and not
  xdescribe('Get a doc', function() {
    xit('someone else should not grab my private doc', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'Tim@gmail.com', password: 'Tim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('login error ', res.error);
          } else {
            console.log('no error');
            testSession
              .get('/profile/Sim/7')
              .end(function(err, res) {
                expect(res.text).to.equal('You don\'t have permission to view this doc');
                console.log('response ', res.body)
                done();
              });
          }
        });        
    });
    xit('should grab my private doc', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'Sim@gmail.com', password: 'Sim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('login error ', res.error);
            done()
          } else {
            console.log('no error');
            testSession
              .get('/profile/Sim/7')
              .end(function(err, res) {
                expect(res.body.docOwner).to.equal('Sim');
                console.log('response ', res.body)
                done();
              });
          }
        });        
    });
    it('someone else can grab my public doc', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'Tim@gmail.com', password: 'Tim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('login error ', res.error);
          } else {
            console.log('no error');
            testSession
              .get('/profile/Sim/1')
              .end(function(err, res) {
                expect(res.body.docOwner).to.equal('Sim');
                console.log('response ', res.body)
                done();
              });
          }
        });        
    });
    it('I can grab my public doc', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'Sim@gmail.com', password: 'Sim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('login error ', res.error);
          } else {
            console.log('no error');
            testSession
              .get('/profile/Sim/1')
              .end(function(err, res) {
                expect(res.body.docOwner).to.equal('Sim');
                console.log('response ', res.body)
                done();
              });
          }
        });        
    });
    it('Anyone can grab my public doc', function(done) {
      testSession
        .get('/profile/Sim/1')
        .end(function(err, res) {
          expect(res.body.docOwner).to.equal('Sim');
          console.log('response ', res.body)
          done();
        });     
    });
  });

  describe('Get all docs from a user', function() {
    it('should grab a profile', function(done) {
      testSession
        .get('/profile/Sim')
        .end(function(err, res) {
          console.log('is there an error ?', err);
          console.log('response ', res.body)
          done();
        });       
    });
    it('should grab my profile', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'Sim@gmail.com', password: 'Sim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('login error ', res.error);
          } else {
            console.log('no error');
            testSession
              .get('/profile/Sim')
              .end(function(err, res) {
                console.log('response ', res.body)
                done();
              });
          }
        });        
    });
    it('should grab someone else\'s profile', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'Tim@gmail.com', password: 'Tim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('login error ', res.error);
          } else {
            console.log('no error');
            testSession
              .get('/profile/Sim')
              .end(function(err, res) {
                console.log('response ', res.body)
                done();
              });
          }
        });        
    });
  });

});

describe('Doc Tests', function() {
  var agent = request.agent(app);
  var testSession;

  beforeEach(function() {
    testSession = session(app);
  });

  xdescribe('New Doc', function() {
    it('should make a public doc', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'Sim@gmail.com', password: 'Sim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('login error ', res.error);
            done()
          }
          testSession
            .post('/api/doc/createDoc')
            .send({username: 'Sim', docName: testName, docDescription: 'This is the test', docType: 'public'})
            .end(function(err, res) {
              console.log('sent on creation of new doc ', res.body);
              expect(res.body.docName).to.equal(testName);
              expect(res.body.originOwner).to.equal(null);
              expect(res.body.docOwner).to.equal('Sim');
              done();
            });
        });  
    });
    xit('should make a private doc', function(done) {
      
      testSession.post('/api/auth/login')
        .send({ email: 'Sim@gmail.com', password: 'Sim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('login error ', res.error);
            done()
          }
          testSession
            .post('/api/doc/createDoc')
            .send({username: 'Sim', docName: testName, docDescription: 'This is the test', docType: 'private'})
            .end(function(err, res) {
              expect(res.body.docName).to.equal(testName);
              done();
            });
        });
    });
  });

  xdescribe('Save Doc', function() {
    it('should work without commit message', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'Sim@gmail.com', password: 'Sim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('login error ', res.error);
            done()
          }
          testSession
            .post('/api/doc/saveDoc')
            .send({username: 'Sim', docName: testName, docContent: 'Overwriting the text 1', commitMessage: ''})
            .end(function(err, res) {
              console.log('saved ', res.body);
              // expect(res.text).to.equal('Saved');
              done();
            });
        });
      
    });
    xit('should work with commit message', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'Sim@gmail.com', password: 'Sim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('login error ', res.error);
            done()
          }
          testSession
            .post('/api/doc/saveDoc')
            .send({username: 'Sim', docName: testName, docContent: 'Overwriting the text 2', commitMessage: 'Testing commit'})
            .end(function(err, res) {
              // expect(res.text).to.equal('Saved');
              done();
            });
        });
      
    });
  });
  
  xdescribe('Copy Doc', function() {
    it('should work', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'Tim@gmail.com', password: 'Tim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('login error ', res.error);
            done()
          }
          testSession
            .post('/api/doc/copyDoc')
            .send({docOwner: 'Sim', docName: testName, username: 'Tim'})
            .end(function(err, res) {
              console.log('res.body ', res.body)
              expect(res.body.originOwner).to.equal('Sim');
              expect(res.body.docOwner).to.equal('Tim');
              done();
            });
        });
      
    });
  });

  xdescribe('Open Doc', function() {
    it('should work', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'Tim@gmail.com', password: 'Tim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('login error ', res.error);
            done()
          }
          testSession
            .post('/api/doc/openDoc')
            .send({username: 'Tim', docName: testName})
            .end(function(err, res) {
              console.log('opened ', res.body);
              // expect(res.body.docText).to.equal('Overwriting the text 2');
              done();
            });
        });
      
    });
  });
  xdescribe('Review Upstream', function() {
    it('should work', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'Tim@gmail.com', password: 'Tim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('login error ', res.error);
            done()
          }
          testSession
            .post('/api/doc/reviewUpstream')
            .send({username: 'Tim', docName: testName})
            .end(function(err, res) {
              console.log('res.body: ', res.body);
              // expect(res.body.docText).to.equal('Overwriting the text 2');
              done();
            });
        });
      
    });
  });
  xdescribe('Get Upstream', function() {
    xit('should work when there\'s no merge conflict', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'Sim@gmail.com', password: 'Sim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('sim login error ', res.error);
            done()
          }
          testSession
            .post('/api/doc/saveDoc')
            .send({username: 'Sim', docName: testName, docContent: 'Overwriting the origin for something to be pulled', commitMessage: ''})
            .end(function(err, res) {
              if (res.error) {
                console.log('update doc error ', res.error);
                done()
              }
              testSession.get('/api/auth/logout')
              .end(function(err, res) {
                if (res.error) {
                  console.log('sim logout error ', res.error);
                  done()
                }
                testSession.post('/api/auth/login')
                  .send({ email: 'Tim@gmail.com', password: 'Tim' })
                  .end(function(err, res) {
                    if (res.error) {
                      console.log('tim login error ', res.error);
                      done()
                    }
                    testSession
                      .post('/api/doc/getUpstream')
                      .send({username: 'Tim', docName: testName})
                      .end(function(err, res) {
                        if (res.error) {
                          console.log('tim pull upstream error ', res.error);
                          done()
                        }
                        console.log('res.text: ', res.text, res. body);
                        done();
                      });
                  });
              });  
            });
        });
    });

    it('should work despite merge conflicts', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'Sim@gmail.com', password: 'Sim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('sim login error ', res.error);
            done()
          }
          testSession
            .post('/api/doc/saveDoc')
            .send({username: 'Sim', docName: testName, docContent: 'Overwriting the text a \nasdfth time', commitMessage: ''})
            .end(function(err, res) {
              if (res.error) {
                console.log('update doc error ', res.error);
                done()
              }
              testSession.get('/api/auth/logout')
              .end(function(err, res) {
                if (res.error) {
                  console.log('sim logout error ', res.error);
                  done()
                }
                testSession.post('/api/auth/login')
                  .send({ email: 'Tim@gmail.com', password: 'Tim' })
                  .end(function(err, res) {
                    if (res.error) {
                      console.log('tim login error ', res.error);
                      done()
                    }
                    testSession
                      .post('/api/doc/saveDoc')
                      .send({username: 'Tim', docName: testName, docContent: 'drones \nThis is it \nAgain time', commitMessage: ''})
                      .end(function(err, res) {
                        if (res.error) {
                          console.log('tim update doc error ', res.error);
                          done()
                        }
                        testSession
                          .post('/api/doc/getUpstream')
                          .send({username: 'Tim', docName: testName})
                          .end(function(err, res) {
                            if (res.error) {
                              console.log('tim pull upstream error ', res.error);
                              done()
                            }
                            console.log('res.text: ', res.text, res. body);
                            done();
                          });
                      });
                  });
              });  
            });
        });
    });
  });

  xdescribe('Get All Docs', function() {
    it('should work', function(done) {
      testSession
        .get('/api/doc/allDocs')
        .end(function(err, res) {
          console.log('this is the res.body: ', res.body);
          // expect(res.body).to.equal();
          done();
        });
    });
  });

  xdescribe('Request Merge', function() {
    it('should make a merge request', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'Sim@gmail.com', password: 'Sim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('sim login error ', res.error);
            done()
          }
          testSession
            .post('/api/doc/saveDoc')
            .send({username: 'Sim', docName: testName, docContent: 'Overwriting the text a \nasdfth time', commitMessage: ''})
            .end(function(err, res) {
              if (res.error) {
                console.log('update doc error ', res.error);
                done()
              }
              testSession.get('/api/auth/logout')
              .end(function(err, res) {
                if (res.error) {
                  console.log('sim logout error ', res.error);
                  done()
                }
                testSession.post('/api/auth/login')
                  .send({ email: 'Tim@gmail.com', password: 'Tim' })
                  .end(function(err, res) {
                    if (res.error) {
                      console.log('tim login error ', res.error);
                      done()
                    }
                    testSession
                      .post('/api/doc/saveDoc')
                      .send({username: 'Tim', docName: testName, docContent: 'drones \nThis is it \nAgain time', commitMessage: ''})
                      .end(function(err, res) {
                        if (res.error) {
                          console.log('tim update doc error ', res.error);
                          done()
                        }
                        var latestCommit = res.body.currentCommit;

                        testSession
                          .post('/api/doc/requestMerge')
                          .send({username: 'Tim', docName: testName, collaboratorMessage: 'Helping', commitID: latestCommit})
                          .end(function(err, res) {
                            if (res.error) {
                              console.log('tim request merge error ', res.error);
                              done()
                            }
                            console.log('merge request successfully made');
                            console.log('res.text: ', res.text, res. body);
                            done();
                          });
                      });
                  });
              });  
            });
        });
    });

    xit('OLD VERSION', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'Tim@gmail.com', password: 'Sim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('login error ', res.error);
            done()
          }
          testSession
            .post('/api/doc/saveDoc')
            .send({username: 'Tim', docName: testName, docContent: 'Doing an overwrite\nSo that I can \nTry to merge this in', commitMessage: ''})
            .end(function(err, res) {
              console.log('saved ', res.body);
              var latestCommit = res.body.currentCommit;
              // expect(res.text).to.equal('Saved');
              testSession
                .post('/api/doc/requestMerge')
                .send({username: 'Tim', docName: testName, collaboratorMessage: 'Helping', commitID: latestCommit})
                .end(function(err, res) {
                  expect(res.text).to.equal('Pull request sent');
                  done();
                });
            });
        });
      
    });
  });
  xdescribe('Review Pull Request', function() {
    it('should work', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'Sim@gmail.com', password: 'Sim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('login error ', res.error);
            done()
          }
          testSession
            .post('/api/doc/reviewPullRequest')
            .send({commitID: 'bd60c99fdf6b0ea3d52f3946030b9bccd5913033'})
            .end(function(err, res) {
              console.log('res.body: ', res.body);
              // expect(res.text).to.equal('Pull request sent');
              done();
            });
        });
      
    });
  });
  xdescribe('Action Pull Request', function() {
    it('should accept', function(done) {
      testSession.post('/api/auth/login')
        .send({ email: 'Sim@gmail.com', password: 'Sim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('login error ', res.error);
            done()
          }
          testSession
            .post('/api/doc/actionPullRequest')
            .send({commitID: 'bd60c99fdf6b0ea3d52f3946030b9bccd5913033', ownerMessage: 'Thanks', mergeStatus: 'accept'})
            .end(function(err, res) {
              console.log('res.body: ', res.body);
              // expect(res.text).to.equal('Pull request sent');
              done();
            });
        });
      
    });
    xit('should decline', function(done) {
      testSession
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
      testSession.post('/api/auth/login')
        .send({ email: 'Sim@gmail.com', password: 'Sim' })
        .end(function(err, res) {
          if (res.error) {
            console.log('login error ', res.error);
            done()
          }
          testSession
            .post('/api/doc/pastVersion')
            .send({commitID: '532cf12b49bc0d9f8d284612df66ecf382f3341f'})
            .end(function(err, res) {
              console.log('res.body: ', res.body);
              // expect(res.text).to.equal('Pull request sent');
              done();
            });
        });
      
    });
  });
});

          