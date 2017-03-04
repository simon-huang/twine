var express = require('express');
var dRouter = express.Router();

import { createDoc, saveDoc, copyDoc, openDoc, reviewUpstream, getUpstream, validateMerge,
  requestMerge, reviewPullRequest, actionPullRequest, allDocs, pastVersion } from '../../db/docControllers.js';

dRouter.route('/allDocs').get(allDocs); 
dRouter.route('/createDoc').post(createDoc); 
dRouter.route('/saveDoc').post(saveDoc);
dRouter.route('/copyDoc').post(copyDoc);
dRouter.route('/openDoc').post(openDoc);
dRouter.route('/reviewUpstream').post(reviewUpstream);
dRouter.route('/getUpstream').post(getUpstream); 
dRouter.route('/validateMerge').post(validateMerge); 
dRouter.route('/requestMerge').post(requestMerge); 
dRouter.route('/reviewPullRequest').post(reviewPullRequest); 
dRouter.route('/actionPullRequest').post(actionPullRequest); 
dRouter.route('/pastVersion').post(pastVersion); 

module.exports = dRouter;


