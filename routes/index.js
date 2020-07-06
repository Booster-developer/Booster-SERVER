var express = require('express');
var router = express.Router();
const stores = require('./stores');
const orders = require('./orders');
const users = require('./users');

router.use('/stores', stores);
router.use('/orders', orders);
router.use('/users', users);

module.exports = router;
