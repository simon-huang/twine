var express = require('express');
var pRouter = express.Router();

import { allDocsForUser, specificDoc } from '../../db/docControllers.js';

pRouter.route('/:username').get(allDocsForUser); 
pRouter.route('/:username/:docId').get(specificDoc); 

module.exports = pRouter;


