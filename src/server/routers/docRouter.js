var express = require('express');
var router = express.Router();

import { createDoc, saveDoc, copyDoc, openDoc, reviewUpstream, getUpstream, requestMerge, reviewPullRequest, actionPullRequest, allDocs } from '../../db/docControllers.js';

router.route('/allDocs').get(allDocs); 
router.route('/createDoc').post(createDoc); 
router.route('/saveDoc').post(saveDoc);
router.route('/copyDoc').post(copyDoc);
router.route('/openDoc').post(openDoc);
router.route('/reviewUpstream').post(reviewUpstream);
router.route('/getUpstream').post(getUpstream); 
router.route('/requestMerge').post(requestMerge); //maybe need to figure out how to get commitID or SHA
router.route('/reviewPullRequest').post(reviewPullRequest); 
router.route('/actionPullRequest').post(actionPullRequest); 

module.exports = router;


