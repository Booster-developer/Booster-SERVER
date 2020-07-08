var express = require('express');
var router = express.Router();
const stores = require('./stores');
const orders = require('./orders');
const users = require('./users');
const home = require('./home');

router.use('/stores', stores);
router.use('/orders', orders);
router.use('/users', users);
router.use('/home', home);

module.exports = router;
