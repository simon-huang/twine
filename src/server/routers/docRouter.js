var express = require('express');
var router = express.Router();

import { createDoc, saveDoc} from '../../db/docControllers.js';

router.route('/createDoc').post(createDoc);
router.route('/saveDoc').post(saveDoc);

module.exports = router;


/*
getUpstream === pull upstream master
reviewUpstream === view differences
requestMerge === pull request to the master document for merging
copyDocument === git clone/fork
saveDocument === git commit
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
