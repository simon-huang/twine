import { User, Doc, DocVersion } from './schema.js';

import { createNewDoc } from './docHelpers.js';

// CHECK ATTRIBUTE NAMES AND ARGUMENT NAMES
function createDoc(req, res, next) {
  // console.log('POST request received on /api/doc/createDoc');
  var user, commitID, path;
  var doc = {
    name: req.body.name,
    description: req.body.description,
    public: req.body.TYPE === public ? 1 : 0
  };
  
  // get userID
  User.findOne({ where: {username: req.body.username, } })
  .then(function(foundUser){
    user = foundUser;
    // make sure the user doesn't already have a doc with the same name
    Doc.findOne({ where: {name: req.body.name, userID: user._id} })
  })
 .then(function(doc){
  //already exists
  if (doc) {
    // res.status().end()
    res.end('You already have a doc with that name');
  } 
  return createNewDoc(user, doc.name)
  })
  .then(function(result){
    commitID = result.commitID;
    path = result.path;
    //Put doc in database

  })

/*
.then(function(foundUser){

})

Put in database:
  add a new Doc instance, including path
  add a new DocPermission
  add a new DocVersion
then, send back the doc info (name, text, maybe desc, maybe type)
*/
};


export { createDoc };


/*
On creation of new doc: 
receive request with name, description, and public, and username
check if doc name is unique
create a folder and a doc in the folder
add a new Doc instance, including path
add a new DocPermission
add a new DocVersion
then, send back the doc info (name, text, maybe desc, maybe type)

files should go into db folder
../../db/repos/username/
server, src,
*/


/*
On opening a document to edit:
receive request with info to find doc in Doc table
use the path and read the text from the file
query DocVersion table for relevant commits
send all of that back
*/

/*
On clone:
receive request with documentID or username/ID+doc name
get path to doc from Doc table
create a clone at the correct path
add a new Doc instance, including path
add a new DocPermission
add a new DocVersion
then, send back the doc info (name, text, maybe desc, maybe type)
*/


/*
On save (including notify clones):
receive request with info to find doc in database and new text
retrieve docID if don't already have it, and doc path
use the path and overwrite the appropriate file with the new text
commit
add a new DocVersion
then, send back an okay
NOTIFY CLONES
*/

/*
On deletion of a doc
*/

/*
On pull from origin:
receive request with info to find doc in database
need doc path and ID of origin document
get path of origin document
do a 'git pull origin master'
do a 'git add' and 'commit'
add the commit to DocVersion
send back an okay
*/

/*
Things to add to handle pull requests:
To let owners know they have a pull request to look at, I think we need another table for pull requests.
How do we let owners know they have a new pull request? The server can't initiate contact with the client
Also need to let collaborators know if there was an accept or reject.
*/

/*
On send pull request to origin:
receive request with info to find doc in database
*short version* 
make a copy of the current doc
add the path to the doc, the commitiD, the docID, and optionally the userID and the user/doc ID of the origin
  also whether the pull request is open/closed
*/

/*
On review pull request:
receive request with info to query table of pull requests
*then needs discussion (or I need to be filled in)*
  are we sending the client 2 version for them to see them side by side? 
  or a combined version from the diff tool?
*/


/*
On accepting/rejecting a pull request:
*short version* 
On accept: override origin and otherwise follow a regular document save
On reject: change the pull request to closed
Both: then notify
*/