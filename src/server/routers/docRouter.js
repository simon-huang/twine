var express = require('express');
var router = express.Router();

import { createDoc, saveDoc, copyDoc, openDoc, reviewUpstream, getUpstream, requestMerge, reviewPullRequest, actionPullRequest } from '../../db/docControllers.js';
//Logins //{username:'', allDocuments:[]}
router.route('/createDoc').post(createDoc); //change: docType instead of public
router.route('/saveDoc').post(saveDoc);
router.route('/copyDoc').post(copyDoc);
router.route('/openDoc').post(openDoc);
router.route('/reviewUpstream').post(reviewUpstream);
router.route('/getUpstream').post(getUpstream); 
router.route('/requestMerge').post(requestMerge); //maybe need to figure out how to get commitID or SHA
router.route('/reviewPullRequest').post(reviewPullRequest); 
router.route('/actionPullRequest').post(actionPullRequest); 

module.exports = router;
//username, allDocuments =[{docName: '', docDescription: '', type: 'owner'}]

/*
{
  docOwner: username,
  docName: doc.name, 
  docDescription: doc.description,
  docType: type,
  parentID: doc.originId,
  filePath: doc.filepath,
  docContent: text,
  docCommits: []
}


api/doc/createDoc
api/doc/saveDoc
api/doc/copyDoc 
api/doc/openDoc
api/doc/reviewUpstream
api/doc/getUpstream
api/doc/requestMerge
api/doc/reviewPullRequest
api/doc/resolvePullRequest


NEED ANOTHER ROUTE FOR RETRIEVING A PAST VERSION
*/

/*
Info needed from client:

Create doc: username and info from form fields
Open doc
Clone doc
Save

Pull from origin
Send pull request
Review pull request
Accept/reject pull request

Not MVP:
Delete doc

Pseudocode (ish) in docControllers.js
*/








/*
MVP:
Create doc
Open doc
Clone doc
Save

Pull from origin
Send pull request
Review pull request
Accept/reject pull request

Not MVP:
Delete doc

Pseudocode (ish) in docControllers.js
*/
