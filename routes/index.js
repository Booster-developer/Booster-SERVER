var express = require('express');
var router = express.Router();
const stores = require('./stores');
const orders = require('./orders');

router.use('/stores', stores);
router.use('/orders', orders);

module.exports = router;
