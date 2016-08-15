var express = require('express');
var actions = require('../methods/actions');
var auth = require('../methods/auth');
var clients = require('../methods/client');
var oauth2 = require('../methods/oauth2');

var router = express.Router();

router.post('/authenticate', actions.authenticate);
router.post('/adduser', actions.addNew);
router.get('/getinfo', actions.getinfo);
router.post('/addbook', auth.isBearerAuthenticated, actions.addBook);
router.get('/getbooks', auth.isBearerAuthenticated, actions.getBooks);
router.route('/clients')
            .post(auth.isAuthenticated, clients.postClients)
            .get(auth.isAuthenticated, clients.getClients);
router.route('/oauth2/authorize')
  .get(oauth2.authorization)
  .post(oauth2.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(auth.isClientAuthenticated, oauth2.token);

module.exports = router;