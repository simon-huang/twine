var express = require('express');
var dRouter = express.Router();

import { createDoc, saveDoc, copyDoc, openDoc, reviewUpstream, getUpstream, 
  requestMerge, reviewPullRequest, actionPullRequest, allDocs, pastVersion } from '../../db/docControllers.js';

dRouter.route('/allDocs').get(allDocs); 
dRouter.route('/createDoc').post(createDoc); 
dRouter.route('/saveDoc').post(saveDoc);
dRouter.route('/copyDoc').post(copyDoc);
dRouter.route('/openDoc').post(openDoc);
dRouter.route('/reviewUpstream').post(reviewUpstream);
dRouter.route('/getUpstream').post(getUpstream); 
dRouter.route('/requestMerge').post(requestMerge); //maybe need to figure out how to get commitID or SHA
dRouter.route('/reviewPullRequest').post(reviewPullRequest); 
dRouter.route('/actionPullRequest').post(actionPullRequest); 
dRouter.route('/pastVersion').post(pastVersion); 

module.exports = dRouter;


