var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController')

// router.get('/:store_idx', function(req, res, next) {
//     res.render('admin', { title: 'This is admin page!' });
// });
router.get('/:store_idx', adminController.readAdminList);

module.exports = router

