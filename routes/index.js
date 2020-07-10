var express = require('express');
var router = express.Router();
const stores = require('./stores');
const orders = require('./orders');
const users = require('./users');
const home = require('./home');
const progress = require('./progress');
const myPage = require('./myPage');

router.use('/stores', stores);
router.use('/orders', orders);
router.use('/users', users);
router.use('/home', home);
router.use('/progress', progress);
router.use('/mypage',myPage);

module.exports = router;
