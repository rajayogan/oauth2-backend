var express = require('express');
var actions = require('../methods/actions');

var router = express.Router();

router.post('/authenticate', actions.authenticate);
router.post('/adduser', actions.addNew);

module.exports = router;