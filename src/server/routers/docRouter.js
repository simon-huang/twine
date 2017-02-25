var express = require('express');
var router = express.Router();

import { createDoc, saveDoc, copyDoc, openDoc, reviewUpstream, getUpstream } from '../../db/docControllers.js';

router.route('/createDoc').post(createDoc);
router.route('/saveDoc').post(saveDoc);
router.route('/copyDoc').post(copyDoc);
router.route('/openDoc').post(openDoc);
router.route('/reviewUpstream').post(reviewUpstream);
router.route('/getUpstream').post(getUpstream);


module.exports = router;
//username, [{docName: '', docDescription: '', type: 'owner'}]

/*
api/doc/createDoc
api/doc/saveDoc
api/doc/copyDoc
api/doc/openDoc
api/doc/reviewUpstream
api/doc/getUpstream
api/doc/requestMerge
api/doc/reviewPullRequest
api/doc/resolvePullRequest

getUpstream === pull upstream master
requestMerge === pull request to the master document for merging
reviewPullRequest === reviewing pull request (needs to grab origin and the requested merge doc)
actionPullRequest === accept or reject PR
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
