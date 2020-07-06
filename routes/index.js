var express = require('express');
var router = express.Router();
const stores = require('./stores');

router.use('/stores', stores);

module.exports = router;
