var express = require('express');
var router = express.Router();

import { createDoc, mergeDoc} from '../../db/docControllers.js';

router.route('/createDoc').post(createDoc);

module.exports = router;

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
